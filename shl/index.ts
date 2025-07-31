import sqlite3 from 'sqlite3';
import pinyin from 'pinyin';
import { readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';

// 确保db目录存在
const dbDir = join(__dirname, 'db');
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

// 单个数据库路径
const dbPath = join(dbDir, 'articles.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接错误:', err.message);
    return;
  }
  console.log(`成功连接到数据库: ${dbPath}`);

  // 读取data目录下所有JSON文件
  const dataDir = join(__dirname, 'data');
  try {
    const jsonFiles = readdirSync(dataDir).filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      console.log('data目录下没有找到JSON文件');
      db.close();
      return;
    }

    // 处理每个JSON文件为独立表
    processFilesInSequence(jsonFiles, 0, jsonFiles.length);
  } catch (err) {
    console.error('读取data目录错误:', err instanceof Error ? err.message : String(err));
    db.close();
  }
});

// 顺序处理文件（避免SQLite并发写入问题）
/**
 * 顺序处理文件列表
 * @param {string[]} files - 待处理文件路径数组
 * @param {number} index - 当前处理索引
 * @param {number} totalFiles - 文件总数
 * @description 递归按顺序处理所有JSON文件，确保数据库操作串行执行避免冲突
 */
function processFilesInSequence(files: string[], index: number, totalFiles: number) {
  if (index >= totalFiles) {
    console.log('所有文件处理完成');
    db.close((err) => {
      if (err) {
        console.error('关闭数据库错误:', err.message);
      } else {
        console.log('数据库连接已关闭');
      }
    });
    return;
  }

  const file = files[index] as string;
  processSingleFile(file, index, totalFiles, () => {
    processFilesInSequence(files, index + 1, totalFiles);
  });
}

// 处理单个文件并创建对应表
async function processSingleFile(file: string, index: number, totalFiles: number, callback: () => void) {
  const filePath = join(__dirname, 'data', file);
  const tableName = basename(file, extname(file));

  try {
    // 1. 文件读取与基础验证
    const content = readFileSync(filePath, 'utf8').trim();
    if (!content) {
      console.warn(`[${index+1}/${totalFiles}] 文件 ${file} 为空，已跳过`);
      callback();
      return;
    }

    const jsonData = JSON.parse(content);
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.warn(`[${index+1}/${totalFiles}] 文件 ${file} 内容不是非空数组，已跳过`);
      callback();
      return;
    }

    // 2. 字段分析与类型检测
    const { fields, firstItem } = analyzeJsonFields(jsonData, tableName);
    if (fields.length === 0) {
      console.warn(`[${index+1}/${totalFiles}] 文件 ${file} 数据对象没有字段，已跳过`);
      callback();
      return;
    }

    // 3. 数据库表操作
    await dropOldTable(tableName, index, totalFiles);
    await createNewTable(tableName, fields, firstItem, index, totalFiles);

    // 4. 数据插入
    await insertTableData(tableName, fields, jsonData, index, totalFiles);

    console.log(`[${index+1}/${totalFiles}] 文件 ${file} 全流程处理完成`);
    callback();
  } catch (err) {
    console.error(`[${index+1}/${totalFiles}] 处理文件 ${file} 时出错:`, err instanceof Error ? err.message : String(err));
    callback();
  }
}

// 提取字段分析逻辑
function analyzeJsonFields(jsonData: any[], tableName: string) {
  const allFields = new Set<string>();
  jsonData.forEach((item, itemIndex) => {
    if (typeof item !== 'object' || item === null) {
      console.warn(`跳过非对象数据项 (索引: ${itemIndex})`);
      return;
    }
    Object.keys(item).forEach(key => allFields.add(key));
  });
  const fields = Array.from(allFields);
  // 为formula表添加letter字段
  if (tableName === 'formula' && !fields.includes('letter')) fields.push('letter');
  return { fields, firstItem: jsonData[0] };
}

// 提取删除旧表逻辑（Promise化）
function dropOldTable(tableName: string, index: number, totalFiles: number) {
  return new Promise((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
      if (err) {
        console.error(`[${index+1}/${totalFiles}] 删除表错误 (${tableName}):`, err.message);
        return reject(err);
      }
      resolve(null);
    });
  });
}

// 提取创建新表逻辑（Promise化）
function createNewTable(tableName: string, fields: string[], firstItem: any, index: number, totalFiles: number) {
  return new Promise((resolve, reject) => {
    const fieldDefinitions = fields.map(field => {
      const value = firstItem[field];
      let type = 'TEXT';
      if (typeof value === 'number') {
        type = Number.isInteger(value) ? 'INTEGER' : 'REAL';
      } else if (typeof value === 'boolean') {
        type = 'INTEGER'; // SQLite用0/1表示布尔值
      }
      return `${field} ${type}`;
    }).join(',\n      ');

    const createTableSQL = `CREATE TABLE ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${fieldDefinitions}
    )`;

    db.run(createTableSQL, (err) => {
      if (err) {
        console.error(`[${index+1}/${totalFiles}] 创建表错误 (${tableName}):`, err.message);
        return reject(err);
      }
      console.log(`[${index+1}/${totalFiles}] 表 ${tableName} 已创建 (${fields.length}个字段)`);
      resolve(null);
    });
  });
}

// 提取数据插入逻辑（Promise化）
function insertTableData(tableName: string, fields: string[], jsonData: any[], index: number, totalFiles: number) {
  return new Promise((resolve, reject) => {
    const placeholders = fields.map(() => '?').join(', ');
    const insertSQL = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
    const stmt = db.prepare(insertSQL);

    let successCount = 0;
    let errorCount = 0;

    // 提取类型转换工具函数
    const getFirstLetters = (chineseText: string) => {
      if (!chineseText) return '';
      return pinyin(chineseText, {
        style: pinyin.STYLE_FIRST_LETTER,
        heteronym: false
      }).map(p => p[0].toUpperCase()).join('');
    };

    const convertValue = (value: any, field: string, item: any) => {
      if (tableName === 'formula' && field === 'letter') {
        return getFirstLetters(item.name || '');
      }
      if (value === null || value === undefined) return null;
      if (typeof value === 'boolean') return value ? 1 : 0;
      if (value instanceof Date) return value.toISOString();
      if (typeof value === 'object') return JSON.stringify(value);
      if (typeof value === 'number' && !Number.isFinite(value)) {
        console.warn(`跳过无效数值: ${value}`);
        return null;
      }
      return value;
    };

    jsonData.forEach((item, itemIndex) => {
      const values = fields.map(field => convertValue(item[field], field, item));

      stmt.run(values, (err) => {
        if (err) {
          console.error(`[${index+1}/${totalFiles}] 插入数据错误 (${tableName}:${itemIndex}):`, err.message);
          errorCount++;
        } else {
          successCount++;
        }

        if (itemIndex === jsonData.length - 1) {
          stmt.finalize(() => {
            console.log(`[${index+1}/${totalFiles}] 数据插入完成: 成功 ${successCount} 条, 失败 ${errorCount} 条`);
            resolve(null);
          });
        }
      });
    });
  });
}
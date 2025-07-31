import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

let tabFlat = null;
// 分析JSON结构并生成表结构SQL
function generateTableSchema(jsonItems, tableName) {
  if (!jsonItems.length) return '';
  const fieldTypes = {};
  const columns = [];

  // 添加主键id
  columns.push('id INTEGER PRIMARY KEY');
  fieldTypes.id = 'INTEGER';

  // 循环所有JSON项分析字段类型
  jsonItems.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key === 'id') return; // id已单独处理
      const value = item[key];
      let sqlType = getSqlType(value);

      // 如果字段已存在，检查类型兼容性
      if (fieldTypes[key]) {
        // 如果已有类型是TEXT，保持不变
        if (fieldTypes[key] === 'TEXT') return;
        // 如果新类型是TEXT，更新为TEXT
        if (sqlType === 'TEXT') {
          fieldTypes[key] = 'TEXT';
        } else if (fieldTypes[key] === 'INTEGER' && sqlType === 'REAL') {
          // 如果已有类型是INTEGER，新类型是REAL，更新为REAL
          fieldTypes[key] = 'REAL';
        }
      } else {
        // 新字段，记录类型
        fieldTypes[key] = sqlType;
      }
    });
  });
  tabFlat = fieldTypes;

  // 生成字段定义
  Object.keys(fieldTypes).forEach(key => {
    if (key !== 'id') { // id已单独处理
      columns.push(`${key} ${fieldTypes[key]} `);

    }
  });

  return `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')});`;
}

// 辅助函数：获取值对应的SQL类型
function getSqlType(value) {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'INTEGER' : 'REAL';
  } else if (typeof value === 'boolean') {
    return 'INTEGER'; // SQLite使用1/0存储布尔值
  } else if (Array.isArray(value) || typeof value === 'object') {
    return 'TEXT'; // 数组和对象存储为JSON字符串
  } else {
    return 'TEXT'; // 默认类型为TEXT
  }
}

// 数据库连接
const db = new sqlite3.Database(path.resolve(__dirname, 'articles.db'), (err) => {
  if (err) {
    console.error('数据库连接错误:', err.message);
    return;
  }
  console.log('成功连接到SQLite数据库');
});

// 读取JSON文件
const jsonPath = path.resolve(__dirname, '../data/zhongyao.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const zhongyaoItems = JSON.parse(jsonData);

// 动态生成表结构
const createTableSql = generateTableSchema(zhongyaoItems, 'zhongyao');

db.run(createTableSql, (err) => {
  if (err) {
    console.error('创建表错误:', err.message);
    return;
  }
  console.log('表结构创建成功或已存在');

  // 插入数据
  const keys = ['id', ...Object.keys(tabFlat).filter(key => key !== 'id')];
  const placeholders = keys.map(() => '?').join(', ');
  const insertSql = `
  INSERT OR IGNORE INTO zhongyao (${keys.join(', ')})
  VALUES (${placeholders});
  `;

  zhongyaoItems.forEach((item) => {
    // 处理数组和对象类型字段
    const values = keys.map(key => {
      const value = item[key];
      return Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value;
    });
    console.log(values);

    db.run(insertSql, values, function (err) {
      if (err) {
        console.error(`插入数据错误 (id: ${item.id}):`, err.message);
      } else {
        console.log(`成功插入数据 (id: ${item.id}), 行ID: ${this.lastID}`);
      }

      // 所有数据插入完成后关闭数据库
      if (item.id === zhongyaoItems[zhongyaoItems.length - 1].id) {
        closeDatabase(db);
      }
    });
  });
});

function closeDatabase(db: sqlite3.Database) {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed successfully');
    }
  });
}
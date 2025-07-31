// 设置 Puppeteer 缓存目录

import { createCrawl } from 'x-crawl';
import fs from 'fs';
import path from 'path';


function delay(time: any) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}



const crawlApp = createCrawl({
  crawlPage: {
    puppeteerLaunchOptions: {
      headless: true,
      executablePath: 'C:\\Users\\dxa\\.cache\\puppeteer\\chrome\\win64-140.0.7288.0\\chrome-win64\\chrome.exe',
    }
  }
})

crawlApp.crawlPage('https://www.tcmxs.com/ssshl.html').then(async (res) => {
  const { browser, page } = res.data

  await page.waitForSelector('.ss-cp')
  // // 条文
  const tiaowen = await page.$$eval('#cp > li ', options => {
    let parentId = ''
    let index = 0
    return options.map((option, i) => {
      // 获取所有class为itcm-i-b的A链接

      const linkElements = option.querySelectorAll('a.itcm-i-b');
      // 将NodeList转换为数组并提取每个链接的信息
      const links = [...new Set(Array.from(linkElements).map(el => {
        return el.textContent?.trim();
      }))]

      if (option.className == 'ss-cp') {
        parentId = option.id
        return { id: parentId, text: option.textContent, links, }
      }
      index++
      return { id: index, text: option.textContent, parent: parentId, links, }
    });
  });


  // 方剂 ---！！！！！暂停使用
  /*await page.waitForSelector('.itcm-i-b')
  const fagnji = await page.$$eval('.itcm-i-b', options => {
    return options.map((option) => {
      return  option.href  
    });
  });
  */



  // 注解
  const zhujie = []
  let zhujieUrl = await page.$$('.itcm-i-a')
  console.log('共有:'+zhujieUrl.length+'个注解');
  for (let i = 0; i < zhujieUrl.length; i++) {
    await zhujieUrl[i]?.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
    await page.waitForSelector('.messageinfo_li')
    // 
    const a = await page.$$('.messageinfo_li > a')
    const url = []
    // 注解
    for (const item of a) {
      const href = await item.evaluate((el) => el.getAttribute('href'))
      url.push('https://www.tcmxs.com/' + href)
    }
    zhujie.push(... await getPostmessage(url, i + 1))
    await page.goBack()
    await page.waitForSelector('.itcm-i-a')
    zhujieUrl = await page.$$('.itcm-i-a')
    console.log('获取第:'+i+'个注解');
  }


  console.log('开始写入文件...');

  // 写入条文数据
  const tiaowenPath = path.join(__dirname, 'data/tiaowen.json');
  writeDataToFile(tiaowen, tiaowenPath, 'tiaowenPath');

  // 写入注解数据
  const zhujiePath = path.join(__dirname, 'data/zhujie.json');
  writeDataToFile(zhujie, zhujiePath, 'zhujiePath');
  console.log('写入文件完成。');
  // 关闭浏览器
  browser.close()
})

// 封装文件写入函数
function writeDataToFile(data: any, filePath: string, dataName: string) {
  console.log('尝试写入文件路径:', filePath);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`${dataName}已成功写入文件:`, filePath);
  } catch (error) {
    console.error(`写入${dataName}失败:`, error);
  }
}



/**
 * 获取条文注解
 * @param url 注解页面
 * @param id 条文序号
 * @returns 
 */
async function getPostmessage(url:any, id:any) {
  const res = await crawlApp
    .crawlHTML(url);
  // 处理HTML内容，提取postmessage div

  let zhujie = []
  if (Array.isArray(res)) {
    for (const htmls of res) {
      let html = htmls.data.html;
      const nfMatch = html.match(/<div class="nf">([\s\S]*?)<\/div>/i);
      const author = nfMatch ? nfMatch[1].trim() : '未找到内容';
      // console.log('提取的中介内容:', author);
      // 提取来源中的标题内容
      const titleMatch = html.match(/《(.*?)》/);
      const extractedTitle = titleMatch ? titleMatch[1] : '未找到标题';
      // console.log('提取的标题内容:', extractedTitle);
      const postmessageMatch = html.match(/<div class="postmessage">([\s\S]*?)<\/div>/i);
      const postmessageContent = postmessageMatch ? postmessageMatch[1].trim() : '未找到内容';
      // console.log('提取的postmessage内容:', postmessageContent);
      zhujie.push({
        title: extractedTitle,
        content: postmessageContent,
        author,
        id: id
      })
    }
  }

  return zhujie
}

/**
 * 获取方剂  
 */
/*let fangji = []
async function getfangji(url) {

  const res = await crawlApp.crawlHTML(url);
  console.log(res);

  for (const htmls of res) {
    let html = htmls.data.html;
    // 使用正则表达式提取class为"postmessage_f1"的div内容
    // 使用正则表达式匹配所有 class 为 "postmessage_f1" 的 div 内容
    const postmessageRegex = /<div class="postmessage_f1">([\s\S]*?)<\/div>/gs;
    let postmessageContent = '';
    let match;
    while ((match = postmessageRegex.exec(html)) !== null) {
      // 提取内部所有 <div class="p"> 的内容
      const innerDivRegex = /<div class="p">(.*?)<\/div>/gs;
      let innerMatch;
      while ((innerMatch = innerDivRegex.exec(match[1])) !== null) {
        postmessageContent += innerMatch[1].replace(/\s+/g, ' ').trim() + ' ';
      }
    }
    postmessageContent = postmessageContent.trim() || '未找到内容';
    console.log('提取的postmessage_f1内容:', postmessageContent);
    // 使用正则表达式提取class为"h1_topic"的h1标签内容
    const h1Regex = /<h1 class="h1_topic">(.*?)<\/h1>/gs;
    const h1Match = h1Regex.exec(html);
    const h1Content = h1Match ? h1Match[1].trim() : '未找到标题';
    fangji.push({
      title: h1Content,
      content: postmessageContent,
    })
  }
  console.log(fangji);
}
*/
/**
 * 
 * 获取条文 -》 数组
 * 循环条文 -》 获取其他家的注解 -》注入数组
 * 
 *  */
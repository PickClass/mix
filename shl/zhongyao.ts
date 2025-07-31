import { createCrawl } from 'x-crawl';

import fs from 'fs';
import path from 'path';



const crawlApp = createCrawl({
    maxRetry: 3,
    // 取消以无头模式运行浏览器
    crawlPage: {
        puppeteerLaunchOptions: {
            headless: true,
            executablePath: 'C:\\Users\\dxa\\.cache\\puppeteer\\chrome\\win64-140.0.7288.0\\chrome-win64\\chrome.exe',
        }
    }
})

crawlApp.crawlPage('https://www.zysj.com.cn/lilunshuji/shennongbencaojing/quanben.html').then(async (html) => {
    const { browser, page } = html.data
    await page.waitForSelector('.section')

    const zhongyao = await page.$$eval('.section', (options) => {
        let classifyId = 0
        let parentId = 0
        return options.map((option, i) => {
            const title = option.querySelector('.title')?.textContent;
            const contentNodes = option.querySelectorAll('p');
            
            // 若没有内容节点，更新 parentId 并返回简单对象
            if (contentNodes.length === 0) {
                parentId = i;
                return { title, content: '', id: i, classifyId,h2:true,children:[] };
            }
            // 使用 map 方法获取所有内容节点的文本内容
            const contentText = Array.from(contentNodes).map(item => item.textContent);

            // 若标题包含上经、下经或中经，更新 classifyId
            if (title && /上经|下经|中经/.test(title)) {
                classifyId = i;
                return { title, content: contentText, id: i, h1: true,children:[] };
            }
            // 普通条目返回完整对象
            return { title, content: contentText, parentId, id: i,type:'list'  };
        });
    })

    // zhongyao 扁平结构数据
    // console.log(zhongyao);

    //树结构数据
    // let newzhongyoa = [] 
    // let aaaa  = zhongyao.forEach(item => {
    //      if (item.h2) {
    //             item.children.push(...zhongyao.filter(i => i.parentId === item.id))
    //         }
    //     if (item.h1) {
    //         // console.log(zhongyao.filter(i => i.classifyId === item.id));
    //         item.children.push(...zhongyao.filter(i => i.classifyId === item.id))
    //         newzhongyoa.push(item)
    //     }
       
        
    // })
    // console.log(newzhongyoa);

    const tiaowenPath = path.join(__dirname, 'data/zhongyao.json');
    console.log('尝试写入文件路径:', tiaowenPath);
    try {
        // zhongyao  扁平结构数据
        console.log(zhongyao);
        
        // newzhongyoa 树结构数据
        fs.writeFileSync(tiaowenPath, JSON.stringify(zhongyao, null, 2), 'utf8');
        console.log('zhongyao已成功写入文件:', tiaowenPath);
    } catch (error) {
        console.error('写入zhongyao失败:', error);
    }
    await browser.close()
})
const puppeteer = require('puppeteer')
const request = require('request')
const fs = require('fs')
const path = require('path')

async function crawler () {
  const browser = await puppeteer.launch()// 开启浏览器
  const page = await browser.newPage()// 开启一个页面
  await page.goto('http://588ku.com/ui/0-3-default-26-0-1/')// 目标页面
  await page.waitFor(500)


  function sleep(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1)
        } catch (e) {
          reject(0)
        }
      }, delay)
    })
  }
  
  let scroll = async function() {
    let dis = 0;
    while (dis < 4900) {
      await page.evaluate((y) => {
        window.scrollTo(0, y)
      }, dis)
      dis += 200
      await sleep(500)
    }
  }
  let getData = async function() {
    const data = await page.evaluate(() => {
      let arr = []//返回数据
      //定义想要爬取的数据
      let imgBox = document.getElementsByClassName("pic-box img-show")
      let titleList = document.getElementsByClassName("title")
      for (let i=0; i<imgBox.length; i++) {
        let obj = {}
        obj.src = imgBox[i].firstElementChild.firstElementChild.src
        obj.title = titleList[i].innerText
        arr.push(obj)
      }
       return arr
    })
    for (let item of data) {
      request(item.src).pipe(fs.createWriteStream('./img/' +  item.title + '.jpg'))
    }
  }
  await scroll()
  await getData()
  //  let scrollH1 = await page.evaluate(async () => {
  //    window.scrollTo(0, 500)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH2 = await page.evaluate(async () => {
  //    window.scrollTo(0, 1000)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH3 = await page.evaluate(async () => {
  //    window.scrollTo(0, 1500)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH4 = await page.evaluate(async () => {
  //    window.scrollTo(0, 2000)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH5 = await page.evaluate(async () => {
  //    window.scrollTo(0, 2500)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH6 = await page.evaluate(async () => {
  //    window.scrollTo(0, 3000)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH7 = await page.evaluate(async () => {
  //    window.scrollTo(0, 3500)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH8 = await page.evaluate(async () => {
  //    window.scrollTo(0, 4000)
  //    return ;
  //  })
  //  await page.waitFor(500)
  //  let scrollH9 = await page.evaluate(async () => {
  //    window.scrollTo(0, 4877)
  //    return ;
  //  })
  //  await page.waitFor(500)


  // const data = await page.evaluate(() => {
  //   let arr = []//返回数据
  //   //定义想要爬取的数据
  //   let imgBox = document.getElementsByClassName("pic-box img-show")
  //   let titleList = document.getElementsByClassName("title")
  //   for (let i=0; i<imgBox.length; i++) {
  //     let obj = {}
  //     obj.src = imgBox[i].firstElementChild.firstElementChild.src
  //     obj.title = titleList[i].innerText
  //     arr.push(obj)
  //   }
  //   return arr
  // })
  // for (let item of data) {
  //   request(item.src).pipe(fs.createWriteStream(item.title + '.jpg'))
  // }
  await browser.close();
}
crawler ()
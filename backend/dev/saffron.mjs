/**
 * 主调度文件
 */

import util from 'util'
import jsdom from 'jsdom'
import { Parser } from './parser.mjs'
import { URLTPL, PAGEINDEX } from './config.mjs'

class Saffron {
  constructor(site) {
    this.site = site;
    this.parser = new Parser(site);
    this.pageIndexs = PAGEINDEX[site];
    this.urlsToFetch = [];
    this.sumCompleted = 0;
  }

  /**
   * 获取视频的更新地址
   * 函数解析采集站的视频更新地址,
   * 将符合条件的更新地址填充到数组中.
   */
  getUpdate() {
    let sumToGet = this.pageIndexs.length;

    return new Promise((resolve, reject) => {
      this.pageIndexs.forEach((pageIndex) => {
        const url = util.format(URLTPL[this.site]['home'], pageIndex);
        
        jsdom.JSDOM.fromURL(url).then((dom) => {
          const document = dom.window.document;

          // 解析更新地址
          const videoUrls = this.parser.parseUpdate(document);
          this.urlsToFetch.push(...videoUrls);
          // 判断是否结束更新
          if (!--sumToGet) resolve();
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }

  /**
   * 完成单个视频信息的请求、解析、过滤与存储
   * @param {string} url 视频地址
   */
  crawl(url) {
    return new Promise((resolve, reject) => {
      jsdom.JSDOM.fromURL(url).then((dom) => {
        const document = dom.window.document;
        const videoItem = this.parser.parse(document);
        console.log(videoItem);
        resolve();
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  async start() {
    // 获取视频更新地址
    await this.getUpdate();

    const sumUrlsToFetch = this.urlsToFetch.length;
    for(let i = 0; i < sumUrlsToFetch; i++) {      
      this.crawl(this.urlsToFetch[i]);
    }
    
  }
}


const saffron = new Saffron(2);
saffron.start();

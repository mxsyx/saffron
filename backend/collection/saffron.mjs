/**
 * 主调度文件
 */

import util from 'util'
import jsdom from 'jsdom'
import { Parser } from './parser.mjs'
import { Filter } from './filter.mjs'
import { Storager } from './storager.mjs'
import { PAGEINDEX } from './config.mjs'

class Saffron {
  constructor(site) {
    this.site = site;
    this.parser = new Parser();
    this.filter = new Filter();
    this.storager = new Storager();
    this.urlsToFetch = [];
    this.sumCompleted = 0;
    this.pageIndexs = PAGEINDEX[site];
    this.selector = SELECTOR[site];
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
          // console.log(error);
        });
      });
    });
  }

  asyncParse() {
    return new Promise((resolve, reject) => {
      jsdom.JSDOM.fromURL(url).then((dom) => {
        const document = dom.window.document;
        const videoItem = this.parser.parse(document);
        this.filter.filte(videoItem);
        this.storager.pushVideoItem(videoItem);
        resolve();
      }).catch((error) => {
        // console.log(error);
      });
    });
  }

  async start() {
    // 获取视频更新地址
    await this.getUpdate();

    // 每隔一段时间存储数据
    const intervalFunction = this.storager.interval.bind(this.storager);
    const interval = setInterval(intervalFunction, 10000);
    

    const sumUrlsToFetch = this.urlsToFetch.length;
    for(let i = 0; i < sumUrlsToFetch; i++) {
      await this.asyncFetch(this.urlsToFetch[i]);

      console.log(i);
    }

    // 完成数据的最终存储
    clearInterval(interval);
    this.storager.clear();
  }
}


const saffron = new Saffron(1);
saffron.start();

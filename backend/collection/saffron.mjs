/**
 * 主调度文件
 */

import util from 'util'
import jsdom from 'jsdom'
import { Parser } from './parser.mjs'
import { Filter } from './filter.mjs'
import { Storager } from './storager.mjs'
import { URLTPL, PAGEINDEX } from './config.mjs'
import { sleep } from '../common/utils.mjs'

class Saffron {
  constructor(site) {
    this.site = site;
    this.parser = new Parser(site);
    this.filter = new Filter();
    this.storager = new Storager(this.downloader);
    this.pageIndexs = PAGEINDEX[site];
    this.urlsToFetch = [];
    this.sumTasks = 0;
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
          --sumToGet;
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
        
        // 过滤并存储数据
        this.filter.filte(videoItem);
        this.storager.pushVideoItem(videoItem);
        console.log(this.sumCompleted + 1);
        resolve();

        if (++this.sumCompleted == this.sumTasks) {
          this.endTask();
        }
      }).catch((error) => {
        ++this.sumCompleted;
        console.log(error);
      });
    });
  }

  // 完成数据的最终存储
  async endTask() {
    while (!this.storager.checkComplete1()) {
      console.log('等待1');
      await sleep(5);
    }
    while (!this.storager.checkComplete2()) {
      console.log('等待2');
      await sleep(5);
    }
    process.exit(0);
  }

  async start() {
    // 获取视频更新地址
    await this.getUpdate();

    // 每隔一段时间存储数据
    const intervalFunction = this.storager.interval.bind(this.storager);
    setInterval(intervalFunction, 5000);

    this.sumTasks = this.urlsToFetch.length;
    for(let i = 0; i < this.sumTasks; i++) {
      // 降低请求频率
      if (i % 10 == 0) await sleep(0.5);

      this.crawl(this.urlsToFetch[i]);
    }
  }
}

const saffron = new Saffron(1);
saffron.start();

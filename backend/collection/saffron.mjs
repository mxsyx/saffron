/**
 * 主调度文件
 */

import { Spider } from './spider.mjs'
import { Filter } from './filter.mjs'
import { Storager } from './storager.mjs'

class Saffron {
  constructor() {
    this.spider = new Spider(1);
    this.filter = new Filter();
    this.storager = new Storager();
    this.urlsToFetch = [];
    this.sumUrlsToFetch = 0;
    this.sumCompleted = 0;
  }

  /**
   * 异步获取网页并提取视频信息
   * 每次获取并完成信息的提取后向待存储条目数组压入新的条目
   */
  asyncFetch() {
    return new Promise((resolve, reject) => {
      this.urlsToFetch.forEach((url) => {
        this.spider.parse(url).then((videoItem) => {
          this.filter.filte(videoItem);
          console.log(this.sumCompleted);
          this.storager.pushVideoItem(videoItem);
          if (++this.sumCompleted == this.sumUrlsToFetch){
            resolve();
          }
        });
      });
    });
  }

  async start() {
    // 获取视频更新地址
    await this.spider.fetchUpdate(this.urlsToFetch);
    this.sumUrlsToFetch =  this.urlsToFetch.length;
    
    // 每隔一段时间存储数据
    const intervalFunction = this.storager.interval.bind(this.storager);
    const interval = setInterval(intervalFunction, 5000);
    
    console.log(`共${this.sumUrlsToFetch}条`);

    await this.asyncFetch();
    
    // 完成数据的最终存储
    clearInterval(interval);
    this.storager.clear();
  }
}


const saffron = new Saffron();
saffron.start();

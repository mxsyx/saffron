/**
 * 主调度文件
 */

import { Spider } from './spider.mjs'
import { Filter } from './filter.mjs'
import { Storager } from './storager.mjs'

class Saffron {
  constructor() {
    this.spider = new Spider();
    this.filter = new Filter();
    this.storager = new Storager();
    this.videoUrlArray = [];
    this.updateTimeArray = [];
  }

  async start() {
    await this.spider.fetchUpdate('okzyw', this.videoUrlArray, this.updateTimeArray);
    this.videoUrlArray.forEach((url) => {
      this.spider.parse(url).then((videoItem) => {
        this.filter.filte(videoItem);
        this.storager.storage(videoItem);
      });
    });
  }
}


const saffron = new Saffron();
saffron.start();

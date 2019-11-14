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
    this.urlsToFetch = [];
    this.itemsToStorage = [];
  }


  asyncFetch() {
    return new Promise(async (resolve, reject) => {
      await this.spider.fetchUpdate('okzyw', this.urlsToFetch);
      this.urlsToFetch.forEach((url, index) => {
        this.spider.parse(url).then((videoItem) => {
          this.filter.filte(videoItem);
          this.itemsToStorage.push(videoItem);
          if (this.itemsToStorage.length == this.urlsToFetch.length){
            resolve();
          }
        });
      });
    });
  }

  async syncStorage() {
    const len = this.itemsToStorage.length;
    for(let i = 0; i < len; i++) {
      await this.storager.storage(this.itemsToStorage[i]);
    }
  }

  async start() {
    await this.storager.init();
    await this.asyncFetch();
    this.syncStorage();
    //
  }



}


const saffron = new Saffron();
saffron.start();

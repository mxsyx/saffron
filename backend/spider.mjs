/**
 * 视频信息爬虫
 */

import util from 'util'
import jsdom from 'jsdom'
import { Requests } from './requests.mjs'
import { DOMAIN, URLTPL, SELECTOR, THRESHOLD } from './config.mjs'
import { XPath } from './xpath.mjs'
import { VideoItem } from './items.mjs'
import { getCurrentTime } from './utils.mjs'
import { Storager } from './storager.mjs'

class Spider {
  constructor() {
    this.print = console.log;
    this.requests =  new Requests();
    this.videoUrlArray = [];
    this.updateTimeArray = [];
    this.pages = [1];
    this.timeStamp = Date.now() - THRESHOLD;
    this.xpath = new XPath();
    this.storager = new Storager();
  }

  /**
   * 获取视频更新
   * @param site 
   */
  fetchUpdate(site) {
    let hasFetched = 0;
    return new Promise((resolve, reject) => {
      this.pages.forEach((element) => {
        const url = util.format(URLTPL[site]['home'], element);
        this.requests.get(url).then((content) => {
          const document = (new jsdom.JSDOM(content)).window.document;

          // 获取视频地址
          const videoUrls = this.xpath.selectAll(SELECTOR[site]['videoUrl'], document);
          videoUrls.forEach((element) => {
            this.videoUrlArray.push(`${DOMAIN[site]}${element}`)
          });
        
          // 获取视频更新时间
          const updateTimes = this.xpath.selectAll(SELECTOR[site]['updateTime'],document);
          updateTimes.forEach((element) => {
            this.updateTimeArray.push(element.replace('\n\t',''))
          });        
        
          // 根据更新时间过滤视频
          this.updateTimeArray.forEach((element,index) => {
            // 删除更新时间早于预定日期的视频地址
            if (Date.parse(element) < this.timeStamp) {
              this.videoUrlArray.pop(index);
            }
          });

          // 判断是否结束更新
          hasFetched++;
          if (hasFetched == this.pages.length) {
            resolve();
          }
        });
      });
    });
  }

  parse() {
    return new Promise((resolve, reject) => {
      this.videoUrlArray.forEach((url) => {
        this.requests.get(url).then((content) => {
          const document = (new jsdom.JSDOM(content)).window.document;
          const videoItem = this.extractInfo(document);
          this.storager.storage(videoItem);
        });
      });
    });
  }

  extractInfo(document, site='okzyw') {
    const videoItem = new VideoItem();
    videoItem.setName(this.extractName(site, document));
    videoItem.setSummary(this.extractSummary(site, document));
    videoItem.setImgaddr(this.extractImgaddr(site, document));
    videoItem.setDirector(this.extractDirector(site, document));
    videoItem.setActors(this.extractActors(site, document));
    videoItem.setType(this.extractType(site, document));
    videoItem.setYear(this.extractYear(site, document));
    videoItem.setArea(this.extractArea(site, document));
    videoItem.setLang(this.extractLang(site, document));
    videoItem.setUpdate(this.extractUpdate(site, document));
    return videoItem;
  }

  // 提取视频名字
  extractName(site, document) {
    const result = this.xpath.select(SELECTOR[site]['name'], document);
    return result;
  }

  // 提取视频摘要
  extractSummary(site, document) {
    const result = this.xpath.select(SELECTOR[site]['summary'], document);
    return result;
  }

  extractImgaddr(site, document) {
    return '/img/2019/11/11/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.jpg';
  }

  // 提取视频导演
  extractDirector(site, document) {
    const result = this.xpath.select(SELECTOR[site]['director'], document);
    return result;
  }

  // 提取视频演员
  extractActors(site, document) {
    const result = this.xpath.select(SELECTOR[site]['actors'], document);
    return result;
  }

  // 提取视频类型
  extractType(site, document) {
    const result = this.xpath.select(SELECTOR[site]['type'], document);
    return result;
  }

  // 提取视频年份
  extractYear(site, document) {
    const result = this.xpath.select(SELECTOR[site]['years'], document);
    return result;
  }

  // 提取视频地区
  extractArea(site, document) {
    const result = this.xpath.select(SELECTOR[site]['area'], document);
    return result;
  }

  // 提取视频语言
  extractLang(site, document) {
    const result = this.xpath.select(SELECTOR[site]['lang'], document);
    return result;
  }

  // 提取视频播放地址
  extractPlAddr(site, document) {
    const results = this.xpath.selectAll(SELECTOR[site]['plAddr'], document);
    const plAddr = [];
    results.forEach((element) => {
      const matchResult = element.match('(http|https)://.*');
      if (matchResult) {
        plAddr.push(matchResult[0]);
      }
    });
    return plAddr;
  }

  // 提取视频下载地址
  extractDlAddr(site, document) {
    const results = this.xpath.selectAll(SELECTOR[site]['dlAddr'], document);
    const dlAddr = [];
    results.forEach((element) => {
      const matchResult = element.match('(http|https)://.*');
      if (matchResult) {
        dlAddr.push(matchResult[0]);
      }
    });
    return dlAddr;
  }

  extractUpdate(site, document) {
    return getCurrentTime('datetime');
  }

  async start() {
    await this.fetchUpdate('okzyw');
    this.print(this.videoUrlArray);
    await this.parse();
  }
}

export { Spider }

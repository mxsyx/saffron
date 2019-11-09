/**
 * 视频信息爬虫
 */

import util from 'util'
import jsdom from 'jsdom'
import { Requests } from './requests.mjs'
import { DOMAIN, URLTPL, SELECTOR, THRESHOLD } from './config.mjs'
import { XPath } from './xpath.mjs'

class Spider {
  constructor() {
    this.print = console.log;
    this.requests =  new Requests();
    this.videoUrlArray = [];
    this.updateTimeArray = [];
    this.pages = [1,2,3,4,6,7,8,9,10];
    this.timeStamp = Date.now() - THRESHOLD;
    this.xpath = new XPath();
  }

  /**
   * 
   * @param site 
   */
  fetchUpdate(site) {
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
        this.parse();
      });
    });
  }

  parse() {
    this.print(this.videoUrlArray.length);
    this.videoUrlArray.forEach((url,index) => {
      this.requests.get(url).then((content) => {
        this.print(`当前是${index}`);
        const document = (new jsdom.JSDOM(content)).window.document;
        this.extractInfo(document);
      });
    });
  }

  extractInfo(document) {
    this.print(this.extractName('okzyw', document));
    this.print(this.extractSummary('okzyw',document));
    this.print(this.extractDirector('okzyw',document));
    this.print(this.extractActors('okzyw',document));
    this.print(this.extractType('okzyw',document));
    this.print(this.extractYears('okzyw',document));
    this.print(this.extractArea('okzyw',document));
    this.print(this.extractLang('okzyw',document));
    this.print(this.extractPlAddr('okzyw',document));
    this.print(this.extractDlAddr('okzyw',document));
    
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
  extractYears(site, document) {
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
      plAddr.push(element.match('(http|https)://.*')[0])
    });
    return plAddr;
  }

  // 提取视频下载地址
  extractDlAddr(site, document) {
    const results = this.xpath.selectAll(SELECTOR[site]['dlAddr'], document);
    const dlAddr = [];
    results.forEach((element) => {
      dlAddr.push(element.match('(http|https)://.*')[0])
    });
    return dlAddr;
  }

  start() {
    this.fetchUpdate('okzyw');
  }
}

const spider = new Spider();

spider.start();

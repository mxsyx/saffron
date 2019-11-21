/**
 * 视频信息爬虫
 */

import util from 'util'
import jsdom from 'jsdom'
import { XPath } from './xpath.mjs'
import { VideoItem } from './items.mjs'
import { DOMAIN, URLTPL, SELECTOR,  } from './config.mjs'
import { PAGEINDEX, THRESHOLD } from './config.mjs'
import { getCurrentTime } from '../common/utils.mjs'

class Spider {
  constructor(site) {
    this.site = site;
    this.xpath = new XPath();
    this.timeStamp = Date.now() - THRESHOLD;
    this.pageIndexs = PAGEINDEX[site];
    this.selector = SELECTOR[site];
  }

  /**
   * 获取视频的更新地址
   * 函数解析采集站的视频主页地址,
   * 将符合条件的地址填充到数组中去.
   * @param {Array} urlsToFetch 需要获取的URL数组
   */
  fetchUpdate(urlsToFetch) {
    let sumFetched = 0;
    const updateTimeArray = [];
    return new Promise((resolve, reject) => {
      this.pageIndexs.forEach((pageIndex) => {
        const url = util.format(URLTPL[this.site]['home'], pageIndex);
        jsdom.JSDOM.fromURL(url).then((dom) => {
          const document = dom.window.document;

          // 获取视频地址
          const videoUrls = this.xpath.selectAll(this.selector['videoUrl'], document);
          videoUrls.forEach((videoUrl) => {
            urlsToFetch.push(`${DOMAIN[this.site]}${videoUrl}`)
          });
        
          // 获取视频更新时间
          const updateTimes = this.xpath.selectAll(this.selector['updateTime'], document);
          updateTimes.forEach((updateTime) => {
            updateTimeArray.push(updateTime.trim());
          });
        
          // 根据更新时间过滤视频
          updateTimeArray.forEach((updateTime, index) => {
            // 删除更新时间早于预定日期的视频地址
            if (Date.parse(updateTime) < this.timeStamp) {
              updateTimeArray.pop(index);
              urlsToFetch.pop(index);
            }
          });

          // 判断是否结束更新
          sumFetched++;
          if (sumFetched == this.pageIndexs.length) {
            resolve();
          }
        });
      });
    });
  }

  /**
   * 请求与解析视频信息
   * @param {string} url 视频地址
   */
  parse(url) {
    return new Promise((resolve, reject) => {
      jsdom.JSDOM.fromURL(url).then((dom) => {
        const document = dom.window.document;
        const videoItem = this.extractInfo(document);
        resolve(videoItem);
      });
    });
  }

  extractInfo(document) {
    const videoItem = new VideoItem();

    // 提取视频信息
    videoItem.setSite(this.site);
    videoItem.setName(this.extractName(document));
    videoItem.setSummary(this.extractSummary(document));
    videoItem.setImgUrl(this.extractImgUrl(document));
    videoItem.setDirector(this.extractDirector(document));
    videoItem.setActors(this.extractActors(document));
    videoItem.setType(this.extractType(document));
    videoItem.setYear(this.extractYear(document));
    videoItem.setArea(this.extractArea(document));
    videoItem.setLang(this.extractLang(document));
    videoItem.setUpdate(getCurrentTime('datetime'));

    // 提取视频的播放与下载地址
    videoItem.setPlAddrs(this.extractPlAddr(document));
    videoItem.setDlAddrs(this.extractDlAddr(document));
    
    return videoItem;
  }

  // 提取视频名字
  extractName(document) {
    const result = this.xpath.select(this.selector['name'], document);
    return result;
  }

  // 提取视频摘要
  extractSummary(document) {
    const result = this.xpath.select(this.selector['summary'], document);
    return result;
  }

  // 提取视频图片地址
  extractImgUrl(document) {
    const result = this.xpath.select(this.selector['imgUrl'], document);
    return result;
  }

  // 提取视频导演
  extractDirector(document) {
    const result = this.xpath.select(this.selector['director'], document);
    return result;
  }

  // 提取视频演员
  extractActors(document) {
    const result = this.xpath.select(this.selector['actors'], document);
    return result;
  }

  // 提取视频类型
  extractType(document) {
    const result = this.xpath.select(this.selector['type'], document);
    return result;
  }

  // 提取视频年份
  extractYear(document) {
    const result = this.xpath.select(this.selector['year'], document);
    return result;
  }

  // 提取视频地区
  extractArea(document) {
    const result = this.xpath.select(this.selector['area'], document);
    return result;
  }

  // 提取视频语言
  extractLang(document) {
    const result = this.xpath.select(this.selector['lang'], document);
    return result;
  }

  // 提取视频播放地址
  extractPlAddr(document) {
    const results = this.xpath.selectAll(this.selector['plAddr'], document);
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
  extractDlAddr(document) {
    const results = this.xpath.selectAll(this.selector['dlAddr'], document);
    const dlAddr = [];
    results.forEach((element) => {
      const matchResult = element.match('(http|https)://.*');
      if (matchResult) {
        dlAddr.push(matchResult[0]);
      }
    });
    return dlAddr;
  }
}


export { Spider }

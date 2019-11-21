/**
 * 视频信息爬虫
 */

import util from 'util'
import jsdom from 'jsdom'
import { XPath } from './xpath.mjs'
import { VideoItem } from './items.mjs'
import { DOMAIN, URLTPL, SELECTOR } from './config.mjs'
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
        }).catch((error) => {
          // console.log(error);
        });
      });
    });
  }

 
}


export { Spider }

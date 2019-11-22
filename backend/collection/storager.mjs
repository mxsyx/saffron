/**
 * 数据存储器
 */

import fs from 'fs'
import md5 from 'md5'
import request from 'request'
import { Database } from '../common/database.mjs'
import { getCurrentTime, sleep } from '../common/utils.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {
    this.db = new Database();
    
    // 存储器锁
    this.mutex = false;

    // 待存储的视频信息条目数组
    this.videoItems = [];    
    
    this.makeImgDir();
  }

  // 将新的视频信息压入待存储的信息条目数组中
  pushVideoItem(videoItem) {
    this.videoItems.push(videoItem);
  }

  /**
   * 创建图片的本机存储目录
   * 目录名为当天的日期(年/月/日)
   */
  makeImgDir() {
    this.currenDate = `${getCurrentTime('date')}`;
    this.localImgDir = `/opt/img/${this.currenDate}`;
    
    // 递归创建图片本机存储目录
    fs.mkdirSync(this.localImgDir, {recursive: true})
  }

  /**
   * 生成图片的远程地址与本地地址
   * @param {object} videoItem 视频信息条目
   * @returns 图片的远程地址与本地地址
   */
  makeImgAddr(videoItem) {
    // 图片名(视频名字的MD5摘要)
    const imgName = md5(videoItem.getName());
    return {
      'remoteAddr': `/img/${this.currenDate}/${imgName}.png`,
      'localAddr' : `${this.localImgDir}/${imgName}.png`
    }
  }

  /**
   * 间隔时间存储数据
   * 函数每隔一段时间检索一遍待存储的信息条目数组,
   * 如果数组不为空, 则将数组中的数据存储到数据库中,
   * 同时从数组删除这些数据.
   * 为防止在间隔时间内数据未完成存储, 
   * 每次执行函数时给存储器上锁, 数据执行完毕后将锁解开.
   */
  async interval() {
    // 存储器被锁住，终止执行
    if (this.mutex) return ;
    
    // 给存储器上锁
    this.mutex = true;
    
    const len = this.videoItems.length;
    
    // 同步存储数据
    for(let i = 0; i < len; i++) {
      await this.storage(this.videoItems[i]);
    }
    
    // 删除已完成存储的数据
    for(let i = 0; i < len; i++) {
      this.videoItems.pop(i);
    }

    // 该存储器解锁
    this.mutex = false;
  }

  // 清理未完成的存储
  async clear() {
    while(this.mutex) {
      await sleep(5);
    }
    this.interval();
  }

  /**
   * 存储视频信息
   * @param {object} videoItem 视频信息条目
   */
  storage(videoItem) {
    return new Promise((resolve, reject) => {
      // 检测该条目是否是可存储的
      if (videoItem.getDrop()) return resolve();
      
      // 该信息条目需要插入的表
      const infoTableName = videoItem.getInfoTableName();

      const updateTime = videoItem.getUpdate();
      const imgAddr = this.makeImgAddr(videoItem);
      const params = [
        infoTableName,
        videoItem.getName(),
        videoItem.getSummary(),
        imgAddr['remoteAddr'],
        videoItem.getDirector(), 
        videoItem.getActors(),
        videoItem.getType(),
        videoItem.getYear(),
        videoItem.getArea(),
        videoItem.getLang(),
        updateTime,
        updateTime,
      ];

      // 首先重置自增索引
      this.db.excute(STATEMENTS['resetAutoInc'], [infoTableName]).then((result) => {
        this.db.excute(STATEMENTS['addInfo'], params).then((result) => {
          const vid = result.insertId;

          // 存储视频的播放与下载地址
          if (vid) {
            this.storagePlAddr(videoItem, vid);
            this.storageDlAddr(videoItem, vid);
          }
          
          /**
           * 当返回的插入结果显示只影响了一行时,
           * 则说明该视频为一个新的视频, 应该下载其图片
           */
          if (result.affectedRows == 1) {
            this.storageImg(videoItem.getImgUrl(), imgAddr['localAddr'],)
          }
          resolve();
        });
      });
    });
  }

  /**
   * 异步存储视频播放地址
   * @param {object} videoItem 视频信息条目
   * @param {number} vid 视频ID
   */
  storagePlAddr(videoItem, vid) {
    const pladdrs = videoItem.getPlAddrs();
    const pladdrTableName = videoItem.getPlAddrTableName();
    const addrName = videoItem.getAddrName();
    pladdrs.forEach((pladdr, index) => {
      const params = [
        pladdrTableName, 
        addrName, vid, index + 1,
        pladdr, addrName, pladdr,
      ];
      this.db.excute(STATEMENTS['addPlAddr'], params);
    });
  }

  /**
   * 异步存储视频下载地址
   * @param {object} videoItem 视频信息条目
   * @param {number} vid 视频ID
   */
  storageDlAddr(videoItem, vid) {
    const dladdrs = videoItem.getDlAddrs();
    const dladdrTableName = videoItem.getDlAddrTableName();
    dladdrs.forEach((dladdr, index) => {
      const params = [
        dladdrTableName, 
        vid, index + 1, dladdr,
      ];
      this.db.excute(STATEMENTS['addDlAddr'], params);
    });
  }

  /**
   * 存储图片到本机
   * @param {string} imgUrl  图片远程URL
   * @param {string} imgAddr 图片本机地址
   */
  storageImg(imgUrl, imgAddr) {
    try {
      request(imgUrl).pipe(fs.createWriteStream(imgAddr));
    } catch (error) {
      console.log(error);
    }
  }
}


export { Storager }

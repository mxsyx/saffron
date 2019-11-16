/**
 * 数据存储器
 */

import fs from 'fs'
import md5 from 'md5'
import request from 'request'
import { Database } from '../common/database.mjs'
import { getCurrentTime } from '../common/utils.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {
    this.db = new Database();
    this.mutex = false;
    this.videoItems = [];
    this.makeImgDir();
  }

  // 图片存储目录
  makeImgDir() {
    this.currenDate = `${getCurrentTime('date')}`;
    this.localImgDir = `/opt/img/${this.currenDate}`;
    fs.mkdirSync(this.localImgDir, {recursive: true})
  }

  makeImgAddr(videoItem) {
    const imgName = md5(videoItem.getName());
    return {
      'remoteAddr': `/img/${this.imgDirName}/${imgName}.png`,
      'localAddr' : `${this.localImgDir}/${imgName}.png`
    }
  }

  pushVideoItem(videoItem) {
    this.videoItems.push(videoItem);
  }

  async interval() {
    if (this.mutex) return ;
    this.mutex = true;
    const len = this.videoItems.length;
    for(let i = 0; i < len; i++) {
      await this.storage(this.videoItems[i]);
    }
    for(let i = 0; i < len; i++) {
      this.videoItems.pop(i);
    }
    this.mutex = false;
  }

  // 完成最后的存储
  clear() {
    this.mutex = false;
    this.interval();
  }

  /**
   * 存储视频信息
   * @param {object} videoItem 视频信息条目
   */
  storage(videoItem) {
    return new Promise((resolve, reject) => {
      // 检测该条目是否是可存储的
      if (videoItem.getDrop()) {
        resolve();
        return ;
      }
      
      // 该信息条目需要插入的表
      const infoTableName = videoItem.getInfoTableName();

      // 封装Sql参数
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
          const vid = result.insertId
          if (vid) {
            this.storagePladdr(videoItem, vid);
            this.storageDladdr(videoItem, vid);
          }
          if (result.affectedRows == 1) {
            this.storageImg(videoItem.getImgUrl(), imgAddr['localAddr'],)
          }
          resolve();
        });
      });
    });
  }

  storagePladdr(videoItem, vid) {
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

  storageDladdr(videoItem, vid) {
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
   * @param {string} imgAddr 图片本地地址
   */
  storageImg(imgUrl, imgAddr) {
    console.log(imgAddr);
    request(imgUrl).pipe(fs.createWriteStream(imgAddr));
  }
}

export { Storager }

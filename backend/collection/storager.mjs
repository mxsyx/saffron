/**
 * 数据存储器
 */
import db from '../common/database.mjs'
import Aria2c from './aria2c.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {    
    // 存储器锁
    this.mutex = false;

    // 待存储的视频信息条目
    this.videoItems = [];
    this.sumVideoItems = 0;
    this.sumStoraged = 0;

    this.aria2c = new Aria2c();
  }

  // 将新的视频信息压入待存储的信息条目数组中
  pushVideoItem(videoItem) {
    this.videoItems.push(videoItem);
    ++this.sumVideoItems;
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
    
    const videoItems = this.videoItems.slice(0);
    this.videoItems.splice(0,this.videoItems.length);
    
    const len = videoItems.length;
    // 同步存储数据
    for(let i = 0; i < len; i++) {
      await this.storage(videoItems[i]);
    }

    // 该存储器解锁
    this.mutex = false;
  }

  // 检测是否存储完成
  checkComplete() {
    console.log(`共${this.sumVideoItems}`);
    console.log(`已完成${this.sumStoraged}`);
    return this.sumVideoItems == this.sumStoraged;
  }

  /**
   * 存储视频信息
   * @param {object} videoItem 视频信息条目
   */
  storage(videoItem) {
    return new Promise( async (resolve, reject) => {
      if (videoItem.getDrop()) {
        ++this.sumStoraged;
        return resolve();
      }

      const result = await this.storageInfo(videoItem);
      
      /**
       * 当返回的插入结果显示只影响了一行时,
       * 则说明该视频为一个新的视频, 应该下载其图片
      */
      if (result.affectedRows == 1) {
        this.storageImg(videoItem);
      }

      // 存储视频播放与下载地址
      const vid = result.insertId;
      if (vid) {
        await this.storagePlAddr(videoItem, vid);
        await this.storageDlAddr(videoItem, vid);
      }

      ++this.sumStoraged;
      resolve();
    });
  }

  // 存储视频信息
  storageInfo(videoItem) {
    // 输出日志
    console.log(videoItem);
    const tatalName = `tatal${videoItem.getSite()}`;

    return new Promise((resolve, reject) => {
      const params = [
        tatalName,
        videoItem.getName(),
        videoItem.getBigType(),
        videoItem.getSummary(),
        videoItem.getImgAddr(),
        videoItem.getDirector(), 
        videoItem.getActors(),
        videoItem.getType(),
        videoItem.getYear(),
        videoItem.getArea(),
        videoItem.getLang(),
        videoItem.getUpdate(),
        videoItem.getTatal(),
        videoItem.getUpdate(),
        tatalName,
        videoItem.getTatal(),
      ];

      // 首先重置自增索引
      db.excute(STATEMENTS['resetAutoInc']).then((result) => {
        db.excute(STATEMENTS['addInfo'], params).then((result) => {
          resolve(result)
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
    return new Promise( async (resolve, reject) => {
      const pladdrs = videoItem.getPlAddrs();
      const addrName = `addr${videoItem.getSite()}`;
      const len = pladdrs.length;
      for (let i = 0; i < len; i++) {
        const params = [
          addrName, 
          vid, i + 1, pladdrs[i],
          addrName, pladdrs[i],
        ];
        await db.excute(STATEMENTS['addPlAddr'], params);
      }
      resolve();
    });
  }

  /**
   * 异步存储视频下载地址
   * @param {object} videoItem 视频信息条目
   * @param {number} vid 视频ID
   */
  storageDlAddr(videoItem, vid) {
    return new Promise( async (resolve, reject) => {
      const dladdrs = videoItem.getDlAddrs();
      const len = dladdrs.length;
      for (let i = 0; i < len; i++) {
        const params = [
          vid, i + 1, dladdrs[i],
        ];
        await db.excute(STATEMENTS['addDlAddr'], params);
      }
      resolve();
    });
  }
  
  // 存储视频的图片
  storageImg(videoItem) {
    const imgUrl = videoItem.getImgUrl();
    const arr = videoItem.getImgAddr().split('/');
    const imgDir = `/opt${arr.slice(0,3).join('/')}`;
    const imgName = arr[3];
    this.aria2c.addTask(imgUrl, imgDir, imgName);
  }
}


export default Storager

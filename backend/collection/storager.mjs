/**
 * 数据存储器
 */

import { Database } from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {
    this.db = new Database();
  }

 /* checkInsert(result) {
    console.log(result);
    if (result.insertId) {
      ++this.maxIdMv;
    }
  }*/

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
      const tableName = videoItem.getTable();

      // 封装Sql参数
      const updateTime = videoItem.getUpdate();
      const params = [
        tableName,
        videoItem.getName(),
        videoItem.getSummary(),
        videoItem.getImgaddr(),
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
      this.db.excute(STATEMENTS['resetAutoInc'], [tableName]).then((result) => {
        this.db.excute(STATEMENTS['addInfo'], params).then((result) => {
          console.log(result);
          resolve();
        })
      });
    });
  }
}

export { Storager }

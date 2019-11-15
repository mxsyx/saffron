/**
 * 数据存储器
 */

import { Database } from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {
    this.db = new Database();
  }

  checkInsert(result) {
    console.log(result);
    if (result.insertId) {
      ++this.maxIdMv;
    }
  }

  /**
   * 
   * @param {object} item 
   */
  storage(item) {
    return new Promise((resolve, reject) => {
      // 检测该条目是否是可存储的
      if (item.getDrop()) {
        resolve();
        return ;
      }

      const params = [
        item.getName(),
        item.getSummary(),
        item.getImgaddr(),
        item.getDirector(), 
        item.getActors(),
        item.getType(),
        item.getYear(),
        item.getArea(),
        item.getLang(),
        item.getUpdate(),
        item.getUpdate(),
      ];

      // 首先重置自增索引
      this.db.excute(STATEMENTS['resetAutoInc'], ['infomv']).then((result) => {
        this.db.excute(STATEMENTS['addInfoMv'], params).then((result) => {
          //this.checkInsert(result);
          console.log(item);
          console.log(result);
          resolve();
        })
      });


    });
  }
}

export { Storager }

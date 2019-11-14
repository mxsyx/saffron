/**
 * 数据存储器
 */

import { Database } from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {
    this.db = new Database();
    this.maxIdMv = null;
    this.maxIdTv = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.getMaxId('infomv').then((maxIdMv) => {
        this.maxIdMv = maxIdMv + 1;
      });
      this.getMaxId('infotv').then((maxIdTv) => {
        this.maxIdTv = maxIdTv + 1;
      });
      resolve();
    });
  }

  /**
   * 获取当表中的最大ID
   * @param {string} tableName 数据表名
   */
  getMaxId(tableName) {
    return new Promise((resolve, reject) => {
      this.db.excute(STATEMENTS['getMaxId'],[tableName]).then((results)=>{
        resolve(results[0].maxId);
      });
    });
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
      console.log(this.maxIdMv);
      const params = [
        this.maxIdMv,
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
      ];
      this.db.excute(STATEMENTS['addInfoMv'], params).then((result)=>{
        this.checkInsert(result);
        
        resolve();
      })
    });
  }
}

export { Storager }

/**
 * 数据存储器
 */

import { Database } from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'

class Storager {
  constructor() {
    this.db = new Database();
  }

  /**
   * 
   * @param {object} item 
   */
  storage(item) {
    // 检测该条目是否是可存储的
    if (item.getDrop()) return ;
    
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
    ];
    this.db.excute(STATEMENTS['addMovie'], params).then(()=>{
      console.log(params);
    })
  }
}

export { Storager }

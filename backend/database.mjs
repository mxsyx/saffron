/**
 * 数据库模型
 */

import mysql from 'mysql/index.js'
import { DBHOST, DBPORT, DBUSER, DBPASSWORD, DBNAME } from './config.mjs'

class Database {
  constructor() {
    this.dbPool = mysql.createPool({
      host      : DBHOST,
      port      : DBPORT,
      user      : DBUSER,
      password  : DBPASSWORD,
      database  : DBNAME
    });
  }

  /**
   * 执行数据库操作
   * @param {string} statement 操作语句
   * @param {string} params    操作参数
   */
  excute(statement, params) {
    return new Promise((resolve, reject) => {
      this.dbPool.getConnection((error, connection) => {
        if(error) {
          reject(error)
        } else {
          connection.query(statement, params, (error, results) => {
            if(error) {
              reject(error)
            } else {
              resolve(results)
            }
            connection.release()
          })
        }
      })
    })
  }

  /**
   * 将查询结果解析二维数组
   * @param {Array} results 查询结果
   * @returns 一个包含查询结果的二维数组
   */
  fetchArray(results) {
    const array = [];
    results.forEach(element => {
      array.push(Object.values(element));
    });
    return array;
  }
}


export { Database };

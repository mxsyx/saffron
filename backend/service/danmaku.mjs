/**
 * 弹幕API
 */

import db from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'

class Danmaku {
  constructor() {

    this.server.on('request', (req, res) => {
      this.setHeader(res);

      if(req.method == 'OPTIONS') {
        this.completed(res);
      } else if (req.method == 'GET') {
        this.getDanmaku(res, getUrlParams(req));
      } else if (req.method == 'POST') {
        let reqBody = '';
        req.on("data", (data) => {
          reqBody = reqBody + data;
        });
        req.on('end', () => {
          this.addDanmaku(reqBody, getClientIp(req), res);
        });
      }
    });
 
  }
  
  /**
   * 获取弹幕数据
   * 向客户端返回刚获取的数据
   * @param {object} urlParams URL查询参数
   */
  getDanmaku(res, urlParams) {
    const danmakuId = parseInt(urlParams.id || 0);
    const maxium = parseInt(urlParams.max || 1000);

    db.excute(STATEMENTS['getDanmaku'], [danmakuId, maxium])
      .then((results) => {
        const resContent = {code:0, data:db.fetchArray(results)};
        res.write(JSON.stringify(resContent));
        this.completed(res);
      })
      .catch((error) => {
        // ...
      });
  }
  
  /**
   * 插入弹幕数据
   * @param {string} reqBody    请求体
   * @param {string} remoteAddr 客户端Ip地址
   */
  addDanmaku(reqBody, remoteAddr, res) {
    const danmakuData = JSON.parse(reqBody);
    const currentTime = getCurrentTime('datetime')
    const params = [
      danmakuData.id,
      danmakuData.author,
      danmakuData.text,
      danmakuData.color,
      danmakuData.type,
      danmakuData.time,
      currentTime,
      remoteAddr,
    ];

    db.excute(STATEMENTS['addDanmaku'], params)
      .then(() => {
        const resContent = {code:0};
        res.write(JSON.stringify(resContent));
        this.completed(res);
      })
      .catch((error) => {
        // ...
      });
  }

  // 结束数据传输
  completed(res) {
    res.end();
  }
}

const danmaku = new Danmaku();

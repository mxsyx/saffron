/**
 * 处理弹幕数据
 */
import db from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'
import { getCurrentTime } from '../common/utils.mjs'

/**
 * 根据获取弹幕数据
 * 并向客户端返回刚获取的数据
*/
function getDanmaku(req, res) {
  // 弹幕ID
  const id = parseInt(req.query.id || 0);

  // 单次最大请求的弹幕数量
  const maxium = parseInt(req.query.max || 1000);

  db.excute(STATEMENTS['danmaku']['get'], [id, maxium])
    .then(data => {
      res.json({ code: 0, data: db.fetchArray(data) });
    })
    .catch(err => {
      res.json({ code: 1, data: null });
    });
}

/**
 * 插入弹幕数据
*/
function addDanmaku(req, res) {
  const currentTime = getCurrentTime('datetime')
  const params = [
    req.body.id,
    req.body.author,
    req.body.text,
    req.body.color,
    req.body.type,
    req.body.time,
    currentTime,
    req.ip
  ];

  db.excute(STATEMENTS['danmaku']['add'], params)
    .then(data => {
      if (data.affectedRows === 1) {
        res.json({ code: 0 });
      } else {
        throw new Error();
      }
    })
    .catch(err => {
      res.json({ code: 1 });
    });
}


export { getDanmaku, addDanmaku }

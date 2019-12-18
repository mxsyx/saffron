/**
 * 视频信息处理函数
 */

import db from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'


/**
 * 获取最新视频
 */
function getLatest(req, res) {
  db.excute(STATEMENTS['getLatest'])
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      console.log(err);
    })
}

/**
 * 随机获取视频
 */
function getRandom(req, res) {
  db.excute(STATEMENTS['getRandom'])
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      console.log(err);
    })
}

/**
 * 获取视频信息
 */
function getInfo(req, res) {
  const resData = {info: null};
  db.excute(STATEMENTS['getInfo'], req.params.vid)
    .then(data => {
      resData.info = data[0];
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.send(JSON.stringify(resData));
    });
}

/**
 * 获取视频播放地址
 */
function getPlAddr(req, res) {
  const addr = `addr${req.params.addr}`;
  db.excute(STATEMENTS['getPlAddr'], [addr,req.params.vid,req.params.episode])
    .then(data => {
      if (data.length) {
        res.send(JSON.stringify(data[0]));
      } else {
        res.send(JSON.stringify({error: true}));
      }
    })
    .catch(err => {
      console.log(err);
    })
}

/**
 * 获取视频下载地址
 */
function getDlAddr(req, res) {
  db.excute(STATEMENTS['getDlAddr'], [req.params.vid,req.params.episode])
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      console.log(err);
    })
}


export { getInfo, getPlAddr, getDlAddr, getLatest, getRandom }

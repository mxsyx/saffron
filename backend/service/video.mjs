/**
 * 视频信息处理函数
 */
import db from '../common/database.mjs'
import { STATEMENTS } from './config.mjs'


/**
 * 获取主页数据
 */
function fetchMainPageData(req, res) {
  const resData = {latestVideo: null, randomVideo: null,};
  const statement = 
      `${STATEMENTS['main']['latest']}` +
      `${STATEMENTS['main']['random']}`;

  db.excute(statement)
    .then(data => {
      resData.latestVideo = data[0];
      resData.randomVideo = data[1];
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.send(JSON.stringify(resData));
    })               
}


/**
 * 随机获取视频
 */
function fetchRandom(req, res) {
  const resData = {randomVideo: null};
  db.excute(STATEMENTS['main']['random'])
    .then(data => {
      resData.randomVideo = data;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      res.send(JSON.stringify(resData));
    })
}

/**
 * 获取信息页数据
 */
function fetchInfoPageData(req, res) {
  const resData = {videoInfo: null};
  db.excute(STATEMENTS['info']['info'], req.params.vid)
    .then(data => {
      resData.videoInfo = data[0];
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.send(JSON.stringify(resData));
    });
}

/**
 * 获取播放页数据
 */
function fetchPlayPageData(req, res) {
  const resData = {info: null, plAddr: null};
  const statement = `${STATEMENTS['play']['info']}` +
                    `${STATEMENTS['play']['plAddr']}`;
  const values = [
    req.params.vid,
    `addr${req.params.addr}`,
    req.params.vid,
    req.params.episode
  ];

  db.excute(statement, values)
    .then(data => {
      resData.info = data[0][0];
      resData.plAddr = data[1][0];
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.send(JSON.stringify(resData));
    })
}

/**
 * 获取视频下载地址
 */
function fetchDlAddr(req, res) {
  const resData = {dlAddrs: null};
  db.excute(STATEMENTS['info']['dlAddr'], req.params.vid)
    .then(data => {
      resData.dlAddrs = data;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      res.send(JSON.stringify(resData));
    })
}


export { 
  fetchMainPageData, 
  fetchInfoPageData, 
  fetchPlayPageData,
  fetchRandom,
  fetchDlAddr,
}

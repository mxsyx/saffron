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
      res.json(resData)
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
      res.json(resData)
    })
}

/**
 * 获取信息页数据
 */
function fetchInfoPageData(req, res) {
  const resData = { 
    videoInfo: null, 
    randomVideo: null,
  };
  const statement = 
      `${STATEMENTS['info']['info']}` +
      `${STATEMENTS['main']['random']}`;

  db.excute(statement, req.params.vid)
    .then(data => {
      resData.videoInfo = data[0][0];
      resData.randomVideo = data[1];
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.json(resData)
    });
}

/**
 * 获取播放页数据
 */
function fetchPlayPageData(req, res) {
  const resData = {videoInfo: null, plAddr: null};
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
      resData.videoInfo = data[0][0];
      resData.plAddr = data[1][0];
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.json(resData)
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
      res.json(resData)
    })
}


// 搜索类型
const searchTypes = ['byname', 'bydirector', 'byactor'];

/**
 * 根据条件查找视频
 */
function findBy(req, res) {
  const resData = {result: null, end: true};    

  const searchType = searchTypes.indexOf(req.body.type);
  
  // 选择数据库操作语句
  if (searchType === 0) {
    var statement = STATEMENTS['find']['byname'];
  } else if (searchType === 1) {
    var statement = STATEMENTS['find']['bydirector'];
  } else if (searchType === 2) {
    var statement = STATEMENTS['find']['byactor'];
  } else {  // 搜索类型不存在直接返回
    res.json(resData);
    return ;
  }

  db.excute(statement, [req.body.content, (req.body.page) * 24, 24])
    .then(data => {
      resData.result = data;
      resData.end = data.length < 24 ? true : false;
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.json(resData);
    })
}

/**
 * 按条件分类查询
 */
function classify(req, res) {
  const resData = {result: null, end: true};

  const values = [
    `%${req.body.type.replace('全部', '')}%`,
    `%${req.body.year.replace('全部', '')}%`,
    `%${req.body.area.replace('全部', '')}%`,
    (req.body.page) * 24,
    24
  ];

  db.excute(STATEMENTS['nava']['nava'], values)
    .then(data => {
       resData.result = data;
       resData.end = data.length < 24 ? true : false;
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      res.json(resData)
    }) 
}

// 处理点赞
function handleLove(req, res) {
  const resData = {code: 1};
  db.excute(STATEMENTS['util']['love'], req.body.vid)
  .then(data => {
    if (data.affectedRows === 1) {
      resData.code = 0;
    }
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    res.json(resData)
  }) 
}

// 吐槽点赞
function handleHate(req, res) {
  const resData = {code: 1};
  db.excute(STATEMENTS['util']['hate'], req.body.vid)
  .then(data => {
    if (data.affectedRows === 1) {
      resData.code = 0;
    }
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    res.json(resData)
  }) 
}

export { 
  fetchMainPageData, 
  fetchInfoPageData, 
  fetchPlayPageData,
  fetchRandom,
  fetchDlAddr,
  findBy,
  classify,
  handleLove,
  handleHate,
}

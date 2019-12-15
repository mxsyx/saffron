// 数据库操作语句
const STATEMENTS = {
  'getInfo'   : "SELECT * FROM `info` WHERE `id`=?",
  'getPlAddr' : "SELECT ?? FROM `pladdr` WHERE `vid`=? AND `episode`=?",
  'getDlAddr' : "SELECT `addr` FROM  `dladdr` WHERE `vid`=? AND `episode`=?",
  'getLatest' : "(SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE `bigtype`='mv' ORDER BY `update` DESC LIMIT 12) UNION (SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE `bigtype`='tv' ORDER BY `update` DESC LIMIT 12)",
  'getRandom' : "SELECT `id`,`name`,'imgaddr',`actors` FROM `info` AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `info`)-(SELECT MIN(id) FROM `info`))+(SELECT MIN(id) FROM `info`)) AS _id) AS t2 WHERE t1.id > t2._id LIMIT 12",
  'getDanmaku': "SELECT `time`,`type`,`color`,`author`,`text` FROM danmaku WHERE `id`=? LIMIT ?",
  'addDanmaku': "INSERT INTO `danmaku` (`id`,`author`,`text`,`color`,`type`,`time`,`date`,`addr`) values (?,?,?,?,?,?,?,?)",
}

// 弹幕API地址
const ADDR_DANMAKU = '172.17.5.144'

// 弹幕API端口
const PORT_DANMAKU = 1722


export { 
  STATEMENTS,
  ADDR_DANMAKU, PORT_DANMAKU,
}

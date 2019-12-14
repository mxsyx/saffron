// 数据库操作语句
const STATEMENTS = {
  'getDanmaku': 'SELECT `time`,`type`,`color`,`author`,`text` FROM danmaku WHERE `id`=? LIMIT ?',
  'addDanmaku': 'INSERT INTO `danmaku` (`id`,`author`,`text`,`color`,`type`,`time`,`date`,`addr`) values (?,?,?,?,?,?,?,?)',
  'getInfo': 'SELECT * FROM `info` WHERE `id`=?',
  'getPlAddr': 'SELECT ?? FROM `pladdr` WHERE `vid`=? AND `episode`=?',
  'getDlAddr': 'SELECT `addr` FROM  `dladdr` WHERE `vid`=? AND `episode`=?',
}



// 弹幕API地址
const ADDR_DANMAKU = '172.17.5.144'

// 弹幕API端口
const PORT_DANMAKU = 1722


export { 
  STATEMENTS,
  ADDR_DANMAKU, PORT_DANMAKU,
}

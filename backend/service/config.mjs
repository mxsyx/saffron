// 弹幕API地址
const ADDR_DANMAKU = '172.17.5.144'

// 弹幕API端口
const PORT_DANMAKU = 1722

// 数据库操作语句
const STATEMENTS = {
  'getDanmaku': 'SELECT `time`,`type`,`color`,`author`,`text` FROM danmaku WHERE `id`=? LIMIT ?',
  'addDanmaku': 'INSERT INTO `danmaku` (`id`,`author`,`text`,`color`,`type`,`time`,`date`,`addr`) values (?,?,?,?,?,?,?,?)'
}

export { 
  ADDR_DANMAKU, PORT_DANMAKU,
  STATEMENTS
}

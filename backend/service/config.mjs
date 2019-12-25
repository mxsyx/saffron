// 数据库操作语句
const STATEMENTS = {
  'main': {
    'latest': "(SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE `bigtype`='mv' ORDER BY `id` DESC LIMIT 12) UNION (SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE `bigtype`='tv' ORDER BY `id` DESC LIMIT 12);",
    'random': "SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `info`)-(SELECT MIN(id) FROM `info`))+(SELECT MIN(id) FROM `info`)) AS _id) AS t2 WHERE t1.id > t2._id LIMIT 12;",
  },
  'info': {
    'info'  : "SELECT * FROM `info` WHERE `id`=?;",
    'dlAddr': "SELECT `addr` FROM  `dladdr` WHERE `vid`=?;",
  },
  'play': {
    'info'   : 'SELECT `id`,`name`,`bigtype`,`tatal1`,`tatal2`,`tatal3`,`tatal4`,`tatal5`,`tatal6` FROM `info` WHERE `id`=?;',
    'plAddr' : 'SELECT ?? FROM `pladdr` WHERE `vid`=? AND `episode`=?;'
  },
  'danmaku': {
    'add': "INSERT INTO `danmaku` (`id`,`author`,`text`,`color`,`type`,`time`,`date`,`addr`) values (?,?,?,?,?,?,?,?);",
    'get': "SELECT `time`,`type`,`color`,`author`,`text` FROM danmaku WHERE `id`=? LIMIT ?;",
  },
  'find': {
    'byname': "SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE LOCATE(?, `name`) > 0 LIMIT ?,?;",
    'bydirector': "SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE LOCATE(?, `director`) > 0 LIMIT ?,?;",
    'byactor': "SELECT `id`,`name`,`imgaddr`,`actors` FROM `info` WHERE LOCATE(?, `actors`) > 0 LIMIT ?,?;",
  }
}


export { STATEMENTS }

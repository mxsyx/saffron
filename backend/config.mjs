// 数据库地址
const DBHOST = '127.0.0.1';

// 数据库端口
const DBPORT = '3308'

// 数据库用户名
const DBUSER = 'root';

// 数据库用户密码
const DBPASSWORD = '201920';

// 数据库名
const DBNAME = 'saffron';

// 弹幕API地址
const ADDR_DANMAKU = '172.17.5.144'

// 弹幕API端口
const PORT_DANMAKU = 1722

// 数据库操作
const STATEMENTS = {
  'getDanmaku': 'SELECT `time`,`type`,`color`,`author`,`text` FROM danmaku WHERE `id`=? LIMIT ?',
  'addDanmaku': 'INSERT INTO `danmaku` (`id`,`author`,`text`,`color`,`type`,`time`,`date`,`addr`) values (?,?,?,?,?,?,?,?)',
  'addMovie': 'INSERT INTO `movie` (`name`,`summary`,`imgaddr`,`director`,`actors`,`type`,`year`,`area`,`lang`,`update`) values (?,?,?,?,?,?,?,?,?,?)',
}


/**
 * OK资源网 [okzyw](http://www.okzyw.com)
 * 
 */

const DOMAIN = {
  'okzyw': 'http://www.okzyw.com'
}

// URL 地址模板
const URLTPL = {
  'okzyw': {
    'home': 'http://www.okzyw.com/?m=vod-index-pg-%s.html',
    'info': 'http://www.okzyw.com/?m=vod-detail-id-%s.html'
  }
}

// XPath 选择器
const SELECTOR = {
  'okzyw': {
    'videoUrl'  : '/html[1]/body[1]/div[5]/ul/li[1]/span[2]/a[1]/@href',
    'updateTime': '/html[1]/body[1]/div[5]/ul/li[1]/span[4]',
    'name'     : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[1]/h2[1]',
    'summary'  : '/html[1]/body[1]/div[5]/div[3]/div[2]',
    'director' : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]/ul[1]/li[2]/span[1]',
    'actors'   : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]/ul[1]/li[3]/span[1]',
    'type'     : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]/ul[1]/li[4]/span[1]/text()',
    'years'    : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]/ul[1]/li[7]/span[1]',
    'area'     : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]/ul[1]/li[5]/span[1]',
    'lang'     : '/html[1]/body[1]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]/ul[1]/li[6]/span[1]',  
    'plAddr'   : '/html[1]/body[1]/div[5]/div[4]/font[1]/div[1]/div[1]/div[2]/ul[1]/li',
    'dlAddr'   : '/html[1]/body[1]/div[5]/font[1]/div[1]/div[2]/div[1]/div[1]/ul[1]/li'
  }
}

// 已注册站点
const SITES = ['okzyw'];

// 每次更新的间隔
const THRESHOLD = 432000000;

export { 
  DBHOST, DBPORT, DBUSER, DBPASSWORD, DBNAME, 
  DOMAIN, URLTPL, SELECTOR, SITES, THRESHOLD,
  ADDR_DANMAKU, PORT_DANMAKU,
  STATEMENTS
};

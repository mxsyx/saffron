/**
 * 资源站点
 * 1号线 OK资源网 [okzyw](http://www.okzyw.com)
 * 2号线 
 */

// 已注册站点
const SITES = ['okzyw'];

// 站点域名
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

// 每次更新的间隔
const THRESHOLD = 432000000;

// 已注册的电影类型
const MVTYPES = [
  '动作片', '喜剧片', '爱情片', '科幻片', '恐怖片', 
  '剧情片', '战争片', '动画片', '微电影', '伦理片'
];

// 已注册的电视剧类型
const TVTYPES = [
  '国产剧', '港台剧', '日韩剧', '欧美剧', '台湾剧', '日本剧', '海外剧'
];

// 已注册的视频年份
const YEARS = [
  '2019', '2018', '2017', '2016', '2015',
  '2014', '2013', '2012', '2011',
];

// 已注册的视频地区
const AREAS = [
  '大陆', '香港', '台湾', '日本', '韩国', '美国', 
  '英国', '德国', '法国', '意大利', '西班牙', '加拿大',
  '泰国', '印度',
];

// 已注册的视频语言
const LANGS = [
  '国语', '粤语', '日语', '韩语', '英语', '法语', '德语'
]

// 数据库操作
const STATEMENTS = {
  'addInfoMv': 'INSERT IGNORE INTO `infomv` (`id`,`name`,`summary`,`imgaddr`,`director`,`actors`,`type`,`year`,`area`,`lang`,`update`) values (?,?,?,?,?,?,?,?,?,?,?)',
  'addInfoTv': 'INSERT IGNORE INTO `infotv` (`id`,`name`,`summary`,`imgaddr`,`director`,`actors`,`type`,`year`,`area`,`lang`,`update`) values (?,?,?,?,?,?,?,?,?,?,?)',
  'addAddrMv': '',
  'addAddrTv': '',
  'getMaxId': 'SELECT MAX(`id`) AS maxId FROM ??',
}


export {
  DOMAIN, URLTPL, SELECTOR, SITES, THRESHOLD,
  MVTYPES, TVTYPES, YEARS, AREAS, LANGS,
  STATEMENTS
}

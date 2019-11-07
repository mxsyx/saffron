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
  'getDanmaku': 'SELECT _time,_type,color,author,_text FROM danmaku WHERE id=? LIMIT ?',
  'addDanmaku': 'INSERT INTO danmaku (id,author,_text,color,_type,_time,_date,ip) values (?,?,?,?,?,?,?,?)'
}


export { 
  DBHOST, DBPORT, DBUSER, DBPASSWORD, DBNAME, 
  ADDR_DANMAKU, PORT_DANMAKU,
  STATEMENTS
};

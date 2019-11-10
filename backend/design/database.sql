-- 藏红花
CREATE DATABASE saffron;
USE saffron;

-- 用户数据表
CREATE TABLE user
(
  id INT UNSIGNED AUTO_INCREMENT,       -- 用户ID
  email VARCHAR254) NOT NULL,          -- 电子邮件作账号)
  pwd CHAR44) NOT NULL,                -- 用户密码
  nickname VARCHAR26) DEFAULT NULL,   -- 用户昵称
  is_staff TINYINT1) DEFAULT 0,        -- 是否为管理人员
  is_active TINYINT1) DEFAULT 0,       -- 账号是否可用
  last_login DATETIME DEFAULT NULL,     -- 最后登录的时间
  date_joined DATETIME NOT NULL,        -- 加入网站的时间
  PRIMARY KEY `id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4

-- 不会覆盖所有的可能

-- 电影信息表
CREATE TABLE `movie`
(
  `id` INT UNSIGNED AUTO_INCREMENT,     -- 电影ID
  `name` VARCHAR(30) NOT NULL,          -- 电影名字  
  `summary` VARCHAR(600) DEFAULT NULL,  -- 电影摘要
  `imgaddr` CHAR(52) DEFAULT NULL,      -- 电影图片地址
  `director` VARCHAR(20) DEFAULT NULL,  -- 电影导演
  `actors` VARCHAR(260) DEFAULT NULL,   -- 电影主演
  `type` CHAR(3) DEFAULT NULL,          -- 电影类型
  `year` CHAR(4) DEFAULT NULL,          -- 电影年份
  `area` CHAR(3) DEFAULT NULL,          -- 电影地区
  `lang` CHAR(2) DEFAULT NULL,          -- 电影语言
  `volume` INT UNSIGNED DEFAULT 0,      -- 总播放量
  `love`   INT UNSIGNED DEFAULT 0,      -- 点赞数量
  `hate`   INT UNSIGNED DEFAULT 0,      -- 讨厌数量
  PRIMARY KEY(`id`),
  UNIQUE KEY `NAME` (`NAME`)
)ENGINE=InnoDB AUTO_INCREMENT=1000001 DEFAULT CHARSET=utf8mb4

-- 电影播放地址表
CREATE TABLE `addrmovie`
(
  `vid` INT UNSIGNED NOT NULL,            -- 电影ID
  `episode` SMALLINT UNSIGNED NOT NULL,   -- 电影剧集
  `pladdr1` VARCHAR(255) DEFAULT NULL,    -- 播放线路1
  `pladdr2` VARCHAR(255) DEFAULT NULL,    -- 播放线路2
  `pladdr3` VARCHAR(255) DEFAULT NULL,    -- 播放线路3
  `pladdr4` VARCHAR(255) DEFAULT NULL,    -- 播放线路4
  `pladdr5` VARCHAR(255) DEFAULT NULL,    -- 播放线路5
  `pladdr6` VARCHAR(255) DEFAULT NULL,    -- 播放线路6
  `dladdr1` VARCHAR(255) DEFAULT NULL,    -- 下载线路1
  `dladdr2` VARCHAR(255) DEFAULT NULL,    -- 下载线路2
  `dladdr3` VARCHAR(255) DEFAULT NULL,    -- 下载线路3
  `dladdr4` VARCHAR(255) DEFAULT NULL,    -- 下载线路4
  `dladdr5` VARCHAR(255) DEFAULT NULL,    -- 下载线路5
  `dladdr6` VARCHAR(255) DEFAULT NULL,    -- 下载线路6
  PRIMARY KEY (`vid`,`episode`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

-- 电视剧信息表
CREATE TABLE `tv`
(
  `id` INT UNSIGNED AUTO_INCREMENT,     -- 电视剧ID
  `name` VARCHAR(30) NOT NULL,          -- 电视剧名字  
  `summary` VARCHAR(600) DEFAULT NULL,  -- 电视剧摘要
  `imgaddr` CHAR(52) DEFAULT NULL,      -- 电视剧图片地址
  `director` VARCHAR(20) DEFAULT NULL,  -- 电视剧导演
  `actors` VARCHAR(260) DEFAULT NULL,   -- 电视剧主演
  `type` CHAR(3) DEFAULT NULL,          -- 电视剧类型
  `year` CHAR(4) DEFAULT NULL,          -- 电视剧年份
  `area` CHAR(3) DEFAULT NULL,          -- 电视剧地区
  `lang` CHAR(2) DEFAULT NULL,          -- 电视剧语言
  `volume` INT UNSIGNED DEFAULT 0,      -- 总播放量
  `love`   INT UNSIGNED DEFAULT 0,      -- 点赞数量
  `hate`   INT UNSIGNED DEFAULT 0,      -- 讨厌数量
  PRIMARY KEY(id),
  UNIQUE KEY `NAME` (`NAME`)
)ENGINE=InnoDB AUTO_INCREMENT=6000001 DEFAULT CHARSET=utf8mb4

-- 电视剧播放地址表
CREATE TABLE `addrtv`
(
  `vid` INT UNSIGNED NOT NULL,            -- 电视剧ID
  `episode` SMALLINT UNSIGNED NOT NULL,   -- 电视剧剧集
  `pladdr1` VARCHAR(255) DEFAULT NULL,    -- 播放线路1
  `pladdr2` VARCHAR(255) DEFAULT NULL,    -- 播放线路2
  `pladdr3` VARCHAR(255) DEFAULT NULL,    -- 播放线路3
  `pladdr4` VARCHAR(255) DEFAULT NULL,    -- 播放线路4
  `pladdr5` VARCHAR(255) DEFAULT NULL,    -- 播放线路5
  `pladdr6` VARCHAR(255) DEFAULT NULL,    -- 播放线路6
  `dladdr1` VARCHAR(255) DEFAULT NULL,    -- 下载线路1
  `dladdr2` VARCHAR(255) DEFAULT NULL,    -- 下载线路2
  `dladdr3` VARCHAR(255) DEFAULT NULL,    -- 下载线路3
  `dladdr4` VARCHAR(255) DEFAULT NULL,    -- 下载线路4
  `dladdr5` VARCHAR(255) DEFAULT NULL,    -- 下载线路5
  `dladdr6` VARCHAR(255) DEFAULT NULL,    -- 下载线路6
  PRIMARY KEY (`vid`,`episode`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

-- 历史记录表
CREATE TABLE history
(

)

-- 收藏数据表
CREATE TABLE collection
(
  
)

-- 轮播数据表
CREATE TABLE carousel
(

)

-- 反馈信息表
CREATE TABLE feedback
(

)

-- 用户留言表
CREATE TABLE comments
(

)

-- 系统消息表
CREATE TABLE message
(

)

-- 弹幕数据表
CREATE TABLE `danmaku`
(
  `_id` INT UNSIGNED AUTO_INCREMENT,    -- 弹幕ID
  `id` BIGINT UNSIGNED NOT NULL,        -- 弹幕影片ID
  `author` INT UNSIGNED NOT NULL,       -- 弹幕发送者
  `text` VARCHAR(255) NOT NULL,         -- 弹幕内容
  `color` INT NOT NULL,                 -- 弹幕颜色
  `type` INT NOT NULL,                  -- 弹幕类型
  `time` DECMICAL(5,0) NOT NULL,        -- 弹幕出现的时间
  `date` DATETIME NOT NULL,             -- 弹幕发送的时间
  `addr` CHAR(15) NOT NULL,             -- 弹幕发送者IP
  PRIMARY KEY (`_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4

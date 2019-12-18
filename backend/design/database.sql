-- 藏红花
CREATE DATABASE `saffron`;
USE saffron;

-- 用户信息表
CREATE TABLE `user`
(
  `id` INT UNSIGNED AUTO_INCREMENT,     -- 用户ID
  `email` VARCHAR(254) NOT NULL,        -- 电子邮件(作账号)
  `pwd` CHAR(43) NOT NULL,              -- 用户密码
  `nickname` VARCHAR(26) DEFAULT NULL,  -- 用户昵称
  `is_staff` TINYINT(1)  DEFAULT 0,     -- 是否为管理人员
  `is_active` TINYINT(1) DEFAULT 0,     -- 账号是否可用
  `last_login` DATETIME DEFAULT NULL,   -- 最后登录的时间
  `date_joined` DATETIME NOT NULL,      -- 加入网站的时间
  PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- 视频信息表
CREATE TABLE `info`
(
  `id` INT UNSIGNED AUTO_INCREMENT,     -- 视频ID
  `name` VARCHAR(30) NOT NULL,          -- 视频名字
  `bigtype` CHAR(2) NOT NULL,           -- 视频大类
  `summary` VARCHAR(600) DEFAULT NULL,  -- 视频摘要
  `imgaddr` CHAR(45) DEFAULT NULL,      -- 图片地址
  `director` VARCHAR(20) DEFAULT NULL,  -- 视频导演
  `actors` VARCHAR(260) DEFAULT NULL,   -- 视频主演
  `type` CHAR(3) DEFAULT NULL,          -- 视频类型
  `year` CHAR(4) DEFAULT NULL,          -- 视频年份
  `area` CHAR(3) DEFAULT NULL,          -- 视频地区
  `lang` CHAR(2) DEFAULT NULL,          -- 视频语言
  `volume` INT UNSIGNED DEFAULT 0,      -- 总播放量
  `love`   INT UNSIGNED DEFAULT 0,      -- 点赞数量
  `hate`   INT UNSIGNED DEFAULT 0,      -- 讨厌数量
  `update` DATETIME NOT NULL,           -- 更新时间
  `tatal1` SMALLINT UNSIGNED DEFAULT 0, -- 线路1剧集总数
  `tatal2` SMALLINT UNSIGNED DEFAULT 0, -- 线路2剧集总数
  `tatal3` SMALLINT UNSIGNED DEFAULT 0, -- 线路3剧集总数
  `tatal4` SMALLINT UNSIGNED DEFAULT 0, -- 线路4剧集总数
  `tatal5` SMALLINT UNSIGNED DEFAULT 0, -- 线路5剧集总数
  `tatal6` SMALLINT UNSIGNED DEFAULT 0, -- 线路6剧集总数
  PRIMARY KEY(`id`),
  UNIQUE KEY `name` (`name`)
)ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4;

-- 视频播放地址表
CREATE TABLE `pladdr`
(
  `vid` INT UNSIGNED NOT NULL,            -- 视频ID
  `episode` SMALLINT UNSIGNED NOT NULL,   -- 视频剧集
  `addr1` VARCHAR(255) DEFAULT NULL,      -- 播放地址1
  `addr2` VARCHAR(255) DEFAULT NULL,      -- 播放地址2
  `addr3` VARCHAR(255) DEFAULT NULL,      -- 播放地址3
  `addr4` VARCHAR(255) DEFAULT NULL,      -- 播放地址4
  `addr5` VARCHAR(255) DEFAULT NULL,      -- 播放地址5
  `addr6` VARCHAR(255) DEFAULT NULL,      -- 播放地址6
  PRIMARY KEY (`vid`,`episode`),
  FOREIGN KEY (`vid`) REFERENCES `info`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 视频下载地址表
CREATE TABLE `dladdr`
(
  `vid` INT UNSIGNED NOT NULL,            -- 视频ID
  `episode` SMALLINT UNSIGNED NOT NULL,   -- 视频剧集
  `addr` VARCHAR(255) DEFAULT NULL,       -- 下载地址
  PRIMARY KEY (`vid`,`episode`),
  FOREIGN KEY (`vid`) REFERENCES `info`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 弹幕数据表
CREATE TABLE `danmaku`
(
  `_id` INT UNSIGNED AUTO_INCREMENT,    -- 弹幕ID
  `id` BIGINT UNSIGNED NOT NULL,        -- 弹幕影片ID
  `author` INT UNSIGNED NOT NULL,       -- 弹幕发送者
  `text` VARCHAR(255) NOT NULL,         -- 弹幕内容
  `color` INT NOT NULL,                 -- 弹幕颜色
  `type` INT NOT NULL,                  -- 弹幕类型
  `time` DOUBLE NOT NULL,               -- 弹幕出现的时间
  `date` DATETIME NOT NULL,             -- 弹幕发送的时间
  `addr` CHAR(15) NOT NULL,             -- 弹幕发送者IP
  PRIMARY KEY (`_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- 历史记录表
CREATE TABLE `history`
(

);

-- 收藏数据表
CREATE TABLE `collection`
(

);

-- 轮播数据表
CREATE TABLE `carousel`
(

);

-- 反馈信息表
CREATE TABLE `feedback`
(

);

-- 用户留言表
CREATE TABLE `comments`
(

);

-- 系统消息表
CREATE TABLE `message`
(

);


DELIMITER $$
CREATE PROCEDURE check_id()
BEGIN
  SELECT COUNT(*) FROM `info`;
  SELECT MAX(`id`) FROM `info`;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE count_all()
BEGIN
  SELECT COUNT(*) AS info FROM `info`;
  SELECT COUNT(*) AS pladdr FROM `pladdr`;
  SELECT COUNT(*) AS dladdr FROM `dladdr`;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE delete_all()
BEGIN
  DELETE FROM `pladdr`;
  DELETE FROM `dladdr`;
  DELETE FROM `info`;
END$$
DELIMITER ;
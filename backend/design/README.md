请求 => 提取 => 过滤 => 存储

请求 提取 ( spider.mjs )

过滤 ( filter.mjs )

存储 ( storager.mjs )

主调度 ( saffron.mjs )


设计指导：去类型、去站点


### 线路选择标准
  1. 资源多、速度快
  2. 采集过程不繁琐
  3. 播放地址为M3U8



## 线路

### 线路1

  [OK资源网](http://www.okzyw.com)

  库存 41000+

  CDN 美国


### 线路2

  [八戒资源网](http://www.bajieziyuan.com)

  库存 22000+
  
  CDN 中国


### 线路3

  [最大资源网](http://zuidazy1.net)

  库存 38000+

  CDN 美国


### 线路4

  [123资源网](http://123ku.com)

  库存 30000+

  CDN 中国


### 线路5

  [高清资源网](http://www.gaoqingzy.com)

  库存 31000+

  CDN 美国


### 线路6

  [永久资源网](http://www.yongjiuzy.cc)

  库存 30000+

  CDN 美国


```javascript
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0
}
```


异步获取，同步更新（异步获取网页，同步更新数据库，自主控制主键ID）

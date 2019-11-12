请求 => 提取 => 过滤 => 存储

请求 提取 ( spider.mjs )

过滤 ( filter.mjs )

存储 ( storager.mjs )

主调度 ( saffron.mjs )


设计指导：去类型、去站点

不同线路下获取到相同的影视信息时以前面的线路为准


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

  [123资源网](http://123ku.com)

  库存 30000+

  CDN 中国

### 线路4

  [豆瓣资源网](http://douban666.com)

  库存 15000+

  CDN 美国

### 线路5

  [高清资源网](http://www.gaoqingzy.com)

  库存 31000+

  CDN 美国

### 线路6

  [最大资源网](http://zuidazy1.net)

  库存 38000+

  CDN 美国

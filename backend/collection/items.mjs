/**
 * 视频信息条目
 */

class VideoItem {
  constructor() {
    this.name = null;
    this.summary = null;
    this.imgUrl = null;
    this.director = null;
    this.actors = null;
    this.type = null;
    this.year = null;
    this.area = null;
    this.lang = null;
    this.update = null;
    this.pladdrs = null;
    this.dladdrs = null;

    /**
     * 来源站点
     * @type {number}
     */
    this.site = null;

    /**
     * 是否将该条目舍弃
     * 当视频的类型不属于任何一种已经注册的类型时应舍弃
     * @type {boolean}
     */
    this.drop = false;

    /**
     * 该条目存储到的信息表名
     * infomv 单剧集视频信息表
     * infotv 多剧集视频信息表
     * @type {string}
     */
    this.infoTableName = null;

    /**
     * 该条目存储到的播放地址表名
     * pladdrmv 单剧集播放地址表
     * pladdrtv 多剧集播放地址表
     * @type {string}
     */
    this.plAddrTableName = null;

    /**
     * 条目存储到哪个下载地址表名
     * dladdrmv 单剧集下载地址表
     * dladdrtv 多剧集下载地址表
     * @type {string}
     */
    this.dlAddrTableName = null;

    /**
     * 该条目播放地址线路名
     * add1 线路1  add2 线路2
     * add3 线路3  add4 线路4
     * add5 线路5  add6 线路6 
     * @type {string}
     */
    this.addrName = null;
  }

  // 存值函数
  setName(name) {
    this.name = name
  }

  setSummary(summary) {
    this.summary = summary;
  }

  setImgUrl(imgaddr) {
    this.imgaddr = imgaddr;
  }

  setDirector(director) {
    this.director = director;
  }

  setActors(actors) {
    this.actors = actors;
  }

  setType(type) {
    this.type = type;
  }

  setYear(year) {
    this.year = year;
  }

  setArea(area) {
    this.area = area;
  }
  
  setLang(lang) {
    this.lang = lang;
  }
  
  setUpdate(update) {
    this.update = update; 
  }

  setPlAddrs(pladdrs) {
    this.pladdrs = pladdrs;
  }

  setDlAddrs(dladdrs) {
    this.dladdrs = dladdrs;
  } 

  setSite(site) {
    this.site = site;
  }

  setDrop(drop) {
    this.drop = drop;
  }

  setInfoTableName(infoTableName) {
    this.infoTableName = infoTableName;
  }

  setPlAddrTableName(plAddrTableName) {
    this.plAddrTableName = plAddrTableName;
  }

  setDlAddrTableName(dlAddrTableName) {
    this.dlAddrTableName = dlAddrTableName;
  }

  setAddrName(addrName) {
    this.addrName = addrName;
  }


  // 取值函数
  getName() {
    return this.name;
  }

  getSummary() {
    return this.summary;
  }

  getImgUrl() {
    return this.imgaddr;
  }

  getDirector() {
    return this.director;
  }

  getActors() {
    return this.actors;
  }

  getType() {
    return this.type;
  }

  getYear() {
    return this.year;
  }

  getArea() {
    return this.area;
  }
  
  getLang() {
    return this.lang;
  }

  getUpdate() {
    return this.update;
  }

  getPlAddrs() {
    return this.pladdrs;
  }

  getDlAddrs() {
    return this.dladdrs;
  }

  getSite() {
    return this.site;
  }

  getDrop() {
    return this.drop;
  }

  getInfoTableName() {
    return this.infoTableName;
  }

  getPlAddrTableName() {
    return this.plAddrTableName;
  }

  getDlAddrTableName() {
    return this.dlAddrTableName;
  }

  getAddrName() {
    return this.addrName;
  }
}

export { VideoItem }

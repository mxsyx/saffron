/**
 * 视频信息条目
 */

class VideoItem {
  constructor() {
    this.name     = null;
    this.summary  = null;
    this.imgUrl   = null;    
    this.imgAddr  = null;
    this.director = null;
    this.actors   = null;
    this.type     = null;
    this.year     = null;
    this.area     = null;
    this.lang     = null;
    this.update   = null;
    this.pladdrs  = null;
    this.dladdrs  = null;

    /**
     * 视频所属大类
     * @type {string}
     * mv 单剧集类型
     * tv 多剧集类型
     */
    
    this.bigType  = null;

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
     * 该条目播放地址线路名
     * add1 线路1  add2 线路2
     * add3 线路3  add4 线路4
     * add5 线路5  add6 线路6 
     * @type {string}
     */
    this.addrName = null;

    /**
     * 某播放线路剧集总数
     * @type {number}
     */
    this.tatal = 0
  }

  // 存值函数
  setName(name) {
    this.name = name
  }

  setBigType(bigType) {
    this.bigType = bigType;
  }

  setSummary(summary) {
    this.summary = summary;
  }

  setImgUrl(imgUrl) {
    this.imgUrl = imgUrl;
  }

  setImgAddr(imgAddr) {
    this.imgAddr = imgAddr;
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

  setTatal() {
    this.tatal = this.pladdrs.length;
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

  setAddrName(addrName) {
    this.addrName = addrName;
  }


  // 取值函数
  getName() {
    return this.name;
  }

  getBigType() {
    return this.bigType;
  }

  getSummary() {
    return this.summary;
  }

  getImgUrl() {
    return this.imgUrl;
  }

  getImgAddr() {
    return this.imgAddr;
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

  getTatal() {
    return this.tatal;
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

  getAddrName() {
    return this.addrName;
  }
}

export default VideoItem

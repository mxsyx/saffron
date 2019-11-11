/**
 * 存储条目
 */

 // 视频信息条目
class VideoItem {
  constructor() {
    this.name = null
    this.summary = null
    this.imgaddr = null
    this.director = null
    this.actors = null
    this.type = null
    this.year = null
    this.area = null
    this.lang = null
    this.update = null
    this.drop = false
  }

  // 存值函数
  setName(name) {
    this.name = name
  }

  setSummary(summary) {
    this.summary = summary;
  }

  setImgaddr(imgaddr) {
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

  setDrop(drop) {
    this.drop = drop;
  }

  // 取值函数
  getName() {
    return this.name;
  }

  getSummary() {
    return this.summary;
  }

  getImgaddr() {
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

  getDrop() {
    return this.drop;
  }
}

export { VideoItem }

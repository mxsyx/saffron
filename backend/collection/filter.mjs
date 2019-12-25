/**
 * 视频信息过滤器
 */

import { YEARS, AREAS, LANGS } from './config.mjs'
import { MVTYPES, TVTYPES, DMTYPES } from './config.mjs'

class Filter {
  constructor() {}

  filte(videoItem) {
    this.filteType(videoItem);
    this.filteYear(videoItem);
    this.filteArea(videoItem);
    this.filteLang(videoItem);
    this.filteActors(videoItem);
    this.filteDirector(videoItem);
  }

  /**
   * 过滤视频类型, 未知类型将被舍弃
   * 设置其所属信息表、播放地址表、下载地址表
   */
  filteType(videoItem) {
    const type = videoItem.getType();
    if (MVTYPES.indexOf(type) != -1) {
      videoItem.setBigType('mv');
    } else if (TVTYPES.indexOf(type) != -1) {
      videoItem.setBigType('tv');
    } else if (DMTYPES.indexOf(type) != -1) {
      // 将动漫剧合并进多剧集类型中
      videoItem.setType('动漫剧')
      videoItem.setBigType('tv');
    } else {
      // 未知类型舍弃
      videoItem.setDrop(true);
    }
  }

  /**
   * 过滤视频年份
   * 未知年份将设置为更早
   */
  filteYear(videoItem) {
    const year = videoItem.getYear();
    if (YEARS.indexOf(year) == -1) {
      videoItem.setYear('更早');
    }
  }

  /**
   * 过滤视频地区
   * 未知地区将设置为其它
   */
  filteArea(videoItem) {
    const area = videoItem.getArea();
    if (AREAS.indexOf(area) == -1) {
      videoItem.setArea('其它');
    }
  }

  /**
  * 过滤视频地区
  * 未知地区将设置为其它
  */
  filteLang(videoItem) {
    const lang = videoItem.getLang();
    if (LANGS.indexOf(lang) == -1) {
      videoItem.setLang('其它');
    }
  }

  /**
   * 统一演员字符串样式
   */
  filteActors(videoItem) {
    let actors = videoItem.getActors();
    actors = actors.replace(/ /g, ',');
    actors = actors.replace(/\//g, ',');
    actors = actors.replace(/，/g, ',');
    videoItem.setActors(actors);
  }

  /**
   * 统一导演字符串样式
   */
  filteDirector(videoItem) {
    let director = videoItem.getDirector();
    director = director.replace(/ /g, ',');
    director = director.replace(/\//g, ',');
    director = director.replace(/，/g, ',');
    videoItem.setDirector(director);
  }
}


export default Filter

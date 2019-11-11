/**
 * 视频信息过滤器
 */

import { TYPES, YEARS, AREAS, LANGS } from './config.mjs'

class Filter {
  constructor() {
    this.types = TYPES
    this.years = YEARS
    this.areas = AREAS
    this.langs = LANGS
  }

  filte(videoItem) {
    this.filteType(videoItem);
    this.filteYear(videoItem);
    this.filteArea(videoItem);
    this.filteLang(videoItem);
  }

  /**
   * 过滤视频类型
   * 未知类型将被舍弃
   */
  filteType(videoItem) {
    const type = videoItem.getType();
    if (this.types.indexOf(type) == -1) {
      videoItem.setDrop(true);
    }
  }

  /**
   * 过滤视频年份
   * 未知年份将设置为其它
   */
  filteYear(videoItem) {
    const year = videoItem.getYear();
    if (this.years.indexOf(year) == -1) {
      videoItem.setYear('其它');
    }
  }

  /**
   * 过滤视频地区
   * 未知地区将设置为其它
   */
  filteArea(videoItem) {
    const area = videoItem.getArea();
    if (this.areas.indexOf(area) == -1) {
      videoItem.setArea('其它');
    }
  }

  /**
  * 过滤视频地区
  * 未知地区将设置为其它
  */
  filteLang(videoItem) {
    const lang = videoItem.getLang();
    if (this.langs.indexOf(lang) == -1) {
      videoItem.setLang('其它');
    }
  }
}

export { Filter }

/**
 * 视频信息过滤器
 */

import { YEARS, AREAS, LANGS } from './config.mjs'
import { MVTYPES, TVTYPES, DMTYPES } from './config.mjs'

class Filter {
  constructor() { }

  filte(videoItem) {
    switch(videoItem.getSite()) {
      case 1: this.makeFilteSite1(videoItem);break;
      case 2: this.makeFilteSite2(videoItem);break;
      case 3: this.makeFilteSite3(videoItem);break;
      case 4: this.makeFilteSite4(videoItem);break;
      case 5: this.makeFilteSite5(videoItem);break;
      case 6: this.makeFilteSite6(videoItem);break;
    }

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
    if (MVTYPES.indexOf(type) != -1) {
      videoItem.setInfoTableName('infomv');
      videoItem.setPlAddrTableName('pladdrmv');
      videoItem.setDlAddrTableName('dladdrmv');
    } else if (TVTYPES.indexOf(type) != -1) {
      videoItem.setInfoTableName('infotv');
      videoItem.setPlAddrTableName('pladdrtv');
      videoItem.setDlAddrTableName('dladdrtv');
    } else if (DMTYPES.indexOf(type) != -1){
      videoItem.setType('动漫剧')
      videoItem.setInfoTableName('infotv')
      videoItem.setPlAddrTableName('pladdrtv');
      videoItem.setDlAddrTableName('dladdrtv');
    } else {
      videoItem.setDrop(true);
    }
  }

  /**
   * 过滤视频年份
   * 未知年份将设置为其它
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

  // 执行站点1特殊过滤
  makeFilteSite1(videoItem) {
    videoItem.setAddrName('addr1');
  }
  
  // 执行站点2特殊过滤
  makeFilteSite2(videoItem) {
    videoItem.setAddrName('addr2');
  }
  
  // 执行站点3特殊过滤
  makeFilteSite3(videoItem) {
    videoItem.setAddrName('addr3');
  }
  
  // 执行站点4特殊过滤
  makeFilteSite4(videoItem) {
    videoItem.setAddrName('addr4');
  }
  
  // 执行站点5特殊过滤
  makeFilteSite5(videoItem) {
    videoItem.setAddrName('addr5');
  }

  // 执行站点6特殊过滤
  makeFilteSite6(videoItem) {
    videoItem.setAddrName('addr6');
  }
}

export { Filter }

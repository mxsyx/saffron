/**
 * 图片下载器
 */
import fs from 'fs'
import syncRequest from 'sync-request'

class Downloader {
  constructor() {
    this.queue = [];
    this.sumImgs = 0;
    this.sumDownload = 0;
    this.mutex = false;
  }
  
  /**
   * 追加一个下载任务
   * @param {object} img
   */
  pushImg(img) {
    this.queue.push(img)
    ++this.sumImgs;
  }

  checkComplete() {
    return this.sumImgs == this.sumDownload;
  }

  interval() {
    // 下载器被锁住，终止执行
    if (this.mutex) return ;
    
    // 给下载器上锁
    this.mutex = true;
        
    this.queue.forEach((img) => {
      this.downloadImg(img);
      this.queue.pop(img);
    });

    // 该下载器解锁
    this.mutex = false;
  }
  
  /**
   * 存储图片到本机
   * @param {object} img 待下载的图片
   */
  downloadImg(img) {
    const res = syncRequest('GET', img['url']);
    fs.writeFileSync(img['addr'], res.getBody(), (error) => {
      // console.log(error);
    });
    ++this.sumDownload;
  }
}

export { Downloader }

/**
 * 图片下载器
 */
import fs from 'fs'
import request from 'request'

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
    console.log(`共${this.sumImgs}`);
    console.log(`已完成${this.sumDownload}`);
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
  
  get(url) {
    return new Promise((resolve, reject) => {
      request.get(url, { timeout: 30000 }, function(error, res, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }

  /**
   * 存储图片到本机
   * @param {object} img 待下载的图片
   */
  async downloadImg(img) {
    this.get(img['url']).then((content) => {
      fs.writeFileSync(`/opt${img['addr']}`, content, (error) => {
        console.log(error);
      });
      ++this.sumDownload;
    }).catch((error) => {
      console.log(error.code);
      ++this.sumDownload;
    });
  }
}

export { Downloader }

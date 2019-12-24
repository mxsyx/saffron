import Aria2 from 'aria2'

class Aria2c {
  constructor() {
    const options = {
      host: '127.0.0.1',
      port: 6800,
      secure: false,
      secret: '',
      path: '/jsonrpc'
    };
    this.aria2 = new Aria2([options]);
    this.aria2.open().then(() => { 
      console.log('Aria2c RPC 服务已就绪');
    }).catch(err => {
      console.error(err);
    });
  }

  /**
   * 追加一个下载任务
   * @param {string} url 远程文件的链接
   * @param {string} dir 文件的本地存储目录
   * @param {string} out 文件的本地存储名字
   */
  addTask(url, dir, out) {
    this.aria2.call('addUri', [url], { dir: dir, out: out})
      .catch(err => {
        // console.error(err)
      })
  }
}


export default Aria2c

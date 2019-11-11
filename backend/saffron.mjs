/**
 * 主调度文件
 */


import { Spider } from './spider.mjs'

function saffron() {
  const spider = new Spider();
  spider.start();
}

saffron();

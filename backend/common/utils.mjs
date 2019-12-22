/**
 * 通用公共函数
 */

import url from 'url'
import queryString from 'querystring'
import md5 from 'md5'

/**
 * 获取URL查询参数
 * @param {object} req 请求对象
 * @returns URL参数对象
 */
const getUrlParams = function (req) {
  const urlQueryString = url.parse(req.url).query;
  const urlParams = queryString.parse(urlQueryString);
  return urlParams;
}

/**
 * 获取特定格式的当前时间
 * @param {string} format 时间格式
 * @returns 特性格式的时间字符串
 */
const getCurrentTime = function (format) {
  const currenTime = new Date();
  switch (format) {
    case 'datetime': return currenTime.toISOString();
  }
}

/**
 * 使程序睡眠一段时间
 * @param {number} seconds 睡眠的秒数
 */
const sleep = function(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    },
    seconds*1000);
  })
}

/**
 * 生成图片本机存储地址
 * @param {object} videoItem 视频信息条目
 */
const makeImgAddr = function(videoItem) {
  const imgName = md5(videoItem.getName());
  const imgUrl = videoItem.getImgUrl();
  if (imgUrl.match(/.*\.jpg/)) {
    var suffix = '.jpg';
  } else {
    var suffix = '.png';
  }

  return `/img/${imgName.slice(0,2)}/${imgName}${suffix}`
}

export { getUrlParams, getCurrentTime, makeImgAddr, sleep }

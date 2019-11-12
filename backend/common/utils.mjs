/**
 * 通用公共函数
 */

import url from 'url'
import queryString from 'querystring'

/**
 * 获取URL查询参数
 * @param {object} req 请求对象
 * @returns URL参数对象
 */
function getUrlParams(req) {
  const urlQueryString = url.parse(req.url).query;
  const urlParams = queryString.parse(urlQueryString);
  return urlParams;
}

/**
 * 获取客户端Ip地址
 * @param {object} req 请求对象
 * @returns 客户端的Ip地址
 */
function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
};
 
/**
 * 获取特定格式的当前时间
 * @param {string} format 时间格式
 * @returns 特性格式的时间字符串
 */
function getCurrentTime(format) {
  const currenTime = new Date();
  switch (format) {
    case 'datetime': return currenTime.toISOString();
  }
}


export { getUrlParams, getClientIp, getCurrentTime }

/**
 * @Description 邮件发送 
 * @Author Mxsyx
 * @Created 2019/12/26 16:04
 */

const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./config')

const transport = nodemailer.createTransport(smtpTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 * @param {Array} attachments 附件
 */
const sendMail = function (recipient, subject, html='', attachments=[]) {
  const message = {
    from: config.email.user,
    to: recipient,
    subject: subject,
    html: html,
    attachments: attachments
  }

  transport.sendMail(message, ()=>{});
}


sendMail('zsimline@163.com', '采集日志', '早上好呀小伙子！', [{
  filename: '采集日志.txt',
  path: '/var/log/saffron/clct.log',
}]);

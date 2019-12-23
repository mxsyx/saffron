import Express from 'express'
import * as video from './video.mjs'
import * as danmaku from './danmaku.mjs'
import BodyParser from 'body-parser'

const app = new Express();

app.set('trust proxy', 'loopback');

// 解析JSON格式请求体
app.use(BodyParser.json())

// 弹幕接口跨域
app.use('/v2/v3', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length");
  res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS");
  
  // 让options请求快速返回
  if(req.method=="OPTIONS") res.sendStatus(200);
  else next();
});


// 视频请求
app.get('/v2/main', video.fetchMainPageData),
app.get('/v2/info/:vid', video.fetchInfoPageData);
app.get('/v2/play/:vid/:addr/:episode', video.fetchPlayPageData);
app.get('/v2/random', video.fetchRandom),
app.get('/v2/download/:vid', video.fetchDlAddr);

// 搜索接口
app.post('/v2/find/byname', video.findByName)
//app.get('/v2/find/bydirector', video.findByDirector)
//app.get('/v2/find/byactor', video.findByActor)

// 弹幕请求
app.get('/v2/v3', danmaku.getDanmaku);
app.post('/v2/v3', danmaku.addDanmaku);


app.listen(8000, () => console.log('Service listening on port 127.0.0.1:8000!'))

import Express from 'express'
import * as video from './video.mjs'

const app = new Express();

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/main/latest', video.getMain),
app.get('/main/random', video.getMain),
app.get('/info/:vid', video.getInfo);
app.get('/play/:vid/:addr/:episode', video.getPlAddr);
app.get('/download/:vid/:episode', video.getDlAddr);

app.listen(8000, () => console.log('Service listening on port 127.0.0.1:8000!'))

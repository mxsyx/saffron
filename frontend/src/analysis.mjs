import axios from 'axios'
import { AsyncLimiter } from './async-limiter.mjs'

const aslimiter = new AsyncLimiter(500);

const urls = [
  'http://zizaixian.top/v2/main',
  'http://zizaixian.top/v2/info/102020',
  'http://zizaixian.top/v2/random',
  'http://zizaixian.top/v2/play/172020/1/1',
  'http://zizaixian.top/v2/download/172020'
]

let reqNum = 1000;
 
function httpGet(down) {
  axios.get(urls[2])
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      --reqNum;
      console.log(`\n\n\n${reqNum}\n\n\n`);
      down();
    })
}


for(let i = 0; i < reqNum; i++) {
  aslimiter.push(httpGet);
  console.log(i);
}

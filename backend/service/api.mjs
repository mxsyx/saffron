import Express from 'express'
import * as video from './video.mjs'

const app = new Express();

app.get('/info/:vid', video.getInfo);
app.get('/play/:vid/:addr/:episode', video.getPlAddr);
app.get('/download/:vid/:episode', video.getDlAddr);


app.listen(9000, () => console.log('Service listening on port 127.0.0.1:9000!'))

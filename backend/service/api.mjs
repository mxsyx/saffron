import Express from 'express'
import * as video from './video.mjs'

const app = new Express();

app.get('/v2/main', video.fetchMainPageData),
app.get('/v2/info/:vid', video.fetchInfoPageData);
app.get('/v2/play/:vid/:addr/:episode', video.fetchPlayPageData);
app.get('/v2/random', video.fetchRandom),
app.get('/v2/download/:vid', video.fetchDlAddr);
app.get('/v2/find/byname/:content', video.searchByName)

app.listen(8000, () => console.log('Service listening on port 127.0.0.1:8000!'))

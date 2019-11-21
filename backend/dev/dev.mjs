import request from 'request'

request('https://www.dogedoge.com/', (error, response, body) => {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
})

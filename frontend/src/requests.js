const axios = require('axios').default


axios.get('https://mxsyx.site')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });

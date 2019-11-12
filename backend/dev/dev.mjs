import jsdom from 'jsdom'

jsdom.JSDOM.fromURL('https://api.leduotv.com/wp-api/glid.php?vid=XMNTUxMjMwMDAwXzE=').then((dom) => {
  console.log(dom.window.document.body.getElementsByTagName('script')[0].innerHTML.match('https:.*m3u8')[0]);
});

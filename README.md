# Saffron
[自在仙影院](https://zizaixian.top)

danmaku: {
  id: '10101470022',
  api: 'http://danmaku.zizaixian.top/',
  token: 'tokendemo',
  maximum: 1000,
  user: '1059',
  bottom: '15%',
  unlimited: false,
},


// 将对象数组转换为二维数组
function objectsToArray(obj) {
  return obj.map((ele, i) => {
    return Object.values(ele);
  });
}

// 转置二维数组
function transpose(array) {
  return array[0].map((col, i) => {
    return array.map(row => row[i]);
  });
}

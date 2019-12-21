module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8080,

    proxy: {
      '/v2': {
        target: 'https://zizaixian.top',
        changeOrigin: true,
        secure: false,
      },
      '/img': {
        target: 'https://zizaixian.top',
        changeOrigin: true,
        secure: false,
      }
    }
  },
}

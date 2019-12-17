export default {
  // 离开当前页面显示进度条
  beforeRouteLeave(to, from, next) {
    this.$loading();
    next();
  },

  beforeRouteUpdate(to, from, next) {
    this.$loading();
    next();
  }
}
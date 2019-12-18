export default {
  // 离开当前页面显示进度条
  beforeRouteLeave(to, from, next) {
    this.$loading();
    next();
  },

  // 当前页面更新显示进度条
  beforeRouteUpdate(to, from, next) {
    this.$loading();
    next();
  }
}
export default {
  // 离开当前页面显示进度条
  beforeRouteLeave(to, from, next) {
    this.$emit('loading');
    next();
  },

  methods: {
    // 页面加载完成之后触发
    loaded() {
      this.$emit('loaded');
    }
  }
}
<template>
  <div id="progress"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
/** 顶部进度条 */
#progress {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 60%;
  height: 2px;
  z-index: 1000;
  background: #B91F1F;
  animation: pulse 2s linear;
}
@keyframes pulse {
  from {
    width: 10%;
  }
  to {
    width: 60%;
  }
}
</style>
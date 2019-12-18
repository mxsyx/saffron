<!-- 加载组件 -->

<template>
  <div id="loading-plugin">
    <div class="waiting" v-if="showWaiting">
      <span class="bounce1"></span>
      <span class="bounce2"></span>
      <span class="bounce3"></span>
      <span class="bounce4"></span>
      <span class="bounce5"></span>
    </div>
    <div class="progress" v-show="showProgress"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',

  data() {
    return {
      showWaiting: true,
      showProgress: false
    }
  }
}
</script>

<style scoped>
.waiting {
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

.waiting {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content:center;
  align-items: center;
  flex-wrap: wrap;
}
 
.waiting span {
  flex: 0 0 40px;
  height: 40px;
  background-color: #67CF22;
  border-radius: 50%;
  animation: bouncedelay 1.4s infinite ease-in-out;
}

.waiting .bounce1 {
  animation-delay: -0.64s;
}
 
.waiting .bounce2 {
  animation-delay: -0.48s;
}

.waiting .bounce3 {
  animation-delay: -0.32s;
}

.waiting .bounce4 {
  animation-delay: -0.16s;
}

.waiting .bounce5 {
  animation-delay: 0s;
}

@keyframes bouncedelay {
  0%, 80%, 100% 
  {
    transform: scale(0.0);
  }
  40% {
    transform: scale(1.0);
  }
}

/** 顶部进度条 */
.progress {
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
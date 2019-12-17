<template>
  <div class="loading" v-show="show">
    <span class="bounce1"></span>
    <span class="bounce2"></span>
    <span class="bounce3"></span>
    <span class="bounce4"></span>
    <span class="bounce5"></span>
  </div>
</template>

<script>
export default {
  name: 'Loading',

  data() {
    return {
      show: true,
    }
  }
}
</script>

<style scoped>
.loading {
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

.loading {
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
 
.loading span {
  flex: 0 0 40px;
  height: 40px;
  background-color: #67CF22;
  border-radius: 50%;
  animation: bouncedelay 1.4s infinite ease-in-out;
}

.loading .bounce1 {
  animation-delay: -0.64s;
}
 
.loading .bounce2 {
  animation-delay: -0.48s;
}

.loading .bounce3 {
  animation-delay: -0.32s;
}

.loading .bounce4 {
  animation-delay: -0.16s;
}

.loading .bounce5 {
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
</style>
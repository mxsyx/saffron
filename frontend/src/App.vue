<template>
  <div id="app">
    <TheHeader/>
    <TheNavigation/>
    <keep-alive include="Main">
      <router-view></router-view>
    </keep-alive>
    <TheBottom/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheNavigation from '@/components/TheNavigation'
import TheBottom from '@/components/TheBottom'

export default {
  name: 'app',

  components: {
    TheHeader,
    TheNavigation,
    TheBottom,
  },

  mounted() {
    this.resize();
  },

  methods: {
    resize() {
      const ua = navigator.userAgent;
      if(/Android|iPhone|iPod/i.test(ua)) {
        document.documentElement.style.fontSize = '18px'
      }
    },
  },
};
</script>

<style>
/* 全局样式表 */
:root {
  font-size: 20px;
  --main-color: #34495E;
  --sub-color: #f50000;
  --third-color: #1B9AF7;
  --nav-color: #344950;
}

#app {
  width: 100%;
}

.page {
  width: 90%;
  margin: auto;
  margin-top: 1.5rem;
}
</style>
<template>
  <div id="app">
    <Loading v-if="isLoading"/>
    <Progress v-if="isProgress"/>
    <TheHeader/>
    <TheNavigation/>
    <keep-alive include="Main">
      <router-view 
        v-on:loading="showProgress"
        v-on:loaded="showPage"
      ></router-view>
    </keep-alive>
    <TheBottom/>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Progress from '@/components/Progress'
import TheHeader from '@/components/TheHeader'
import TheNavigation from '@/components/TheNavigation'
import TheBottom from '@/components/TheBottom'

export default {
  name: 'app',

  components: {
    Loading,
    Progress,
    TheHeader,
    TheNavigation,
    TheBottom,
  },
  
  data() {
    return {
      isLoading: true,
      isProgress: false,
    }
  },

  mounted() {
    this.resize();
  },

  methods: {
    resize() {
      const ua = navigator.userAgent;
      if(/Android|iPhone|iPod/i.test(ua)) {
        document.documentElement.style.fontSize = '16px'
      }
    },

    showProgress() {
      this.isProgress = true;
    },
    
    showPage() {
      this.isLoading = false;
      this.isProgress = false;
    }
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

body{
  margin: 0px;
}

a {
  text-decoration: none;
  color: #000000;
}

button {
  cursor: pointer;
}

ul {
  list-style: none;
  padding-left: 0px;
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
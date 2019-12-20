<!-- 播放线路盒 -->

<template>
  <div class="addr-box-right">
    <header>
      <h3>
          {{ videoInfo.name }}
          <small>第 {{ this.$route.params.episode }} 集</small>
      </h3>
      <div class="btn-box hidden-sm">
        <button
          class="btn btn-addr"
          v-for="(addr, key) in addrs"
          v-bind:key="key"
          v-on:click="changeAddr(key)"
        >线路 {{ addr.index }}</button>
      </div>
    </header>
    <ul
      class="row"
      v-for="addr in addrs"
      v-bind:key="addr.key"
      v-bind:class="{hidden: addr.hidden}"
    >
      <li
        class="col-sm-3 col-md-2 col-lg-4"
        v-for="index in generateArray(addr.tatal)"
        v-bind:key="index.key"
      >
        <router-link 
          v-bind:to="`/play/${videoInfo.id}/${addr.index}/${index + 1}`"
          v-bind:class="{'btn-active': btnIsActive(index + 1)}"
          >
          {{ generatePrompt(index) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    videoInfo: Object,
  },

  watch: {
    videoInfo: function() {
      this.addrs = [];
      for(let i = 1; i <= 6; i++) {
        const tatal = this.videoInfo[`tatal${i}`];
        if (tatal > 0) {
          this.addrs.push({
            index: i,
            tatal: tatal,
            hidden: true,
          })
        }
      }
      this.addrs[0].hidden = false;
    }
  },

  data() {
    return {
      activeAddr: 0,
      addrs: null,
    };
  },

  methods: {
    // 生成内容为数字1-n的数组
    generateArray(n) {
      return Array.from(new Array(n).keys());
    },

    // 切换线路 
    changeAddr(addrIndex) {
      this.addrs[this.activeAddr].hidden = true;
      this.addrs[addrIndex].hidden = false;
      this.activeAddr = addrIndex;
    },

    generatePrompt(index) {
      if (this.videoInfo.bigtype == 'tv') {
        return `第${index+1} 集`;
      } else {
        return '高清云播';
      }
    },

    btnIsActive(index) {
      return parseInt(this.$route.params.episode) === index;
    }
  }
};
</script>

<style scoped>
.addr-box-right {
  max-height: 80vh;
  overflow: auto;
  background-color: #232325;
}

.addr-box-right ul {
  width: 100%;
}

.addr-box-right li {
  padding: 0.3rem;
  box-sizing: border-box;
}

.addr-box-right li a {
  display: block;
  color: #eeeeee;
  text-align: center;
  font-size: 0.7rem;
  line-height: 1.7rem;
  border-radius: 0.25rem;
  background-image: linear-gradient(to right, rgb(40, 40, 40) 0px, rgb(59, 59, 59) 100%);
}
.addr-box-right li a:hover {
  color: #fff;
  background-image: none;
  background-color: var(--third-color);
}

.addr-box-right header h3 {
  color: #fff;
  font-size: 1.4rem;
  padding-left: 0.5rem;
  font-weight: 400;
}

.addr-box-right header small {
  color: red;
  font-size: 0.9rem;
  margin: 0px;
}

@media (min-width: 1200px) {
  .btn-box {
    text-align: center;
  }
}

.btn {
  padding: 0rem;
  color: #aaa;
}

.btn-active {
  background-image: none !important;
  background-color: var(--third-color);
}
</style>
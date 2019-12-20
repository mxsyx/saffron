<!-- 播放线路盒 -->

<template>
  <div class="addr-box row">
    <header>
      <div>
      </div>
    </header>
    <ul
      class="row"
      v-for="addr in addrs"
      v-bind:key="addr.key"
      v-bind:class="{hidden: addr.hidden}"
    >
      <li
        class="col-sm-3 col-md-2 col-lg-1"
        v-for="index in generateArray(addr.tatal)"
        v-bind:key="index.key"
      >
        <router-link 
          v-bind:to="`/play/${videoInfo.id}/${addr.index}/${index + 1}`">
          {{ generatePrompt(index) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    videoInfo: Object
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
  }
};
</script>

<style scoped>

</style>
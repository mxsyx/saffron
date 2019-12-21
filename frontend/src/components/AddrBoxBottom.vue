<!-- 播放线路盒 -->

<template>
  <div class="addr-box-bottom">
    <header>
      <div>
        <h5>播放线路</h5>
        <div class="btn-box hidden-sm">
          <button
            class="btn btn-addr"
            v-for="(addr, key) in addrs"
            v-bind:key="key"
            v-on:click="changeAddr(key, addr)"
            v-bind:class="{'btn-active': key === activeAddr}"
          >线路 {{ addr.index }}</button>
        </div>
      </div>
    </header>
    <ul
      class="row"
      v-for="addr in addrs"
      v-bind:key="addr.key"
      v-show="!addr.hidden"
      v-bind:class="{visiable: addr.visiable}"
    >
      <li
        class="col-sm-3 col-md-2 col-lg-1"
        v-for="index in generateArray(addr.tatal)"
        v-bind:key="index.key"
      >
        <router-link 
          v-bind:to="`/play/${videoInfo.id}/${addr.index}/${index + 1}`"
        >{{ generatePrompt(index) }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AddrBoxBottom',

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
            visiable: false
          })
        }
      }
      this.addrs[0].hidden = false;
      this.addrs[0].visiable = true;
    }
  },

  data() {
    return {
      addrs: null,
      activeAddr: 0,
    };
  },

  methods: {
    // 生成内容为数字1-n的数组
    generateArray(n) {
      return Array.from(new Array(n).keys());
    },

    // 切换线路 
    changeAddr(addrIndex) {
      this.addrs[this.activeAddr].visiable = false;
      this.addrs[this.activeAddr].hidden = true;
      this.addrs[addrIndex].hidden = false;
      this.activeAddr = addrIndex;
      setTimeout(() => {
        this.addrs[addrIndex].visiable = true;
      })
    },

    // 生成按钮提示
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
.addr-box-bottom {
  margin: 1.5rem 0rem;
  overflow: hidden;
}

.addr-box-bottom header {
  padding: 0rem 0.375rem;
}

.addr-box-bottom header > div {
  border-bottom: solid 1px #CDCDCD;
  padding: 0.4rem 0rem;
}

.addr-box-bottom header > div h5 {
  margin: 0px;
  font-size: 1.2rem;
  color: #414141;
  font-weight: 400;
  line-height: 0.8rem;
  display: inline-block;
  user-select: none;
}

.addr-box-bottom ul {
  transform: translateX(100%);
  opacity: 0;
  transition: opacity 0.5s;
}

.visiable {
  transform: translateX(0%) !important;
  opacity: 1 !important;
}

.addr-box-bottom li {
  padding: 0.3rem;
  box-sizing: border-box;
}

.addr-box-bottom li a {
  display: block;
  color: #333333;
  text-align: center;
  font-size: 0.7rem;
  line-height: 1.7rem;
  border-radius: 0.25rem;
  background-color: #eee
}
.addr-box-bottom li a:hover {
  color: #fff;
  background-color: var(--third-color);
}

.btn-box {
  float: right;
}

.btn-active {
  color: var(--third-color);
  text-decoration: underline;
  font-weight: 800;
}


</style>
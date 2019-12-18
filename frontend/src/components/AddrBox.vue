<!-- 播放线路盒 -->

<template>
  <div>
    <header>
      <div>
        <h5>播放线路</h5>
        <div class="btn-box">
          <button
            class="btn btn-addr"
            v-for="addr in addrs"
            v-bind:key="addr.key"
            v-on:click="changeAddr(addr.id)"
          >线路 {{ addr.index }}</button>
        </div>
      </div>
    </header>
    <ul
      class="row addr-box"
      v-for="addr in addrs"
      v-bind:key="addr.key"
      v-bind:class="{hidden: addr.hidden}"
    >
      <li
        class="col-sm-3 col-md-2 col-lg-1"
        v-for="index in generateArray(addr.length)"
        v-bind:key="index.key"
      >
        <a v-bind:href="`/play/${videoInfo.id}/${addr.index}/${index}`">
          第 {{ index + 1 }} 集
        </a>
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
      // 活动线路ID
      activeAddr: 1,
      addrs: [],
    };
  },

  methods: {
    // 生成内容为数字1-n的数组
    generateArray: function(n) {
      return Array.from(new Array(n).keys());
    },
  }
};
</script>

<style scoped>
.hidden {
  display: none !important;
}

.addr-box li {
  padding: 0.3rem;
  box-sizing: border-box;
}

.addr-box li a {
  display: block;
  color: #333333;
  text-align: center;
  font-size: 0.7rem;
  line-height: 1.7rem;
  border-radius: 0.25rem;
  background-color: #eee
}
.addr-box li a:hover {
  color: #fff;
  background-color: var(--third-color);
}

.addr-box {
  margin: 1rem 0rem;
}

.addr-box header {
  padding: 0rem 0.375rem;
}

.addr-box header > div {
  border-bottom: solid 1px #CDCDCD;
  padding: 0.4rem 0rem;
}

.addr-box header > div h5 {
  margin: 0px;
  font-size: 1.2rem;
  color: #414141;
  font-weight: 400;
  line-height: 0.8rem;
  display: inline-block;
  user-select: none;
}

.btn-box {
  float: right;
}
</style>
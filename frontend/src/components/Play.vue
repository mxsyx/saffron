<!-- Play Page-->

<template>
  <div class="page row">
    <div class="player col-lg-9" ref="player"></div>
    <div class="addr-box col-lg-3">
      <header>
        <h3>庆余年</h3>
        <span></span>
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
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import Hls from 'hls'
import DPlayer from 'dplayer';
import 'dplayer/dist/DPlayer.min.css';

export default {
  name: "Play",

  data() {
    
  }

  mixins: [mixin],

  beforeRouteEnter(to, from, next) {
    axios.all([
      axios.get(`http://zizaixian.top/info/${to.params.vid}`),
      axios.get(`http://zizaixian.top/play/${to.params.vid}/`
                 + `${to.params.addr}/${to.params.episode}/`),
    ])
      .then(axios.spread((resInfo, resRandom) => {
        next(vm => vm.setVideoData(resInfo.data, resPlay.data));
      }))
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  beforeRouteUpdate(to, from, next) {
    const url = `http://zizaixian.top/play/${to.params.vid}/`
                + `${to.params.addr}/${to.params.episode}/`;
    axios.get(url)
      .then(response => {
        this.setPlayInfo(response.data);
      })
      .catch(error => {
        this.$message('error','加载网站数据失败');
      });
  },

  methods: {
    setPlayInfo(playInfo) {
      if (playInfo.error) {
        this.$message('error','加载网站数据失败');
        this.$loaded();
      } else {
        const url = Object.values(playInfo)[0];
        this.initPlayer(url);
        this.$loaded();
      }
    },

    initPlayer(url) {
      window.Hls = Hls;
      const options = {
        container: this.$refs.player,
        autoplay: true,
        screenshot: true,
        hotkey: true,
        volume: 0.7,
        video: {
          type: 'hls',
          url: url,
        },
      };
      this.dp = new DPlayer(options);
    },
  }
}
</script>

<style scoped>

#addr-box {

}
</style>
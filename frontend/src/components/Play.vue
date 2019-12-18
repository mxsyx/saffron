<!-- Play Page-->

<template>
  <div class="page">
    <div ref="player"></div>
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
  
  props: {
    vid: String
  },

  mixins: [mixin],

  beforeRouteEnter(to, from, next) {
    const url = `http://zizaixian.top/play/${to.params.vid}/`
                + `${to.params.addr}/${to.params.episode}/`;
    axios.get(url)
      .then(response => {
        next(vm => vm.setPlayInfo(response.data));
      })
      .catch(error => {
        this.$message('error','加载网站数据失败');
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
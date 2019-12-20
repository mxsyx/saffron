<!-- Play Page-->

<template>
  <div class="page row">
    <div class="player col-lg-9" ref="player"></div>
    <AddrBoxRight
      v-bind:videoInfo="videoInfo"
    />
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import Hls from 'hls'
import DPlayer from 'dplayer';
import AddrBoxRight from '@/components/AddrBoxRight'
import 'dplayer/dist/DPlayer.min.css';

export default {
  name: "Play",

  components: {
    AddrBoxRight,
  },

  mixins: [mixin],

  data() {
    return {
      videoInfo: null,
      curretM3U8Url: null,
    }
  },

  beforeRouteEnter(to, from, next) {
    const url = `http://zizaixian.top/v2/play/${to.params.vid}/`
                + `${to.params.addr}/${to.params.episode}/`;
    axios.get(url)
      .then(response => {
        next(vm => vm.setData(response.data));
      })
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  beforeRouteUpdate(to, from, next) {
    const url = `http://zizaixian.top/v2/play/${to.params.vid}/`
                + `${to.params.addr}/${to.params.episode}/`;
    axios.get(url)
      .then(response => {
        this.data(response.data);
      })
      .catch(error => {
        this.$message('error','加载网站数据失败');
      });
  },

  methods: {
    setData(data) {
      if (data.videoInfo && data.plAddr) {
        this.videoInfo = data.videoInfo;
        this.curretM3U8Url = Object.values(data.plAddr)[0];
        this.initPlayer(this.curretM3U8Url);
        this.$loaded();
      } else {
        this.$message('error','加载网站数据失败');
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
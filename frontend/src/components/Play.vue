<!-- Play Page-->

<template>
  <div class="page row">
    <div
      class="player-container col-sm-12 col-md-12 col-lg-9" 
      v-bind:class="{'col-lg-12': closeSidebar}"
    >
      <div ref="player" class="player"></div>
      <i
        class="switch-sidebar hidden-sm fa fa-angle-right"
        v-on:click="switchSidebar"
      ></i>
    </div>
    <AddrBoxRight
      class="col-sm-12 col-md-12 col-lg-3"
      v-bind:class="{hidden: closeSidebar}"
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
      dp: null,
      hls: null,
      videoInfo: {},
      closeSidebar: false,
    }
  },

  beforeRouteEnter(to, from, next) {
    const url = `/v2/play/${to.params.vid}/${to.params.addr}`
                +`/${to.params.episode}/`;
    axios.get(url)
      .then(response => {
        next(vm => vm.setData(response.data));
      })
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  beforeRouteUpdate(to, from, next) {
    if (this.hls) {
      this.hls.destroy();
    }
    const url = `/v2/play/${to.params.vid}/`
                + `${to.params.addr}/${to.params.episode}/`;
    axios.get(url)
      .then(response => {
        this.setData(response.data);
        next();
      })
      .catch(error => {
        this.$message('error','加载网站数据失败');
      });
  },

  beforeRouteLeave(to, from, next) {
    if (this.hls) {
      this.hls.destroy();
    }
    next();
  },

  methods: {
    setData(data) {
      if (data.videoInfo && data.plAddr) {
        this.videoInfo = data.videoInfo;
        const m3u8Url = Object.values(data.plAddr)[0];
        this.initPlayer(m3u8Url, this);
        this.$loaded();
      } else {
        this.$message('error','加载网站数据失败');
        this.$loaded();
      }
    },

    initPlayer(url, that) {
      const options = {
        container: this.$refs.player,
        autoplay: true,
        screenshot: true,
        hotkey: true,
        volume: 0.7,
        video: {
          url: url,
          type: 'customHls',
          customType: {
            customHls: function(video, player) {
              const hls = new Hls();
              that.hls = hls;
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          }
        },
        danmaku: {
          id: this.$route.params.vid + 
              this.$route.params.episode.toString().padStart(4, '0'),
          api: 'https://zizaixian.top/v2/',
          maximum: 1000,
          user: '1',
          bottom: '15%',
          unlimited: false,
        },
      };
      this.dp = new DPlayer(options);
    },

    switchSidebar() {
      this.closeSidebar = !this.closeSidebar;
    },
  }
}
</script>

<style scoped>
.page {
  margin-bottom: 3rem;
}

.player {
  height: 80vh;
}
@media (max-width: 767px) {
  .player div {
    height: 30vh;
  }
}

.player-container {
  position: relative;
}

.switch-sidebar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  right: -12px;
  cursor: pointer;
  line-height: 56px;
  color: #fff;
  background-color: #404040;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
}
</style>
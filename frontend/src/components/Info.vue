<!-- Info Page -->

<template>
  <div class="page">
    <InfoBox
      v-if="videoInfo"
      v-bind:videoInfo="videoInfo"
    />
    <AddrBox
      v-bind:videoInfo="videoInfo"
    />
    <DisplayBox
      v-bind:headerTip="'最新电影'"
      v-bind:videoItems="movieItems"
    />
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import InfoBox from "@/components/InfoBox";
import AddrBox from '@/components/AddrBox';
import DisplayBox from '@/components/DisplayBox';

export default {
  props: ['vid'],

  components: {
    InfoBox,
    AddrBox,
    DisplayBox,
  },
  
  mixins: [mixin],
  
  data: function() {
    return {
      videoInfo: null,
      plAddrs: null,
      movieItems: [],
      movieTypes: ['动作片','喜剧片','爱情片','科幻片','恐怖片','剧情片','战争片','动漫片','微电影'],
    }
  },

  mounted() {
    window.scroll(0,0);
  },
  
  beforeRouteEnter(to, from, next) {
    axios.get(`http://zizaixian.top/info/${to.params.vid}`)
      .then(response => {
        next(vm => vm.setVideoInfo(response.data));
      })
      .catch(error => {
        this.$message('error','加载网站数据失败');
      });
  },

  methods: { 
    setVideoInfo(videoInfo) {
      if (videoInfo.info) {
        this.videoInfo = videoInfo.info;
        this.$loaded();
      } else {
        this.$message('error','加载网站数据失败');
        setTimeout(this.$router.go, 1000, -1);
      }
    }
  }
}
</script>

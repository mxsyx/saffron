<!-- Info Page -->

<template>
  <div class="page">
    <InfoBox
      v-bind:videoInfo="videoInfo"
    />
    <AddrBox
      v-bind:vid="vid"
    />
    <VideoShow
      v-bind:headerTip="'最新电影'"
      v-bind:videoItems="movieItems"
    ></VideoShow>
  </div>
</template>

<script>
import InfoBox from "@/components/InfoBox";
import AddrBox from '@/components/AddrBox';
import VideoShow from '@/components/VideoShow';

export default {
  props: ['vid'],

  data: function() {
    return {
      videoInfo: null,
      movieItems: [],
      movieTypes: ['动作片','喜剧片','爱情片','科幻片','恐怖片','剧情片','战争片','动漫片','微电影'],
    }
  },

  components: {
    InfoBox,
    AddrBox,
    VideoShow,
  },
  
  beforeRouteEnter: function(to, from, next) {
    const axios = require('axios').default;
    axios.get(`http://zizaixian.top/info/${to.params.vid}`)
      .then(response => {
        next(vm => { vm.setVideoInfo(response.data); });
      })
      .catch(error => {
        console.error(error);
      });
  },

  methods: {
    setVideoInfo(videoInfo) {
      console.log(videoInfo);
      this.videoInfo = videoInfo;
    }
  }


}
</script>

<style>

</style>
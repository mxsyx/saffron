<!-- Info Page -->

<template>
  <div class="page">
    <InfoBox
      v-bind:videoInfo="videoInfo"
    />
    <AddrBox
      v-bind:vid="vid"
    />
    <DisplayBox
      v-bind:headerTip="'最新电影'"
      v-bind:videoItems="movieItems"
    ></DisplayBox>
  </div>
</template>

<script>
import InfoBox from "@/components/InfoBox";
import AddrBox from '@/components/AddrBox';
import DisplayBox from '@/components/DisplayBox';

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
    DisplayBox,
  },
  
  mounted() {
    window.scrollTo(0,0);
  },

  beforeCreate() {
    const axios = require('axios').default;
    axios.get(`http://zizaixian.top/info/${this.$route.params.vid}`)
      .then(response => {
        this.setVideoInfo(response.data);
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

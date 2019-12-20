<!-- Main Page -->

<template>
  <div class="page">
    <Carousel/>
    <DisplayBox
      type="latest"
      headerTip="最新电影"
      v-bind:videoItems="mvItems"
    />
    <DisplayBox
      type="latest"
      headerTip="最新电视剧"
      v-bind:videoItems="tvItems"
    />
    <DisplayBox
      type="random"
      headerTip="随机推荐"
      v-bind:videoItems="rdItems"
    />
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import Carousel from '@/components/Carousel'
import DisplayBox from '@/components/DisplayBox'

export default {
  name: "Main",

  components: {
    Carousel,
    DisplayBox,
  },

  mixins: [mixin],

  created() {
    axios.get('http://zizaixian.top/v2/main')
      .then(response => {
        this.setVideoData(response.data);
      })
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  activated() {
    if (this.firstLoaded) {
      this.$loaded();
    }
  },

  data() {
    return {
      mvItems: null,
      tvItems: null,
      rdItems: null,
      firstLoaded: false,
      movieTypes: ['动作片','喜剧片','爱情片','科幻片','恐怖片','剧情片','战争片','动漫片','微电影'],
      tvTypes: ['国产剧','港台剧','日韩剧','欧美剧','动漫剧'],
    }
  },

  methods: {
    setVideoData(data) {
      this.mvItems = data.latestVideo.slice(0, 12);
      this.tvItems = data.latestVideo.slice(12, 24);
      this.rdItems = data.randomVideo;
      this.firstLoaded = true;
      setTimeout(this.$loaded, 100);
    }
  }
}
</script>
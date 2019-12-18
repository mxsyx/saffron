<!-- Main Page -->

<template>
  <div class="page">
    <Carousel/>
    <DisplayBox
      headerTip="最新电影"
      v-bind:videoItems="mvItems"
    />
    <DisplayBox
      headerTip="最新电视剧"
      v-bind:videoItems="tvItems"
    />
    <DisplayBox
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
    axios.all([
      axios.get('http://zizaixian.top/main/latest'),
      axios.get('http://zizaixian.top/main/random'),
    ])
    .then(axios.spread((resLatest, resRandom) => {
      this.setVideoData(resLatest.data, resRandom.data);
    }))
    .catch(error => {
      this.$message('error', '加载网站数据失败')
    });
  },

  activated() {
    this.$loaded();
  },

  data() {
    return {
      mvItems: null,
      tvItems: null,
      rdItems: null,
      movieTypes: ['动作片','喜剧片','爱情片','科幻片','恐怖片','剧情片','战争片','动漫片','微电影'],
      tvTypes: ['国产剧','港台剧','日韩剧','欧美剧','动漫剧'],
    }
  },

  methods: {
    setVideoData(latestVideoData, randomVideoData) {
      this.mvItems = latestVideoData.slice(0, 12);
      this.tvItems = latestVideoData.slice(12,24);
      this.rdItems = randomVideoData;
      this.$loaded();
    },

    setRandomVideoInfo(randomVideoInfo) {
      console.log('xxx');
      this.rdItems = randomVideoInfo;
    },
  }
}
</script> 
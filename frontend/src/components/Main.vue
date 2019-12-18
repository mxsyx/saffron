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
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import Carousel from '@/components/Carousel'
import DisplayBox from '@/components/DisplayBox'
import Loading from '@/components/Loading'

export default {
  name: "Main",

  components: {
    Carousel,
    DisplayBox,
  },

  mixins: [mixin],

  beforeRouteEnter(to, from, next) {
    axios.get('http://zizaixian.top/main/latest')
      .then(response => {
        next(vm => vm.setLatestVideoInfo(response.data));
      })
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
      movieTypes: ['动作片','喜剧片','爱情片','科幻片','恐怖片','剧情片','战争片','动漫片','微电影'],
      tvTypes: ['国产剧','港台剧','日韩剧','欧美剧','动漫剧'],
    }
  },

  methods: {
    setLatestVideoInfo(latestVideoInfo) {
      this.mvItems = latestVideoInfo.slice(0, 12);
      this.tvItems = latestVideoInfo.slice(12,24);
      this.$loaded();
    }
  }
}
</script>
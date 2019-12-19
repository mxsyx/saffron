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
      type="random"
      headerTip="随机推荐"
      v-bind:videoItems="rdItems"
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
      rdItems: [],
      movieItems: [],
      movieTypes: ['动作片','喜剧片','爱情片','科幻片','恐怖片','剧情片','战争片','动漫片','微电影'],
    }
  },

  mounted() {
    this.scrollToTop();
  },
  
  beforeRouteEnter(to, from, next) {
    axios.all([
      axios.get(`http://zizaixian.top/info/${to.params.vid}`),
      axios.get('http://zizaixian.top/main/random'),
    ])
      .then(axios.spread((resInfo, resRandom) => {
        next(vm => vm.setVideoData(resInfo.data, resRandom.data));
      }))
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  beforeRouteUpdate(to, from, next) {
    axios.get(`http://zizaixian.top/info/${to.params.vid}`)
      .then(response => {
        this.flushVideoInfo(response.data);
      })
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  methods: {
    setVideoData(videoInfoData, randomVideoData) {
      if (videoInfoData.info) {
        this.videoInfo = videoInfoData.info;
        this.rdItems = randomVideoData;
        this.$loaded();
      } else {
        this.$message('error','加载网站数据失败');
        setTimeout(this.$router.go, 1000, -1);
      }
    },

    flushVideoInfo(videoInfoData) {
      if (videoInfoData.info) {
        this.videoInfo = videoInfoData.info;
        this.scrollToTop();
        this.$loaded();
      } else {
        this.$message('error','加载网站数据失败');
      }
    },

    scrollToTop() {
      window.scroll(0,0);
    }
  }
}
</script>
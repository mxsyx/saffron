<!-- Info Page -->

<template>
  <div class="page">
    <InfoBox
      v-if="videoInfo"
      v-bind:videoInfo="videoInfo"
    />
    <AddrBoxBottom
      v-bind:videoInfo="videoInfo"
    />
    <DisplayBox
      type="random"
      headerTip="随机推荐"
      v-bind:videoItems="rdItems"
      v-on:flush-random="fetchRandomVideoData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import InfoBox from "@/components/InfoBox";
import AddrBoxBottom from '@/components/AddrBoxBottom';
import DisplayBox from '@/components/DisplayBox';

export default {
  props: ['vid'],

  components: {
    InfoBox,
    AddrBoxBottom,
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
    axios.get(`http://zizaixian.top/v2/info/${to.params.vid}`)
      .then(response => {
        next(vm => vm.setData(response.data));
      })
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  beforeRouteUpdate(to, from, next) {
    axios.get(`http://zizaixian.top/v2/info/${to.params.vid}`)
      .then(response => {
        this.setData(response.data);
        next();
      })
      .catch(error => {
        this.$message('error', '加载网站数据失败')
      });
  },

  methods: {
    setData(data) {
      if (data.videoInfo) {
        this.videoInfo = data.videoInfo;
        this.rdItems = data.randomVideo;
        this.scrollToTop();
        this.$loaded();
      } else {
        this.$message('error','加载网站数据失败');
        setTimeout(this.$router.go, 1000, -1);
      }
    },

    fetchRandomVideoData() {
      axios.get('http://zizaixian.top/v2/random')
        .then(response => {
          this.rdItems = response.data.randomVideo;
        })
        .catch(error => {
          this.$message('error','随机获取视频数据失败')
        })
    },
    
    scrollToTop() {
      window.scroll(0,0);
    },
  }
}
</script>
<!-- Find Page -->

<template>
  <div class="page">
    <DisplayBox
      type="search"
      headerTip="搜索结果"
      v-bind:videoItems="videoItems"
    />
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import DisplayBox from '@/components/DisplayBox'

export default {
  name: "Find",
  
  components: {
    DisplayBox,
  },
  
  mixins: [mixin],
  
  data() {
    return {
      videoItems: [],
      end: true,
      currentPage: 0,
      searchType: this.$route.params.type,
      searchContent: this.$route.params.content,
      loadLock: false,
    }
  },

  mounted() {
    this.monitorScroll();
  },

  beforeRouteEnter(to, from, next) {
    const searchType = to.params.type;
    const postData = {
      content: to.params.content,
      page: 0,
    }

    axios.post(`/v2/find/${searchType}`, postData)
      .then(response => {
        next(vm => vm.setData(response.data));
      })
      .catch(err => {
        console.log(err);
      })
  },

  beforeRouteUpdate(to, from, next) {
    this.flushMeta(to);
   
    const postData = {
      content: to.params.content,
      page: 0,
    }

    axios.post(`/v2/find/${this.searchType}`, postData)
      .then(response => {
        this.setData(response.data, false);
        next();
      })
      .catch(err => {
        console.log(err);
      })
  },

  methods: {
    setData(data) {
      if (data.result.length === 0) {
        this.$message('info', '没有找到该影片');
      } else {
        this.videoItems.push.apply(this.videoItems, data.result);
        this.end = data.end;
        ++this.currentPage;
        this.loadLock = false;
      }
      this.$loaded();
    },

    flushMeta(to) {
      this.videoItems = [];
      this.end = true;
      this.currentPage = 0;
      this.searchType = to.params.type;
      this.searchContent = to.params.content;
      this.loadLock = false;
    },

    fetchMore() {
      const postData = {
        content: this.searchContent,
        page: this.currentPage,
      }

      axios.post(`/v2/find/${this.searchType}`, postData)
        .then(response => {
          this.setData(response.data)
        })
        .catch(err => {
          // console.log(err);
        })
    },

    /**
     * 监听滚动条事件
     * 当滚动条滚动时加载剩余内容
     */
    monitorScroll() {
      // 上一次滚动条距顶部高度
      let prevScrollTop = 0;
      const rootElement = document.documentElement;
      
      document.addEventListener('scroll', () => {
        const currentScrollTop = rootElement.scrollTop;
        
        // 滚动条向上滚动，返回
        if (currentScrollTop < prevScrollTop) {
          prevScrollTop = currentScrollTop;
          return ;
        }

        if (rootElement.getBoundingClientRect().bottom < 
              rootElement.clientHeight + 300 
              && !this.end && !this.loadLock) {
          this.loadLock = true;
          this.fetchMore();
        }
        prevScrollTop = currentScrollTop;
      })
    }

  }
}
</script>
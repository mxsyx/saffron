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
      searchContent: this.$route.params.content.trim(),
      loadLock: false,
      prevScrollTop: 0,
    }
  },

  mounted() {
    document.addEventListener('scroll', this.handleScroll);
  },

  beforeRouteEnter(to, from, next) {
    const postData = {
      type: to.params.type,
      content: to.params.content.trim(),
      page: 0,
    }

    axios.post(`/v2/findby`, postData)
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
      type: this.searchType,
      content: to.params.content,
      page: 0,
    }

    axios.post(`/v2/findby`, postData)
      .then(response => {
        this.setData(response.data, false);
        next();
      })
      .catch(err => {
        console.log(err);
      })
  },

  beforeRouteLeave(to, from, next) {
    document.removeEventListener('scroll', this.handleScroll);
    next();
  },

  methods: {
    setData(data, append=true) {
      if (data.result.length === 0) {
        this.$message('info', '没有找到该影片');
      } else {
        if (append) {
          this.videoItems.push.apply(this.videoItems, data.result);
        } else {
          this.videoItems = data.result;
        }
        this.end = data.end;
        ++this.currentPage;
        this.loadLock = false;
      }
      this.$loaded();
    },

    flushMeta(to) {
      this.end = true;
      this.currentPage = 0;
      this.searchType = to.params.type;
      this.searchContent = to.params.content;
      this.loadLock = false;
      this.prevScrollTop = 0;
    },

    fetchMore() {
      const postData = {
        type: this.searchType,
        content: this.searchContent.trim(),
        page: this.currentPage,
      }

      axios.post(`/v2/findby`, postData)
        .then(response => {
          this.setData(response.data)
        })
        .catch(err => {
          // console.log(err);
        })
    },

    handleScroll() {
      const rootElement = document.documentElement;
      const currentScrollTop = rootElement.scrollTop;

      // 滚动条向上滚动，返回
      if (currentScrollTop < this.prevScrollTop) {
        this.prevScrollTop = currentScrollTop;
        return ;
      }
      
      if (rootElement.getBoundingClientRect().bottom < 
            rootElement.clientHeight + 300 
            && !this.end && !this.loadLock) {
        this.loadLock = true;
        this.fetchMore();
      }
      this.prevScrollTop = currentScrollTop;
    },
  }
}
</script>
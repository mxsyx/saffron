<!-- Nava Page -->

<template>
  <div class="page">
    <DisplayBox
      type="nava"
      headerTip="分类查询"
      v-bind:videoItems="videoItems" 
    />
  </div>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import DisplayBox from '@/components/DisplayBox'


export default {
  name: "Nave",

  components: {
    DisplayBox,
  },

  mixins: [mixin],

  data() {
    return {
      type: this.$route.params.type,
      year: this.$route.params.year,
      area: this.$route.params.area,
      end: true,
      currentPage: 0,
      videoItems: [],
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
      year: to.params.year,
      area: to.params.area,
      page: 0,
    }

    axios.post(`/v2/nava`, postData)
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
      type: this.type,
      year: this.year,
      area: this.area,
      page: this.currentPage,
    }

    axios.post(`/v2/nava`, postData)
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
    setData(data) {
      if (data.result.length === 0) {
        this.$message('info', '没有找到诶');
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
      this.type = to.params.type;
      this.year = to.params.year;
      this.area = to.params.area;
      this.loadLock = false;
    },

    fetchMore() {
      const postData = {
        type: this.type,
        year: this.year,
        area: this.area,
        page: this.currentPage,
      }

      axios.post(`/v2/nava`, postData)
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

<style>

</style>
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
      searchTypes = ['byname'],
      searchType = '',
    }
  },

  mounted() {
    this.searchType = this.$route.params;

    let prevScrollTop = 0;
    document.addEventListener('scroll', () => {
      const currentScrollTop = document.documentElement.scrollTop;
      if (currentScrollTop < prevScrollTop) {
        prevScrollTop = currentScrollTop;
        return ;
      }

      if (document.documentElement.getBoundingClientRect().bottom <
          document.documentElement.clientHeight + 100 && !this.end) {
        
      }
      prevScrollTop = currentScrollTop;
    })
  },

  beforeRouteEnter(to, from, next) {
    const searchTypes =  ['byname']
    const searchType = to.params.type;
    if (searchTypes.indexOf(searchType) === -1) {
      next();
    }

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
    const searchTypes =  ['byname']
    const searchType = to.params.type;
    if (searchTypes.indexOf(searchType) === -1) {
      next();
    }

    axios.get(`/v2/find/${searchType}/${to.params.content}`)
      .then(response => {
        this.setData(response.data);
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
      }
      this.$loaded();
    },

    fetchMore() {
      if (searchTypes.indexOf(searchType) === -1) {
        next();
      }

      axios.get(`/v2/find/${searchType}/${to.params.content}`)
        .then(response => {
          this.setData(response.data);
        })
        .catch(err => {
          console.log(err);
        })
    }*/
  }
}
</script>

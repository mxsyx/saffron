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
      videoItems: null,
    }
  },

  beforeRouteEnter(to, from, next) {
    const searchTypes =  ['byname']
    const searchType = to.params.type;
    if (searchTypes.indexOf(searchType) === -1) {
      next();
    }

    axios.get(`/v2/find/${searchType}/${to.params.content}`)
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
      if (data.searchResult.length === 0) {
        this.$message('info', '没有找到该影片');
      } else {
        this.videoItems = data.searchResult;
      }
      this.$loaded();
    }
  }
}
</script>

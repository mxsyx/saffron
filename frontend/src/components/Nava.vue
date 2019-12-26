<!-- Nava Page -->

<template>
  <div class="page">
    <div class="nava-box">
      <ul>
        电影类型：
        <li
          v-for="type in mvTypes" 
          v-bind:key="type.key"
          v-on:click="changeType(type)"
          v-bind:class="{active: type===activeType}"
        >{{ type }}</li>
      </ul>
      <ul>
        电视剧类型：
        <li
          v-for="type in tvTypes" 
          v-bind:key="type.key"
          v-on:click="changeType(type)"
          v-bind:class="{active: type===activeType}"
        >{{ type }}</li>
      </ul>
      <ul>
        年份：
        <li
          v-for="year in years" 
          v-bind:key="year.key"
          v-on:click="changeYear(year)"
          v-bind:class="{active: year===activeYear}"
        >{{ year }}</li>
      </ul>
      <ul>
        地区：
        <li
          v-for="area in areas" 
          v-bind:key="area.key"
          v-on:click="changeArea(area)"
          v-bind:class="{active: area===activeArea}"
        >{{ area }}</li>
      </ul>
    </div>
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
      mvTypes: [
        '全部',
        '动作片','喜剧片','爱情片','科幻片','恐怖片',
        '剧情片','战争片','伦理片','微电影'
      ],
      tvTypes: [
        '国产剧','香港剧','台湾剧','日本剧','韩国剧','欧美剧',
        '海外剧','动漫剧'
      ],
      years: [
        '全部',
        '2019','2018','2017','2016','2015','2014',
        '2013','2012','2011','2010','更早'
      ],
      areas: [
        '全部',
        '大陆','香港','台湾','日本','韩国','美国','英国',
        '德国','法国','意大利','西班牙','加拿大','泰国',
        '印度','其它'
      ],
      activeType: this.$route.params.type,
      activeYear: this.$route.params.year,
      activeArea: this.$route.params.area,
    }
  },

  mounted() {
    document.addEventListener('scroll', this.handleScroll);
  },

  watch: {
    'type'() { this.flushRoute() },
    'year'() { this.flushRoute() },
    'area'() { this.flushRoute() }, 
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
    setData(data, append=true) {
      if (data.result.length === 0) {
        this.$message('info', '没有找到诶');
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
      this.type = to.params.type;
      this.year = to.params.year;
      this.area = to.params.area;
      this.activeType = to.params.type;
      this.activeYear = to.params.year;
      this.activeArea = to.params.area;
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

    changeType(type) {
      this.type = type;
      this.activeType = type;
    },

    changeYear(year) {
      this.year = year;
      this.activeYear = year;
    },

    changeArea(area) {
      this.area = area;
      this.activeArea = area;
    },

    flushRoute() {
      this.$router.push({ 
        name: 'nava',
        params: {
          type: this.type,
          year: this.year,
          area: this.area,
        }
      });
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
.nava-box {
  background-color: #F5F5F5;
  padding: 1rem;
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 1rem;
}

.nava-box ul li{
  cursor: pointer;
  display: inline-block;
  color: #333333;
  padding: 0.25rem 0.6rem;
  border-radius: 5px;
}

.nava-box ul li:hover{
  color: var(--third-color);
}

.active {
  color: #ffffff !important;
  background-color: #ff9900;
}
</style>

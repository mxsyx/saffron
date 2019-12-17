<!-- 播放线路盒 -->

<template>
  <div class="addr-box">
    <header>
      <div>
        <h5>播放线路</h5>
        <div class="btn-box">
          <button
            class="btn btn-addr"
            v-for="addr in addrs"
            v-bind:key="addr.key"
            v-on:click="changeAddr(addr.id)"
          >
            线路 {{ addr.id }}
          </button>
        </div>
      </div>
    </header>

    <ul class="row addr-box"
        v-for="plAddr in plAddrs"
        v-bind:key="plAddr.key"
        v-bind:class="{hidden: addr.hidden}">
      <li
        class="col-sm-3 col-md-2 col-lg-1"
        v-for="index in generateArray(addr.numEpisode)"
        v-bind:key="index.key"
      >
        <router-link v-bind:to="`/play/${vid}/${addr.id}/${index+1}`">
          第 {{ index + 1 }} 集
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    plAddrs: Array,
  },
  
  watch: {
    plAddrs: function() {
      const tatal = this.plAddrs.length;
      const tatals = [0,0,0,0,0,0];
      for(let i = 0; i < tatal; i++) {
        if (this.plAddrs[i].addr1) tatals[1]++;
        if (this.plAddrs[i].addr1) tatals[1]++;
        if (this.plAddrs[i].addr1) tatals[1]++;
        if (this.plAddrs[i].addr1) tatals[1]++;
        if (this.plAddrs[i].addr1) tatals[1]++;
      }
    }
  },

  data() {
    return {
      // 活动线路ID
      activeAddr: 1,
      addrs: [
        {
          id: 1,
          hidden: true,
          numEpisode: 32
        },
        { 
          id: 2,
          hidden: true,
          numEpisode: 32
        },
        {
          id: 3,
          hidden: true,
          numEpisode: 32 
        },
        {
          id: 4,
          hidden: true,
          numEpisode: 32
        },
        {
          id: 5,
          hidden: true,
          numEpisode: 32
        },
        {
          id: 6,
          hidden: true,
          numEpisode: 32
        }
      ]
    }
  },



  methods: {

  }
}
</script>

<style scoped>

</style>
<!-- 播放线路盒 -->

<template>
  <div>
    <ul
      class="row addr-box"
      v-for="addr in addrs"
      v-bind:key="addr.key"
      v-bind:class="{hidden: addr.hidden}"
    >
      <li
        class="col-sm-3 col-md-2 col-lg-1"
        v-for="index in generateArray(addr.length)"
        v-bind:key="index.key"
      >
        <a v-if="addr[index]" v-bind:href="addr[index]">
          第 {{ index + 1 }} 集
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    plAddrs: Array
  },

  watch: {
    plAddrs: function() {
      const plAddrArray = 
          this.objectsToArray(this.plAddrs);
      this.addrs = this.transpose(plAddrArray);
    }
  },

  data() {
    return {
      // 活动线路ID
      activeAddr: 1,
      addrs: null,  
    };
  },

  methods: {
    // 将对象的值转换为二维数组
    objectsToArray(obj) {
      return obj.map((ele, i) => {
        return Object.values(ele);
      });
    },

    // 转置二维数组
    transpose(array) {
      return array[0].map((col, i) => {
        return array.map(row => row[i]);
      });
    },

    // 生成内容为数字1-n的数组
    generateArray: function(n) {
      return Array.from(new Array(n).keys());
    },
    
  }
};
</script>

<style scoped>

</style>
<template>
  <div class="display-box-item col-sm-4 col-md-3 col-lg-2">
    <a
      class="video-img"
      v-bind:href="`/info/${id}`"
      v-bind:style="{ backgroundImage: handleBackgroudImage(imgaddr)}"
    >
      <span></span>
    </a>
    <div class="video-desc">
      <a v-bind:href="`/info/${id}`">{{ name }}</a>
      <span>{{ actors }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayBoxItem",
  
  props: {
    id: Number,
    imgaddr: String,
    name: String,
    actors: String,
  },

  methods: {
    handleBackgroudImage(imgaddr) {
      return `url(http://zizaixian.top${imgaddr}),
              url(http://zizaixian.top/img/404/bg404.png)`
    }
  }
};
</script>

<style>
.display-box-item {
  overflow: hidden;
  margin: 0.5rem 0rem 0rem;
  padding: 0rem 0.375rem;
  box-sizing: border-box;
}

.video-img {
  display: block;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 0px;
  padding-bottom: 138%;
  position: relative;
  border-radius: 5px;
}

.video-img span {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  display: none;
  border-radius: 5px;
  background-image: url("../assets/icon/action.svg");
  background-repeat: no-repeat;
  background-size: 30% 30%;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.video-img:hover span {
  display: block;
}

/* 视频名字、演员  */
.video-desc {
  width: 100%;
}

.video-desc a,
.video-desc span {
  width: 100%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-desc a {
  color: #333;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.3rem 0rem;
}
.video-desc a:hover {
  color: var(--main-color);
  text-decoration: underline;
}

.video-desc span {
  font-size: 0.6rem;
  color: #999;
}
</style>
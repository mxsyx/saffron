<template>
  <div class="video-info row">
    <!-- 视频图片展示 -->
    <div class="video-info-img col-sm-4 col-md-2 col-lg-2">
      <img v-bind:src="'http://zizaixian.top'+videoInfo.imgaddr" alt="图片找不到了" >
    </div>

    <!-- 只在小型/中型设备上显示 -->
    <div class="video-info-detail col-sm-8 col-md-10 hidden-lg">
      <h2>{{ videoInfo.name }}</h2>
      <div>
        <span class="info-tip">导演：</span>
        <span class="info-content">
          <a href>{{ videoInfo.director }}</a>
        </span>
      </div>
      <div>
        <span class="info-tip">主演：</span>
        <span class="info-content">
          <a
            v-for="actor in splitActors(videoInfo.actors)" 
            v-bind:key="actor.key"
            v-bind:href="'search/' + actor">{{ actor }}、
          </a>
        </span>
      </div>
      <div>
        <span class="info-tip">分类：</span>
        <span class="info-content">
          <a href>{{ videoInfo.type }} | </a>
          <a href>{{ videoInfo.area }} | </a>
          <a href>{{ videoInfo.year }}</a>
        </span>
      </div>
    </div>
    
    <!-- 视频信息详情 -->
    <div class="video-info-detail col-sm-12 col-md-12 col-lg-10">
      <!-- 名字 -->
      <h2 class="hidden-sm hidden-md">{{ videoInfo.name }}</h2>
      <!-- 导演 -->
      <div class="hidden-sm hidden-md">
        <span class="info-tip">导演：</span>
        <span class="info-content">
          <a href>{{ videoInfo.director }}</a>
        </span>
      </div>
      <!-- 演员 -->
      <div class="hidden-sm hidden-md">
        <span class="info-tip">主演：</span>
        <span class="info-content">
          <a v-for="actor in videoInfo.actors"
             v-bind:key="actor.key"
             v-bind:href="'search/' + actor">{{ actor }}、
          </a>
        </span>
      </div>
      <!-- 视频源信息 -->
      <div class="row hidden-sm hidden-md">
        <!-- 视频类型 -->
        <div class="col-sm-4 col-md-3 col-lg-2">
          <span class="info-tip">类型：</span>
          <span class="info-content">
            <a href>{{ videoInfo.type }}</a>
          </span>
        </div>
        <!-- 视频年代 -->
        <div class="col-sm-4 col-md-4 col-lg-2">
          <span class="info-tip">年代：</span>
          <span class="info-content">
            <a href>{{ videoInfo.year }}</a>
          </span>
        </div>
        <!-- 视频地区 -->
        <div class="col-sm-4 col-md-4 col-lg-2">
          <span class="info-tip">地区：</span>
          <span class="info-content">
            <a href>{{ videoInfo.area }}</a>
          </span>
        </div>
        <!-- 视频语言 -->
        <div class="col-sm-4 col-md-4 col-lg-2">
          <span class="info-tip">语言：</span>
          <span class="info-content">{{ videoInfo.lang }}</span>
        </div>
        <!-- 视频总播放量 -->
        <div class="col-sm-4 col-md-4 col-lg-2">
          <span class="info-tip">总播放量：</span>
          <span class="info-content">{{ videoInfo.volume }}</span>
        </div>
      </div>

      <!-- 视频简介 -->
      <div class="row summary">
        <div class="col-sm-11 col-md-11 col-lg-11">
          <span class="info-tip">简介：</span>
          <span class="info-content" 
                v-bind:class="{wrap: showSummaryDetaile}">{{ videoInfo.summary }}
          </span>
        </div>
        <i class="fa fa-angle-down col-sm-1 col-md-1 col-lg-1"
           title="详情" v-on:click="switchShowSummaryDetaile">
        </i>
      </div>

      <!-- 更新日期 -->
      <div class="row hidden-sm hidden-md">
        <div class="col-sm-12 col-md-12 col-lg-3">
          <span class="info-tip">更新日期：</span>
          <span class="info-content">{{ videoInfo.update }}</span>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="row">
        <button class="btn btn-play">
          <i class="fa fa-play"></i>
          <span>立即播放</span>
        </button>
        <button class="btn btn-download">
          <i class="fa fa-download" aria-hidden="true"></i>
          <span>下载</span>
        </button>
        <button class="btn btn-collect">
          <i class="fa fa-star"></i>
          <span>收藏</span>
        </button>
        <button class="btn btn-score hidden-sm hidden-md">
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
          <span>顶({{ videoInfo.love }})</span>
        </button>
        <button class="btn btn-score hidden-sm hidden-md">
          <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
          <span>踩({{ videoInfo.hate }})</span>
        </button>
        <button class="btn btn-share" v-on:click="openShareModal">
          <i class="fa fa-share-alt" aria-hidden="true"></i>
          <span>分享</span>
        </button>
      </div>
    </div>

    <!-- 分享模态框 -->
    <Modal ref="shareModal"
           v-bind:modalTip="modalTip">
      <Share
        v-bind:name="videoInfo.name"
        v-bind:href="href"
        v-bind:summary="videoInfo.summary"
        v-bind:imgaddr="videoInfo.imgaddr"
      ></Share>
    </Modal>
  </div>
</template>

<script>
import Share from "@/components/Share.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: 'InfoBox',
  props: {
    videoInfo: Object
  },

  data: function() {
    return {
      href: 'https://zizaixian.top/info/movie/18724/',
      modalTip: "喜欢就分享给好友吧",
      showSummaryDetaile: false
    };
  },

  methods: {
    openShareModal: function() {
      this.$refs.shareModal.openModal();
    },
    
    switchShowSummaryDetaile: function() {
      this.showSummaryDetaile = !this.showSummaryDetaile;
    },
    
    splitActors(actors) {
      console.log(actors);
      return actors.split(' ');
    }
  },

  components: {
    Share,
    Modal,
  }
};
</script>

<style scoped>
.video-info {
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;
  background: linear-gradient(
    to bottom, 
    var(--nav-color),
    var(--nav-color), 20%,
    var(--nav-color), 20%,
    #ffffff);
}
@media (max-width: 1119px) {
  .video-info {
    background: linear-gradient(
      to bottom, 
      var(--nav-color),
      var(--nav-color), 25%,
      var(--nav-color), 25%,
      #ffffff);
  }
}

/* 左侧侧视频图片 */
.video-info-img img {
  width: 100%;
  border-radius: 8px;
}

/* 右侧视频信息 */
.video-info-detail {
  overflow: hidden;
  padding: 0rem 1rem;
  box-sizing: border-box;
}
@media (max-width: 1119px) {
  .video-info-detail {
    padding: 0rem;
  }
  .video-info-detail.hidden-lg {
    padding: 0rem 0.5rem;
  }
}

.video-info-detail h2 {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0.6rem 0rem;
}

.video-info-detail > div {
  padding: 0.3rem 0rem;
}
.video-info-detail > div:nth-child(2) {
  padding: 0.6rem 0rem 0.3rem;
}
@media (max-width: 1119px) {
  .video-info-detail > div {
    padding: 0.1rem 0rem;
  }
}

.summary > div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wrap {
  white-space: normal;
}

.summary > i {
  color: #444;
  font-size: 0.8rem;
  line-height: 1.2rem;
  cursor: pointer;
}
.summary > i:hover {
  color: var(--sub-color);
}

.info-tip {
  font-size: 0.8rem;
  color: #666;
}

.info-content,
.info-content a {
  font-size: 0.8rem;
  color: rgb(51, 51, 51);
}

.info-content a:hover {
  color: #f50000;
  text-decoration: underline;
}
</style>
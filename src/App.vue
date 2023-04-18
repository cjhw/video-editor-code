<template>
  <div class="app-container">
    <div class="resource-list">
      <input
        ref="uploadInput"
        v-show="false"
        type="file"
        multiple
        @change="changeFile"
      />
      <div class="handle-wrapper">
        <a-button type="primary" @click="addFile('media')">添加媒体</a-button>
        <a-button type="primary">添加媒体</a-button>
        <a-button type="primary">添加媒体</a-button>
      </div>
      <div class="file-list">
        <resource-item
          draggable="true"
          v-for="(item, index) in mediaList"
          :file="item"
          :key="item.key"
          @play="handlePlay(item)"
          @del="handleDel(index)"
        />
      </div>
    </div>
    <div class="view">
      <div class="window">
        <div class="screen">
          <video :src="previewSrc" controls autoplay></video>
        </div>
        <div class="screen">
          <video :src="renderSrc" controls autoplay></video>
        </div>
      </div>
      <div class="time-line">
        <div class="line"></div>
      </div>
      <div class="tool-bar"></div>
    </div>
    <!--加载弹窗-->
    <progress-dialog
      :title="progressTitle"
      v-if="progressVisible"
      :number="progressNumber"
      :count="progressCount"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import ResourceItem from "@/components/resource-item.vue";
import ProgressDialog from "@/components/progress-dialog.vue";
import ResourceFile from "@/target/file.js";
import { checkMediaFile } from "@/utils/index.js";
import ft from "@/utils/ffmpeg.js";

ft.instance();
const uploadInput = ref(null);
const previewSrc = ref("");
// 预览
const renderSrc = ref("");

// 进度条
const progressTitle = ref("");
const progressNumber = ref(0);
const progressCount = ref(100);
const progressVisible = ref(false);

// 媒体资源 图片 视频 音频
const mediaList = reactive([]);
let addType = "";
const addFile = (type) => {
  addType = type;
  uploadInput.value.click();
};
// 选择文件
const changeFile = function (e) {
  const files = e.target.files;
  const mediaLoadList = [];
  console.log("文件列表", files);
  for (let i = 0; i < files.length; i++) {
    const file = new ResourceFile(files[i]);
    console.log("文件", file);
    file.setSize("AUTO");
    if (addType === "media") {
      if (checkMediaFile(file)) {
        file.setMedia();
        mediaLoadList.push(file);
        continue;
      }
    }
  }
  if (addType === "media") {
    loadMediaFile(mediaLoadList);
  }
};
// 加载文件
const loadMediaFile = async (list) => {
  console.log("加载文件", list);
  openLoadProgress(list.length, "加载资源文件");
  let i = 0;
  for (const file of list) {
    await ft.loadFile(file);
    mediaList.push(file);
    i++;
    setLoadProgressNumber(i);
  }
  setTimeout(() => {
    closeLoadProgress();
  }, 100);
};

// 打开进度条
const openLoadProgress = (count, title = "加载中") => {
  progressVisible.value = true;
  progressCount.value = count;
  progressNumber.value = 0;
  progressTitle.value = title;
};
// 设置进度条值
const setLoadProgressNumber = (val) => {
  progressNumber.value = val;
};
// 关闭进度条
const closeLoadProgress = () => {
  progressVisible.value = false;
  progressCount.value = 0;
  progressNumber.value = 0;
  progressTitle.value = "";
};

const handlePlay = (file) => {
  console.log("播放文件", file);
  previewSrc.value = file.url;
};
const handleDel = (index) => {
  console.log("删除文件", index);
  mediaList.splice(index, 1);
};
</script>

<style lang="scss" scoped>
@import "./global/global.scss";
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
}
.resource-list {
  display: flex;
  flex-direction: column;
  width: $resource-width;
  height: 100%;
  box-sizing: border-box;
  border-right: $border-color 1px solid;

  width: 100%;
  .handle-wrapper {
    display: flex;
    justify-content: space-around;
  }
  .file-list {
    width: 300px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.view {
  flex: 1;
  display: flex;
  flex-direction: column;
  .window {
    flex: 1;
    box-sizing: border-box;
    border-bottom: $border-color 1px solid;
    display: flex;
    .screen {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        border-right: $border-color 1px solid;
      }
    }
    video {
      width: 100%;
      max-height: 100%;
    }
  }
  .time-line {
    width: calc(100vw - $resource-width);
    height: 300px;
    box-sizing: border-box;
    border-bottom: $border-color 1px solid;
    overflow-x: scroll;
  }
}
</style>

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
    </div>
    <div class="view">
      <div class="window"></div>
      <div class="time-line">
        <div class="line"></div>
      </div>
      <div class="tool-bar"></div>
    </div>
    <!-- 时间轴示例-->
    <div class="hidden">
      <div id="move" ref="moveBlock"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const uploadInput = ref(null);
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
    if (addType === "media") {
    }
  }
  if (addType === "media") {
  }
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

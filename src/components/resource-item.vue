<template>
  <div class="line" :title="file.toString()">
    <div class="icon">
      <img v-if="file.cover" :src="file.cover" />
      <span v-else>无图</span>
    </div>
    <div class="info">
      <div class="filename" :title="file.name">{{ file.name }}</div>
      <div class="box-flex">
        <div class="size">{{ file.durationStr }}</div>
        <div class="date">{{ file.sizeStr }}</div>
      </div>
      <div class="handle">
        <a-button class="btn" size="small" type="primary" @click="handlePlay"
          >播放</a-button
        >
        <a-button class="btn" size="small" danger @click="handleDel"
          >删除</a-button
        >
        <div class="file-type">
          <div class="mp4" v-if="file.ext === 'mp4'">mp4</div>
          <div class="mp3" v-if="file.ext === 'mp3'">mp3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ResourceFile from "@/target/file.js";
import { toRef } from "vue";
const emit = defineEmits(["del", "play"]);
const props = defineProps({
  file: { type: Object, required: true, default: () => new ResourceFile() },
});
const file = toRef(props, "file");
const handleDel = () => {
  console.log("点删除");
  emit("del");
};
const handlePlay = () => {
  console.log("点播放");
  emit("play");
};
</script>

<style lang="scss" scoped>
@import "../global/global.scss";
.line {
  user-select: none;
  box-sizing: border-box;
  border: $resource-border-color solid 1px;
  height: 100px;
  display: flex;
  .icon {
    width: 50px;
    box-sizing: border-box;
    border: 1px dashed #999;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 5px;
    .box-flex {
      display: flex;
      justify-content: space-between;
    }
    .del {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      background-color: palevioletred;
      font-size: 10px;
      color: #fff;
      cursor: pointer;
      border-radius: 2px;
    }
    .play {
      position: absolute;
      right: 25px;
      top: 5px;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      background-color: palevioletred;
      font-size: 10px;
      color: #fff;
      cursor: pointer;
      border-radius: 2px;
    }
    .handle {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn {
        margin-right: 8px;
      }
      .file-type {
        height: 15px;
        line-height: 15px;
        text-align: center;
        font-size: 10px;
        border-radius: 2px;
        padding: 0 5px;
        .mp4 {
          color: #fff;
          background-color: #07b3c9;
        }
        .mp3 {
          color: #fff;
          background-color: #d9b608;
        }
      }
    }
    .filename {
      font-size: 6px;
      width: 220px;
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .size {
      font-size: 6px;
      text-align: left;
    }
    .date {
      font-size: 6px;
      text-align: right;
      margin-right: 5px;
    }
  }
}
</style>

<template>
  <div class="tool-wrapper">
    <div class="tab">添加字幕</div>
    <div class="tool-content">
      <a-form-item label="字幕内容" required>
        <a-input placeholder="请输入字幕内容" v-model:value="text" />
      </a-form-item>
      <a-form-item label="字幕时长" required>
        <a-input-number placeholder="请输入字幕显示时长" v-model:value="time" />
      </a-form-item>
      <div class="handle-btn">
        <a-button @click="handleCreate">添加</a-button>
        <a-button @click="handleRender">渲染</a-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const text = ref("");
const time = ref();
const emit = defineEmits(["create", "render"]);
const handleCreate = () => {
  console.log("添加", text.value);
  emit("create", text.value, time.value);
  text.value = "";
};
const handleRender = () => {
  console.log("渲染");
  emit("render");
};
</script>

<style scoped lang="scss">
.tool-wrapper {
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .tab {
    margin-bottom: 8px;
  }
  .handle-btn {
    display: flex;
    justify-content: space-around;
  }
}
</style>

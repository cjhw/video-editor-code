<template>
  <div class="tool-wrapper">
    <div class="tab">添加字幕</div>
    <div class="tool-content">
      <a-form :label-col="{ span: 9 }" :model="formState">
        <a-form-item label="字幕内容" name="text" required>
          <a-input
            placeholder="请输入字幕内容"
            v-model:value="formState.text"
          />
        </a-form-item>
        <a-form-item label="字幕时长" name="time">
          <a-input-number
            placeholder="请输入字幕显示时长"
            v-model:value="formState.time"
          />
        </a-form-item>
        <a-form-item label="字幕大小" name="fontSize">
          <a-input
            placeholder="请输入字幕大小(px)"
            v-model:value="formState.fontSize"
          />
        </a-form-item>
        <a-form-item label="字幕x轴位置" name="fontX">
          <a-input
            placeholder="请输入字幕x轴位置(px)"
            v-model:value="formState.fontX"
          />
        </a-form-item>
        <a-form-item label="字幕y轴位置" name="fontY">
          <a-input
            placeholder="请输入字幕y轴位置(px)"
            v-model:value="formState.fontY"
          />
        </a-form-item>
      </a-form>
      <div class="handle-btn">
        <a-button @click="handleCreate">添加字幕</a-button>
        <a-button @click="handleRender">渲染</a-button>
        <a-button @click="handlePreview">预览</a-button>
        <a-button @click="handleExport">导出</a-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const formState = reactive({
  text: "",
  time: undefined,
  fontSize: undefined,
  fontX: undefined,
  fontY: undefined,
});
const emit = defineEmits(["create", "render", "preview", "export"]);
const handleCreate = () => {
  console.log("添加", formState.text);
  emit("create", formState);
  formState.text = "";
};
const handleRender = () => {
  console.log("渲染");
  emit("render");
};
const handlePreview = () => {
  console.log("预览");
  emit("preview");
};
const handleExport = () => {
  console.log("导出");
  emit("export");
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

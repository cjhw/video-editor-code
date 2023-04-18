<template>
  <div class="dialog-content">
    <div class="dialog-box">
      <div class="header">
        {{ props.title }}
      </div>
      <div class="content">
        <a-progress :percent="percent"></a-progress>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  title: { type: String, required: false, default: "加载中" },
  number: { type: Number, required: true, default: 0 },
  count: { type: Number, required: true, default: 100 },
});
const percent = computed(() => Math.floor((100 * props.number) / props.count));
</script>

<style lang="scss" scoped>
.dialog-content {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-box {
  width: 500px;
  //height: 100px;
  background-color: #fff;
  box-shadow: 0 0 10px #222222;
  border-radius: 5px;
  .header {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #999;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 15px;
  }
}
</style>

<template>
  <a-modal
    v-model:visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
    title="编辑贴图相关信息"
  >
    <a-form :label-col="{ span: 8 }" :model="formState">
      <a-form-item label="贴图时长" name="picTime">
        <a-input
          placeholder="请输入贴图显示时间"
          v-model:value="formState.picTime"
        />
      </a-form-item>
      <a-form-item label="贴图x轴位置" name="picX">
        <a-input
          placeholder="请输入贴图x轴位置(px)"
          v-model:value="formState.picX"
        />
      </a-form-item>
      <a-form-item label="贴图y轴位置" name="picY">
        <a-input
          placeholder="请输入贴图y轴位置(px)"
          v-model:value="formState.picY"
        />
      </a-form-item>
      <a-form-item label="是否使用贴图走马灯" name="isMarquee">
        <a-radio-group v-model:value="formState.isMarquee">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="注意" required>
        使用跑马灯会导致设置的位置信息失效
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, computed, toRefs } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const { visible } = toRefs(props);

const emit = defineEmits(["update:visible", "onOk", "onCancel"]);

const modalVisible = computed({
  get: () => visible.value,
  set: (val) => emit("update:visible", val),
});

const formState = reactive({
  picTime: undefined,
  picX: undefined,
  picY: undefined,
  isMarquee: false,
});

const handleOk = () => {
  modalVisible.value = false;
  emit("onOk", formState);
};
const handleCancel = () => {
  emit("onCancel");
};
</script>

<style lang="scss" scoped></style>

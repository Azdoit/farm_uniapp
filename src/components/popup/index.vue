<template>
  <view w-752 h-380 absolute c-fff bottom-0>
    <view h-72 bg-00BFBF center text-32 @tap="emitShowValue">
      <text font-700>{{ props.field.fieldName }}</text>
      <image
        :src="
          isShow
            ? '/static/images/disaster/down.png'
            : '/static/images/disaster/up.png'
        "
        w-30
        h-30
        ml-10
      />
    </view>
    <view bg-fff text-28 h-308>
      <view c-3d3d3d pt-22 pb-18 px-20 h-68 flex box-border font-700>
        <text>种植作物</text>
        <text ml-20>种植面积</text>
        <text ml-25>承保面积</text>
        <text ml-30>承保率</text>
        <text ml-70>保期</text>
      </view>
      <view c-4e4e4e h-240>
        <view around px-10 py-24 v-show="activeIndex === 0">
          <text >{{ props.field.cropName }}</text>
          <text >{{ props.field.cropArea }}亩</text>
          <text >{{ props.field.contractArea }}亩</text>
          <text c-00bfbf >{{ props.field.contractRate }}</text>
          <view font-700 c-00bfbf>
            <view>{{ props.field.contractStart }}</view>
            <view>至</view>
            <view>{{ props.field.contractEnd }}</view>
          </view>
        </view>
        <view around px-10 py-24 v-show="activeIndex === 1">
          <text >{{ props.field.cropName }}</text>
          <text >{{ props.field.cropArea }}亩</text>
          <text >{{ 20 }}亩</text>
          <text c-00bfbf >{{ props.field.contractRate }}</text>
          <view font-700 c-00bfbf>
            <view>{{ props.field.contractStart }}</view>
            <view>至</view>
            <view>{{ props.field.contractEnd }}</view>
          </view>
        </view>
        <view around py-20 text-30 font-800>
          <view
            :class="{ active: activeIndex === 0 }"
            pb-10
            @tap="activeIndex = 0"
            >种植</view
          >
          <view
            :class="{ active: activeIndex === 1 }"
            pb-10
            @tap="activeIndex = 1"
            >参保</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const emit = defineEmits(["changeShowValue"]);
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
const emitShowValue = () => {
  emit("changeShowValue", props.field.id);
  // console.log(props.field.id);
};
const activeIndex = ref(0);
</script>

<style lang="scss" scoped>
.active {
  border-bottom: 2px solid #00bfbf;
  color: #00bfbf;
}
</style>

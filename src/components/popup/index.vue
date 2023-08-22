<template>
  <view
    w-752
    h-380
    absolute
    c-fff
    bottom-0
    :class="{ popup: props.field.isShow, popDown: !props.field.isShow }"
  >
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
        <swiper
          h-140
          :current="activeIndex"
          @change="activeIndex = $event.detail.current"
        >
          <swiper-item around px-10 py-24>
            <text>{{ props.field.cropName }}</text>
            <text>{{ props.field.cropArea }}亩</text>
            <text>{{ props.field.contractArea }}亩</text>
            <text c-00bfbf>{{ props.field.contractRate }}</text>
            <view font-700 c-00bfbf>
              <view>{{ props.field.contractStart }}</view>
              <view>至</view>
              <view>{{ props.field.contractEnd }}</view>
            </view>
          </swiper-item>
          <swiper-item around px-10 py-24>
            <text>{{ props.field.cropName }}</text>
            <text>{{ props.field.cropArea }}亩</text>
            <text>{{ 20 }}亩</text>
            <text c-00bfbf>{{ props.field.contractRate }}</text>
            <view font-700 c-00bfbf>
              <view>{{ props.field.contractStart }}</view>
              <view>至</view>
              <view>{{ props.field.contractEnd }}</view>
            </view>
          </swiper-item>
        </swiper>
        <view around text-30 pt-20 font-800 h-90 relative box-border>
          <view
            pb-10
            @tap="activeIndex = 0"
            :class="{ active: activeIndex === 0 }"
            >种植</view
          >
          <view
            pb-10
            @tap="activeIndex = 1"
            :class="{ active: activeIndex === 1 }"
            >参保</view
          >
          <view
            absolute
            h-5
            w-100
            bottom-0
            bg-00BFBF
            :class="{ left: activeIndex === 0, right: activeIndex === 1 }"
            class="shortBar"
          ></view>
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
  color: #00bfbf;
}

.shortBar {
  transition: all 0.5s ease;
}
.left {
  left: 18.5%;
}
.right {
  left: 68.5%;
}
</style>

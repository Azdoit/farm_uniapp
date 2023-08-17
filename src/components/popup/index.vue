<template>
  <view w-752 h-400 absolute c-fff :class="{ popup: isShow, popdown: !isShow }">
    <view h-72 bg-00BFBF center text-32 @tap="isShow = !isShow">
      <text font-700>评估结果</text>
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
    <view bg-fff text-28 h-328>
      <view c-3d3d3d pt-22 pb-18 h-68 around box-border font-700>
        <text>田块名称</text>
        <text>灾害种类</text>
        <text>灾害面积</text>
      </view>
      <scroll-view scroll-y c-4e4e4e h-260>
        <view
          v-for="(item, index) in fields"
          :key="index"
          class="list_item"
          flex
          gap-100
          px-60
          py-24
        >
          <text>{{ item.name + (index + 1) }}</text>
          <text>{{ item.type }}</text>
          <text ml-75>{{ item.area + "亩" }}</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped></style>

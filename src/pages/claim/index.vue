<template>
  <view class="wrapper">
    <view class="claim">
      <view class="total">
        <image src="/static/images/claim/total.png" w-72 h-72 />
        <view class="text">
          <text class="text1">累计理赔金额</text>
          <text class="text2">3703686.9</text>
        </view>
      </view>
      <view class="count">
        <image
          src="/static/images/claim/count.png"
          mode="scaleToFill"
          w-57.3
          h-69.6
        />
        <view class="text">
          <text>累计理赔次数</text>
          <text class="text2">5</text>
        </view>
      </view>
    </view>
    <view w-full>
      <view class="tools" m-auto>
        <view v-for="(item, index) in tools" :key="item.name">
          <view v-if="item.hasBadge" class="tool" relative>
            <image :src="item.img" mode="scaleToFill" w-92 h-92 />
            <view class="text">{{ item.name }}</view>
            <view
              w-92
              h-40
              bg-ff1414
              absolute
              top--20
              right--75
              rd-r-40
              rd-lt-40
              color-white
              text-20
              text-center
              lh-40
            >
              已到账</view
            >
          </view>
          <view class="tool" v-else="!item.hasBadge">
            <image :src="item.img" mode="scaleToFill" w-92 h-92 />
            <view class="text">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="cal-fast">
      <text class="text">理赔计算器</text>
    </view>
    <view class="cal-list">
      <view class="cal-list_title">
        <text v-for="(item, index) in damageText" :key="index">{{
          item.name
        }}</text>
      </view>
      <view class="cal-list_content">
        <view class="list">
          <view v-for="(item, index) in calList" :key="index" class="list_item">
            <text class="damageText">{{ item.name }}</text>
            <uni-data-select
              v-model="item.value"
              :localdata="item.range"
              @change="change"
            ></uni-data-select>
            <input type="text" placeholder="请输入" w-140 h-50 border3 rd-10/>
            <view  center gap-6 >
              <text>{{ item.money }}</text>
              <image src="/static/images/claim/explain.png" w-20 h-20 @tap="showToast"/>
            </view>
          </view>
        </view>
        <view class="add">
          <text>+</text>
        </view>
        <view class="total">
          <text class="text">理赔金额合计:</text>
          <text class="number">{{ 740737.38 + "元" }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();
console.log(safeAreaInsets);
const value = ref(2);
const tools = reactive([
  {
    img: "/static/images/claim/claim.png",
    name: "发起理赔",
    hasBadge: false,
  },
  {
    img: "/static/images/claim/progress.png",
    name: "理赔进度",
    hasBadge: true,
  },
  {
    img: "/static/images/claim/service.png",
    name: "服务",
    hasBadge: false,
  },
  {
    img: "/static/images/claim/history.png",
    name: "历史记录",
    hasBadge: false,
  },
]);
const damageText = reactive([
  {
    name: "受损作物",
  },
  {
    name: "受损类型",
  },
  {
    name: "受损面积",
  },
  {
    name: "理赔金额",
  },
]);
const calList = reactive([
  {
    name: "玉米",
    range: [
      { value: 0, text: "倒伏" },
      { value: 1, text: "洪涝" },
      { value: 2, text: "雹灾" },
    ],
    value: 1,
    area: "1234",
    money: 123456.32,
  },
  {
    name: "莲藕",
    range: [
      { value: 0, text: "倒伏" },
      { value: 1, text: "洪涝" },
      { value: 2, text: "雹灾" },
    ],
    value: 0,
    area: "1234",
    money: 123456.32,
  },
  {
    name: "玉米",
    range: [
      { value: 0, text: "倒伏" },
      { value: 1, text: "洪涝" },
      { value: 2, text: "雹灾" },
    ],
    value: 1,
    area: "1234",
    money: 123456.32,
  },
  {
    name: "水稻",
    range: [
      { value: 0, text: "倒伏" },
      { value: 1, text: "洪涝" },
      { value: 2, text: "雹灾" },
    ],
    value: 2,
    area: "1234",
    money: 123456.32,
  },
  {
    name: "莲藕",
    range: [
      { value: 0, text: "倒伏" },
      { value: 1, text: "洪涝" },
      { value: 2, text: "雹灾" },
    ],
    value: 2,
    area: "1234",
    money: 123456.32,
  },
]);
const showToast = () => {
  uni.showToast({title:'弹出框',mask:true,duration:10000})
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 22rpx;
  background-color: #eef8ff;
  .claim {
    display: flex;
    justify-content: space-around;
    .total {
      width: 340rpx;
      height: 170rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #619bff;
      border-radius: 20rpx;
      .text {
        margin-left: 22rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10rpx;
        font-size: 28rpx;
        color: #fff;
        .text2 {
          font-size: 40rpx;
          font-weight: bold;
        }
      }
    }
    .count {
      width: 340rpx;
      height: 170rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0bc476;
      border-radius: 20rpx;
      .text {
        margin-left: 22rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10rpx;
        font-size: 28rpx;
        color: #fff;
        .text2 {
          font-size: 40rpx;
          font-weight: bold;
        }
      }
    }
  }
  .tools {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 190rpx;
    width: 702rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 2rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.12);
    margin-top: 30rpx;
    font-size: 24rpx;
    .tool {
      .text {
        text-align: center;
      }
    }
  }
  .cal-fast {
    margin-top: 40rpx;
    display: flex;
    justify-content: space-between;
    .text {
      margin-left: 10rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #141414;
    }
  }
  .cal-list {
    margin-top: 20rpx;
    font-size: 28rpx;
    &_title {
      background-color: #f8f8f8;
      border-radius: 30rpx 30rpx 0 0;
      height: 88rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 20rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      color: #212121;
      font-weight: 700;
    }
    &_content {
      background-color: #fff;
      padding: 20rpx;
      border-radius: 0 0 30rpx 30rpx;
      .list {
        &_item {
          display: flex;
          align-items: center;
          gap: 32rpx;
          margin-bottom: 62rpx;
          position: relative;
          &:last-child {
            margin-bottom: 0;
          }
          .damageText {
            margin-left: 30rpx;
            margin-right: 60rpx;
            white-space: nowrap;
          }
        }
      }
      .add {
        margin: auto;
        margin-top: 40rpx;
        width: 158rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        background-color: #5693f8;
        border-radius: 10rpx;
        text {
          color: #fff;
          font-size: 50rpx;
        }
      }
      .total {
        margin-top: 52rpx;
        padding: 0 46rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text {
          font-size: 28rpx;
          color: #a4a4a4;
          font-weight: 500;
        }
        .number {
          font-size: 36rpx;
          font-weight: bold;
          color: #313131;
        }
      }
    }
  }
}
:deep() {
  .uni-select {
    width: 160rpx !important;
    height: 50rpx !important;
    border-radius: 10rpx !important;
  }
}
</style>

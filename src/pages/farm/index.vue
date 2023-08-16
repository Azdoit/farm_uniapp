<template>
  <view>
    <!-- 执行ol模块中的olChange方法 -->
    <text :prop="allFarm1" :change:prop="ol.onChange"></text>
    <view id="map" class="map" :style="{ paddingTop: safeAreaInsets?.top + 'px' }"></view>
    <view class="imgDate">
      <text class="text1">影像</text>
      <text class="text2">日期</text>
      <view
        v-for="(item, index) in dateList"
        :key="index"
        class="date"
        :class="{ active: curDate === index }"
        @tap="changeDate(index)"
      >
        {{ item.date }}
      </view>
      <text :prop="curDate" :change:prop="ol.receiveCurDate"></text>
    </view>
  </view>
</template>

<script setup>
import allFarm1 from "@/components/map/geojson/allFarm1.json";
const curDate = ref(0);
const dateList = ref([
  {
    date: "7-9",
  },
  {
    date: "7-10",
  },
  {
    date: "7-11",
  },
]);
const changeDate = (index) => {
  curDate.value = index;
};
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets);
</script>
<script module="ol" lang="renderjs">
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON.js";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Fill, Stroke, Style, Text } from "ol/style.js";
import TileWMS from "ol/source/TileWMS.js";

import {
  ScaleLine,
  defaults as defaultControls,
  MousePosition,
} from "ol/control";

let map, cropHigh, cropLow, cropOrigin, resultSource, resultLayer,allFarm1,safeAreaInsets;

export default {
  name: "c-ol-map",
  data() {
    return {
      curDate:0,
    };
  },
 onShow(){

 },
 onLoad() {
  console.log('刷新了');
 },
  mounted() {
    console.log('mounted');
    this.initMap();
    // const features = new GeoJSON().readFeatures(allFarm1);
    //     // 将features放入矢量图层的source中
    //     resultSource = new VectorSource();
    //     resultSource.addFeatures(features);
    //         // 创建矢量图层
    //     resultLayer = new VectorLayer({
    //       source: resultSource,
    //       style: this.createStyle(),
    //       zIndex:100
    //    });
    //    map.addLayer(resultLayer);
    this.createdLCropOriginLayer();
    this.createdLCropHighLayer();
    this.createdLCropLowLayer();
    setTimeout(() => {
      const features = new GeoJSON().readFeatures(allFarm1);
        // 将features放入矢量图层的source中
        resultSource = new VectorSource();
        resultSource.addFeatures(features);
            // 创建矢量图层
        resultLayer = new VectorLayer({
          source: resultSource,
          style: this.createStyle(),
          zIndex:100
       });
       map.addLayer(resultLayer);
    }, 0);
  },
  methods: {
    // 初始化天地图
    initMap() {
      //天地图影像
      var tdt = new TileLayer({
        source: new XYZ({
          url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=2d4fc3b33ee8bda3109b32b3c50f46d2",
        }),
      });
      map = new Map({
        controls: defaultControls({
          attribution: false,
          zoom: false,
          rotate: false,
        }),
        target: "map",
        layers: [],
        view: new View({
          projection: "EPSG:4326",
          center: [120.228, 30.496],
          zoom: 17.5,
          maxZoom: 20,
          minZoom: 5,
        }),
      });
      map.addLayer(tdt);
      console.log('init');
    },

    createdLCropOriginLayer() {
      cropOrigin = new TileLayer({
        source: new TileWMS({
          url: "http://121.40.45.178:8090/geoserver/wms/",
          params: {
            VERSION: "1.1.0",
            REQUEST: "GetMap",
            layers: "LYN:crop_origin", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
          },
          // zIndex: 1001,
          crossOrigin: "anonymous",
          serverType: "geoserver",
        }),
      });
      map.addLayer(cropOrigin);
    },

    createdLCropHighLayer() {
      cropHigh = new TileLayer({
        source: new TileWMS({
          url: "http://121.40.45.178:8090/geoserver/wms/",
          params: {
            VERSION: "1.1.0",
            REQUEST: "GetMap",
            layers: "LYN:crop_high", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
          },
          // zIndex: 1001,
          crossOrigin: "anonymous",
          serverType: "geoserver",
        }),
      });
    },

    createdLCropLowLayer() {
      cropLow = new TileLayer({
        source: new TileWMS({
          url: "http://121.40.45.178:8090/geoserver/wms/",
          params: {
            VERSION: "1.1.0",
            REQUEST: "GetMap",
            layers: "LYN:crop_low", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
          },
          // zIndex: 1001,
          crossOrigin: "anonymous",
          serverType: "geoserver",
        }),
      });
    },
    // 解译结果样式,返回的是一个函数，根据每个feature中的typeName来确定矢量图层的颜色
    createStyle() {
      const styleObj = {};
      styleObj["corn"] = new Style({
        text: new Text({
          font: "bold 18px Source Han Sans CN-Bold",
          fill: new Fill({
            color: "#9CFF00",
          }),
          // stroke: new Stroke({
          //   color: "#000",
          //   width: 2,
          // }),
          text: "玉米",
        }),
        fill: new Fill({
          color: "rgba(156, 255, 0, 0.34)",
        }),
        stroke: new Stroke({
          color: "rgba(156, 255, 0, 1)",
          width: 4,
        }),
      });
      styleObj["lianou"] = new Style({
        text: new Text({
          font: "bold 18px Source Han Sans CN-Bold",
          fill: new Fill({
            color: "#00FFDC",
          }),
          // stroke: new Stroke({
          //   color: "#000",
          //   width: 2,
          // }),
          text: "莲藕",
        }),
        fill: new Fill({
          color: "rgba(2, 200, 129, 0.42)",
        }),
        stroke: new Stroke({
          color: "#11DFC3",
          width: 4,
        }),
      });
      // 会自动将resultSource中的所有feature进行遍历
      const style = function (feature) {
        return feature.get("name") === "玉米"
          ? styleObj["corn"]
          : styleObj["lianou"];
      };
      return style;
    },

    onChange(newValue, oldValue, ownerInstance, instance) {
        // console.log('service层中的options发生变化')
        // console.log('新值', newValue)
        // console.log('旧值', oldValue)
        allFarm1 = newValue
        // ownerInstance和this.$ownerInstance一样，可用来向service层通信
        // instance和ownerInstance的区别是：
        // instance.$el指向的是触发事件的那个节点；ownerInstance.$el指向当前vue文件中的根节点；
        // instance的作用目前尚不明确，官方没有给出用法
      },
      receiveCurDate(newValue, oldValue, ownerInstance, instance){
        if (newValue === 0) {
        map.removeLayer(cropHigh);
        map.removeLayer(cropLow);
        map.addLayer(cropOrigin);
      } else if (newValue === 1) {
        map.removeLayer(cropOrigin);
        map.removeLayer(cropLow);
        map.addLayer(cropHigh);
      } else {
        map.removeLayer(cropOrigin);
        map.removeLayer(cropHigh);
        map.addLayer(cropLow);
      }
      }
  },
};
</script>

<style scoped lang="scss">
.map {
  height: 100vh;
  width: 100vh;
}
.imgDate {
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 150rpx;
  left: 40rpx;
  text {
    color: #fff;
    font-size: 28rpx;
    margin-top: 5rpx;
  }

  .date {
    width: 80rpx;
    height: 54rpx;
    margin-top: 24rpx;
    line-height: 54rpx;
    font-size: 28rpx;
    color: #545454;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid #ffffff;
    border-radius: 40rpx;
    cursor: pointer;
    &.active {
      background-color: rgba(255, 234, 0, 0.7);
      border: 1px solid rgba(255, 241, 9, 1);
      color: #000;
    }
  }
}
</style>

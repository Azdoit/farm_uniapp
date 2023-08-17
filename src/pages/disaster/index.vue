<template>
  <view w-full h-full relative>
    <!-- TODO：注意！！！给renderjs传值必须是和map容器是兄弟标签 -->
    <text :prop="allFarms" :change:prop="ol.receiveFarms"></text>
    <view
      id="map"
      class="map"
      w-full
      h-full
      :style="{ paddingTop: safeAreaInsets?.top + 'px' }"
    ></view>
    <view class="weather" absolute top-70 left-26 flex gap-10>
      <image src="/static/images/disaster/typhoon.png" w-112 h-72 />
      <view class="text" flex flex-col justify-center gap-6>
        <text text-24 font-700 c-fff>气象理赔指数</text>
        <view w-96 h-34 rd-120 bg3 border4 text-24 c-34FF5D text-center
          >已达到</view
        >
      </view>
    </view>
    <view absolute w-160 h-70 bg2 border5 rd-20 top-75 right-38 center @tap="evaluate">
      <image src="/static/images/disaster/evalulate.png" w-45 h-45 />
      <text text-24 c-fff font-700>开始评估</text>
    </view>
    <view absolute right-38 top-750>
      <view
        v-for="(item, index) in ill"
        :key="item.text"
        w-120
        h-56
        mb-30
        lh-56
        text-center
      >
        <view
          rd-10
          :style="{ backgroundColor: item.color, border: item.border }"
        >
          <text text-28 font-700 c-fff>{{ item.text }}</text>
        </view>
      </view>
    </view>
    <view
      w-752
      h-400
      absolute
      c-fff
      :class="{ popup: isShow, popdown: !isShow }"
    >
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
  </view>
</template>

<script setup>
// import allFarm1 from "@/components/map/geojson/allFarm1.json";
import farm1 from "@/components/map/geojson/farm1.json";
import farm2 from "@/components/map/geojson/farm2.json";
import farm3 from "@/components/map/geojson/farm3.json";
import farm4 from "@/components/map/geojson/farm4.json";
import farm2_1 from "@/components/map/geojson/farm2_1.json";
import farm2_2 from "@/components/map/geojson/farm2_2.json";
import farm2_3 from "@/components/map/geojson/farm2_3.json";
import farm2_4 from "@/components/map/geojson/farm2_4.json";
import grid1 from "@/components/map/geojson/grid1.json";
import grid2 from "@/components/map/geojson/grid2.json";
const allFarms = [
  farm1,
  farm2,
  farm3,
  farm4,
  farm2_1,
  farm2_2,
  farm2_3,
  farm2_4,
  grid1,
  grid2,
];
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();
const ill = reactive([
  { color: "rgba(238, 0, 0, 0.6)", border: "1px solid #FF0000", text: "重度" },
  {
    color: "rgba(255, 162, 0, 0.6)",
    border: "1px solid #FFA200",
    text: "中度",
  },
  {
    color: "rgba(255, 255, 7, 0.6)",
    border: "1px solid #FFFF07",
    text: "轻度",
  },
  {
    color: "rgba(44, 255, 93, 0.6)",
    border: "1px solid #2CFF5D",
    text: "无",
  },
]);
const fields = reactive([
  {
    name: "鱼塘西南田块",
    type: "倒伏",
    area: 14.6,
  },
  {
    name: "鱼塘西南田块",
    type: "洪涝",
    area: 13.6,
  },
  {
    name: "鱼塘西南田块",
    type: "倒伏",
    area: 20.6,
  },
  {
    name: "鱼塘西南田块",
    type: "雹灾",
    area: 14.6,
  },
  {
    name: "鱼塘西南田块",
    type: "倒伏",
    area: 17,
  },
  {
    name: "鱼塘西南田块",
    type: "洪涝",
    area: 14.6,
  },
  {
    name: "鱼塘西南田块",
    type: "雹灾",
    area: 14.6,
  },
]);
const isShow = ref(true);
const evaluate = () => {
    uni.showLoading({
        title: '加载中',
        mask: true
    })
    setTimeout(() => {
        uni.hideLoading()
    }, 2000);
}
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
import {ScaleLine,defaults as defaultControls, MousePosition,} from "ol/control";

let 
  map,
  allFarm1,
  allFarms,
  safeAreaInsets,
  features1,
  features2,
  features3,
  features4,
  features2_1,
  features2_2,
  features2_3,
  features2_4,
  featuresGrid1,
  featuresGrid2,
  resultSource1,
  resultLayer1,
  resultSource2,
  resultLayer2,
  resultSource3,
  resultLayer3,
  resultSource4,
  resultLayer4,
  gridSource1,
  gridSource2,
  gridLayer1,
  gridLayer2;

  // 结果图层
resultSource1 = new VectorSource();
resultSource2 = new VectorSource();
resultSource3 = new VectorSource();
resultSource4 = new VectorSource();
// 栅格图层
gridSource1 = new VectorSource();
gridSource2 = new VectorSource();

const resultSources = [
  resultSource1,
  resultSource2,
  resultSource3,
  resultSource4,
];
const colors = ["#FF0000", "#FFA200", "#FFFF07", "#2CFF5D"];

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
    setTimeout(() => {
    //   const features = new GeoJSON().readFeatures(allFarm1);
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

       features1 = new GeoJSON().readFeatures(allFarms[0]);
       features2 = new GeoJSON().readFeatures(allFarms[1]);
       features3 = new GeoJSON().readFeatures(allFarms[2]);
       features4 = new GeoJSON().readFeatures(allFarms[3]);
       features2_1 = new GeoJSON().readFeatures(allFarms[4]);
       features2_2 = new GeoJSON().readFeatures(allFarms[5]);
       features2_3 = new GeoJSON().readFeatures(allFarms[6]);
       features2_4 = new GeoJSON().readFeatures(allFarms[7]);
       featuresGrid1 = new GeoJSON().readFeatures(allFarms[8]);
       featuresGrid2 = new GeoJSON().readFeatures(allFarms[9]);
       const features = [
         features1,
         features2_1,
         features2,
         features2_2,
         features3,
         features2_3,
         features4,
         features2_4,
      ];
      for (let i = 0; i < 4; i++) {
        resultSources[i].addFeatures(features[2 * i]);
        resultSources[i].addFeatures(features[2 * i + 1]);
      }
      gridSource1.addFeatures(featuresGrid1);
    //   console.log(gridSource1);
      gridSource2.addFeatures(featuresGrid2);

      resultLayer1 = new VectorLayer({
        source: resultSource1,
        style: new Style({
          fill: new Fill({
            color: "rgba(238, 0, 0, 0.6)",
          }),
          stroke: new Stroke({
            color: "rgba(238, 0, 0, 0.6)",
            width: 1,
          }),
          zIndex:100
        }),
      });
      resultLayer2 = new VectorLayer({
        source: resultSource2,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 162, 0, 0.6)",
          }),
          stroke: new Stroke({
            color: "rgba(255, 162, 0, 0.6)",
            width: 1,
          }),
          zIndex:100
        }),
      });
      resultLayer3 = new VectorLayer({
        source: resultSource3,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 7, 0.6)",
          }),
          stroke: new Stroke({
            color: "rgba(255, 255, 7, 0.6)",
            width: 1,
          }),
          zIndex:100
        }),
      });
      resultLayer4 = new VectorLayer({
        source: resultSource4,
        style: new Style({
          fill: new Fill({
            color: "rgba(44, 255, 93, 0.6)",
          }),
          stroke: new Stroke({
            color: "rgba(44, 255, 93, 0.6)",
            width: 1,
          }),
          zIndex:100
        }),
      });
      gridLayer1 = new VectorLayer({
        source: gridSource1,
        style: new Style({
          fill: new Fill({
            color: "black",
          }),
          stroke: new Stroke({
            color: "black",
            width: 1,
          }),
          zIndex:100
        }),
      });
      gridLayer2 = new VectorLayer({
        source: gridSource2,
        style: new Style({
        //   fill: new Fill({
        //     color: "black",
        //   }),
          stroke: new Stroke({
            color: "black",
            width: 1,
          }),
          zIndex:100
        }),
      });

      map.addLayer(resultLayer1);
      map.addLayer(resultLayer2);
      map.addLayer(resultLayer3);
      map.addLayer(resultLayer4);
      map.addLayer(gridLayer1);
      map.addLayer(gridLayer2);
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
          center: [120.2265, 30.496],
          zoom: 17.5,
          maxZoom: 18.9,
          minZoom: 5,
        }),
      });
      map.addLayer(tdt);
      console.log('init');
    },
    // 解译结果样式,返回的是一个函数，根据每个feature中的typeName来确定矢量图层的颜色
    // createStyle() {
    //   const styleObj = {};
    //   styleObj["corn"] = new Style({
    //     text: new Text({
    //       font: "bold 18px Source Han Sans CN-Bold",
    //       fill: new Fill({
    //         color: "#9CFF00",
    //       }),
    //       // stroke: new Stroke({
    //       //   color: "#000",
    //       //   width: 2,
    //       // }),
    //       text: "玉米",
    //     }),
    //     fill: new Fill({
    //       color: "rgba(156, 255, 0, 0.34)",
    //     }),
    //     stroke: new Stroke({
    //       color: "rgba(156, 255, 0, 1)",
    //       width: 4,
    //     }),
    //   });
    //   styleObj["lianou"] = new Style({
    //     text: new Text({
    //       font: "bold 18px Source Han Sans CN-Bold",
    //       fill: new Fill({
    //         color: "#00FFDC",
    //       }),
    //       // stroke: new Stroke({
    //       //   color: "#000",
    //       //   width: 2,
    //       // }),
    //       text: "莲藕",
    //     }),
    //     fill: new Fill({
    //       color: "rgba(2, 200, 129, 0.42)",
    //     }),
    //     stroke: new Stroke({
    //       color: "#11DFC3",
    //       width: 4,
    //     }),
    //   });
    //   // 会自动将resultSource中的所有feature进行遍历
    //   const style = function (feature) {
    //     return feature.get("name") === "玉米"
    //       ? styleObj["corn"]
    //       : styleObj["lianou"];
    //   };
    //   return style;
    // },

    // onChange(newValue, oldValue, ownerInstance, instance) {
    //     allFarm1 = newValue
    //   },
    receiveFarms(newValue, oldValue, ownerInstance, instance) {
      allFarms = newValue;
      console.log(allFarms);
    },
  },
};
</script>

<style scoped lang="scss">
</style>

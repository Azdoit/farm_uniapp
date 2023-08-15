<template>
  <view relative>
    <view id="map" mapH w-screen></view>
    <view absolute colCenter top-180 left-38>
      <text color-white text-28>影像</text>
      <text color-white text-28>日期</text>
      <view
        v-for="(item, index) in dateList"
        :key="index"
        w-80.8
        h-54
        mt-24
        lh-54
        c-545454
        text-center
        text-28
        rd-32
        border1
        bg1
        :class="{ active: curDate === index }"
        @click="changeDate(index)"
      >
        {{ item.date }}
      </view>
    </view>
    <view w-200 h-70 absolute top-100 right-50 center gap-15 bg2 rd-20 border2>
      <image
        w-40
        h-40
        src="@/static/images/farm/modify.png"
        mode="scaleToFill"
      />
      <text text-28 font-550 c-fff>我要修改</text>
    </view>
    <view absolute bottom-0 w-screen h-200 center>
      <image
        w-100
        h-90
        src="@/static/images/farm/camera.png"
        mode="scaleToFill"
      />
    </view>
  </view>
</template>

<script module="map" lang="renderjs">
import "ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import TileWMS from "ol/source/TileWMS.js";
import { Fill, Stroke, Style, Text } from "ol/style.js";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import GeoJSON from "ol/format/GeoJSON.js";
import {
  ScaleLine,
  defaults as defaultControls,
  MousePosition,
} from "ol/control";
import allFarm1 from "@/components/map/geojson/allFarm1.json";
export default {
  name: "map",
  data() {
    return {
      map: null,
      view: null,
      cropOrigin: null,
      cropHigh: null,
      cropLow: null,
      curDate: 0,
      dateList: [
        {
          date: "7-9",
        },
        {
          date: "7-10",
        },
        {
          date: "7-11",
        },
      ],
      resultSource: null,
      resultLayer: null,
    };
  },
  onShow() {
    console.log('展示了');
    this.initMap()
  },
  watch: {
    curDate(newVal){
      if(newVal === 0){
        this.cropOrigin.setVisible(true)
        this.cropHigh.setVisible(false)
        this.cropLow.setVisible(false)
      }else if(newVal === 1){
        this.cropHigh.setVisible(false)
        this.cropHigh.setVisible(true)
        this.cropLow.setVisible(false)
      }else{
        this.cropHigh.setVisible(false)
        this.cropHigh.setVisible(false)
        this.cropLow.setVisible(true)
      }
    }
  },
  mounted() {
    this.initMap();
    console.log("触发了");
  },
  methods: {
    // 初始化天地图
    initMap() {
      // geojson1
      const createdLCropOriginLayer = () => {
        this.cropOrigin = new TileLayer({
          source: new TileWMS({
            url: "http://121.40.45.178:8090/geoserver/wms/",
            params: {
              VERSION: "1.1.0",
              REQUEST: "GetMap",
              layers: "LYN:crop_origin", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
            },
            crossOrigin: "anonymous",
            serverType: "geoserver",
          }),
        });
        this.map.addLayer(this.cropOrigin);
      };
      // geojson2
      const createdLCropHighLayer = () => {
        this.cropHigh = new TileLayer({
          source: new TileWMS({
            url: "http://121.40.45.178:8090/geoserver/wms/",
            params: {
              VERSION: "1.1.0",
              REQUEST: "GetMap",
              layers: "LYN:crop_high", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
            },
            zIndex: 1001,
            crossOrigin: "anonymous",
            serverType: "geoserver",
          }),
        });
        this.map.addLayer(this.cropHigh);
        this.cropHigh.setVisible(false);
      };
      // geojson3
      const createdLCropLowLayer = () => {
        this.cropLow = new TileLayer({
          source: new TileWMS({
            url: "http://121.40.45.178:8090/geoserver/wms/",
            params: {
              VERSION: "1.1.0",
              REQUEST: "GetMap",
              layers: "LYN:crop_low", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
            },
            zIndex: 1001,
            crossOrigin: "anonymous",
            serverType: "geoserver",
          }),
        });
        this.map.addLayer(this.cropLow);
        this.cropLow.setVisible(false);
      };

      this.map = new Map({
        target: "map",
        layers: [],
        view: new View({
          projection: "EPSG:4326",
          center: [120.2265, 30.496],
          zoom: 17.5,
          maxZoom: 20,
          minZoom: 5,
        }),
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
      });
      createdLCropOriginLayer();
      createdLCropHighLayer();
      createdLCropLowLayer();

      const features = new GeoJSON().readFeatures(allFarm1);
      // 将features放入矢量图层的source中
      this.resultSource = new VectorSource();
      this.resultSource.addFeatures(features);

      // 解译结果样式,返回的是一个函数，根据每个feature中的typeName来确定矢量图层的颜色
      const createStyle = () => {
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
      };

      // 创建矢量图层
      this.resultLayer = new VectorLayer({
        source: this.resultSource,
        style: createStyle(),
      });
      this.map.addLayer(this.resultLayer);
    },
    changeDate(index) {
      this.curDate = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.mapH {
  height: calc(100vh - 44px - 164rpx);
}
.active {
  background-color: rgba(255, 234, 0, 0.7);
  border: 1px solid rgba(2555, 241, 9, 1);
  color: #000;
}
</style>

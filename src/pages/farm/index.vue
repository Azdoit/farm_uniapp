<template>
  <view w-full h-full relative>
    <!-- 执行ol模块中的olChange方法 -->
    <text :prop="allFarm1" :change:prop="ol.receiveAllFarms"></text>
    <view
      id="map"
      class="map"
      :style="{ paddingTop: safeAreaInsets?.top + 'px' }"
    ></view>
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
    <view absolute w-160 h-70 bg2 border5 rd-20 top-90 right-38 center>
      <image src="/static/images/farm/modify.png" w-45 h-45 mr-5 />
      <text text-24 c-fff font-700>我要修改</text>
    </view>
    <view center absolute bottom-80 w-full>
      <image src="/static/images/farm/camera.png" w-100 h-90 />
    </view>
    <view
      w-752
      h-400
      absolute
      c-fff
      :class="{ popup: isShow, popdown: !isShow }"
    >
      <view h-72 bg-00BFBF center text-32 @tap="isShow = !isShow">
        <text font-700>所有地块</text>
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
          <text>种植作物</text>
          <text>种植面积</text>
          <text>承保面积</text>
          <text>承保率</text>
        </view>
        <scroll-view scroll-y c-4e4e4e h-260>
          <view
            v-for="(item, index) in fields"
            :key="index"
            flex
            px-10
            py-24
            @tap="positionClick(item)"
          >
            <text>{{ item.fieldName }}</text>
            <text ml-20>{{ item.cropName }}</text>
            <text ml-80>{{ item.cropArea }}</text>
            <text ml-100 c-00bfbf>{{ item.contractArea }}</text>
            <text ml-90 font-700 c-00bfbf>{{ item.contractRate }}</text>
          </view>
          <text :prop="[lng, lat]" :change:prop="ol.receiveCenter"></text>
        </scroll-view>
      </view>
    </view>
    ><PopUp
      :field="item"
      @changeShowValue="changeShowValue"
      v-for="(item, index) in fields"
      :key="item.fieldName"
    />
  </view>
</template>

<script setup>
import allFarm1 from "@/components/map/geojson/allFarm1.json";
import PopUp from "@/components/popup/index.vue";
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();
console.log(safeAreaInsets);
const lng = ref(120.2265);
const lat = ref(30.496);
const curDate = ref(0);
// const test = ref(0)
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
const isShow = ref(true);
const fields = reactive([
  {
    id: 0,
    fieldName: "鱼塘西南田块1",
    cropName: "玉米",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.226869553318309, 30.496591537894496],
    isShow: false,
  },
  {
    id: 1,
    fieldName: "鱼塘西南田块2",
    cropName: "玉米",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.226607360935645, 30.495297355281757],
    isShow: false,
  },
  {
    id: 2,
    fieldName: "鱼塘西南田块3",
    cropName: "莲藕",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.225178864506205, 30.49520386964074],
    isShow: false,
  },
  {
    id: 3,
    fieldName: "鱼塘西南田块4",
    cropName: "玉米",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.225183385064526, 30.495258402942259],
    isShow: false,
  },
  {
    id: 4,
    fieldName: "鱼塘西南田块5",
    cropName: "莲藕",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.22992206032464, 30.497681208775045],
    isShow: false,
  },
  {
    id: 5,
    fieldName: "鱼塘西南田块6",
    cropName: "玉米",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.231020555996622, 30.497720160144461],
    isShow: false,
  },
  {
    id: 6,
    fieldName: "鱼塘西南田块7",
    cropName: "莲藕",
    cropArea: 14.6,
    contractArea: 14.6,
    contractRate: "100%",
    contractStart: "2023-8-18",
    contractEnd: "2024-8-18",
    centerCor: [120.229994389257755, 30.49692165395405],
    isShow: false,
  },
]);
const changeDate = (index) => {
  curDate.value = index;
};
const positionClick = (item) => {
  // 传num的话是直接传值，传数组的话是传proxy。所以一个个传吧。。。
  lng.value = item.centerCor[0];
  lat.value = item.centerCor[1];
  item.isShow = true;
  isShow.value = !isShow.value;
};
const changeShowValue = (id) => {
  // console.log('我收到了id值：'+id);
  fields[id].isShow = false;
};
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

let map, cropHigh, cropLow, cropOrigin, resultSource, resultLayer,allFarm1,safeAreaInsets,centerCol;

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
          center: [120.2265, 30.496],
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

    receiveAllFarms(newValue, oldValue, ownerInstance, instance) {
        // console.log('service层中的options发生变化')
        // console.log('新值', newValue)
        // console.log('旧值', oldValue)
        allFarm1 = newValue
        // ownerInstance和this.$ownerInstance一样，可用来向service层通信
        // instance和ownerInstance的区别是：
        // instance.$el指向的是触发事件的那个节点；ownerInstance.$el指向当前vue文件中的根节点；
        // instance的作用目前尚不明确，官方没有给出用法
      },
      receiveCenter(newValue, oldValue, ownerInstance, instance){
        centerCol = newValue
        // console.log(centerCol);
        map.getView().animate({
          // 只设置需要的属性即可
          center: centerCol, // 中心点
          zoom: 17.5, // 缩放级别
          rotation: undefined, // 缩放完成view视图旋转弧度
          duration: 1000 // 缩放持续时间，默认不需要设置
        })
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
  height: 100%;
  width: 100%;
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
    font-weight: 700;
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

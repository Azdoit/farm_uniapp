<template>
  <view id="map" class="map"></view>
</template>

<script>
import Map from "ol/Map.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
// import XYZ from "ol/source/XYZ.js";
// import Feature from "ol/Feature.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Fill, Stroke, Style, Text } from "ol/style.js";
import { ScaleLine, defaults as defaultControls } from "ol/control.js";
import TileWMS from "ol/source/TileWMS.js";
import allFarm1 from "./geojson/allFarm1.json";

console.log("加载map");
let businessMap,
  baseLayers = [],
  vecLayer,
  imgLayer,
  layerLp,
  cropHigh,
  cropLow,
  cropOrigin,
  resultSource,
  resultLayer;

const props = defineProps({
  date: {
    type: Number,
  },
});

const features = new GeoJSON().readFeatures(allFarm1);

// 将features放入矢量图层的source中
resultSource = new VectorSource();
resultSource.addFeatures(features);

// 定义矢量图层的样式
const geoStyle = new Style({
  text: new Text({
    font: "bold 18px Source Han Sans CN-Bold",
    fill: new Fill({
      color: "#9CFF00",
    }),
    // stroke: new Stroke({
    //   color: "#000",
    //   width: 2,
    // }),
  }),
  fill: new Fill({
    color: "rgba(156, 255, 0, 0.34)",
  }),
  stroke: new Stroke({
    color: "rgba(156, 255, 0, 1)",
    width: 4,
  }),
});

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
resultLayer = new VectorLayer({
  source: resultSource,
  style: createStyle(),
});

const createdLCropOriginLayer = () => {
  cropOrigin = new TileLayer({
    source: new TileWMS({
      url: "http://121.40.45.178:8090/geoserver/wms/",
      params: {
        VERSION: "1.1.0",
        REQUEST: "GetMap",
        layers: "LYN:crop_origin", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
      },
      zIndex: 1001,
      crossOrigin: "anonymous",
      serverType: "geoserver",
    }),
  });
  businessMap.addLayer(cropOrigin);
};

const createdLCropHighLayer = () => {
  cropHigh = new TileLayer({
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
  businessMap.addLayer(cropHigh);
};

const createdLCropLowLayer = () => {
  cropLow = new TileLayer({
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
  businessMap.addLayer(cropLow);
};

watch(
  () => props.date,
  (newVal) => {
    if (newVal === 0) {
      cropOrigin.setVisible(true);
      cropHigh.setVisible(false);
      cropLow.setVisible(false);
    } else if (newVal === 1) {
      cropLow.setVisible(true);
      cropHigh.setVisible(false);
      cropOrigin.setVisible(false);
    } else {
      cropLow.setVisible(false);
      cropHigh.setVisible(true);
      cropOrigin.setVisible(false);
    }
  }
);

onMounted(() => {
  // 加载天地图底图
  businessMap = new Map({
    target: "map",
    layers: baseLayers,
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
  createdLCropHighLayer();
  createdLCropLowLayer();
  createdLCropOriginLayer();
  businessMap.addLayer(resultLayer);
});
</script>

<style lang="scss" scoped>
.map {
  height: 100vh;
  width: 100vh;
}
</style>

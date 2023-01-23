<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { getExpressInfo } from "@/services/medicines";
import type { expressInfo } from "@/types/payMedicines";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import endImg from "@/assets/end.png";
import startImg from "@/assets/start.png";
import carImg from "@/assets/car.png";
let { params } = useRoute();
let info = ref<expressInfo>();
onMounted(async () => {
  let { data } = await getExpressInfo(params.id as string);
  info.value = data;
  // 初始化地图
  AMapLoader.load({
    key: "4eed3d61125c8b9c168fc22414aaef7e",
    version: "2.0",
  }).then((AMap) => {
    // 使用 Amap 初始化地图
    const map = new AMap.Map("map", {
      mapStyle: "amap://styles/whitesmoke",
      zoom: 12,
    });

    AMap.plugin("AMap.Driving", function () {
      let driving = new AMap.Driving({
        map: map,
        showTraffic: false,
        hideMarkers: true,
      });
      let start = info.value?.logisticsInfo[0];
      let end = info.value?.logisticsInfo[info.value?.logisticsInfo.length - 1];

      const endMarker = new AMap.Marker({
        position: [end?.longitude, end?.latitude],
        icon: endImg,
      });
      map.add(endMarker);

      const startMarker = new AMap.Marker({
        position: [start?.longitude, start?.latitude],
        icon: startImg,
      });
      map.add(startMarker);

      driving.search(
        [start?.longitude, start?.latitude],
        [end?.longitude, end?.latitude],
        {
          waypoints: info.value!.logisticsInfo.map((item) => [
            item.longitude,
            item.latitude,
          ]),
        },
        function (status: string, result: Object) {
          // 未出错时，result即是对应的路线规划方案
          let car = new AMap.Marker({
            icon: carImg,
            position: [
              info.value?.currentLocationInfo.longitude,
              info.value?.currentLocationInfo.latitude,
            ],
            anchor: "center",
          });
          map.add(car);

          setTimeout(() => {
            map.setFitView([car]);
            map.setZoom(10);
          }, 3000);
        }
      );
    });
  });
});
</script>

<template>
  <div class="order-logistics-page" v-if="info">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="$router.back()" />
        <span>{{ info.statusValue }}</span>
        <van-icon name="service" />
      </div>
      <div class="current">
        <p class="status">订单派送中 预计明天送达</p>
        <p class="predict">
          <span>{{ info.name }}</span>
          <span>{{ info.awbNo }}</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="v in info.list" :key="v.id">
          <p class="status">{{ v.statusValue }}</p>
          <p class="content">
            {{ v.content }}
          </p>
          <p class="time">{{ v.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-logistics-page {
  --van-step-icon-size: 18px;
  --van-step-circle-size: 10px;
}
#map {
  height: 450px;
  background-color: var(--cp-bg);
  overflow: hidden;
  position: relative;
  .title {
    background-color: #fff;
    height: 46px;
    width: 355px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 16px;
    position: absolute;
    left: 10px;
    top: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    > span {
      flex: 1;
      text-align: center;
    }
    .van-icon {
      font-size: 18px;
      color: #666;
      &:last-child {
        color: var(--cp-primary);
      }
    }
  }
  .current {
    height: 80px;
    border-radius: 4px;
    background-color: #fff;
    height: 80px;
    width: 355px;
    box-sizing: border-box;
    padding: 15px;
    position: absolute;
    left: 10px;
    bottom: 10px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    .status {
      font-size: 15px;
      line-height: 26px;
    }
    .predict {
      color: var(--cp-tip);
      font-size: 13px;
      margin-top: 5px;
      > span {
        padding-right: 10px;
      }
    }
  }
}
.logistics {
  padding: 0 10px 20px;
  overflow-y: scroll;
  height: 220px;
  .title {
    font-size: 16px;
    padding: 15px 5px 5px;
  }
  .van-steps {
    :deep(.van-step) {
      &::after {
        display: none;
      }
    }
    .status {
      font-size: 15px;
      color: var(--cp-text3);
      margin-bottom: 4px;
    }
    .content {
      font-size: 13px;
      color: var(--cp-tip);
      margin-bottom: 4px;
    }
    .time {
      font-size: 13px;
      color: var(--cp-tag);
    }
  }
}
</style>

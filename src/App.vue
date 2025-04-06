<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
  // 可以在这里检查更新、初始化全局状态等
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
/* 全局样式 */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

/* 平台差异化样式 */
/* #ifdef H5 */
page {
  min-height: 100vh;
}
/* #endif */

/* #ifdef MP-WEIXIN */
page {
  height: 100%;
  background-color: #f8f8f8;
}
/* #endif */

/* #ifdef APP-PLUS */
page {
  min-height: 100vh;
}
/* #endif */
</style>

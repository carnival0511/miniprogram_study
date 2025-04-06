<template>
  <view class="container">
    <view class="header">
      <text class="text-2xl font-bold text-gray-800">设备</text>
    </view>
    <view class="content">
      <text class="text-base text-gray-600">这是设备页面</text>
    </view>
    <!-- 平台差异化展示示例 -->
    <view class="platform-info">
      <view v-if="platform === 'h5'" class="text-blue-500">
        H5端特定内容
      </view>
      <view v-else-if="platform === 'mp-weixin'" class="text-green-500">
        微信小程序特定内容
      </view>
      <view v-else-if="platform === 'ios'" class="text-gray-500">
        iOS App特定内容
      </view>
      <view v-else-if="platform === 'android'" class="text-orange-500">
        Android App特定内容
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow, onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { getAppPlatform } from '@/utils'

const userStore = useUserStore()
const platform = ref(getAppPlatform())

// 页面加载时检查登录状态
onLoad(() => {
  console.log('设备页面加载')
  console.log('当前平台：', platform.value)
  checkLoginStatus()
})

// 页面显示时检查登录状态
onShow(() => {
  checkLoginStatus()
})

// 检查登录状态
const checkLoginStatus = () => {
  if (!userStore.isLoggedIn) {
    console.log('用户未登录，可以跳转到登录页面或显示登录提示')
    // 根据需要跳转或提示
    // uni.navigateTo({ url: '/pages/login/index' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .header {
    margin-bottom: 20px;
  }
  .content {
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  .platform-info {
    padding: 15px;
    background-color: #e6e6e6;
    border-radius: 8px;
  }
}
</style> 
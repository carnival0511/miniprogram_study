<template>
  <view class="container">
    <view class="header">
      <text class="text-2xl font-bold text-gray-800">数据</text>
    </view>
    <view class="content">
      <text class="text-base text-gray-600">这是数据页面</text>
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
  console.log('数据页面加载')
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
  }
}
</style> 
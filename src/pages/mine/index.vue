<template>
  <view class="container">
    <view class="header">
      <text class="text-2xl font-bold text-gray-800">我的</text>
    </view>
    <view class="content">
      <view class="user-info">
        <view v-if="userStore.isLoggedIn" class="text-base text-gray-600">
          <text class="font-bold">已登录</text>
          <view class="mt-2">
            <text>用户信息: </text>
            <text>{{ JSON.stringify(userStore.userInfo) }}</text>
          </view>
          <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded" @click="handleLogout">
            退出登录
          </button>
        </view>
        <view v-else class="text-base text-gray-600">
          <text>未登录</text>
          <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" @click="handleLogin">
            登录
          </button>
        </view>
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
  console.log('我的页面加载')
  console.log('当前平台：', platform.value)
})

// 页面显示时检查登录状态
onShow(() => {
  console.log('我的页面显示')
})

// 模拟登录
const handleLogin = () => {
  // 实际应用中，这里应该调用登录接口
  const mockToken = 'mock-token-' + Date.now()
  const mockUserInfo = {
    id: 1,
    username: '测试用户',
    avatar: 'https://placeholder.com/150',
    platform: platform.value
  }
  userStore.login(mockToken, mockUserInfo)
  uni.showToast({
    title: '登录成功',
    icon: 'success'
  })
}

// 登出
const handleLogout = () => {
  userStore.logout()
  uni.showToast({
    title: '已退出登录',
    icon: 'none'
  })
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
    
    .user-info {
      padding: 10px;
      border-radius: 4px;
      background-color: white;
    }
  }
}
</style> 
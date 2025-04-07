<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部标题 -->
    <h1 class="text-2xl font-bold p-4">我的</h1>
    
    <!-- 用户信息卡片 -->
    <div class="bg-white rounded-lg shadow-sm mx-4 p-4 mb-4">
      <div class="flex items-center">
        <img 
          :src="userInfo.avatar || '/static/default-avatar.png'" 
          class="w-16 h-16 rounded-full border border-gray-200"
        >
        <div class="ml-4">
          <h2 class="text-lg font-medium">{{ userInfo.nickname || '未登录用户' }}</h2>
          <p class="text-gray-500 text-sm">{{ userInfo.phone || '点击登录查看详情' }}</p>
        </div>
      </div>
    </div>
    
    <!-- 功能列表 -->
    <div class="bg-white rounded-lg shadow-sm mx-4 p-2">
      <div 
        v-for="item in menuItems" 
        :key="item.name"
        class="flex items-center justify-between py-3 px-2 border-b border-gray-100 last:border-0"
        @click="handleMenuItemClick(item)"
      >
        <div class="flex items-center">
          <img :src="item.icon" class="w-5 h-5 mr-2">
          <span>{{ item.name }}</span>
        </div>
        <img src="/static/arrow-right.png" class="w-4 h-4">
      </div>
    </div>
    
    <!-- 退出登录按钮 -->
    <button 
      v-if="isLoggedIn"
      @click="handleLogout"
      class="mx-4 mt-6 w-[calc(100%-2rem)] bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      退出登录
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(true) // 根据实际登录状态修改

const userInfo = ref({
  nickname: '用户昵称',
  phone: '138****8888',
  avatar: '/static/avatar.jpg'
})

const menuItems = ref([
  { name: '我的订单', icon: '/static/order.png', path: '/pages/order/list' },
  { name: '我的收藏', icon: '/static/favorite.png', path: '/pages/favorite/list' },
  { name: '设置', icon: '/static/settings.png', path: '/pages/settings/index' },
  { name: '关于我们', icon: '/static/about.png', path: '/pages/about/index' }
])

const handleMenuItemClick = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        isLoggedIn.value = false
        uni.showToast({ title: '已退出登录', icon: 'success' })
        router.push('/pages/login/index')
      }
    }
  })
}
</script>
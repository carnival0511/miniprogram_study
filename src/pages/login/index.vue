<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <!-- 顶部标题 -->
    <h1 class="text-2xl font-bold mb-8">我的</h1>
    
    <!-- 未登录状态 -->
    <div v-if="!isLoggedIn" class="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
      <div class="text-center mb-6">
        <p class="text-gray-600 mb-4">您尚未登录</p>
        <button 
          @click="handleWechatLogin"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          微信一键登录
        </button>
      </div>
      
      <div class="flex items-center my-4">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-gray-500">或</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>
      
      <div class="space-y-3">
        <input 
          v-model="phone" 
          type="tel" 
          placeholder="请输入手机号" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
        <input 
          v-model="password" 
          type="password" 
          placeholder="请输入密码" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
        <button 
          @click="handleNormalLogin"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          账号登录
        </button>
      </div>
      
      <div class="mt-4 text-center text-sm text-gray-500">
        <span>还没有账号？</span>
        <button @click="goToRegister" class="text-blue-500 hover:underline">立即注册</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const phone = ref('')
const password = ref('')

// 微信登录
const handleWechatLogin = () => {
  uni.login({
    provider: 'weixin',
    success: (res) => {
      console.log('微信登录成功', res)
      // 这里应该调用后端接口验证登录
      isLoggedIn.value = true
      uni.showToast({ title: '登录成功', icon: 'success' })
      router.push('/pages/mine/index')
    },
    fail: (err) => {
      console.error('微信登录失败', err)
      uni.showToast({ title: '登录失败', icon: 'none' })
    }
  })
}

// 普通登录
const handleNormalLogin = () => {
  if (!phone.value || !password.value) {
    uni.showToast({ title: '请输入手机号和密码', icon: 'none' })
    return
  }
  
  // 模拟登录成功
  isLoggedIn.value = true
  uni.showToast({ title: '登录成功', icon: 'success' })
  router.push('/pages/mine/index')
}

// 跳转注册
const goToRegister = () => {
  uni.navigateTo({ url: '/pages/register/index' })
}
</script>
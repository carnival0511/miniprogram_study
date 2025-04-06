import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户状态
  const token = ref('')
  const userInfo = ref<Record<string, any>>({})
  const isLoggedIn = ref(false)

  // 用户登录
  const login = (userToken: string, info: Record<string, any>) => {
    token.value = userToken
    userInfo.value = info
    isLoggedIn.value = true
  }

  // 用户登出
  const logout = () => {
    token.value = ''
    userInfo.value = {}
    isLoggedIn.value = false
  }

  // 获取用户信息
  const getUserInfo = () => {
    return userInfo.value
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    logout,
    getUserInfo
  }
}, {
  persist: true // 持久化存储
}) 
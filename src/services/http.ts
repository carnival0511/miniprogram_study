import { useUserStore } from '@/store/user'

// 基础配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const TIMEOUT = 60000

// 请求拦截器
const requestInterceptor = (config: UniApp.RequestOptions) => {
  const userStore = useUserStore()
  
  // 如果用户已登录，添加token
  if (userStore.isLoggedIn) {
    config.header = {
      ...config.header,
      'Authorization': `Bearer ${userStore.token}`
    }
  }
  
  // 添加其他通用header
  config.header = {
    ...config.header,
    'Content-Type': 'application/json',
  }
  
  return config
}

// 响应拦截器
const responseInterceptor = (response: any, resolve: Function, reject: Function) => {
  // 这里可以根据后端API的返回结构进行调整
  if (response.statusCode >= 200 && response.statusCode < 300) {
    resolve(response.data)
  } else if (response.statusCode === 401) {
    // Token过期或未授权
    const userStore = useUserStore()
    userStore.logout()
    uni.showToast({
      title: '登录已过期，请重新登录',
      icon: 'none'
    })
    // 跳转到登录页
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1500)
    reject(response)
  } else {
    // 处理其他错误
    uni.showToast({
      title: response.data?.message || '请求失败',
      icon: 'none'
    })
    reject(response)
  }
}

// 请求函数封装
const request = <T = any>(options: UniApp.RequestOptions): Promise<T> => {
  // 合并选项
  const config = {
    ...options,
    url: `${BASE_URL}${options.url}`,
    timeout: TIMEOUT,
  }
  
  // 应用请求拦截器
  const interceptedConfig = requestInterceptor(config)
  
  return new Promise((resolve, reject) => {
    uni.request({
      ...interceptedConfig,
      success: (response) => {
        responseInterceptor(response, resolve, reject)
      },
      fail: (error) => {
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

// GET请求
const get = <T = any>(url: string, params?: Record<string, any>, options: Partial<UniApp.RequestOptions> = {}): Promise<T> => {
  return request<T>({
    url,
    method: 'GET',
    data: params,
    ...options
  })
}

// POST请求
const post = <T = any>(url: string, data?: Record<string, any>, options: Partial<UniApp.RequestOptions> = {}): Promise<T> => {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...options
  })
}

// 文件上传
const upload = <T = any>(url: string, filePath: string, name: string = 'file', formData: Record<string, any> = {}, options: Partial<UniApp.UploadFileOption> = {}): Promise<T> => {
  const userStore = useUserStore()
  
  // 合并选项
  const config = {
    url: `${BASE_URL}${url}`,
    filePath,
    name,
    formData,
    timeout: TIMEOUT,
    ...options
  }
  
  // 添加token
  if (userStore.isLoggedIn) {
    config.header = {
      ...config.header,
      'Authorization': `Bearer ${userStore.token}`
    }
  }
  
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      ...config,
      success: (response) => {
        // 上传文件返回的是字符串，需要转成JSON
        try {
          const data = JSON.parse(response.data)
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(data)
          } else {
            uni.showToast({
              title: data?.message || '上传失败',
              icon: 'none'
            })
            reject(data)
          }
        } catch (e) {
          reject(response)
        }
      },
      fail: (error) => {
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

// 导出
export default {
  request,
  get,
  post,
  upload
} 
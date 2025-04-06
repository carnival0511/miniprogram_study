/**
 * 工具函数库
 */

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间，默认300ms
 * @returns 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let timer: number | null = null
  
  return function(this: any, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay) as unknown as number
  }
}

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param delay 延迟时间，默认300ms
 * @returns 节流处理后的函数
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay = 300): (...args: Parameters<T>) => void {
  let last = 0
  
  return function(this: any, ...args: Parameters<T>): void {
    const now = Date.now()
    
    if (now - last >= delay) {
      fn.apply(this, args)
      last = now
    }
  }
}

/**
 * 日期格式化
 * @param date 日期对象或时间戳
 * @param format 格式化模板，默认'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = typeof date === 'object' ? date : new Date(date)
  
  const formatObj: Record<string, number> = {
    'Y+': d.getFullYear(),
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'H+': d.getHours(),
    'h+': d.getHours() % 12 || 12,
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'S+': d.getMilliseconds(),
  }
  
  let result = format
  
  for (const key in formatObj) {
    if (new RegExp(`(${key})`).test(format)) {
      const str = formatObj[key].toString()
      result = result.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str, RegExp.$1.length)
      )
    }
  }
  
  return result
}

/**
 * 左侧补零
 * @param str 原始字符串
 * @param len 目标长度
 * @returns 补零后的字符串
 */
function padLeftZero(str: string, len: number): string {
  return '0'.repeat(len - str.length) + str
}

/**
 * 获取当前应用环境
 * @returns 应用环境类型
 */
export function getAppPlatform(): 'h5' | 'mp-weixin' | 'ios' | 'android' | 'unknown' {
  // #ifdef H5
  return 'h5'
  // #endif
  
  // #ifdef MP-WEIXIN
  return 'mp-weixin'
  // #endif
  
  // #ifdef APP-PLUS
  const platform = uni.getSystemInfoSync().platform
  if (platform === 'ios') {
    return 'ios'
  } else if (platform === 'android') {
    return 'android'
  }
  // #endif
  
  return 'unknown'
}

/**
 * 生成UUID
 * @returns UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 深拷贝
 * @param obj 需要拷贝的对象
 * @returns 拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T
  }
  
  if (obj instanceof Object) {
    const copy = {} as Record<string, any>
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as Record<string, any>)[key])
    })
    return copy as T
  }
  
  return obj
}

/**
 * 保留指定位数的小数
 * @param num 需要处理的数字
 * @param decimal 小数位数，默认2位
 * @returns 处理后的数字
 */
export function toFixed(num: number, decimal = 2): number {
  return parseFloat(num.toFixed(decimal))
}

/**
 * 金额格式化
 * @param amount 金额
 * @param symbol 货币符号，默认'¥'
 * @returns 格式化后的金额字符串
 */
export function formatMoney(amount: number, symbol = '¥'): string {
  return `${symbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export default {
  debounce,
  throttle,
  formatDate,
  getAppPlatform,
  generateUUID,
  deepClone,
  toFixed,
  formatMoney
} 
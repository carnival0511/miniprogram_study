import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
  storage: {
    getItem: (key: string): any => {
      return uni.getStorageSync(key)
    },
    setItem: (key: string, value: any): void => {
      uni.setStorageSync(key, value)
    },
    removeItem: (key: string): void => {
      uni.removeStorageSync(key)
    },
  },
}))

export default pinia 
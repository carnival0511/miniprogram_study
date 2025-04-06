# UniApp 多平台示例项目

这是一个基于 uni-app 的多平台应用示例项目，支持 H5、微信小程序、iOS、Android 等多平台。

## 技术栈

- Vue 3 + TypeScript + Vite
- uni-app 框架
- Pinia 状态管理
- SCSS 样式处理
- Tailwind CSS 4.x

## 项目结构

```
├── src
│   ├── components       # 公共组件
│   ├── pages            # 页面
│   │   ├── index        # 主包 - 首页
│   │   ├── data         # 分包 - 数据页面
│   │   ├── device       # 分包 - 设备页面
│   │   ├── plot         # 分包 - 地块页面
│   │   └── mine         # 分包 - 我的页面
│   ├── services         # 服务封装
│   ├── static           # 静态资源
│   ├── store            # Pinia 存储
│   ├── utils            # 工具函数
│   ├── App.vue          # 应用入口
│   ├── main.ts          # 主入口
│   ├── manifest.json    # 应用配置
│   ├── pages.json       # 页面路由配置
│   └── uni.scss         # 全局样式变量
├── .env                 # 环境变量
├── package.json         # 依赖管理
└── vite.config.ts       # Vite 配置
```

## 特性

- 多平台兼容（H5、微信小程序、iOS、Android）
- 使用 Vue 3 Composition API（setup 语法）
- Pinia 状态管理（支持持久化）
- HTTP 请求封装（支持请求拦截、响应拦截）
- 工具函数库（防抖、节流、日期格式化等）
- 分包加载
- Tailwind CSS 样式支持
- TypeScript 支持

## 平台差异化处理

项目中使用条件编译进行平台差异化处理，例如：

```typescript
// 在 JS 中的条件编译
// #ifdef H5
// H5 平台特定代码
// #endif

// #ifdef MP-WEIXIN
// 微信小程序特定代码
// #endif

// #ifdef APP-PLUS
// App 平台特定代码
if (uni.getSystemInfoSync().platform === 'android') {
  // Android 特定代码
} else if (uni.getSystemInfoSync().platform === 'ios') {
  // iOS 特定代码
}
// #endif
```

```css
/* 在 CSS 中的条件编译 */
/* #ifdef H5 */
/* H5 平台特定样式 */
/* #endif */
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（H5）
npm run dev:h5

# 启动开发服务器（微信小程序）
npm run dev:mp-weixin

# 启动开发服务器（APP）
npm run dev:app
```

## 构建

```bash
# 构建 H5 版本
npm run build:h5

# 构建微信小程序版本
npm run build:mp-weixin

# 构建 App 版本
npm run build:app-plus
``` # miniprogram_study

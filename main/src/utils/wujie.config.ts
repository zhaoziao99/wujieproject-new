interface AppConfig {
  name: string
  url: string
  devUrl: string
}

// 子应用配置
export const apps: Record<string, AppConfig> = {
  subVue2: {
    name: 'sub-vue2',
    url: 'http://localhost:8001', // 生产环境URL
    devUrl: 'http://localhost:8081' // 开发环境URL
  }
}

// 获取应用URL的工具函数
export const getAppUrl = (appKey: keyof typeof apps): string => {
  const isDev = process.env.NODE_ENV === 'development'
  const app = apps[appKey]
  console.log('isDev ? app.devUrl : app.url', isDev ? app.devUrl : app.url)

  if (!app) {
    throw new Error(`未找到应用配置: ${appKey}`)
  }

  return isDev ? app.devUrl : app.url
}

// 预加载配置
export const preloadApps = () => {
  return Object.keys(apps).map(key => ({
    name: apps[key].name,
    url: getAppUrl(key as keyof typeof apps),
    exec: true
  }))
}

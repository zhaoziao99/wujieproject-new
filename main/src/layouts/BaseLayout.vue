<template>
  <div class="layout-container">
    <div class="header" v-if="showHeader">
      <el-select
        v-model="currentApp"
        placeholder="选择应用"
        size="large"
        @change="handleAppChange"
        style="width: 240px"
      >
        <el-option
          v-for="item in appOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      
      <div class="user-info" v-if="isLoggedIn">
        <el-button type="text" @click="handleLogout">退出登录</el-button>
      </div>
    </div>
    
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const currentApp = ref('')

const isLoggedIn = computed(() => authStore.isAuthenticated)

// 根据路由判断是否显示header
const showHeader = computed(() => {
  return router.currentRoute.value.name !== 'login'
})

const appOptions = [
  { label: 'Vue2子应用', value: '/sub-vue2' },
  { label: 'Vue3子应用', value: '/sub-vue3' },
  { label: '学校管理系统', value: '/school-manager' }
]

const handleAppChange = (value: string) => {
  router.push(value)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-content {
  flex: 1;
  overflow: auto;
}

.user-info {
  display: flex;
  align-items: center;
}
</style>

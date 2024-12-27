<template>
  <div class="login-container">
    <div class="login-content">
      <el-card class="login-card">
        <template #header>
          <div class="card-header">
            <h2>系统登录</h2>
          </div>
        </template>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" :loading="loading" class="login-button">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const loginFormRef = ref()

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  loading.value = true
  try {
    await loginFormRef.value.validate()
    // 生成随机token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    authStore.setToken(token)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.login-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
}

.login-card {
  width: 400px;
}

.card-header {
  text-align: center;
}

.login-button {
  width: 100%;
}
</style>

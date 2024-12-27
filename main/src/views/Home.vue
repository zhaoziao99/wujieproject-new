<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const value = ref('')
const options = [
  {
    value: 'sub-vue2',
    label: 'sub-vue2'
  },
  {
    value: 'sub-vue3',
    label: 'sub-vue3'
  }
]

const handleChange = (value: string) => {
  console.log('value', value)
  router.push(`/${value}`)
}
</script>

<template>
  <div>
    <div style="height: 100px; background-color: #ccc">
      <el-select
        v-model="value"
        placeholder="Select"
        size="large"
        @change="handleChange"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<style scoped></style>

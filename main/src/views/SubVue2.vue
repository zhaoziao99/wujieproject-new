<script setup lang="ts">
import WujieVue from 'wujie-vue3'
import { getAppUrl } from '../utils/wujie.config'

const subVue2Url = getAppUrl('subVue2')
</script>

<template>
  <WujieVue
    width="100%"
    height="100%"
    name="sub-vue2"
    :url="subVue2Url"
    :sync="true"
  ></WujieVue>
</template>

<style scoped></style>

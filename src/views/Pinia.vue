<!--  -->
<template>
  <el-card>
  
  {{ ageStore.gettersOtherStoreGetters }}

   

  </el-card>
</template>

<script setup lang="ts">
import { useCounterStore, useAgeStore } from "@/store/index.js";

const ageStore = useAgeStore()





</script>

<style scoped lang="less">
.el-card {
  padding: 20px;
  height: 95%;
}
</style>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧方导航栏 -->
      <el-aside :style="'width:' + autowidth">
        <Menu :collapsed="collapsed" />
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-icon style="font-size: 30px;" @click="() => { collapsed = !collapsed }">
            <component :is="collapsed ? CaretRight : CaretLeft"></component>
          </el-icon>
        </el-header>
        <!-- main -->
        <el-main><RouterView /></el-main>

        <!-- footer -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Menu.vue'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'

// 定义菜单按钮收缩展开效果
const collapsed = ref < boolean > (false)
// 定义侧边栏宽度
const autowidth = computed(() => {
    if (collapsed.value) {
    return "64px"
    }else {
    return "200px"
    }
})

</script>
<style scoped lang="less">
.common-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.el-container {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  // text-align: center;
  line-height: 80px;
}

.el-aside {
  background-color: @menuBg;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  overflow: hidden;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>

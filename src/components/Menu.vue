<template>
    <div class="logo">后台管理系统</div>
    <el-col :span="24">


        <el-menu default-active="1" text-color="white" active-text-color="rgb(90, 156, 248)"
            class="el-menu-vertical-demo" :collapse="collapsed">
            <el-menu-item index="1">
                <el-icon style="color:  orange;">
                    <ElementPlus />
                </el-icon>
                <span >
                    <RouterLink to="/home/dept" style="color: orange;">
                        部门管理
                    </RouterLink>
                </span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon style="color:  orange;">
                    <User />
                </el-icon>
                <span>
                    <RouterLink to="/home/emp" style="color:  orange;">
                        员工管理
                    </RouterLink>
                </span>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon style="color:  orange;">
                    <Apple />
                </el-icon>
                <span>
                    <RouterLink to="/home/pinia" style="color:  orange;">
                        Pinia
                    </RouterLink>
                </span>
            </el-menu-item>

        </el-menu>
    </el-col>
</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const isCollapse = ref(true)

// 定义父组件传递过来数据
defineProps({
    collapsed: {
        type: Boolean
    }
})



</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.el-menu {
    background-color: @menuBg;
    min-height: 400px;
    height: 100vh;
    border-right: none
}

.logo {
    width: 100%;
    height: 60px;
    background-color: @menuBg;
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
}
</style>
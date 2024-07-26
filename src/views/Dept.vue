<template>
    <el-card>
        <!-- 添加 -->
         <el-button type="success" style="margin-top: 20px; float: left;" @click="openAddDialog">添加</el-button>

        <h1 style="font-size: 30px;">部门管理</h1>
        <el-table :data="state.deptData" style="width: 100%">
            <el-table-column type="index" label="序号" width="180" />
            <el-table-column prop="id" label="部门编号" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="tel" label="电话" />
            <el-table-column prop="principal" label="联系人" />
            <el-table-column prop="principal_tel" label="联系人电话" />
            <el-table-column label="操作" width="200">
                <template v-slot="scopeSlot">
                    <el-button type="warning" :icon="Edit" size="small"
                        @click="editById(scopeSlot.row.id)">编辑</el-button>
                    <el-button type="danger" :icon="Delete" size="small"
                        @click="deleteById(scopeSlot.row.id)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class='pagination'>
            <el-pagination v-model:current-page="state.page.pageNum" v-model:page-size="state.page.pageSize"
                :page-sizes="[5, 10, 15, 20]" :background="background" layout="total, sizes, prev, pager, next, jumper"
                :total="state.page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>

        
    </el-card>

    <!-- 删除dialog -->
    <el-dialog v-model="dialogVisible" title="删除功能" width="500" :before-close="handleClose">
        <span>确定要删除么？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消删除</el-button>
                <el-button type="primary" @click="sureDelete">
                    确认删除
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="修改功能" width="500" :before-close="handleClose">

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="部门电话" prop="tel">
                <el-input v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="联系人" prop="principal">
                <el-input v-model="ruleForm.principal" />
            </el-form-item>
            <el-form-item label="联系人电话" prop="principal_tel">
                <el-input v-model="ruleForm.principal_tel" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消修改</el-button>
                <el-button type="primary" @click="sureEdit(ruleFormRef)">
                    确认修改
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 添加dialog -->
      <el-dialog v-model="addDialogVisible" title="添加">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" size="formSize">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="principal">
          <el-input v-model="ruleForm.principal"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="principal_tel">
          <el-input v-model="ruleForm.principal_tel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="sureAdd(ruleFormRef)">确定</el-button>
      </span>
    </el-dialog>




</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
const $http = inject('$http')
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage, ElNotification, ComponentSize, FormInstance, FormRules } from 'element-plus'


const background = ref(true)
const dialogVisible = ref(false)
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)

const state = reactive({
    deptData: [],
    page: {
        pageNum: 1,
        pageSize: 10,
        total: 0
    },
    deleteCurrentId: 0,
    editCurrentId: 0,
});

// 添加
const openAddDialog = () => {
  addDialogVisible.value = true
  resetForm(ruleFormRef.value)
  
}

const sureAdd = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await $http.post('/dep', ruleForm)
      if (data.message === 'OK') {
        ElNotification({
          title: 'Success',
          message: '添加成功',
          type: 'success'
        })
        getDept()
        addDialogVisible.value = false
      }
    }
  })
}

interface RuleForm {
    name: string,
    tel: string
    principal: string
    principal_tel: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
    name: '',
    tel: '',
    principal: '',
    principal_tel: ''

})

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' },
    ],
    tel: [
        { required: true, message: 'Please input Activity tel', trigger: 'blur' },
        { min: 7, max: 11, message: 'Length should be 7 to 11', trigger: 'blur' },
    ],
    principal: [
        { required: true, message: '姓名1-3个字符', trigger: 'blur' },
        { min: 1, max: 3, message: 'Length should be 1 to 3', trigger: 'blur' },
    ],
    principal_tel: [
        { required: true, message: 'Please input Activity tel', trigger: 'blur' },
        { min: 7, max: 11, message: 'Length should be 7 to 11', trigger: 'blur' },
    ],
})

const editById = async (id) => {
    resetForm(ruleFormRef.value)
    editDialogVisible.value = true
    const { data } = await $http.get(`dep/${id}`)
    Object.assign(ruleForm, data.data)
    state.editCurrentId = id
}
const sureEdit = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            const { data } = await $http.put(`/dep/${state.editCurrentId}`, ruleForm)
            if (data.message === 'OK') {
                ElNotification({
                    title: 'Success',
                    message: '修改成功',
                    type: 'success'
                })
                getDept()
                editDialogVisible.value = false
            }
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}


async function deleteById(id) {
    dialogVisible.value = true;
    state.deleteCurrentId = id;
}
//确认删除
async function sureDelete() {
    dialogVisible.value = false
    var { data } = await $http.delete(`dep/${state.deleteCurrentId}`);
    if (data.message == "OK") {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
    } else if (data.message == "ERROR") {
        ElMessage({
            message: '删除失败',
            type: 'error',
        })
    }
    getDept();
}

//关闭 /编辑删除提示框
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定关闭提示框么')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

async function getDept() {
    var { data } = await $http.get(`deps?pageNum=${state.page.pageNum}&pageSize=${state.page.pageSize}`);
    state.deptData = data.data.rows;
    state.page.total = data.data.total;
}

const handleSizeChange = (val: number) => {
    state.page.pageSize = val;
    getDept();
}
const handleCurrentChange = (val: number) => {
    state.page.pageNum = val;
    getDept();
}

onMounted(() => {
    getDept();
});
</script>


<style scoped scope="less">
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.el-card {
    padding: 20px;
    height: 95%;
}
.pagination{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>

<template>
  <div>
    page test TestTableQuery.vue
    <div>
      <el-button @click="vueRouter.push({ name: 'TestDetail' })">toTestDetail.vue</el-button>
      <el-button @click="vueRouter.push({ name: 'TestAddEdit' })">TestAddEdit.vue</el-button>
    </div>

    <div class="mt-20px">
      <el-button type="primary" @click="goToConfig">去配置</el-button>
    </div>
    <vxe-grid v-bind="gridOptions1">
      <template #toolbar_buttons>
        <vxe-button @click="gridOptions1.align = 'left'">居左</vxe-button>
        <vxe-button @click="gridOptions1.align = 'center'">居中</vxe-button>
        <vxe-button @click="gridOptions1.align = 'right'">居右</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import type { VxeGridProps } from 'vxe-table'
const vueRouter = useRouter()
const goToConfig = () => {
  location.href = 'https://github.jzfai.top/low-code-platform/#/permission-center/user-table-query'
}
const gridOptions1 = reactive<VxeGridProps>({
  border: true,
  height: 300,
  columnConfig: {
    resizable: true
  },
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'name' },
    { field: 'sex', title: 'sex', showHeaderOverflow: true },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons'
    }
  },
  data: [
    { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
    { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
    { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
    { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
  ]
})
</script>

<style scoped lang="scss"></style>

<!-- 通用表格组件 -->
<template>
  <div class="m-table">
    <vxe-grid
      ref="xGrid"
      :key="tableKey"
      v-bind="gridOptions"
      @page-change="handlePageChange"
      @checkbox-all="checkboxChangeEvent"
      @checkbox-change="checkboxChangeEvent"
    >
      <template #toolbar_buttons>
        <slot name="toolbar_buttons" />
      </template>
      <template #toolbar_tools>
        <div class="vxe-tools--wrapper">
          <button class="vxe-button type--button is--circle" type="button" title="导出" @click="openExport">
            <i class="vxe-button--icon vxe-icon--download" />
          </button>
          <columnSet
            v-if="gridOptions.columns && columnSort"
            class="ml12"
            :columns="gridOptions.columns"
            :table-id="gridOptions.id!"
            @drag-sort-finish="rearrangement"
          />
        </div>
      </template>
      <template #operate="{ row }">
        <slot name="operation" :row="row" />
      </template>
    </vxe-grid>
  </div>
</template>

<script setup lang="ts" name="Mtable">
import columnSet from './ColumnSetting.vue'
import type { VxeGridProps, VxeTableInstance } from 'vxe-table'
import util from '@/utils/common-util'
import type { columnItem } from './types'
import bus from '@/utils/bus'

const refreshTable = (option?: any) => {
  return new Promise(resolve => {
    // 默认重置页码为1
    if (!option && gridOptions.pagerConfig) {
      gridOptions.pagerConfig.currentPage = 1
    }
    findList()?.then(res => resolve(res))
  })
}
bus.on('refreshTable', refreshTable)

onMounted(() => {
  // nextTick(() => changeFieldVisible())
})

onBeforeUnmount(() => {
  bus.off('refreshTable', refreshTable)
})

const route = useRoute()

// 获取表格实例
const xGrid = ref({} as VxeTableInstance)
const emits = defineEmits(['clearListQuery', 'checkboxChange'])

const props = defineProps({
  // 初始查询条件
  listQuery: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 默认查询条件
  queryCriteria: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 列表接口
  listInterface: {
    type: Function,
    default: () => {}
  },
  // 表格自定义配置项
  tableConfig: {
    type: Object,
    required: true
  },
  // 接口加载完成
  interfaceloaded: {
    type: Function,
    default: (res: any) => res.data
  },
  // 是否立即进行列表查询
  immediate: {
    type: Boolean,
    default: true
  }
})

const columnSort = ref<boolean>(false)
const tableKey = ref<number>(1)
// 表格默认配置项
const gridOptions = reactive<VxeGridProps>({
  showOverflow: true,
  highlightHoverRow: true,
  id: 'vxe-grid',
  maxHeight: 800,
  loading: false,
  editConfig: {},
  exportConfig: {},
  customConfig: {
    storage: true
  },
  sortConfig: {
    remote: false
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
    enabled: true
  },
  toolbarConfig: {
    slots: {
      // 自定义工具栏模板
      buttons: 'toolbar_buttons',
      tools: 'toolbar_tools'
    },
    className: 'custom-tools',
    refresh: {
      query: () => {
        emits('clearListQuery')
        return new Promise(resolve => {
          refreshTable().then(res => resolve(res))
        })
      }
    },
    tools: [
      {
        circle: true,
        transfer: true,
        code: 'openExport',
        icon: 'vxe-icon--download'
      },
      {
        circle: true,
        transfer: true,
        code: 'openColumnSet',
        icon: 'vxe-icon--menu'
      }
    ]
  },
  columns: [],
  data: [],
  checkboxConfig: {
    // reserve: true, // 是否保留勾选状态
    highlight: true
  }
})

// 合并配置项
const mergeConfiguration = () => {
  gridOptions.id = String(route.name) ?? 'arpa'
  Object.assign(gridOptions, props.tableConfig)
  rearrangement()
  props.immediate && findList()
}

const findList = () => {
  if (props.listInterface.toString().replace(/\s+/g, '') === '()=>{}') {
    console.error('m-table组件的list-interface参数必须为函数类型！')
  } else {
    const page = {
      pageNum: gridOptions.pagerConfig?.currentPage ?? 1,
      pageSize: gridOptions.pagerConfig?.pageSize ?? 20
    }
    // 查询条件合并
    const queryConditions = Object.assign(page, util.cleanObject(props.listQuery), props.queryCriteria)

    // 开始调用查询列表接口
    gridOptions.loading = true
    return new Promise(resolve => {
      props
        .listInterface(queryConditions)
        .then((res: any) => {
          const result = props.interfaceloaded(res)
          gridOptions.data = result.records
          if (gridOptions.pagerConfig && gridOptions.pagerConfig.enabled === true) {
            gridOptions.pagerConfig.total = result.total ?? 0
          }
          resolve(result)
        })
        .finally(() => {
          gridOptions.loading = false
        })
    })
  }
}
// 分页handle
const handlePageChange = ({ currentPage, pageSize }) => {
  if (gridOptions.pagerConfig) {
    gridOptions.pagerConfig.pageSize = pageSize
    gridOptions.pagerConfig.currentPage = currentPage
  }
  findList()
}
// 全选与否、部分勾选与否
const checkboxChangeEvent = ({ records }) => {
  emits('checkboxChange', JSON.parse(JSON.stringify(records)))
}

// 右上角自定义工具栏 - 导出
const openExport = () => {
  xGrid.value.openExport()
  setTimeout(() => {
    const fieldDomList = document.querySelector('.vxe-export--panel-column-body')?.getElementsByTagName('li')
    if (fieldDomList) {
      for (let i = 0; i < fieldDomList.length; i++) {
        const itemDom = fieldDomList[i]
        if (itemDom.title.replace(/\s*/g, '') === '' || itemDom.title === '操作') {
          const parentNode = itemDom.parentNode
          parentNode && parentNode.removeChild(itemDom)
          i--
        }
      }
    }
  })
}

// 列重排（恢复拖拽后顺序）
const rearrangement = (columnsList?: columnItem[]) => {
  let customColumnOrder: columnItem[] = []
  if (columnsList) {
    customColumnOrder = columnsList
  } else {
    const { fieldExist, fieldData } = getStorage('VXE_TABLE_CUSTOM_COLUMN_ORDER', gridOptions.id)
    if (fieldExist) customColumnOrder = fieldData
  }

  if (customColumnOrder.length) {
    const tableColumns: any[] = []
    if (gridOptions.columns) {
      gridOptions.columns.forEach((item, idx) => {
        if (item.type && ['seq', 'checkbox'].includes(item.type)) {
          item.visible = customColumnOrder[idx].visible
          tableColumns.push(item)
        }
      })
    }
    customColumnOrder.forEach(item => {
      const fieldName = item.field
      if (gridOptions.columns && fieldName) {
        gridOptions.columns.forEach(column => {
          if (column.field) {
            if (column.field === fieldName) {
              column.visible = item.visible
              tableColumns.push(column)
            }
          } else if (column.slots && `slots-${column.slots.default}` === fieldName) {
            column.visible = item.visible
            tableColumns.push(column)
          } else {
            const fieldItem = column.children
            if (fieldItem && fieldItem[0] && fieldItem[0].field === fieldName) {
              fieldItem[0].visible = item.visible
              tableColumns.push(column)
            }
          }
        })
      }
    })
    gridOptions.columns = tableColumns
  }
}

// 获取表格数据
const getTableData = () => {
  return gridOptions.data
}
// 表格数据需要重载
const reloadTable = () => {
  xGrid.value.reloadData(gridOptions.data ?? [])
}
mergeConfiguration()

// 分发方法，暴露出去 供父组件使用
defineExpose({ findList, getTableData, reloadTable, xGrid })
</script>

<style scoped lang="scss">
// 自定义右侧工具栏按钮样式
.ml12 {
  margin-left: 12px;
}
:deep(.vxe-tools--wrapper) {
  margin-right: 6px !important;
}
:deep(.vxe-custom--option) {
  cursor: move;
}
:deep(.vxe-checkbox--checked-icon) {
  cursor: pointer !important;
}
.field {
  width: 50px;
}
</style>

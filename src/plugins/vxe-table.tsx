import type { App } from 'vue'
import { toRaw } from 'vue'
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
// import { EditSlotParams } from 'vxe-table'
import 'vxe-table/lib/style.css'
import { isDefine } from '@/utils/validate'

// 限制只能输入数字
const validateNumber = value => {
  const signStr = value.charAt(0)
  value = value
    .replace('.', '$#$') // 把第一个字符'.'替换成'$#$'
    .replace(/\./g, '') // 把其余的字符'.'替换为空
    .replace('$#$', '.') // 把字符S#S替换回原来的'.'
    .replace(/[^\d.]/g, '') // 只能输入数字和'.'
    .replace(/^\./g, '') // 不能以.开头
    .replace(/([0-9]+\.[0-9]{6})[0-9]*/, '$1') // 只保留6位小数
  if (signStr === '-') value = `-${value}`
  return value
}
// 限制只能输入正整数和0
const vPositiveInteger = val => {
  //只能输入数字
  val = val.replace(/\D/g, '')

  //第一位输入0，第二位输入大于0的数字时候自动清空第一位的0
  if (val > 0) {
    //01 = > 1
    if (val[0] === '0') {
      val = val.slice(1)
    }
  } else if (Number(val) === 0) {
    // 00 => 0
    val = val.slice(0, 1)
  }
  return val
}

VXETable.use(VXETablePluginExportXLSX)
// 表格全局参数配置
VXETable.setup({
  table: {
    align: 'center', // 所有的列对齐方式，left, center, right
    border: true, // 是否带有边框
    round: true, // 是否为圆角边框
    stripe: true, // 是否带有斑马纹
    columnConfig: {
      resizable: true // 每一列是否启用列宽调整
    },
    checkboxConfig: {
      highlight: true // 高亮勾选行
    },
    editConfig: {
      trigger: 'click', // 点击触发编辑，manual,click,dblclick
      mode: 'cell', // 单元格编辑模式，cell,row
      showStatus: false
    },
    exportConfig: {
      type: 'xlsx', // 默认选中类型
      types: ['xlsx', 'csv', 'html', 'xml', 'txt'], // 自定义类型
      modes: ['current', 'selected'], // 输出数据的方式 current, selected, all
      isColgroup: false, // 是否支持带有分组结构的表头
      isMerge: true, // 是否支持临时合并的单元格
      columnFilterMethod({ column }) {
        // 列过滤方法，该函数的返回值用来决定是否过滤掉列
        return !['checkbox'].includes(String(column.type))
      }
    },
    sortConfig: {
      remote: true // 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理
    },
    tooltipConfig: {
      enterable: true // 鼠标是否可进入到工具提示中
    }
  },
  grid: {
    pagerConfig: {
      pageSizes: [10, 20, 50, 100, 500, 1000],
      layouts: ['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']
    }
  },
  modal: {
    zIndex: 3650
  }
})

// 事件拦截
VXETable.interceptor.add('event.clearActived', params => {
  // 比如点击了某个组件的弹出层面板之后，此时被激活单元格不应该被自动关闭，通过返回 false 可以阻止默认的行为。
  // element-ui，el-select  el-autocomplete
  const targetClassName = params.$event.target.className
  const parentTargetClassName = params.$event.target.parentElement.className
  if (
    targetClassName.includes('el-select-dropdown__item') ||
    parentTargetClassName.includes('el-select-dropdown__item')
  ) {
    return false
  }
  if (targetClassName.includes('el-autocomplete') || parentTargetClassName.includes('el-autocomplete')) {
    return false
  }
})

// 表头 - 单元格渲染 - 文本输入框
VXETable.renderer.add('el-input', {
  renderHeader(renderOpts: any, params) {
    const { props = {}, events = {} } = renderOpts
    const attrs = Object.assign({ placeholder: '请输入', clearable: true }, toRaw(props))
    return [
      <el-input
        {...attrs}
        v-model={renderOpts.modelValue}
        onInput={value => {
          events.input?.({ value, params })
        }}
        onChange={value => {
          events.change?.({ value, params })
        }}
      />
    ]
  }
})
// 表头 - 单元格渲染 - 下拉选择框
VXETable.renderer.add('el-select', {
  renderHeader(renderOpts: any, params) {
    const { options = [], props = {}, events = {}, labelKey = 'label', labelVal = 'value' } = renderOpts
    const attrs = Object.assign({ placeholder: '请选择', clearable: true }, toRaw(props))
    return [
      <el-select
        style="width: 100%"
        {...attrs}
        v-model={renderOpts.modelValue}
        onChange={value => {
          const selectedData = options.find(item => item[labelVal] === value)
          events.change?.({ value, params, selectedData })
        }}
      >
        {options.map(item => {
          return <el-option label={item[labelKey]} value={item[labelVal]} />
        })}
      </el-select>
    ]
  }
})
// 表头 - 单元格渲染 - 日期范围选择框
VXETable.renderer.add('el-date-picker', {
  renderHeader(renderOpts: any, params) {
    const { props = {}, events = {} } = renderOpts
    // valueFormat: 'YYYY-MM-DD', type: 'daterange',
    const attrs = Object.assign(
      {
        placeholder: '请选择日期',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        type: 'datetimerange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]
      },
      toRaw(props)
    )
    return [
      <el-date-picker
        {...attrs}
        style="width: 100%"
        v-model={renderOpts.modelValue}
        onChange={(value: any[]) => {
          events.change?.({ value, params })
        }}
      />
    ]
  }
})
// 表头 - 单元格渲染 - 区间范围输入框
VXETable.renderer.add('interval-input', {
  renderHeader(renderOpts: any, params) {
    const { modelValue = { startVal: '', endVal: '' }, events = {}, type } = renderOpts
    return [
      <el-row style="display:flex;align-items:center">
        <el-col span={11}>
          <el-input
            placeholder="下限"
            v-model={modelValue.startVal}
            onInput={(val: number) => {
              if (type === 'positiveInteger') {
                modelValue.startVal = vPositiveInteger(val)
              } else {
                modelValue.startVal = validateNumber(val)
              }
              events.input?.({ value: modelValue, params })
            }}
          />
        </el-col>
        <el-col span={2}>-</el-col>
        <el-col span={11}>
          <el-input
            placeholder="上限"
            v-model={modelValue.endVal}
            onInput={(val: number) => {
              if (type === 'positiveInteger') {
                modelValue.endVal = vPositiveInteger(val)
              } else {
                modelValue.endVal = validateNumber(val)
              }
              events.input?.({ value: modelValue, params })
            }}
          />
        </el-col>
      </el-row>
    ]
  }
})

// 行内 编辑/显示 - 单元格渲染
VXETable.renderer.add('$el-input', {
  // 可编辑激活模板
  renderEdit(renderOpts, params) {
    const { props = {}, events = {} } = renderOpts
    const { row, column } = params
    // const cellValue = XEUtils.get(row, column.field)
    const attrs = Object.assign({ placeholder: '请输入' }, toRaw(props))
    return [
      <el-input
        {...attrs}
        v-model={row[column.field]}
        onInput={value => {
          events.input?.({ value, row, params } as any)
        }}
        onChange={value => {
          events.change?.({ params, value } as any)
        }}
        onBlur={value => {
          events.blur?.({ params, value } as any)
        }}
        onFocus={value => {
          events.focus?.({ params, value } as any)
        }}
      />
    ]
  },
  // 可编辑显示模板
  renderCell(renderOpts, params) {
    const { row, column } = params
    return [<span>{row[column.field]}</span>]
  }
})

// 行内 编辑/显示 - 单元格渲染
VXETable.renderer.add('$el-select', {
  // 可编辑激活模板
  renderEdit(renderOpts: any, params) {
    const { row, column } = params
    let { options = [] } = renderOpts
    const {
      rowOptionKey,
      props = {},
      modelValue = '',
      events = {},
      labelKey = 'label',
      labelVal = 'value',
      disabled = []
    } = renderOpts
    const attrs = Object.assign({ placeholder: '请选择' }, toRaw(props))

    if (rowOptionKey) options = row[rowOptionKey] || []
    if (!isDefine(row[column.field])) {
      row[column.field] = modelValue
    }
    return [
      <el-select
        {...attrs}
        v-model={row[column.field]}
        onChange={data => {
          row[column.field] = data
          let selectedData: any = []
          if (Array.isArray(data) && Array.isArray(selectedData)) {
            data.forEach(selectItem => {
              const result = options.find(item => item[labelVal] === selectItem)
              selectedData.push(result)
            })
          } else {
            selectedData = options.find(item => item[labelVal] === row[column.field])
          }
          events.change?.({
            params,
            value: data,
            row,
            selectedData
          })
        }}
      >
        {options.map(item => {
          return (
            <el-option label={item[labelKey]} value={item[labelVal]} disabled={disabled.includes(item[labelVal])} />
          )
        })}
      </el-select>
    ]
  },
  // 可编辑显示模板
  renderCell(renderOpts: any, { row, column }) {
    let { options = [] } = renderOpts
    const { modelValue = '', labelKey = 'label', labelVal = 'value', rowOptionKey = '' } = renderOpts
    if (!isDefine(row[column.field])) {
      row[column.field] = modelValue
    }
    let showData = row[column.field]
    if (rowOptionKey) options = row[rowOptionKey] || []
    if (showData && options.length > 0) {
      // ;({ [labelKey]: showData } = options.find((item) => item[labelVal] === String(showData)))
      if (Array.isArray(showData)) {
        const selectedData: any[] = []
        showData.forEach(selectItem => {
          const result = options.find(item => item[labelVal] === selectItem)
          selectedData.push(result[labelKey])
        })
        if (selectedData.length > 0) {
          showData = selectedData.join(',')
        }
      } else {
        const result = options.find(item => item[labelVal] === String(showData))
        if (result) showData = result[labelKey]
      }
    }
    return [<span>{showData}</span>]
  }
})
// 行内 编辑/显示 - 日期选择框渲染
VXETable.renderer.add('$el-date-picker', {
  // 可编辑激活模板
  renderEdit(renderOpts: any, params) {
    const { props = {}, events = {} } = renderOpts
    const attrs = Object.assign(
      {
        placeholder: '请选择日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'date'
      },
      toRaw(props)
    )
    return [
      <el-date-picker
        {...attrs}
        style="width: 100%"
        v-model={renderOpts.modelValue}
        onChange={(value: any[]) => {
          events.change?.({ value, params })
        }}
      />
    ]
  },
  // 可编辑显示模板
  renderCell(renderOpts, params) {
    const { row, column } = params
    return [<span>{row[column.field]}</span>]
  }
})
// export default function (app: App) {
//   app.use(VXETable)
// }

export default {
  install(app: App) {
    app.use(VXETable)
  }
}

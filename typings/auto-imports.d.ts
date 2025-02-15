// Generated by 'unplugin-auto-import'
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const axiosReq: typeof import('../src/utils/axios-req')['default']
  const bus: typeof import('../src/utils/bus')['default']
  const buttonCodes: typeof import('../src/directives/button-codes')['default']
  const casHandleChange: typeof import('../src/hooks/use-element')['casHandleChange']
  const cloneDeep: typeof import('../src/hooks/use-common')['cloneDeep']
  const closeElLoading: typeof import('../src/hooks/use-element')['closeElLoading']
  const codesPermission: typeof import('../src/directives/codes-permission')['default']
  const commonUtil: typeof import('../src/utils/common-util')['default']
  const computed: typeof import('vue')['computed']
  const copyValueToClipboard: typeof import('../src/hooks/use-common')['copyValueToClipboard']
  const createApp: typeof import('vue')['createApp']
  const customRef: typeof import('vue')['customRef']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const directives: typeof import('../src/directives/index')['default']
  const effectScope: typeof import('vue')['effectScope']
  const elConfirm: typeof import('../src/hooks/use-element')['elConfirm']
  const elConfirmNoCancelBtn: typeof import('../src/hooks/use-element')['elConfirmNoCancelBtn']
  const elLoading: typeof import('../src/hooks/use-element')['elLoading']
  const elMessage: typeof import('../src/hooks/use-element')['elMessage']
  const elNotify: typeof import('../src/hooks/use-element')['elNotify']
  const filterAsyncRouter: typeof import('../src/hooks/use-permission')['filterAsyncRouter']
  const filterAsyncRouterByCodes: typeof import('../src/hooks/use-permission')['filterAsyncRouterByCodes']
  const filterAsyncRoutesByMenuList: typeof import('../src/hooks/use-permission')['filterAsyncRoutesByMenuList']
  const filterAsyncRoutesByRoles: typeof import('../src/hooks/use-permission')['filterAsyncRoutesByRoles']
  const freshRouter: typeof import('../src/hooks/use-permission')['freshRouter']
  const getAppToken: typeof import('../src/api/user')['getAppToken']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getLangInstance: typeof import('../src/hooks/use-common')['getLangInstance']
  const getQueryParam: typeof import('../src/hooks/use-self-router')['getQueryParam']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isArray: typeof import('../src/utils/validate')['isArray']
  const isDefine: typeof import('../src/utils/validate')['isDefine']
  const isExternal: typeof import('../src/hooks/use-layout')['isExternal']
  const isNumber: typeof import('../src/utils/validate')['isNumber']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const isString: typeof import('../src/utils/validate')['isString']
  const lang: typeof import('../src/directives/lang')['default']
  const langTitle: typeof import('../src/hooks/use-common')['langTitle']
  const lettersNumber: typeof import('../src/utils/validate')['lettersNumber']
  const loginOutReq: typeof import('../src/api/user')['loginOutReq']
  const loginReq: typeof import('../src/api/user')['loginReq']
  const markRaw: typeof import('vue')['markRaw']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeRouteLeave: typeof import('vue-router')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('vue-router')['onBeforeRouteUpdate']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const progressClose: typeof import('../src/hooks/use-permission')['progressClose']
  const progressStart: typeof import('../src/hooks/use-permission')['progressStart']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const resetRouter: typeof import('../src/hooks/use-permission')['resetRouter']
  const resetState: typeof import('../src/hooks/use-permission')['resetState']
  const resizeHandler: typeof import('../src/hooks/use-layout')['resizeHandler']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const resolveDirective: typeof import('vue')['resolveDirective']
  const rolesPermission: typeof import('../src/directives/roles-permission')['default']
  const routeInfo: typeof import('../src/hooks/use-self-router')['routeInfo']
  const routerBack: typeof import('../src/hooks/use-self-router')['routerBack']
  const routerPush: typeof import('../src/hooks/use-self-router')['routerPush']
  const routerReplace: typeof import('../src/hooks/use-self-router')['routerReplace']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const sleepTimeout: typeof import('../src/hooks/use-common')['sleepTimeout']
  const storeToRefs: typeof import('pinia/dist/pinia')['storeToRefs']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const useAttrs: typeof import('vue')['useAttrs']
  const useBasicStore: typeof import('../src/store/basic')['useBasicStore']
  const useConfigStore: typeof import('../src/store/config')['useConfigStore']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useElement: typeof import('../src/hooks/use-element')['useElement']
  const useErrorLog: typeof import('../src/hooks/use-error-log')['useErrorLog']
  const useLink: typeof import('vue-router')['useLink']
  const useRoute: typeof import('vue-router')['useRoute']
  const useRouter: typeof import('vue-router')['useRouter']
  const useSlots: typeof import('vue')['useSlots']
  const useTable: typeof import('../src/hooks/use-table')['useTable']
  const useTagsViewStore: typeof import('../src/store/tags-view')['useTagsViewStore']
  const userInfoReq: typeof import('../src/api/user')['userInfoReq']
  const validAlphabets: typeof import('../src/utils/validate')['validAlphabets']
  const validLowerCase: typeof import('../src/utils/validate')['validLowerCase']
  const validURL: typeof import('../src/utils/validate')['validURL']
  const validUpperCase: typeof import('../src/utils/validate')['validUpperCase']
  const validatenumber: typeof import('../src/utils/validate')['validatenumber']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}

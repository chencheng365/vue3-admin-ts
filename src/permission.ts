import router from '@/router'
import { filterAsyncRouter, progressClose, progressStart } from '@/hooks/use-permission'
import { useBasicStore } from '@/store/basic'
// import { userInfoReq } from '@/api/user'
import { langTitle } from '@/hooks/use-common'
import util from '@/utils/common-util'

//路由进入前拦截
//to:将要进入的页面 vue-router4.0 不推荐使用next()
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async to => {
  progressStart()
  // const { token, isActiveMenu } = to.query
  document.title = langTitle(to.meta?.title) // i18 page title
  const basicStore = useBasicStore()

  const token = util.getQueryString('token')
  if (token) {
    basicStore.setToken(token)
  }

  //1.判断token
  if (basicStore.token) {
    if (to.path === '/login') {
      return '/'
    } else {
      //2.判断是否获取用户信息
      if (!basicStore.getUserInfo) {
        try {
          const userInfoData = {
            codes: [16, 9, 10, 11, 12, 13, 15],
            userInfo: {
              id: 5,
              name: 'panda',
              headImgUrl: 'https://github.jzfai.top/gofast-image//group1/default/20221108/19/12/4/logo_W2xEX_2x.jpg',
              phone: '13302254696',
              salt: '57725fa138a64d2ca5f3ea6821e1c7f6',
              password: 'e5082b9e71627885ddd5875896f9b1d0',
              roleId: '[13]',
              createTime: '2022-10-22 03:46:10',
              creator: null,
              updateTime: '2022-12-01 02:21:20',
              editor: null,
              deleted: 0
            },
            menuList: [
              {
                id: 9,
                parentId: 0,
                plateFormId: 2,
                parentNode: 1,
                sort: null,
                code: 'RbacTest',
                intro: '',
                creator: null,
                editor: null,
                path: 'rbac-test',
                name: 'RBACMenu',
                category: 1,
                component: 'Layout',
                title: 'RBACMenu',
                elSvgIcon: 'Fold',
                icon: '',
                redirect: '',
                alwaysShow: 1,
                hidden: 0,
                extra: null,
                updateTime: '2023-01-20 00:32:15',
                createTime: '2022-10-15 09:41:23',
                deleted: 0,
                children: [
                  {
                    id: 10,
                    parentId: 9,
                    plateFormId: 2,
                    parentNode: 1,
                    sort: 10,
                    code: 'TestMenu',
                    intro: '',
                    creator: null,
                    editor: null,
                    path: 'test-table-query',
                    name: '页面测试',
                    category: 1,
                    component: 'rbac-test/TestMenu.vue',
                    title: '路由权限测试',
                    elSvgIcon: '',
                    icon: '',
                    redirect: '',
                    alwaysShow: 0,
                    hidden: 0,
                    extra: null,
                    updateTime: '2022-10-25 06:17:28',
                    createTime: '2022-10-15 09:58:09',
                    deleted: 0,
                    children: []
                  },
                  {
                    id: 11,
                    parentId: 9,
                    plateFormId: 2,
                    parentNode: null,
                    sort: 10,
                    code: 'TestAddEdit',
                    intro: '',
                    creator: null,
                    editor: null,
                    path: 'test-add-edit',
                    name: '页面测试-新增编辑',
                    category: 1,
                    component: 'rbac-test/TestAddEdit.vue',
                    title: '页面测试-新增编辑',
                    elSvgIcon: '',
                    icon: '',
                    redirect: '',
                    alwaysShow: 0,
                    hidden: 1,
                    extra: null,
                    updateTime: '2022-10-25 06:00:45',
                    createTime: '2022-10-15 10:00:26',
                    deleted: 0,
                    children: null
                  },
                  {
                    id: 13,
                    parentId: 9,
                    plateFormId: 2,
                    parentNode: 1,
                    sort: 10,
                    code: 'TestButton',
                    intro: '',
                    creator: null,
                    editor: null,
                    path: 'test-button',
                    name: '按钮测试',
                    category: 1,
                    component: 'rbac-test/TestButton.vue',
                    title: '按钮测试',
                    elSvgIcon: '',
                    icon: '',
                    redirect: '',
                    alwaysShow: 0,
                    hidden: 0,
                    extra: '',
                    updateTime: '2022-10-28 08:47:29',
                    createTime: '2022-10-23 09:28:10',
                    deleted: 0,
                    children: [
                      {
                        id: 15,
                        parentId: 13,
                        plateFormId: 2,
                        parentNode: 0,
                        sort: 0,
                        code: 'TestButton:Edit',
                        intro: '',
                        creator: null,
                        editor: null,
                        path: '',
                        name: '按钮测试-编辑按钮',
                        category: 3,
                        component: '',
                        title: '',
                        elSvgIcon: '',
                        icon: '',
                        redirect: '',
                        alwaysShow: 0,
                        hidden: 0,
                        extra: '',
                        updateTime: '2022-10-25 06:18:31',
                        createTime: '2022-10-23 09:36:21',
                        deleted: 0,
                        children: null
                      },
                      {
                        id: 12,
                        parentId: 13,
                        plateFormId: 2,
                        parentNode: null,
                        sort: null,
                        code: 'TestButton:AddBtn',
                        intro: 'TestTableQuery页面的新增按钮',
                        creator: null,
                        editor: null,
                        path: '',
                        name: '按钮测试-新增按钮',
                        category: 3,
                        component: '',
                        title: '新增按钮',
                        elSvgIcon: '',
                        icon: '',
                        redirect: '',
                        alwaysShow: 1,
                        hidden: 0,
                        extra: null,
                        updateTime: '2022-10-25 06:18:38',
                        createTime: '2022-10-15 10:08:44',
                        deleted: 0,
                        children: null
                      }
                    ]
                  },
                  {
                    id: 16,
                    parentId: 9,
                    plateFormId: 2,
                    parentNode: 0,
                    sort: 10,
                    code: 'TestDetail',
                    intro: '',
                    creator: null,
                    editor: null,
                    path: 'detail',
                    name: '页面测试-详情',
                    category: 1,
                    component: 'rbac-test/TestDetail.vue',
                    title: '页面测试-详情',
                    elSvgIcon: '',
                    icon: '',
                    redirect: '',
                    alwaysShow: 0,
                    hidden: 1,
                    extra: '',
                    updateTime: '2022-10-25 06:00:54',
                    createTime: '2022-10-23 10:23:53',
                    deleted: 0,
                    children: null
                  }
                ]
              }
            ],
            roles: ['admin']
          }
          const userData = userInfoData
          // const userData = await userInfoReq()
          //3.动态路由权限筛选
          filterAsyncRouter(userData)
          //4.保存用户信息到store
          basicStore.setUserInfo(userData)
          //5.再次执行路由跳转
          return { ...to, replace: true }
        } catch (e) {
          console.error(`route permission error${e}`)
          basicStore.resetState()
          progressClose()
          return `/login?redirect=${to.path}`
        }
      } else {
        return true
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return `/login?redirect=${to.path}`
    } else {
      return true
    }
  }
})
//路由进入后拦截
router.afterEach(() => {
  progressClose()
})

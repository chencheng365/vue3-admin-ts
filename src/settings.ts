import packageJson from '../package.json'
import type { SettingsConfig } from '~/basic'
export const settings: SettingsConfig = {
  /* 页面布局相关*/

  // 标题和导航栏显示的名称
  title: packageJson.name,
  /**
   * @type {boolean} true | false
   * @description 是否显示左上角图标和标题（Logo）
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description 是否导航栏中间的title
   */
  showNavbarTitle: false,
  /**
   * @type {boolean} true | false
   * @description 是否显示右侧下拉框区域
   */
  ShowDropDown: true,
  /**
   * @type {boolean} true | false
   * @description 是否显示面包屑导航（Breadcrumb）
   */
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description 是否显示左侧侧边栏（Sidebar菜单）
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description 是否显示标签栏（TagsView）
   */
  showTagsView: true,
  /**
   * @description 显示标签栏时，配置最多显示标签的个数，超过将会替换最后一个标签
   */
  tagsViewNum: 12,
  /**
   * @type {boolean} true | false
   * @description 是否显示导航栏（NavBar）
   */
  showTopNavbar: true,

  /* 页面动画相关*/
  /**
   * @type {boolean} true | false
   * @description 主视区域和面包屑导航是否需要动画
   */
  mainNeedAnimation: false,
  /**
   * @type {boolean} true | false
   * @description 是否需要页面加载进度条
   */
  isNeedNprogress: true,

  /*页面登录和其他*/
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: true,
  /**
   * @type {string} 'rbac'| 'roles' | 'code'
   */
  permissionMode: 'rbac',
  /**
   * @type {boolean} true | false
   * @description 是否开启生产时也使用mock,开启后生产环境也能使用开发时的mock数据
   */
  openProdMock: true,
  /**
   * @type {string | array} 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
   * @description 收集错误日志
   * 配置那个环境需要，收集错误日志 ['build', 'serve']
   * 注：尽量不要配置serve下收集错误日志，因为收集到的日志大多没有意义，还浪费了服务器资源
   */
  errorLog: ['prod'],
  /*
   * el-table中动态高度设定，计算的数值为height(100vh-delWindowHeight)，
   * */
  delWindowHeight: '210px',
  /*
   * setting dev token when  isNeedLogin is setting false
   * */
  tmpToken: 'tmp_token',

  /*
   * vite.config.js base config
   * */
  viteBasePath: './',

  /*
   * i18n 初始默认语言
   * en/zh
   * */
  defaultLanguage: 'zh',
  /*
   * 设置默认主题色
   * base-theme/lighting-theme/dark-theme
   * */
  defaultTheme: 'base-theme',
  /*
   * 设置默认大小
   * large / default /small
   * */
  defaultSize: 'small',
  /*
   * vite.config.js base config
   * such as
   * */
  //平台id  2->vue3-admin-plus
  plateFormId: 2
}

export default settings

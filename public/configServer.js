// 中台基础接口地址
var apiEnzomesa = {
  dev: 'http://121.36.33.59/',
  build: 'http://121.36.33.59/'
}

window.EnvServer = {
  // 业务接口地址
  apiUrl: {
    dev: apiEnzomesa.dev + 'enzomesa/enzomesa-uac/',
    build: apiEnzomesa.dev + 'enzomesa/enzomesa-uac/'
  },
  // 中台sso登录
  enzomesaSso: {
    dev: apiEnzomesa.dev + 'sso-server/login',
    build: apiEnzomesa.build + 'sso-server/login'
  }
}

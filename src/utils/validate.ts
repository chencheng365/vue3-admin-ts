/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string): boolean {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str: string): boolean {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: any): boolean {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg: string) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * [isDefine 判断值是否定义]
 * @param  {[string]}  value
 * @return {Boolean}
 */
export function isDefine(value: any): boolean {
  if (
    value === null ||
    value === '' ||
    value === 'undefined' ||
    value === undefined ||
    value === 'null' ||
    value === '(null)' ||
    value === 'NULL' ||
    typeof value === 'undefined'
  ) {
    return false
  } else {
    value = `${value}`
    value = value.replace(/\s/g, '') //全局匹配空白字符
    if (value === '') {
      return false
    }
    return true
  }
}
/**
 * 只能由英文和数字组成
 * @param {string} str
 */
export function lettersNumber(str: string) {
  const reg = /^[a-z0-9]+$/i
  return reg.test(str)
}
/**
 * 正整数
 * @param {string} number
 */
export function validatenumber(number) {
  const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
  return reg.test(number)
}

/**
 * 数字
 * @param {string} string-test-commit-aaaa-sadf-test-conmuiuit
 */
export function isNumber(number: string) {
  const reg = /^(([^0][0-9]+|0)\.([0-9]+)$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]+)$)|^(([1-9]+)$)/
  return reg.test(number)
}

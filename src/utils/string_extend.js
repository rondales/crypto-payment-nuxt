export default class {
  static trim(str, target = null) {
    const rgxtrim = (!target) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp(`^${target}+|${target}+$`, 'g')
    return str.replace(rgxtrim, '')
  }
  static rtrim(str, target = null) {
    const rgxtrim = (!target) ? new RegExp('\\s+$') : new RegExp(`${target}+$`)
    return str.replace(rgxtrim, '')
  }
  static ltrim(str, target = null) {
    const rgxtrim = (!target) ? new RegExp('^\\s+') : new RegExp(`^${target}+`)
    return str.replace(rgxtrim, '')
  }
}

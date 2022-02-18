export default class {
  static floorDecimal(value, precision) {
    return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  static ceilDecimal(value, precision) {
    return Math.ceil(value * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  static roundDecimal(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
  }
}
import { LOGIN_TOKEN } from '@/constants'

export default class {
  static getBearer(token = null) {
    if (token) {
      return `Bearer ${token}`
    } else {
      return `Bearer ${localStorage.getItem(LOGIN_TOKEN)}`
    }
  }
}
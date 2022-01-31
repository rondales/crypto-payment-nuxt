import { LOGIN_TOKEN } from '@/constants'

export default class {
  static getBearer() {
    return `Bearer ${localStorage.getItem(LOGIN_TOKEN)}`
  }
}
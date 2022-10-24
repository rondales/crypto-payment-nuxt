<script>
import { LOGIN_TOKEN, HTTP_CODES } from '@/constants'
import { errorCodeList } from '@/enum/error_code'
import RequestUtility from '@/utils/request'

export default {
  name: 'ApiHandler',
  methods: {
    $_apiHandler_getOptions() {
      return {
        headers: { Authorization: RequestUtility.getBearer() }
      }
    },
    $_apiHandler_apiConnectionErrorHandler(statusCode, responseData) {
      if (statusCode === HTTP_CODES.UN_AUTHORIZED) {
        localStorage.removeItem(LOGIN_TOKEN)
        this.$router.push({ path: '/admin' })
      } else {
        if ('errors' in responseData && responseData.errors.length) {
          this.$store.dispatch('modal/show', {
            target: 'error-for-admin-modal',
            size: 'small',
            params: {
              message: errorCodeList[responseData.errors.shift()].msg
            }
          })
        }
      }
    }
  }
}
</script>

<script>

export default {
  name: 'DeviceIdHandler',
  methods: {
    $_deviceIdHandler_update(deviceId) {
      localStorage.deviceId = deviceId
    },
    $_deviceIdHandler_get() {
      return localStorage.deviceId
    },
    $_deviceIdHandler_destroy() {
      localStorage.deviceId = null
    }
  }
}
</script>
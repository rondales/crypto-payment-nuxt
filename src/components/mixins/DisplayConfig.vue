<script>
import NumberFormat from 'number-format.js'
export default {
  name: 'DisplayConfig',
  methods: {
    $_displayConfig_formatNumber(number) {
      return NumberFormat('0.000000', number)
    }
  }
}
</script>
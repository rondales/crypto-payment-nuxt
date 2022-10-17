<template>
  <div>
    <div class="payhead">
      <div>
        <PaymentButton
          :icon="invoiceIcon.icon"
          @click.native="handle_function_call(invoiceIcon.func)"
          size="icon"
          color="icon"
        />
      </div>
      <div>
        <PaymentIcon class="logo" path="logo-icon" />
      </div>
      <div>
        <PaymentIcon v-if="loading" class="spin" path="loading" />
      </div>
    </div>
  </div>
</template>


<script>
// import PaymentTitle from '@/components/organisms/Payment/Title'
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentIcon from '@/components/organisms/Payment/Icon'
export default {
  name: 'PaymentTop',
  components: {
    // PaymentTitle,
    PaymentIcon,
    PaymentButton
  },
  props: ['loading'],
  data() {
    return {
      invoiceIcon: {
        icon: '',
        func: ''
      }
    }
  },
  watch: {
    $route(route) {
      this.setIconData(route.name)
    }
  },
  methods: {
    copyLink() {
      this.$emit('copyLink')
    },
    prevPage() {
      this.$router.back()
    },
    handle_function_call(function_name) {
      if (function_name == 'prevPage') {
        this.prevPage()
      } else if (function_name == 'copyLink') {
        this.copyLink()
      }
    },
    setIconData(routeName) {
      this.invoiceIcon.icon = ''
      this.invoiceIcon.func = ''
      if (['token', 'exchange', 'detail'].includes(routeName)) {
        // this.invoiceIcon.icon = 'left-arrow'
        this.invoiceIcon.icon = 'icon-back'
        this.invoiceIcon.func = 'prevPage'
      } else if (routeName === 'result') {
        this.invoiceIcon.icon = 'link'
        this.invoiceIcon.func = 'copyLink'
      }
    }
  },
  created() {
    this.setIconData(this.$route.name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';
.payhead {
  @include flex(space-between, center);
  margin-bottom: 1rem;
  @include media(sp) {
    margin-bottom: 2rem;
  }

  & > * {
    font-size: 0;
    &:nth-child(2) {
    }
    &:nth-child(1),
    &:nth-child(3) {
      width: 2.5rem;
      font-size: 0;
    }
  }
  .logo {
    width: 3rem;
    @include media(sp) {
      width: 3.5rem;
    }
  }
  .spin {
    width: 2rem;
    height: 2rem;
  }
}
</style>

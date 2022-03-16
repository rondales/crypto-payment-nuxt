<template>
  <div>
    <div class="side-bar" :class="{'active': $store.state.hamberger === true}">
      <div class="side-bar--top"></div>
      <div class="side-bar--content">
        <div class="side-bar--inner">
          <ul>
            <li @click="close()">
              <router-link to="/admin/dashboard">
                Dashboard
              </router-link>
            </li>
            <li @click="close()">
              <router-link to="/admin/web3payment?id=1">
                web3 payment
              </router-link>
            </li>
            <!--
            @todo remove comment out when implementing invoice function
            <li @click="close()">
              <router-link to="/admin/invoice">
                invoice
              </router-link>
            </li>
            -->
            <li @click="close()">
              <router-link to="/admin/keys">
                keys
              </router-link>
            </li>
            <!--
            @todo external connection specification page will be released as soon as it is completed
            <li @click="close()">
              <router-link to="/admin/documents">
                Documents
              </router-link>
            </li>
            -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'payment',
  components: {
  },
  methods: {
    close(){
      this.$store.state.hamberger = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
.side-bar{
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  width: 170px;
  border-right: 1px solid #58466E;
  @include media(sp) {
    display: none;
    &.active{
      display: block;
      top: 0;
      width: 100%;
      background: var(--color_bg);
      z-index: 999;
      padding-top: 64px;
    }
  }
  &--top{
    margin-top: 46px;
  }
  &--content{
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  &--inner{
    width: 170px;
    ul{
      li{
        padding: 8px 24px;
        margin-bottom: 20px;
        font-size: 15px;
        a{
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
}
.router-link-active{
  color: #8B2AE1;
  background: linear-gradient(120deg, #5294F5 30%, #705CEA 50%, #8B2AE1 66%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 150% 150%;
}
</style>
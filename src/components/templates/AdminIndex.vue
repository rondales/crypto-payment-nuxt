<template>
  <div class="ADMIN">
    <div>
      <Header />
      <SideBar />
      <div class="contents">
        <div class="user-status" :class="{'is-admin': isAdminPage}">
          ReceiveToken：<img  src="@/assets/images/symbol/usdt.svg"><span>USDT</span>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/organisms/header"
import SideBar from "@/components/organisms/admin/AdminSidebar"

export default {
  name: 'Contents',
  components: {
    Header,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@include media(sp) {
  .user-status{
    display: flex;
    font-size: 12px;
    padding: 2px 12px;
    width: 80%;
    margin: 24px auto 32px;
    font-weight: 200;
    line-height: 24px;
    background: $gradation-light;
    border-radius:50px;
    align-items: center;
    img{
      width: 16px;
      height: 16px;
      margin-left: 54px;
      margin-right: 32px;
    }
  }
}
.contents{
  padding: 48px;
  margin-left: 170px;
  margin-top: 80px;
  @include media(sp) {
    padding: 16px 24px 32px;
    margin-left: 0;
    margin-bottom: 0;
    margin-top: 55px;
  }
}

</style>
<template>
  <div class="ADMIN">
    <div>
      <Header />
      <SideBar />
      <div class="contents">
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

.contents{
  padding: 48px;
  margin-left: 170px;
  margin-top: 80px;
  @include media(sp) {
    padding: 0 24px;
    margin-left: 0;
    margin-bottom: 160px;
  }
}

</style>
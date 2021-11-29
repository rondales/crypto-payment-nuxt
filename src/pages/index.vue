<template>
  <div class="home">
    <div>
      <a href="/payment">PAYMENT PAGE</a>
      <a href="/admin">ADMIN PAGE</a>
      <a href="/admin/dashboard">ADMIN/dashboard</a>
      <a href="/admin/web3payment">ADMIN/web3payment</a>
      <a href="/admin/invoice">ADMIN/inovoice</a>
      <a href="/admin/keys">ADMIN/keys</a>      
      <a href="/admin/documents">ADMIN/documents</a>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.home{
  text-align: center;
  padding-top: 10vh;
  background: var(--color_bg);
  a{
    display: block;
    font: 24px;
    color: #fff;
    margin-bottom: 20px;
  }
}
</style>
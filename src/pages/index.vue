<template>
  <div class="home">
    <div>
      <a href="/payment">PAYMENT PAGE</a>
      <a href="/">ADMIN PAGE</a>
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
  margin-top: 50vh;
  a{
    display: block;
    font: 24px;
    color: #fff;
    margin-bottom: 20px;
    &:nth-child(2){
      opacity: .6;
      text-decoration: line-through;
    }
  }
}
</style>
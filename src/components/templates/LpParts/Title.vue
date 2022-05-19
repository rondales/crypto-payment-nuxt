<template>
  <div class="title">
    <h1 v-if="type == 'page'">{{ title.title }}</h1>
    <h2 v-if="type == 'section'">{{ title.title }}</h2>
    <p class="sub" v-if="title.subtitle">{{ title.subtitle }}</p>
    <p class="lead" v-if="title.lead">{{ title.lead }}</p>
    <p class="text" v-if="title.text">{{ title.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "page", // page, section
    },
    title: {
      type: Object,
      required: true,
      default: {
        title: "",
        subtitle: "",
        lead: "",
        text: "",
      },
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  @include font(pow(4) + rem, $fw, $ls, $lh, $en_go);
}
h2 {
  @include font(pow(3) + rem, $fw, $ls, $lh, $en_go);
}
.sub {
  @include font(pow(2) + rem, $fw, $ls, $lh, $en_go);
}
.lead {
  @include font(pow(1) + rem, $fw, $ls, $lh, $en_go);
}
.text {
  @include font(pow(0) + rem, $fw, $ls, $lh, $en_go);
}
</style>

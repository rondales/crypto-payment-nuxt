<template>
  <div :class="canvasClass + '__canvas'">
    <vue-p5 v-on="this"></vue-p5>
  </div>
</template>


<script src="https://unpkg.com/vue-p5"></script>
<script>
// import Vue from "vue";
import VueP5 from "vue-p5";
export default {
  props: {
    canvasClass: {
      type: String,
    },
  },
  methods: {
    setup(sketch) {
      sketch.background("green");
      sketch.text("Hello p5!", 20, 20);
    },
  },
  render(h) {
    return h(VueP5, { on: this });
  },
};
</script>

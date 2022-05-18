<template>
  <canvas :class="canvasClass + '__canvas'"></canvas>
</template>
<script>
export default {
  props: {
    canvasClass: {
      type: String,
    },
  },
  data() {
    // return {
    //   ShapesNum: 0,
    //   shapes: [],
    //   curTime: 0.0,
    //   speed: 50.0,
    //   SizeMin: 0,
    //   SizeMax: 0,
    //   windowWidth: 0,
    //   windowHeight: 0,
    // };
  },
  watch: {},
  methods: {},
  mounted() {
    // let p5Script = document.createElement("script");
    // p5Script.setAttribute(
    //   "src",
    //   "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
    // );
    // p5Script.setAttribute(
    //   "integrity",
    //   "https://cdnjs.sha512-NxocnqsXP3zm0Xb42zqVMvjQIktKEpTIbCXXyhBPxqGZHqhcOXHs4pXI/GoZ8lE+2NJONRifuBpi9DxC58L0Lw==.com/ajax/libs/p5.js/1.4.1/p5.min.js"
    // );
    // p5Script.setAttribute("crossorigin", "anonymous");
    // p5Script.setAttribute("referrerpolicy", "no-referrer");
    // document.head.appendChild(p5Script);
    // // mounted 以降で canvas の DOM にアクセスできる
    // // CreateJS などを使うときにも、ここで canvas と紐付ける
    // // console.log(this.$el)
    // this.ctx = this.$el.getContext("2d");
    // this.draw(this.radius);
  },
};
</script>

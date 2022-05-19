<template>
  <div :class="canvasClass + '__canvas'">
    <div id="MvCanvas"></div>
    <div id="SubCanvas1"></div>
    <div id="SubCanvas2"></div>
    <div id="SubCanvas3"></div>
  </div>
</template>


<script src="https://unpkg.com/vue-p5"></script>
<script>
export default {
  props: {
    canvasClass: {
      type: String,
    },
  },
  mounted() {
    const P5 = require("p5");

    const script = function (mv) {
      //ColroSetting
      let BgColor = "#171421"; //RGB
      //ShapesSetting
      let ShapesNum;
      let shapes = [];
      let curTime = 0.0;
      let _speed = 50.0;
      let SizeMin, SizeMax;

      // NOTE: Set up is here
      mv.setup = (_) => {
        mv.frameRate(30);
        // document.getElementById("MvCanvas").style.width = window.innerWidth;
        // document.getElementById("MvCanvas").style.height = window.innerHeight;
        SizeMin = mv.min(
          document.getElementById("MvCanvas").clientWidth,
          document.getElementById("MvCanvas").clientHeight
        );
        SizeMax = mv.max(
          document.getElementById("MvCanvas").clientWidth,
          document.getElementById("MvCanvas").clientHeight
        );
        // mySize = 500;
        var canvas = mv.createCanvas(SizeMax, SizeMax, mv.WEBGL);
        canvas.parent("MvCanvas");
        // ShapesNum = floor(mySize/6);
        ShapesNum = 200;
        // print(ShapesNum)
        mv.colorMode(mv.HSB, 360, 100, 100, 100);
        mv.background(BgColor);

        for (let i = 0; i < ShapesNum; i++) {
          let shape = new Shape(i, ShapesNum, SizeMin * 1.25);
          shapes.push(shape);
        }
      };

      mv.windowResized = (_) => {
        document.getElementById("MvCanvas").style.width = window.innerWidth;
        document.getElementById("MvCanvas").style.height = window.innerHeight;
        SizeMin = mv.min(
          document.getElementById("MvCanvas").clientWidth,
          document.getElementById("MvCanvas").clientHeight
        );
        SizeMax = mv.max(
          document.getElementById("MvCanvas").clientWidth,
          document.getElementById("MvCanvas").clientHeight
        );

        mv.resizeCanvas(SizeMax, SizeMax);
        for (let i = 0; i < shapes.length; i++) {
          let shape = shapes[i];
          shape.resize(SizeMin * 1.25);
        }
      };

      mv.draw = (_) => {
        mv.background(BgColor);

        for (let i = 0; i < shapes.length; i++) {
          let shape = shapes[i];
          shape.draw();
        }
        curTime += mv.deltaTime * 0.001;
      };
      class Shape {
        constructor(id, maxnum, size) {
          this.id = id;
          this.maxnum = maxnum;
          this.size = size;
        }

        resize(size) {
          this.size = size;
        }

        draw() {
          mv.noFill();
          let maxid = this.maxnum * 0.1;
          let thresh = mv.map(
            mv.max(this.id, maxid),
            maxid,
            this.maxnum - 1,
            0,
            1.0
          );
          mv.strokeWeight(mv.map(mv.max(thresh, 0.5), 0.5, 1.0, 0.0, 2.0));
          mv.push();
          let angrange = mv.map(
            mv.sin(mv.radians(curTime * 10.0)),
            -1.0,
            1.0,
            60.0,
            360.0
          );
          let addang =
            curTime * _speed + (angrange * this.id) / (this.maxnum - 1.0);
          let ang = mv.radians(45.0 + addang);

          mv.rotateX(ang);
          mv.rotateY(ang);
          mv.rotateZ(ang);

          let scaleval = 1.0 - this.id / this.maxnum;
          let addscale = mv.map(
            mv.sin(mv.radians(curTime * 10.0)),
            -1.0,
            1.0,
            0.0,
            0.02
          );
          scaleval = mv.map(scaleval, 0.0, 1.0, addscale, 1.0 + addscale);

          let Hue =
            195 *
              mv.abs(mv.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            75;
          let Saturation =
            20 *
              mv.abs(mv.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            80;
          let Brightness =
            10 *
              mv.abs(mv.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            80;

          mv.stroke(Hue, Saturation, Brightness, 100);
          mv.box(this.size * scaleval);
          mv.pop();
        }
      }
    };
    new P5(script);

    const script2 = function (p5) {
      var speed = 2;
      var posX = 0;

      // NOTE: Set up is here
      p5.setup = (_) => {
        // p5.createCanvas(500, 500);
        var canvas = p5.createCanvas(500, 500);
        canvas.parent("SubCanvas1");
        p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);
      };
      // NOTE: Draw is here
      p5.draw = (_) => {
        p5.background(0);
        const degree = p5.frameCount * 3;
        const y = p5.sin(p5.radians(degree)) * 50;

        p5.push();
        p5.translate(0, p5.height / 2);
        p5.ellipse(posX, y, 50, 50);
        p5.pop();
        posX += speed;

        if (posX > p5.width || posX < 0) {
          speed *= -1;
        }
      };
    };
    // new P5(script2);
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
#MvCanvas,
#SubCanvas1,
#SubCanvas2,
#SubCanvas3 {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  ::v-deep {
    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.dlp-mv {
  &__canvas {
    background-color: red;
  }
}
</style>

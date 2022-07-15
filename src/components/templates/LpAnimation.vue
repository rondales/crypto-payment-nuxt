<template>
  <div :class="canvasClass + '__canvas'">
    <div :id="type" class="canvasItem"></div>
  </div>
</template>
<script src="https://unpkg.com/vue-p5"></script>
<script>
let p5Instances = []
export default {
  props: {
    canvasClass: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  mounted() {
    const P5 = require("p5");
    const store = this.$store;

    //ColroSetting
    let DarkColor = "#171421";
    let DarkColorDeep = "#000000";
    let LightColor = "#FFFFFF";
    let LightColorDeep = "#f9f9f9";
    P5.disableFriendlyErrors = true;
    const MvCanvas = function (mv) {
      //ShapesSetting
      let ShapesNum;
      let shapes = [];
      let curTime = 0.0;
      let speed = 40.0;
      let SizeMin, SizeMax;
      let thisDom = document.getElementById("MvCanvas");

      mv.setup = (_) => {
        // p5.disableFriendlyErrors = true;
        mv.frameRate(30);
        // mv.curveDetail(144);
        thisDom.style.width = window.innerWidth;
        thisDom.style.height = window.innerHeight;
        SizeMin = mv.min(thisDom.clientWidth, thisDom.clientHeight);
        SizeMax = mv.max(thisDom.clientWidth, thisDom.clientHeight);
        // mySize = 500;
        var canvas = mv.createCanvas(SizeMax, SizeMax, mv.WEBGL);
        canvas.parent("MvCanvas");
        // ShapesNum = floor(mySize/6);
        ShapesNum = 250;
        // print(ShapesNum)
        mv.colorMode(mv.HSB, 360, 100, 100, 100);

        if (store.state.theme == "dark") {
          mv.background(DarkColor);
        } else {
          mv.background(LightColor);
        }

        for (let i = 0; i < ShapesNum; i++) {
          let shape = new Shape(i, ShapesNum, SizeMin * 0.5);
          shapes.push(shape);
        }
      };

      mv.windowResized = (_) => {
        thisDom.style.width = window.innerWidth;
        thisDom.style.height = window.innerHeight;
        SizeMin = mv.min(thisDom.clientWidth, thisDom.clientHeight);
        SizeMax = mv.max(thisDom.clientWidth, thisDom.clientHeight);
        if (SizeMax == 0 || SizeMin == 0) return;
        mv.resizeCanvas(SizeMax, SizeMax);
        for (let i = 0; i < shapes.length; i++) {
          let shape = shapes[i];
          shape.resize(SizeMin * 0.5);
        }
      };

      mv.draw = (_) => {
        if (thisDom.classList.contains("active")) {
          if (store.state.theme == "dark") {
            mv.background(DarkColor);
          } else {
            mv.background(LightColor);
          }

          for (let i = 0; i < shapes.length; i++) {
            let shape = shapes[i];
            shape.draw();
          }
          curTime += mv.deltaTime * 0.001;
        }
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
          mv.strokeWeight(mv.map(mv.max(thresh, 0.5), 0.5, 1.0, 0.3, 2.0));
          mv.push();
          let angrange = mv.map(
            mv.sin(mv.radians(curTime * 5.0)),
            -1.0,
            1.0,
            60.0,
            360.0
          );
          let addang =
            curTime * speed + (angrange * this.id) / (this.maxnum - 1.0);
          let ang = mv.radians(45.0 + addang);

          mv.rotateX(ang);
          mv.rotateY(ang);
          mv.rotateZ(ang);
          // mv.translate(mv.width/2, 0, 0);
          let scaleval = 1.0 - this.id / this.maxnum;
          let addscale = mv.map(
            mv.sin(mv.radians(curTime * 5.0)),
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
            70;
          if (store.state.theme == "light") {
            Saturation =
              20 *
                mv.abs(
                  mv.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
                ) +
              40;
            Brightness =
              10 *
                mv.abs(
                  mv.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
                ) +
              80;
          }

          mv.stroke(Hue, Saturation, Brightness, 100);
          // mv.smooth(2);
          mv.box(this.size * scaleval);
          mv.pop();
        }
      }
    };

    const SubCanvas1 = function (s1) {
      //ShapesSetting
      let ShapesNum;
      let shapes = [];
      let curTime = 0.0;
      let speed = 25.0;
      let SizeMin, SizeMax;
      let thisDom = document.getElementById("SubCanvas1");
      // s1.disableFriendlyErrors = true;

      s1.setup = (_) => {
        // p5.disableFriendlyErrors = true;
        s1.frameRate(30);
        SizeMin = s1.min(thisDom.clientWidth, thisDom.clientHeight);
        SizeMax = s1.max(thisDom.clientWidth, thisDom.clientHeight);
        // mySize = 500;
        var canvas = s1.createCanvas(SizeMax, SizeMax, s1.WEBGL);
        canvas.parent("SubCanvas1");
        // ShapesNum = floor(mySize/6);
        ShapesNum = 100;
        // print(ShapesNum)
        s1.colorMode(s1.HSB, 360, 100, 100, 100);

        if (store.state.theme == "dark") {
          s1.background(DarkColor);
        } else {
          s1.background(LightColor);
        }

        for (let i = 0; i < ShapesNum; i++) {
          let shape = new Shape(i, ShapesNum, SizeMin * 0.8);
          shapes.push(shape);
        }
      };

      s1.windowResized = (_) => {
        SizeMin = s1.min(thisDom.clientWidth, thisDom.clientHeight);
        SizeMax = s1.max(thisDom.clientWidth, thisDom.clientHeight);
        if (SizeMax == 0 || SizeMin == 0) return;
        s1.resizeCanvas(SizeMax, SizeMax);
        for (let i = 0; i < shapes.length; i++) {
          let shape = shapes[i];
          shape.resize(SizeMin * 0.8);
        }
      };

      s1.draw = (_) => {
        if (thisDom.classList.contains("active")) {
          if (store.state.theme == "dark") {
            s1.background(DarkColor);
          } else {
            s1.background(LightColor);
          }

          for (let i = 0; i < shapes.length; i++) {
            let shape = shapes[i];
            shape.draw();
          }
          curTime += s1.deltaTime * 0.001;
        }
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
          s1.noFill();
          let maxid = this.maxnum * 0.1;
          let thresh = s1.map(
            s1.max(this.id, maxid),
            maxid,
            this.maxnum - 1,
            0,
            1.0
          );
          s1.strokeWeight(s1.map(s1.max(thresh, 0.0), 0.0, 1.0, 0.0, 0.8));
          s1.push();
          let angrange = s1.map(
            s1.sin(s1.radians(curTime * 10.0)),
            -1.0,
            1.0,
            60.0,
            90.0
          );
          let addang =
            curTime * speed + (angrange * this.id) / (this.maxnum - 1.0);
          let ang = s1.radians(45.0 + addang);

          s1.rotateX(ang);
          s1.rotateY(ang);
          s1.rotateZ(ang);

          let scaleval = 1.0 - this.id / this.maxnum;
          let addscale = s1.map(
            s1.sin(s1.radians(curTime * 10.0)),
            -1.0,
            1.0,
            0.0,
            0.1
          );
          scaleval = s1.map(scaleval, 0.0, 1.0, addscale, 1.0 + addscale);

          let movex = s1.map(
            this.id,
            0,
            this.maxnum,
            -s1.width / 2,
            s1.width / 2
          );
          s1.translate(movex, movex, movex);

          let Hue =
            195 *
              s1.abs(s1.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            75;
          let Saturation =
            20 *
              s1.abs(s1.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            80;
          let Brightness =
            10 *
              s1.abs(s1.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            80;
          if (store.state.theme == "light") {
            Saturation =
              20 *
                s1.abs(
                  s1.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
                ) +
              60;
            Brightness =
              10 *
                s1.abs(
                  s1.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
                ) +
              80;
          }

          s1.stroke(Hue, Saturation, Brightness, 100);
          // s1.box(this.size * scaleval, 0.2, 0.2);
          s1.plane(this.size * scaleval);
          // s1.ellipsoid(this.size * scaleval);
          // s1.box(this.size * scaleval);
          s1.pop();
        }
      }
    };

    const SubCanvas2 = function (s2) {
      //ShapesSetting
      let ShapesNum;
      let shapes = [];
      let curTime = 0.0;
      let speed = 25.0;
      let SizeMin, SizeMax;
      let thisDom = document.getElementById("SubCanvas2");
      // s2.disableFriendlyErrors = true;

      s2.setup = (_) => {
        // p5.disableFriendlyErrors = true;
        s2.frameRate(30);
        SizeMin = s2.min(thisDom.clientWidth, thisDom.clientHeight);
        SizeMax = s2.max(thisDom.clientWidth, thisDom.clientHeight);
        // mySize = 500;
        var canvas = s2.createCanvas(SizeMax, SizeMax, s2.WEBGL);
        canvas.parent("SubCanvas2");
        // ShapesNum = floor(mySize/6);
        ShapesNum = 150;
        // print(ShapesNum)
        s2.colorMode(s2.HSB, 360, 100, 100, 100);

        if (store.state.theme == "dark") {
          s2.background(DarkColor);
        } else {
          s2.background(LightColor);
        }

        for (let i = 0; i < ShapesNum; i++) {
          let shape = new Shape(i, ShapesNum, SizeMin * 1.25);
          shapes.push(shape);
        }
      };

      s2.windowResized = (_) => {
        SizeMin = s2.min(thisDom.clientWidth, thisDom.clientHeight);
        SizeMax = s2.max(thisDom.clientWidth, thisDom.clientHeight);
        if (SizeMax == 0 || SizeMin == 0) return;
        s2.resizeCanvas(SizeMax, SizeMax);
        for (let i = 0; i < shapes.length; i++) {
          let shape = shapes[i];
          shape.resize(SizeMin * 1.25);
        }
      };

      s2.draw = (_) => {
        if (thisDom.classList.contains("active")) {
          if (store.state.theme == "dark") {
            s2.background(DarkColor);
          } else {
            s2.background(LightColor);
          }

          for (let i = 0; i < shapes.length; i++) {
            let shape = shapes[i];
            shape.draw();
          }
          curTime += s2.deltaTime * 0.001;
        }
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
          s2.noFill();
          let maxid = this.maxnum * 0.1;
          let thresh = s2.map(
            s2.max(this.id, maxid),
            maxid,
            this.maxnum - 1,
            0,
            1.0
          );
          s2.strokeWeight(s2.map(s2.max(thresh, 0.5), 0.5, 1.0, 0.0, 1.0));
          s2.push();
          let angrange = s2.map(
            s2.sin(s2.radians(curTime * 5.0)),
            -1.0,
            1.0,
            60.0,
            360.0
          );
          let addang =
            curTime * speed + (angrange * this.id) / (this.maxnum - 1.0);
          let ang = s2.radians(0.0 + addang);

          s2.rotateX(ang);
          s2.rotateY(ang);
          s2.rotateZ(ang);
          // s2.translate(s2.width/2, 0, 0);

          let scaleval = 1.0 - this.id / this.maxnum;
          let addscale = s2.map(
            s2.sin(s2.radians(curTime * 10.0)),
            -1.0,
            1.0,
            0.0,
            0.05
          );
          scaleval = s2.map(scaleval, 0.0, 1.0, addscale, 1.0 + addscale);

          let Hue =
            195 *
              s2.abs(s2.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            75;
          let Saturation =
            20 *
              s2.abs(s2.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            80;
          let Brightness =
            10 *
              s2.abs(s2.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
            80;
          if (store.state.theme == "light") {
            Saturation =
              20 *
                s2.abs(
                  s2.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
                ) +
              40;
            Brightness =
              10 *
                s2.abs(
                  s2.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
                ) +
              80;
          }

          s2.stroke(Hue, Saturation, Brightness, 100);
          // s2.fill(Hue, Saturation, Brightness, 10);
          // s2.smooth(2);
          s2.box(this.size * scaleval);
          // s2.plane(this.size * scaleval);
          // s2.sphere(this.size * scaleval, 24, 24);
          s2.pop();
        }
      }
    };

    // const SubCanvas3 = function (s3) {
    //   //ShapesSetting
    //   let ShapesNum;
    //   let shapes = [];
    //   let curTime = 0.0;
    //   let speed = 50.0;
    //   let SizeMin, SizeMax;
    //   let thisDom = document.getElementById("SubCanvas3");
    //   // s3.disableFriendlyErrors = true;

    //   s3.setup = (_) => {
    //     // p5.disableFriendlyErrors = true;
    //     s3.frameRate(30);
    //     SizeMin = s3.min(thisDom.clientWidth, thisDom.clientHeight);
    //     SizeMax = s3.max(thisDom.clientWidth, thisDom.clientHeight);
    //     // mySize = 500;
    //     var canvas = s3.createCanvas(SizeMax, SizeMax, s3.WEBGL);
    //     canvas.parent("SubCanvas3");
    //     // ShapesNum = floor(mySize/6);
    //     ShapesNum = 30;
    //     // print(ShapesNum)
    //     s3.colorMode(s3.HSB, 360, 100, 100, 100);

    //     if (store.state.theme == "dark") {
    //       s3.background(DarkColorDeep);
    //     } else {
    //       s3.background(LightColorDeep);
    //     }

    //     for (let i = 0; i < ShapesNum; i++) {
    //       let shape = new Shape(i, ShapesNum, SizeMin * 1.414);
    //       shapes.push(shape);
    //     }
    //   };

    //   s3.windowResized = (_) => {
    //     SizeMin = s3.min(thisDom.clientWidth, thisDom.clientHeight);
    //     SizeMax = s3.max(thisDom.clientWidth, thisDom.clientHeight);
    //     if (SizeMax == 0 || SizeMin == 0) return;
    //     s3.resizeCanvas(SizeMax, SizeMax);
    //     for (let i = 0; i < shapes.length; i++) {
    //       let shape = shapes[i];
    //       shape.resize(SizeMin * 1.414);
    //     }
    //   };

    //   s3.draw = (_) => {
    //     // if (thisDom.classList.contains("active")) {
    //     if (store.state.theme == "dark") {
    //       s3.background(DarkColorDeep);
    //     } else {
    //       s3.background(LightColorDeep);
    //     }

    //     for (let i = 0; i < shapes.length; i++) {
    //       let shape = shapes[i];
    //       shape.draw();
    //     }
    //     curTime += s3.deltaTime * 0.001;
    //     // }
    //   };
    //   class Shape {
    //     constructor(id, maxnum, size) {
    //       this.id = id;
    //       this.maxnum = maxnum;
    //       this.size = size;
    //     }

    //     resize(size) {
    //       this.size = size;
    //     }

    //     draw() {
    //       s3.noFill();
    //       let maxid = this.maxnum * 0.1;
    //       s3.strokeWeight(0.5);
    //       // let thresh = s3.map(s3.max(this.id, maxid), maxid, this.maxnum - 1, 0, 1.0);
    //       // s3.strokeWeight(s3.map(s3.max(thresh, 0.0), 0.0, 1.0, 0.1, 1.0));
    //       s3.push();
    //       let angrange = s3.map(
    //         s3.sin(s3.radians(curTime * 10.0)),
    //         -1.0,
    //         1.0,
    //         45.0,
    //         90.0
    //       );
    //       let addang =
    //         curTime * speed + (angrange * this.id) / (this.maxnum - 1.0);
    //       let ang = s3.radians(0 + addang);
    //       // s3.rotateX(ang);
    //       // s3.rotateY(ang);
    //       // s3.rotateX(4.5+(curTime * 0.1));
    //       // s3.rotateY(4.5-(curTime * 0.1));
    //       // s3.rotateZ(4.5+(curTime * 0.1));
    //       s3.rotateZ(45);
    //       // s3.rotateZ(curTime * 0.1);
    //       // s3.rotateY(curTime * 0.1);
    //       // s3.rotateZ(curTime * 0.1);

    //       let movex = s3.map(
    //         this.id,
    //         0,
    //         this.maxnum,
    //         -s3.width / 2,
    //         s3.width / 2
    //       );
    //       s3.translate(movex, 0, movex);

    //       let Hue =
    //         195 *
    //           s3.abs(s3.sin(curTime - (this.id * 10.0) / (this.maxnum - 1.0))) +
    //         75;
    //       let Saturation =
    //         20 *
    //           s3.abs(s3.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
    //         100;
    //       let Brightness =
    //         10 *
    //           s3.abs(s3.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
    //         80;
    //       if (store.state.theme == "light") {
    //         Saturation =
    //           20 *
    //             s3.abs(
    //               s3.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
    //             ) +
    //           100;
    //         Brightness =
    //           10 *
    //             s3.abs(
    //               s3.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
    //             ) +
    //           100;
    //       }

    //       s3.stroke(Hue, Saturation, Brightness, 100);
    //       s3.box(this.size * 1.5);
    //       s3.pop();
    //     }
    //   }
    // };
    // const SubCanvas4 = function (s4) {
    //   //ShapesSetting
    //   let ShapesNum;
    //   let shapes = [];
    //   let curTime = 0.0;
    //   let speed = 50.0;
    //   let SizeMin, SizeMax;
    //   let thisDom = document.getElementById("SubCanvas4");
    //   // s4.disableFriendlyErrors = true;

    //   s4.setup = (_) => {
    //     // p5.disableFriendlyErrors = true;
    //     s4.frameRate(30);
    //     SizeMin = s4.min(thisDom.clientWidth, thisDom.clientHeight);
    //     SizeMax = s4.max(thisDom.clientWidth, thisDom.clientHeight);
    //     // mySize = 500;
    //     var canvas = s4.createCanvas(SizeMax, SizeMax, s4.WEBGL);
    //     canvas.parent("SubCanvas4");
    //     // ShapesNum = floor(mySize/6);
    //     ShapesNum = 30;
    //     // print(ShapesNum)
    //     s4.colorMode(s4.HSB, 360, 100, 100, 100);

    //     if (store.state.theme == "dark") {
    //       s4.background(DarkColorDeep);
    //     } else {
    //       s4.background(LightColorDeep);
    //     }

    //     for (let i = 0; i < ShapesNum; i++) {
    //       let shape = new Shape(i, ShapesNum, SizeMin * 1.414);
    //       shapes.push(shape);
    //     }
    //   };

    //   s4.windowResized = (_) => {
    //     SizeMin = s4.min(thisDom.clientWidth, thisDom.clientHeight);
    //     SizeMax = s4.max(thisDom.clientWidth, thisDom.clientHeight);
    //     if (SizeMax == 0 || SizeMin == 0) return;
    //     s4.resizeCanvas(SizeMax, SizeMax);
    //     for (let i = 0; i < shapes.length; i++) {
    //       let shape = shapes[i];
    //       shape.resize(SizeMin * 1.414);
    //     }
    //   };

    //   s4.draw = (_) => {
    //     // if (thisDom.classList.contains("active")) {
    //     if (store.state.theme == "dark") {
    //       s4.background(DarkColorDeep);
    //     } else {
    //       s4.background(LightColorDeep);
    //     }

    //     for (let i = 0; i < shapes.length; i++) {
    //       let shape = shapes[i];
    //       shape.draw();
    //     }
    //     curTime += s4.deltaTime * 0.001;
    //     // }
    //   };
    //   class Shape {
    //     constructor(id, maxnum, size) {
    //       this.id = id;
    //       this.maxnum = maxnum;
    //       this.size = size;
    //     }

    //     resize(size) {
    //       this.size = size;
    //     }

    //     draw() {
    //       s4.noFill();
    //       let maxid = this.maxnum * 0.1;
    //       s4.strokeWeight(0.5);
    //       // let thresh = s4.map(s4.max(this.id, maxid), maxid, this.maxnum - 1, 0, 1.0);
    //       // s4.strokeWeight(s4.map(s4.max(thresh, 0.0), 0.0, 1.0, 0.1, 1.0));
    //       s4.push();
    //       let angrange = s4.map(
    //         s4.sin(s4.radians(curTime * 10.0)),
    //         -1.0,
    //         1.0,
    //         45.0,
    //         90.0
    //       );
    //       let addang =
    //         curTime * speed + (angrange * this.id) / (this.maxnum - 1.0);
    //       let ang = s4.radians(0 + addang);
    //       // s4.rotateX(ang);
    //       // s4.rotateY(ang);
    //       // s4.rotateX(4.5+(curTime * 0.1));
    //       // s4.rotateY(4.5-(curTime * 0.1));
    //       // s4.rotateZ(4.5+(curTime * 0.1));
    //       s4.rotateZ(45);
    //       // s4.rotateZ(curTime * 0.1);
    //       // s4.rotateY(curTime * 0.1);
    //       // s4.rotateZ(curTime * 0.1);

    //       let movex = s4.map(
    //         this.id,
    //         0,
    //         this.maxnum,
    //         -s4.width / 2,
    //         s4.width / 2
    //       );
    //       s4.translate(movex, 0, movex);

    //       let Hue =
    //         195 *
    //           s4.abs(s4.sin(curTime - (this.id * 10.0) / (this.maxnum - 1.0))) +
    //         75;
    //       let Saturation =
    //         20 *
    //           s4.abs(s4.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
    //         100;
    //       let Brightness =
    //         10 *
    //           s4.abs(s4.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))) +
    //         60;
    //       if (store.state.theme == "light") {
    //         Saturation =
    //           20 *
    //             s4.abs(
    //               s4.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
    //             ) +
    //           100;
    //         Brightness =
    //           10 *
    //             s4.abs(
    //               s4.sin(curTime - (this.id * 5.0) / (this.maxnum - 1.0))
    //             ) +
    //           100;
    //       }

    //       s4.stroke(Hue, Saturation, Brightness, 100);
    //       s4.box(this.size * 1.5);
    //       s4.pop();
    //     }
    //   }
    // };

    p5Instances.push(new P5(eval(this.type)));
    // new P5(SubCanvas1);
    // new P5(SubCanvas2);
    // new P5(SubCanvas3);
  },
  beforeDestroy() {
    p5Instances.forEach((instance) => {
      instance.remove()
    })
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";

#MvCanvas {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  ::v-deep {
    canvas {
      position: absolute;
      // width: 100%;
      // height: 100%;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

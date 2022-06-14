<template>
  <div class="textwrap">
    <dl v-if="textData.tag" class="tag">
      <dt>{{ textData.tag.title }}</dt>
      <dd class="non-translate">{{ textData.tag.text }}</dd>
    </dl>
    <h3 class="title scrollAction op"><span v-html="textData.title"></span></h3>

    <div class="absTest">
      <p class="text scrollAction op"><span v-html="textData.text"></span></p>
      <div v-if="textData.app" class="app">
        <div class="app_wrap">
          <p v-if="textData.app.coming" class="app_title non-translate">
            <span>{{ textData.app.coming }}</span>
          </p>
          <div class="app_link">
            <a
              v-for="appLink in textData.app.links"
              :key="appLink.title"
              :href="appLink.link"
              :class="appLink.status ? '' : 'disable'"
            >
              <LpImage :imgData="appLink.image" />
            </a>
          </div>
          <p v-if="textData.app.cap" class="app_cap">
            <span>{{ textData.app.cap }}</span>
          </p>
        </div>
      </div>
    </div>
    <ul v-if="textData.logos" class="logos">
      <li v-for="icon in textData.logos" :key="icon.src">
        <LpImage :imgData="icon" />
      </li>
    </ul>
    <div v-if="textData.link" class="link">
      <LpButton :link="textData.link" class="non-translate" type="simple" size="s" />
    </div>
  </div>
</template>

<script>
import LpButton from "@/components/templates/LpParts/Button";
import LpImage from "@/components/templates/LpParts/Image";
export default {
  components: {
    LpButton,
    LpImage,
  },
  props: {
    textData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconPath() {
      if (this.imgData.lightSrc != "" && this.$store.state.theme == "light") {
        return require("@/assets/images/" + this.imgData.lightSrc);
      } else {
        return require("@/assets/images/" + this.imgData.src);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";

.tag {
  @include flex(flex-start, center);
  margin-bottom: rem(2);
  @include media(sp) {
    @include flex(center, center);
    margin-bottom: rem(1);
  }
  dt {
    background: $gradation-light;
    color: #fff;
    @include font(rem(pow(0)), 600, $ls, 1, $en_go);
    @include rem_padding(0.5, 1, 0.5, 1);
    @include media(sp) {
      margin-top: rem_sp(1);
    }
  }
  dd {
    padding-left: 2rem;
    @include font(rem(pow(0)), $fw, $ls, $lh, $en_go);
    @include media(sp) {
      margin-top: rem_sp(1);
    }
  }
}

.app {
  margin-top: rem(2);
  // background-color: var(--color_box);
  // border-radius: rem(1);
  @include rem_padding(2, 2, 2, 2);
  border: 1px solid var(--color_update);
  @include media(sp) {
    padding: rem_sp(2);
  }
  &_title {
    @include font(rem(pow(2)), $fw, $ls, $lh, $en_go);
    margin-bottom: rem(1);
    text-align: center;
    @include media(sp) {
      font-size: rem_sp(pow(2));
      margin-bottom: rem_sp(1);
    }
  }
  &_link {
    @include flex(center, flex-start);
    flex-wrap: nowrap;
    .disable {
      opacity: 0.8;
      pointer-events: none;
    }
    a + a {
      margin-left: rem(1);
      @include media(sp) {
        margin-left: rem_sp(1);
      }
    }
  }
  &_cap {
    margin-top: rem(1);
    @include font(rem(pow(-1)), $fw, $ls, $lh, $en_go);
    @include media(sp) {
      font-size: rem_sp(pow(-1));
      margin-top: rem_sp(1);
    }
  }
}
.title {
  @include font(rem(pow(3)), 700, $ls, $lh, $en_go);
  background: $gradation-light;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: rem(2);
  // word-break: break-all;
  overflow-wrap: break-word;
  @include media(sp) {
    font-size: rem_sp(1.5);
    margin-bottom: rem_sp(1);
    text-align: center;
    span br {
      display: none;
    }
  }
}
.text {
  @include font(rem(pow(0)), $fw, $ls, $lh, $en_go);
  // word-break: break-all;
  overflow-wrap: break-word;
  @include media(sp) {
    font-size: rem_sp(1);
  }
}
.link {
  margin-top: rem(1);
  @include media(sp) {
    text-align: center;
    margin-top: rem_sp(1);
  }
}
.logos {
  @include flex(flex-start, center);
  @include media(sp) {
    @include flex(center, center);
  }
  margin-top: rem(1);
  @include media(sp) {
    margin-top: rem_sp(1);
  }
  & > * {
    flex: 1;
  }
}
</style>

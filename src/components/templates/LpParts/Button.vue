<template>
  <a
		:class="linkClass"
    :href="isExternalLink(link.url) ? link.url : ''"
    :target="isExternalLink(link.url) ? '_blank' : ''"
  >
    <LpIcon class="icon" :path="link.icon" />
    <span>{{ link.title }}</span>
  </a>
</template>

<script>
import LpIcon from "@/components/templates/LpParts/Icon";
export default {
  components: {
    LpIcon,
  },
  props: {
    link: {
      type: Object,
    },
    type: {
      type: String,
      default: "main",
    },
		size: {
      type: String,
      default: "m",
    },
  },
	computed:{
		linkClass(){
			let classname='lpButton '+ this.type + ' ' + this.size;

			return classname;
		}
	},
  methods: {
    // 外部リンクかどうかチェック
    isExternalLink(link) {
      return /^https?:\/\//.test(link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
.lpButton{
  cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: rem(8);
    margin: rem(0.5);
    color: #fff;
	.icon{

	}
	&.l {
      @include font(rem(1.5), 500, 0.02em, 1, $ff);
      height: rem(4);
      padding: 0 rem(4);
      img,
      svg {
        width: rem(2.2);
      }
      * + * {
        margin-left: rem(0.5);
      }
    }
    &.m {
      @include font(rem(1), 500, 0.02em, 1, $ff);
      height: rem(3);
      padding: 0 rem(2);
      img,
      svg {
        width: rem(2);
      }
      * + * {
        margin-left: rem(0.5);
      }
    }
    &.s {
    }
    &__main {
			@extend .lpButton;
      background: $gradation;
      background: $gradation-pale;
      background: $gradation-light;
      // background-color: red;
    }

    &__sub {
      background: #55476b;
      // &::after {
      //   background-image: url(/assets/images/lp/gitbook-icon.svg);
      // }
    }
    &__noactive {
      background: #55476b;
      pointer-events: none;
    }
}
</style>

<template>
  <div>
    <lp-header />
    <article class="lp display">
      <section>
        <div class="title">
          <h1>
            Branding
          </h1>
          <p>
            Latest update: March, 2022
          </p>
        </div>
        <div class="sub-title">
          <h2>
            Slash Payment Brand
          </h2>
          <p class="dsc-title">
            What is Slash Payment?
          </p>
          <p class="dsc">
            Slash Payment is Merchants can automatically accept online TOKEN payments
            <br>
            from customers using the Web3 wallet.
          </p>
        </div>
        <div class="logo">
          <div class="contents-title">
            <h3>
              Logomark
            </h3>
            <div class="add-flex">
              <figure>
                <img src="@/assets/images/lp/logo-l.png" alt="">
              </figure>
              <figure>
                <img src="@/assets/images/lp/logo-m.png" alt="">
              </figure>
            </div>
          </div>
          <div class="logo-clearspace">
            <h4>
              Clearspace
            </h4>
            <div class="add-flex">
              <figure>
                <img src="@/assets/images/lp/clearspace-l.png" alt="">
              </figure>
              <figure>
                <img src="@/assets/images/lp/clearspace-m.png" alt="">
              </figure>
            </div>
          </div>
        </div>
        <div class="usecase">
          <div class="contents-title">
            <h3>
              Use case
            </h3>
            <div class="usecase-block">
              <h4>
                STANDARD BUTTON
              </h4>
              <figure>
                <img src="@/assets/images/lp/standard-button.png" alt="">
              </figure>
            </div>
            <div class="usecase-block">
              <h4>
                Settlement indication
              </h4>
              <figure>
                <img src="@/assets/images/lp/indication.png" alt="">
              </figure>
            </div>
          </div>
        </div>
        <div class="misuse">
          <div class="contents-title">
            <h3>
              Misuse
              <span>
                <img src="@/assets/images/lp/close.png" alt="">
              </span>
            </h3>
          </div>
          <div class="add-flex">
            <div class="mususe-item">
              <figure>
                <img src="@/assets/images/lp/misuse-01.png" alt="">
              </figure>
              <p>
                Don’t adjust the width
              </p>
            </div>
            <div class="mususe-item">
              <figure>
                <img src="@/assets/images/lp/misuse-02.png" alt="">
              </figure>
              <p>
                Don’t add other visual effects
              </p>
            </div>
          </div>
          <div class="add-flex">
            <div class="mususe-item">
              <figure>
                <img src="@/assets/images/lp/misuse-03.png" alt="">
              </figure>
              <p>
                Don’t change color
              </p>
            </div>
            <div class="mususe-item">
              <figure>
                <img src="@/assets/images/lp/misuse-04.png" alt="">
              </figure>
              <p>
                Don't change the ratio
              </p>
            </div>
          </div>
        </div>
        <div class="another">
          <div class="contents-title">
            <h3>
              Another Logos
            </h3>
          </div>
          <p>
            Please use this one depending on your application.
          </p>
          <div class="another-logo">
            <figure>
              <img src="@/assets/images/lp/another-logo.png" alt="">
            </figure>
            <figure>
              <img src="@/assets/images/lp/another-full-logo.png" alt="">
            </figure>
          </div>
        </div>
        <div class="download">
          <div class="contents-title">
            <h3>
              Download Assets
            </h3>
          </div>
        </div>
      </section>
      <lp-footer />
    </article>
  </div>
</template>


<script>
import LpHeader from "@/components/organisms/lp/lpHeader";
import LpFooter from "@/components/organisms/lp/lpFooter";

export default {
  name: "payment",
  data() {
    return {
    };
  },
  components: {
    LpHeader,
    LpFooter,
  },
  computed: {
  },
  methods: {
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>


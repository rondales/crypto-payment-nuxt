<template>
  <div>
    <lp-header />
    <article class="lp">
      <section class="lp-first">
        <div class="lp-first_bg"></div>
        <div class="lp-first_contents">
          <div class="lp-first_icon">
            <img src="@/assets/images/lp/mv-logo.svg" alt="" />
          </div>
          <h1>
            Slash
            <br />
            Web3 payment
          </h1>
          <p>
            the next generation of decentralized payment methods, to support any
            Token payment.
          </p>
          <a href="/admin">
            <div class="btn __pg lp-first_enter">Enter App</div>
          </a>
        </div>
      </section>
      <section class="lp-second display" id="about">
        <div class="lp-secondrow add-flex a-center">
          <div class="lp-second_l">
            <h2 class="lp-second_title">
              Hello
              <br />
              Web 3.0<span
                ><img src="@/assets/images/lp/pointing-up.svg"
              /></span>
              <br />
              Slash Payment
            </h2>
            <div class="lp-second_dsc">
              <p>
                Merchants can automatically accept online TOKEN payments
                <br />
                from customers using the Web3 wallet.Merchants can
                <br />
                automatically
              </p>
            </div>
          </div>
          <div class="lp-second_r">
            <figure>
              <img src="@/assets/images/lp/card.png" />
            </figure>
          </div>
        </div>
        <div class="lp-second_sub">
          <div class="lp-second_subtitle add-flex a-center j-between">
            <h3>
              The Slash Payment contract provides an automatic connection to the
              DEX.
              <br />
              Customers can pay with any token.
            </h3>
            <div class="lp-second_icons">
              <figure>
                <img src="@/assets/images/lp/dex.svg" alt="" />
              </figure>
            </div>
          </div>
          <div class="lp-second_subdsc">
            <p>
              Merchants can automatically accept online TOKEN payments from
              customers using the Web3 wallet.Merchants can automatically accept
              online TOKEN payments from customers using the Web3
              wallet.Merchants can automatically accept online TOKEN payments
              from customers using the Web3 wallet.
            </p>
          </div>
          <div class="lp-second_link">
            <a href="/">
              How fees are waived
              <span v-if="$store.state.theme == 'dark'">
                <img src="@/assets/images/lp/right-arrow.svg" />
              </span>
              <span v-if="$store.state.theme == 'light'">
                <img src="@/assets/images/lp/right-arrow-l.svg" />
              </span>
            </a>
          </div>
        </div>
        <div class="lp-second_cardlist">
          <div class="lp-second_cardwrap add-flex a-center j-between">
            <div class="lp-second_card">
              <h4 class="lp-second_cardtitle">Web3 connect</h4>
              <div class="lp-second_cardicons">
                <img src="@/assets/images/lp/connect-icons.svg" alt="" />
              </div>
              <div class="lp-second_carddsc">
                Merchants can automatically accept online TOKEN payments from
                customers using the Web3 wallet.
              </div>
            </div>
            <div class="lp-second_card">
              <h4 class="lp-second_cardtitle">
                Auto-exchange
                <br />
                via DEX
              </h4>
              <div class="lp-second_cardicons">
                <img src="@/assets/images/lp/card-dex.svg" alt="" />
              </div>
              <div class="lp-second_carddsc">
                customer’s payment will reach the merchant instantly in exchange
                for Stable Token（USDT） via a decentralized exchange.
              </div>
            </div>
            <div class="lp-second_card">
              <h4 class="lp-second_cardtitle">Multiple chain</h4>
              <div class="lp-second_cardicons">
                <img
                  v-if="$store.state.theme == 'dark'"
                  src="@/assets/images/lp/chain.svg"
                  alt=""
                />
                <img
                  v-if="$store.state.theme == 'light'"
                  src="@/assets/images/lp/chain-l.svg"
                  alt=""
                />
              </div>
              <div class="lp-second_carddsc" id="installation">
                Accept Bitcoin on your smartphone or tablet at your retail store
                or restaurant.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="lp-third display">
        <div class="lp-third_title">
          <h2>Easy system installation</h2>
        </div>
        <div class="lp-third_install add-flex j-between">
          <div class="lp-third_left">
            <figure>
              <img src="@/assets/images/lp/install-image.jpg" alt="" />
            </figure>
          </div>
          <div class="lp-third_right">
            <div class="lp-third_subtitle">
              <h3>
                Install Slash Web3 payment
                <br />
                like a credit card Payment
              </h3>
            </div>
            <div class="lp-third_subdsc">
              <div class="sp-bg"></div>
              <p>
                Merchants can automatically accept online TOKEN payments from
                customers using the Web3 wallet.Merchants can automatically
                accept online TOKEN payments from customers using the Web3
                wallet.Merchants can automatically accept online TOKEN payments
                from customers using the Web3 wallet.
              </p>
            </div>
            <div class="lp-third_link">
              <a href="/">
                Web3Payment Install Docs.
                <span v-if="$store.state.theme == 'dark'">
                  <img src="@/assets/images/lp/right-arrow.svg" />
                </span>
                <span v-if="$store.state.theme == 'light'">
                  <img src="@/assets/images/lp/right-arrow-l.svg" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="lp-third_integration add-flex j-between">
          <div class="lp-third_left">
            <div class="lp-third_subtitle">
              <h3>Integration with any platform</h3>
            </div>
            <div class="lp-third_subdsc">
              <div class="sp-bg"></div>
              <p>
                Merchants can automatically accept online TOKEN payments from
                customers using the Web3 wallet.Merchants can automatically
                accept online TOKEN payments from customers
              </p>
            </div>
            <div class="lp-third_logos add-flex j-around">
              <figure v-if="$store.state.theme == 'dark'">
                <img src="@/assets/images/lp/woocommerce.svg" alt="" />
              </figure>
              <figure v-if="$store.state.theme == 'light'">
                <img src="@/assets/images/lp/woocommerce-l.svg" alt="" />
              </figure>
              <figure>
                <img src="@/assets/images/lp/opencart.svg" alt="" />
              </figure>
              <figure v-if="$store.state.theme == 'dark'">
                <img src="@/assets/images/lp/eccube.svg" alt="" />
              </figure>
              <figure v-if="$store.state.theme == 'light'">
                <img src="@/assets/images/lp/eccube-l.svg" alt="" />
              </figure>
            </div>
            <div class="lp-third_link">
              <a href="/">
                <span v-if="$store.state.theme == 'dark'">
                  <img src="@/assets/images/lp/right-arrow.svg" />
                </span>
                <span v-if="$store.state.theme == 'light'">
                  <img src="@/assets/images/lp/right-arrow-l.svg" />
                </span>
                Details of Integrations
              </a>
            </div>
          </div>
          <div class="lp-third_right">
            <figure>
              <img src="@/assets/images/lp/integration.jpg" alt="" />
            </figure>
          </div>
        </div>
        <div class="lp-third_physical">
          <div class="lp-third_subtitle">
            <h3>
              The best way for Accepting Web3 Wallet Payments at Physical Stores
            </h3>
          </div>
          <div class="lp-third_image">
            <img src="@/assets/images/lp/physical.jpg" alt="" />
          </div>
          <div class="lp-third_subdsc">
            <p>
              Merchants can automatically accept online TOKEN payments from
              customers using the Web3 wallet.Merchants can automatically accept
              online TOKEN payments fromMerchantscanautomatically accept online
              TOKEN payments from customers
            </p>
          </div>
          <div class="lp-third_app add-flex a-center">
            <div class="lp-third_appleft">
              <div class="lp-third_applogos add-flex a-center">
                <a href="/" :class="{ active: nativeApp }">
                  <img src="@/assets/images/lp/appStore.svg" />
                </a>
                <a href="/" :class="{ active: nativeApp }">
                  <img src="@/assets/images/lp/googlePlay.svg" />
                </a>
              </div>
              <p v-if="!nativeApp">coming soon…</p>
            </div>
            <div class="lp-third_appright" id="ecosystem">
              <p>
                *In order to start using the Merchant App, you need to issue a
                one-time login code on SlashApp.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="lp-fourth display">
        <div class="lp-third_title">
          <h2>Fee & Ecosystem</h2>
        </div>
        <div class="lp-fourth_fee add-flex j-between">
          <div class="lp-third_left">
            <figure>
              <img src="@/assets/images/lp/fee.jpg" alt="" />
            </figure>
          </div>
          <div class="lp-third_right">
            <div class="lp-third_subtitle">
              <h3>Slash Payment fee is 0.25〜0.65%</h3>
            </div>
            <div class="lp-third_subdsc">
              <div class="sp-bg"></div>
              <p>
                Merchants can automatically accept online TOKEN payments from
                customers using the Web3 wallet.Merchants can automatically
                accept online TOKEN payments from customers using the Web3
                wallet.Merchants can automatically accept online TOKEN payments
                from customers using the Web3 wallet.
              </p>
            </div>
            <div class="lp-third_link inversion">
              <a href="/">
                How fees are waived
                <span v-if="$store.state.theme == 'dark'">
                  <img src="@/assets/images/lp/right-arrow.svg" />
                </span>
                <span v-if="$store.state.theme == 'light'">
                  <img src="@/assets/images/lp/right-arrow-l.svg" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="lp-third_subtitle">
          <h3>0.15% of the Payment Fee will be automatically donated.</h3>
        </div>
        <div class="lp-third_image">
          <img src="@/assets/images/lp/donated.jpg" alt="" />
        </div>
        <div class="lp-fourth_subdsc">
          <p>
            0.1% of the Slash Payment fee will be automatically sent to the
            Slash Donation Wallet to be donated to social causes.
          </p>
        </div>
        <div class="lp-fourth_linkwrap add-flex a-center j-between">
          <div class="lp-third_link">
            <a href="/">
              <span v-if="$store.state.theme == 'dark'">
                <img src="@/assets/images/lp/right-arrow.svg" />
              </span>
              <span v-if="$store.state.theme == 'light'">
                <img src="@/assets/images/lp/right-arrow-l.svg" />
              </span>
              How fees are waived
            </a>
          </div>
          <div class="lp-fourth_logos add-flex j-around">
            <figure>
              <img
                v-if="$store.state.theme == 'dark'"
                src="@/assets/images/lp/save-the-children.svg"
                alt=""
              />
              <img
                v-if="$store.state.theme == 'light'"
                src="@/assets/images/lp/save-the-children-l.svg"
                alt=""
              />
            </figure>
            <figure>
              <img src="@/assets/images/lp/unicef.svg" alt="" />
            </figure>
          </div>
        </div>
        <div class="lp-fourth_buyback add-flex j-between">
          <div class="lp-third_left">
            <div class="phase-wrap">
              <div class="phase">Phase 2</div>
              <span>coming soon…</span>
            </div>
            <div class="lp-third_subtitle">
              <h3>All fees Use buyback $Slash*</h3>
            </div>
            <div class="lp-third_subdsc">
              <div class="sp-bg"></div>
              <p>
                Merchants can automatically accept online TOKEN payments from
                customers using the Web3 wallet.Merchants can automatically
                accept online TOKEN payments from customers using the Web3
                wallet.Merchants can automatically accept online TOKEN payments
                from customers using the Web3 wallet.
              </p>
            </div>
            <div class="lp-third_link">
              <a href="/">
                <span v-if="$store.state.theme == 'dark'">
                  <img src="@/assets/images/lp/right-arrow.svg" />
                </span>
                <span v-if="$store.state.theme == 'light'">
                  <img src="@/assets/images/lp/right-arrow-l.svg" />
                </span>
                Details of Integrations
              </a>
            </div>
          </div>
          <div class="lp-third_right">
            <figure>
              <img src="@/assets/images/lp/buyback.jpg" alt="" />
            </figure>
          </div>
        </div>
        <div class="lp-fourth_title">
          <h2>
            Try Donate with Slash
            <br />
            Web3 Crypto payments &#x1f47c;
          </h2>
        </div>
        <div class="lp-fourth_donate add-flex a-center j-between">
          <div class="lp-fourth_donateitem">
            <div class="lp-fourth_donatetitle">
              <h4>Experience it first hand.</h4>
            </div>
            <dl>
              <dt>
                <img src="@/assets/images/lp/donate-image01.jpg" alt="" />
              </dt>
              <dd>
                <img src="@/assets/images/lp/donate01.svg" alt="" />
              </dd>
            </dl>
            <p>https://donate.savethechildren.org</p>
            <div class="btn __lg">
              <a href="">
                <span>
                  <img src="@/assets/images/lp/connect.svg" alt="" />
                </span>
                Dnate Now
              </a>
            </div>
          </div>
          <div class="lp-fourth_donateitem">
            <div class="lp-fourth_donatetitle">
              <h4>Experience it first hand.</h4>
            </div>
            <dl>
              <dt>
                <img src="@/assets/images/lp/donate-image02.jpg" alt="" />
              </dt>
              <dd>
                <img src="@/assets/images/lp/donate02.svg" alt="" />
              </dd>
            </dl>
            <p>https://www.unicef.org/</p>
            <div class="btn __lg">
              <a href="">
                <span>
                  <img src="@/assets/images/lp/connect.svg" alt="" />
                </span>
                Dnate Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="lp-fifth display">
        <div class="lp-fifth_title">
          <h2>Connected network</h2>
        </div>
        <ul>
          <li class="lp-cn1">
            <img src="@/assets/images/lp/cn2.png" />
          </li>
          <li class="lp-cn2">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn3.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn3-l.svg" />
          </li>
          <li class="lp-cn3">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn7.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn7-l.svg" />
          </li>
          <li class="lp-cn4">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn5.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn5-l.svg" />
          </li>
          <li class="lp-cn5">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn6.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn6-l.svg" />
          </li>
          <li class="lp-cn6">
            <img src="@/assets/images/lp/cn1.png" />
          </li>
          <li class="lp-cn7">
            <img src="@/assets/images/lp/cn8.png" />
          </li>
          <li class="lp-cn8">
            <img src="@/assets/images/lp/cn9.png" />
          </li>
          <li class="lp-cn9">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn10.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn10-l.svg" />
          </li>
          <li class="lp-cn10">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn11.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn11-l.svg" />
          </li>
          <li class="lp-cn11" id="roadmap">
            <img v-if="$store.state.theme == 'dark'" src="@/assets/images/lp/cn4.png" />
            <img v-if="$store.state.theme == 'light'" src="@/assets/images/lp/cn4-l.svg" />
          </li>
        </ul>
      </section>
      <section class="lp-sixth display">
        <div class="lp-sixth_title">
          <h2>Features & Road Map</h2>
        </div>
        <div class="lp-fourth_donate add-flex a-center j-between">
          <div class="lp-fourth_donateitem">
            <div class="lp-sixth_mintitle">
              <p>Phase 1</p>
            </div>
            <div class="lp-fourth_donatetitle">
              <h4>Basic Features<br>Open Source Plugins Ver.1</h4>
            </div>
          </div>
          <div class="lp-fourth_donateitem">
            <div class="lp-sixth_mintitle">
              <p>Phase 2</p>
            </div>
            <div class="lp-fourth_donatetitle">
              <h4><span>Slash TOKEN</span>
                <br>Additional Feature
                <br>Open Source Plugins Ver.2
                <br>Integration Requirements
              </h4>
            </div>
          </div>
        </div>
        <div class="lp-sixth_flex pc">
          <div class="box">
            <div class="cont" v-for="(item, index) in cont" :key="index">
              <h3>
                {{item.title}}
              </h3>
              <div class="cont-item">
                <p v-for='(list,key) in item.lists' :key="key">
                  {{list.text}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="lp-sixth_flex sp">
          <div class="box">
            <div class="cont" v-for="(item, index) in cont" :key="item.id" :class="{'active': show[index]}">
              <h3 @click="toggle(index)">
                {{item.title}}
                <span>
                  <img src="@/assets/images/lp/list-arrow.svg" alt="">
                </span>
              </h3>
              <div class="cont-item" v-show="show[index]">
                <p v-for='(list,key) in item.lists' :key="key">
                  {{list.text}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="lp-seventh display">
      <div class="lp-seventh_title">
        <h2>Referral Program</h2>
      </div>
      <div class="phase-wrap">
        <div class="phase">
          Phase 2
        </div>
        <p>coming soon…</p>
      </div>
      <div class="lp-referral_inner">
        <div class="box">
          <div class="lp-referral_title lp-fourth_donatetitle">
            <h4>Referral Reward is 10% of Payment Gas Fee</h4>
          </div>
          <p>
            Each time a merchant customer who has been invited by you makes a payment, you can expect a certain commission fee.The referral reward from Web3Payment will be sent to your balance immediately after the transaction is completed, and you will receive the reward by claiming it.
          </p>
        </div>
        <div class="box">
          <div class="lp-referral_title lp-fourth_donatetitle">
            <h4>Forms & Stake Referral Rewards 5%</h4>
          </div>
          <p>
            You can expect 5% return from your friends’ earnings. Your referral rewards will be visible and ready for claim from your referral accounts when your invited friends will  claim Slash tokens to the wallet. Let’s say, you invited a friend and he/she earned 5 Slash from either “Farms” or “Stake”. As a result, you will receive 5% from 5 Slash, which accounts for 0.25 Slash.
            <br>
            All your referral rewards will be sent to your referral balances in WPAY tokens. All the fees will also be charged in Slash tokens.
          </p>
        </div>
        <div class="lp-center">
          <h3 class="lp-seventh_bottitle">Get Referral Link & Reward<br>Claim</h3>
          <a href="/admin">
            <div class="btn __pg lp-first_enter">Enter App</div>
          </a>
        </div>
      </div>
    </section>
    <section class="lp-eighth display">
      <h3>Install on your online service now!</h3>
      <div class="lp-b_back">
        <div class="lp-first_icon">
          <img src="@/assets/images/lp/mv-logo.svg" alt="" />
          <h4>Slash.fi</h4>
        </div>
        <a href="/admin">
          <div class="btn __pg lp-first_enter">Enter App</div>
        </a>
      </div>
    </section>
    <footer>
      <div class="lp-fotter_left">
        <div class="lp-first_icon">
          <img src="@/assets/images/lp/mv-logo.svg" alt="" />
          <h4>Slash Payment</h4>
        </div>
        <div class="lp-footer_copy"><p>© 2021 Web3Payment.com. All rights reserved.</p></div>
        <div class="lp-footer_link"><p><a href="">Terms of Service</a> | <a href="">Privacy Terms</a></p></div>
        <div class="lp-footer_info pc">
          <p>SLASH FINTECH LIMITED<br>
          3rd Floor, J & C Building, Road<br>
          Town, Tortola, British Virgin Islands, VG1110
          </p>
        </div>
      </div>
      <div class="lp-fotter_right">
        <div class="lp-footer_rightbox">
          <div class="box">
            <h4>Developers</h4>
            <p><a href="" target="_blank">Integrations</a></p>
            <p><a href="" target="_blank">Plugins</a></p>
            <p><a href="" target="_blank">FAQ</a></p>
            <p><a href="" target="_blank">Docs</a></p>
            <p><a href="" target="_blank">Telegram</a></p>
          </div>
          <div class="box">
            <h4>Referral Program</h4>
            <p><a href="" target="_blank">FAQ</a></p>
          </div>
          <div class="box end">
            <h4>TOKEN</h4>
            <p><a href="" target="_blank">$Slash</a></p>
            <p><a href="" target="_blank">Earn</a></p>
          </div>
        </div>
        <div class="lp-third_link">
          <a href="/">
            $Slash TOKEN
            <span v-if="$store.state.theme == 'dark'">
              <img src="@/assets/images/lp/right-arrow.svg" />
            </span>
            <span v-if="$store.state.theme == 'light'">
              <img src="@/assets/images/lp/right-arrow-l.svg" />
            </span>
          </a>
        </div>
      </div>
      <div class="lp-footer_info sp">
        <p>SLASH FINTECH LIMITED<br>
        3rd Floor, J & C Building, Road<br>
        Town, Tortola, British Virgin Islands, VG1110
        </p>
      </div>
    </footer>
    </article>
  </div>
</template>


<script>
import LpHeader from "@/components/organisms/lp/lpHeader";

export default {
  name: "payment",
  data() {
    return {
      nativeApp: false,
      show: {},
      cont: [
        {
          id: 1,
          title: "BASIC Features",
          lists: [
            {text: "Web3Payment BSC"},
            {text: "Web3Payment ETH"},
            {text: "Web3Payment Polygon"},
            {text: "Merchant App"}
          ]
        },
        {
          id: 2,
          title: "Open Source Plugins Ver.1",
          lists: [
            {text: "Woocommerce"},
            {text: "Wellcart"},
            {text: "EC CUBE"},
          ]
        },
        {
          id: 3,
          title: "Integration Requirements",
          lists: [
            {text: "Shopify"},
            {text: "Wix"},
          ]
        },
        {
          id: 4,
          title: "Additional Features",
          lists: [
            {text: "Online tipping feature"},
            {text: "Single EC feature"},
            {text: "Store Payment feature"},
            {text: "Escrow feature"}
          ]
        },
        {
          id: 5,
          title: "Open Source Plugins Ver.2",
          lists: [
            {text: "OpenCart"},
            {text: "Zencart"},
            {text: "Drupal-Commerce"},
            {text: "Magento"},
            {text: "Magento2"},
            {text: "WHMCS"},
            {text: "Drupal 8 Ubercart"},
            {text: "Easy Digital Downloads"}
          ]
        },
        {
          id: 6,
          title: "Slash TOKEN",
          lists: [
            {text: "TOKEN SALE"},
            {text: "Staking pool"},
            {text: "Referral feature",},
            {text: "Coin Market Cap Listing"},
            {text: "CoinGecko Listing"},
            {text: "CEX Listing"},
          ]
        },
      ],
    };
  },
  components: {
    LpHeader,
  },
  methods: {
    openModal(target) {
      this.$store.dispatch("modal/show", { target: target, size: "small" });
    },
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
    },
    toggle(key){
      this.$set(this.show, key, !this.show[key])
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.home {
  text-align: center;
}
section{
  width:92%;
}
.lp {
  &-first {
    width:100%;
    position: relative;
    &_bg {
      background: url(/assets/images/lp/mv.jpg) no-repeat center center;
      background-size: cover;
      width: 100%;
      height: calc(100vh - 100px);
      opacity: 0.58;
    }
    &_contents {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @include media(sp) {
        width: 80%;
      }
      h1,
      p {
        font-size: 25px;
        font-weight: 400;
        margin-bottom: 24px;
        color: #fff;
      }
      p{
        margin-bottom:32px;
      }
    }
    &_enter {
      border-radius: 1.2rem;
      padding: 0;
      height: 6.2rem;
      line-height: 6.2rem;
      display: inline-block;
      padding: 0 9rem;
      font-size: 18px;
      box-shadow: 0 0 25px #fff;
      color: #fff;
    }
  }
  &-second {
    &row {
      margin-bottom: 24px;
      height: 540px;
      position: relative;
      @include media(sp) {
        height: 880px;
        align-items: flex-start;
        padding-top: 56px;
      }
    }
    &_l {
      width: 60%;
      text-align: left;
      @include media(sp) {
        width: 100%;
      }
    }
    &_r {
      figure {
        position: absolute;
        top: 40px;
        right: 60px;
        height: 440px;
        width: 360px;
        animation: fuwafuwa 1.2s ease-in-out infinite alternate;
        @include media(sp) {
          bottom: 0;
          top: auto;
          right: 0;
          animation: fuwafuwa-sp 1.2s ease-in-out infinite alternate;
        }
        @keyframes fuwafuwa {
          0% {
            top: 40px;
          }
          100% {
            top: 48px;
          }
        }
        @keyframes fuwafuwa-sp {
          0% {
            bottom: 0px;
          }
          100% {
            bottom: 8px;
          }
        }
      }
      @include media(sp) {
        margin-bottom: 56px;
      }
    }
    &_title {
      font-size: 70px;
      line-height: 1.25;
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 100% 10%;
      display: inline;
      @include media(sp) {
        font-size: 46px;
        margin-bottom: 16px;
        span {
          img {
            width: 46px;
          }
        }
      }
    }
    &_dsc {
      font-size: 20px;
      margin-top:15px;
      p{
        font-weight: 400;
      }
      @include media(sp) {
        padding-top: 24px;
        margin-bottom: 32px;
      }
    }
    &_sub {
      margin-bottom: 100px;
    }
    &_subtitle {
      h3 {
        font-size: 25px;
        width: 50%;
        text-align: left;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
        display: inline;
      }
      margin-bottom: 25px;
      @include media(sp) {
        width: 100%;
        h3 {
          width: 100%;
          order: 2;
        }
      }
    }
    &_icons {
      @include media(sp) {
        order: 1;
        margin-bottom: 32px;
      }
    }
    &_subdsc {
      text-align: left;
      margin-bottom: 32px;
      p {
        font-size: 20px;
        font-weight: 400;
      }
    }
    &_link {
      text-align: right;
      a{
        font-weight: 400;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
      }
    }
    &_cardlist {
      margin-bottom: 80px;
    }
    &_cardwrap {
      margin-bottom: 40px;
    }
    &_card {
      width: 31.5%;
      height: 440px;
      background: var(--color_lp_box);
      padding: 40px 27px 32px;
      border-radius: 10px;
      @include media(sp) {
        width: 100%;
        margin-bottom: 32px;
      }
    }
    &_cardtitle {
      font-size: 30px;
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 100% 10%;
      display: block;
      height: 100px;
    }
    &_cardicons {
      margin-bottom: 40px;
    }
    &_carddsc {
      text-align: left;
      font-size: 20px;
      font-weight: 400;
    }
  }
  &-third {
    &_install {
      margin-bottom: 80px;
      .lp-third_right {
        width: 67.5%;
        text-align: left;
        padding: 36px;
        @include media(sp) {
          display: block;
          width: 100%;
          padding: 0;
          p {
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translate(0, -30%);
            line-height: 1.6;
          }
          .sp-bg {
            background: url(/assets/images/lp/install-sp.jpg) no-repeat center
              center;
            background-size: cover;
            width: 100%;
            height: 450px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
          }
        }
      }
      .lp-third_left {
        width: 32.5%;
        padding: 0;
        @include media(sp) {
          display: none;
        }
      }
    }
    &_title {
      h2 {
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 56px;
      }
      @include media(sp) {
        text-align: left;
        h2 {
          margin-bottom: 32px;
        }
      }
    }
    &_left {
      width: 32.5%;
      @include media(sp) {
        display: none;
      }
    }
    &_right {
      width: 67.5%;
      text-align: left;
      padding: 36px;
      @include media(sp) {
        width: 100%;
      }
    }
    &_subtitle {
      h3 {
        font-size: 35px;
      }
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 80% 10%;
      display: block;
      margin-bottom: 32px;
      @include media(sp) {
        background-size: 100% 10%;
      }
    }
    &_subdsc {
      margin-bottom: 35px;
      p {
        font-size: 20px;
        font-weight: 400;
      }
      @include media(sp) {
        position: relative;
        height: 460px;
        margin-bottom: 0;
      }
    }
    &_link {
      text-align: right;
      a{
        font-weight: 400;
      }
      &.inversion {
        span {
          transform: rotate(0deg) !important;
          margin-left: 16px !important;
          margin-right: 0;
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
      }
    }
    &_integration {
      margin-bottom: 100px;
      .lp-third_subtitle {
        background-size: 100% 10%;
      }
      .lp-third_sub {
        height: auto;
      }
      .lp-third_left {
        width: 67.5%;
        text-align: left;
        padding: 36px;
        @include media(sp) {
          display: block;
          width: 100%;
          padding: 0;
          p {
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translate(0, -15%);
            line-height: 1.6;
          }
          .sp-bg {
            background: url(/assets/images/lp/integration-sp.jpg) no-repeat
              center center;
            background-size: cover;
            width: 100%;
            height: 425px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
          }
        }
      }
      .lp-third_right {
        width: 32.5%;
        padding: 0;
        @include media(sp) {
          display: none;
        }
      }
      .lp-third_link {
        text-align: left;
        span {
          transform: rotate(180deg);
          margin-left: 0;
          margin-right: 16px;
        }
      }
      .lp-third_logos {
        margin-bottom: 40px;
        @include media(sp) {
          justify-content: space-between;
          margin-bottom: 16px;
          figure {
            margin-bottom: 16px;
          }
        }
      }
      .phase-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        .phase {
          background: $gradation-light;
          padding: 2px 16px;
          background-size: 100% 200%;
          font-size: 20px;
        }
        span {
          font-size: 12px;
          margin-left: 24px;
        }
      }
    }
    &_physical {
      margin-bottom: 96px;
      .lp-third_subtitle {
        background-size: 100% 10%;
        text-align: left;
      }
      .lp-third_subdsc {
        text-align: left;
        font-size: 20px;
        margin-bottom: 32px;
        @include media(sp) {
          position: relative;
          margin-bottom: 40px;
          height: auto;
        }
      }
    }
    &_image {
      margin-bottom: 40px;
    }
    &_app {
      width: 100%;
    }
    &_applogos {
      margin-bottom: 16px;
      flex-wrap: nowrap;
    }
    &_appleft {
      width: 33%;
      @include media(sp) {
        width: 100%;
        order: 2;
      }
      a {
        opacity: 0.6;
        pointer-events: none;
        &.active {
          opacity: 1;
          pointer-events: all;
          &:hover {
            opacity: 0.6;
          }
        }
        &:nth-child(2) {
          margin-left: 8px;
        }
      }
      p {
        font-size: 12px;
        font-weight: 300;
      }
    }
    &_appright {
      width: 67%;
      @include media(sp) {
        width: 100%;
        text-align: left;
        order: 1;
        margin-bottom: 24px;
      }
      p {
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
  &-fourth {
    .lp-third_subtitle {
      background-size: 100% 10%;
      @include media(sp) {
        text-align: left;
      }
    }
    .lp-third_link {
      span {
        transform: rotate(180deg);
        margin-left: 0;
        margin-right: 16px;
      }
      @include media(sp) {
        order: 2;
      }
    }
    .lp-third_left {
      display: block;
    }
    .lp-third_right {
      @include media(sp) {
        width: 100%;
        padding: 0;
        p {
          position: absolute;
          z-index: 2;
          top: 50%;
          transform: translate(0, -30%);
        }
        .sp-bg {
          background: url(/assets/images/lp/fee-sp.jpg) no-repeat center center;
          background-size: cover;
          width: 100%;
          height: 425px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        }
      }
    }
    &_fee {
      margin-bottom: 80px;
      @include media(sp) {
        .lp-third_left {
          display: none !important;
        }
      }
    }
    &_subdsc {
      text-align: left;
      margin-bottom: 24px;
      p{
        font-weight: 400;
      }
    }
    &_linkwrap {
      margin-bottom: 80px;
    }
    &_logos {
      figure {
        &:nth-child(2) {
          margin-left: 24px;
        }
      }
      @include media(sp) {
        order: 1;
        margin-bottom: 32px;
      }
    }
    &_title {
      h2 {
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 48px;
        @include media(sp) {
          text-align: left;
          padding: 0 16px;
          margin-bottom: 56px;
        }
      }
    }

    &_donateitem {
      @include media(sp) {
        margin-bottom: 40px;
      }
    }
    &_donate {
      margin-bottom: 80px;
      @include media(sp) {
        margin-bottom: 0px;
      }
      &item {
        width: calc(50% - 20px);
        background: var(--color_lp_box);
        border-radius: 10px;
        padding: 56px;
        @include media(sp) {
          width: 100%;
          padding: 40px;
        }
      }
      &title {
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
        font-size: 30px;
        display: block;
        margin-bottom: 32px;
        span{
          background:$gradation-orange;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @include media(sp) {
          font-size: 24px;
        }
      }
      dl {
        dd {
          padding: 24px;
          background: $gradation-pale;
          margin-bottom: 32px;
          @include media(sp) {
            margin-bottom: 24px;
          }
        }
      }
      p {
        margin-bottom: 32px;
        font-weight: 400;
        @include media(sp) {
          font-size: 15px;
          margin-bottom: 24px;
        }
      }
      .btn {
        height: 5rem;
        line-height: 5rem;
        padding: 0;
        span {
          width: 100px;
          margin-right: 8px;
          img {
            vertical-align: middle;
          }
        }
        a {
          height: 5rem;
          line-height: 5rem;
          font-size: 15px;
          display: block;
          color: #fff;
        }
      }
    }
    &_buyback {
      margin-bottom: 80px;
      .lp-third_subtitle {
        background-size: 100% 10%;
      }
      .lp-third_sub {
        height: auto;
      }
      .lp-third_left {
        width: 67.5%;
        text-align: left;
        padding: 36px;
        @include media(sp) {
          display: block;
          width: 100%;
          padding: 0;
          p {
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translate(0, -30%);
            line-height: 1.6;
          }
          .sp-bg {
            background: url(/assets/images/lp/buyback-sp.jpg) no-repeat center
              center;
            background-size: cover;
            width: 100%;
            height: 425px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
          }
        }
      }
      .lp-third_right {
        width: 32.5%;
        padding: 0;
        @include media(sp) {
          display: none;
        }
      }
      .lp-third_link {
        text-align: left;
        span {
          transform: rotate(180deg);
          margin-left: 0;
          margin-right: 16px;
        }
      }
      .lp-third_logos {
        margin-bottom: 40px;
        @include media(sp) {
          justify-content: space-between;
          margin-bottom: 16px;
          figure {
            margin-bottom: 16px;
          }
        }
      }
      .phase-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        .phase {
          background: $gradation-light;
          padding: 2px 16px;
          background-size: 100% 200%;
          font-size: 20px;
          color: #fff;
          font-weight: 400;
        }
        span {
          font-size: 12px;
          margin-left: 24px;
        }
      }
    }
  }
  &-fifth {
    padding:60px 0;
    @include media(sp) {
      padding:30px 16px;
    }
    &_title {
      h2 {
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 48px;
        @include media(sp) {
          text-align: left;
          margin-bottom: 56px;
        }
      }
    }
    ul{
      display:flex;
      flex-wrap:wrap;
      justify-content: center;
      align-items:center;
      @include media(sp) {
        justify-content: flex-start;
      }
      li{
        width:auto;
        height:40px;
        margin:25px 30px;
        @include media(sp) {
          width:50%;
          margin:10px 0;
          text-align: left;
          img{
            height:72%;
          }
        }
        &.lp-cn1{
          height:43px;
        }
        &.lp-cn2{
          height:38px;
        }
        &.lp-cn3{
          height:31px;
        }
        &.lp-cn4{
          height:34px;
        }
        &.lp-cn5{
          height:32px;
        }
        &.lp-cn6{
          height:49px;
        }
        &.lp-cn7{
          height:73px;
        }
        &.lp-cn8{
          height:35px;
        }
        &.lp-cn9{
          height:41px;
        }
        &.lp-cn10{
          height:40px;
        }
        &.lp-cn11{
          height:35px;
        }

      }
    }
  }
  &-sixth {
    padding:60px 0;
    @include media(sp) {
      padding:30px 16px;
    }
    &_title {
      h2 {
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 48px;
        @include media(sp) {
          text-align: left;
          margin-bottom: 56px;
        }
      }
    }

    .lp-sixth_mintitle{
      background: $gradation-light;
      text-align:center;
      padding:4px 0;
      font-weight: 400;
      color: #fff;
    }
    .lp-fourth_donate{

      align-items: inherit;
    }
    .lp-fourth_donateitem{
      padding:0;
      p{
        margin-bottom: 0;
      }
      .lp-fourth_donatetitle{
        display:flex;
        justify-content: center;
        align-items: center;
        padding:35px;
        height: calc(100% - 35px);
        margin-bottom:0;
        font-size: 24px;
        h4{
          line-height:2;
          font-weight:600;
        }
      }
    }
    .lp-sixth_flex{
      width:100%;
      .box{
        width:100%;
        @include media(pc) {
          display:flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        @include media(sp) {
          margin-right:0;
        }
        &.end{
          margin-right:0;
        }
        .cont{
          margin-bottom:40px;
          font-weight: 400;
          text-align: left;
          &:nth-child(6){
            h3{
              background:$gradation-orange;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          @include media(pc) {
            width:33.3333%;
          }
          &.active{
            h3{
              span{
                transform: rotate(-180deg);
              }
            }
          }
          h3{
            position: relative;
            display: inline;
            span{
              position: absolute;
              top: 12px;
              right: -32px;
              background: url(/assets/images/lp/list-arrow.svg);
              width: 20px;
              height: 12px;
            }
          }
        }
        h3{
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom:25px;
          span{
            background: $gradation-orange;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        p{
          padding:10px 0;
        }
      }
    }
  }
  &-seventh {
    margin-bottom:150px;
    &_title {
      h2 {
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 20px;
        @include media(sp) {
          text-align: left;
          margin-bottom: 56px;
        }
      }
    }
    .phase-wrap {
      margin-bottom: 30px;
      text-align:center;
      @include media(sp) {
        text-align: left;
      }
      .phase {
        background: $gradation-light;
        padding: 2px 16px;
        background-size: 100% 200%;
        font-size: 20px;
        margin-bottom:20px;
        display:inline-block;
        color: #fff;
        font-weight: 400;
      }
      p{
        font-size:12px;
      }
    }

    .lp-referral_inner{
      background: var(--color_lp_box);
      border-radius: 10px;
      padding: 56px;
      text-align: left;
      @include media(sp) {
        padding:25px 25px 50px 25px;
      }
      .lp-center{
        text-align:center;
        h3.lp-seventh_bottitle{
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom:35px;
          font-size:40px;
        }
      }
      .box{
        margin-bottom:55px;
        p{
          font-weight: 400;
        }
      }
      .lp-fourth_donatetitle{
        margin-bottom:20px;
      }
    }

  }
  &-eighth {
    background: url(/assets/images/lp/last_back_m.jpg) no-repeat center center;
    background-size: cover;
    padding:60px 0 85px;
    max-width:inherit;
    width:100%;
    h3{
      font-weight: 400;
      color: #fff;
    }
    .lp-b_back{
      background: var(--color_lp_box);
      border-radius: 10px;
      padding:40px 60px;
      width:400px;
      text-align:center;
      margin:30px auto 0;

      @include media(sp) {
        width: 85%;
        padding: 30px 10px;
      }
      .lp-first_icon{
        display:flex;
        align-items:center;
        justify-content:center;
        margin-bottom:15px;
        img{
          width:40px;
          margin-right:15px;
        }
        h4{
          font-size:30px;
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .lp-first_enter{
      box-shadow:none;
    }
  }
}
footer{
  padding:90px 0;
  display:flex;
  justify-content:space-between;
  text-align:left;
  max-width: 1030px;
  width:90%;
  margin:0 auto;
  font-weight: 400;
  @include media(sp) {
    display:block;
    padding:35px 0;
  }
  .lp-first_icon{
    display:flex;
    align-items:center;
    margin-bottom:15px;
    img{
      width:40px;
      margin-right:15px;
    }
    h4{
      font-size:30px;
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .lp-fotter_left{
    @include media(sp) {
      width:100%;
    }
    p{
      font-size:15px;
    }
    .lp-footer_link{
      margin-top:10px;
      @include media(sp) {
        margin-bottom:35px;
      }
    }
    .lp-footer_info{
      margin-top:60px;
    }
  }
  @include media(sp) {
    .lp-footer_info{
      font-size:15px;
      margin-top:25px;
    }
    .lp-third_link{
      text-align:left;
      margin-bottom:30px;
    }
  }

  .lp-fotter_right{
    @include media(sp) {
      width:100%;
    }
    .lp-footer_rightbox{
      display:flex;
      @include media(sp) {
        display:block;
      }
      .box{
        margin-left:68px;
        @include media(sp) {
          margin-left:0;
          border-bottom:1px solid #554B6A;
          padding:15px 0;
          &.end{
            border-bottom:none;
          }
        }
        h4{
          font-weight:600;
          margin-bottom:15px;
        }
        p{
          font-weight:400;
          margin-bottom:11px;
        }
      }
    }
  }
}
</style>
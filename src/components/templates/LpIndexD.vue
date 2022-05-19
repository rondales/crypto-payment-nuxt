<template>
  <div id="wrapAll">
    <!-- [TODO] レスポンシブ -->
    <!-- [TODO] whiteの時のチェック -->
    <!-- [TODO] 日本語のチェック -->
    <!-- [TODO] header/footer -->
    <LpHeader />
    <main>
      <!-- SECTION MV -->
      <section :class="section.mv.class + ' scrollAction'">
        <LpAnimation :canvasClass="section.mv.class" />
        <div :class="section.mv.class + '__title'">
          <!-- [TODO] アイコンぼやけるので画像が欲しい -->
          <img
            :class="section.mv.class + '__icon'"
            src="@/assets/images/lp/logo.png"
            alt="Slash payment"
          />
          <h1 :class="section.mv.class + '__h1'">
            <span :class="section.mv.class + '__h1__title'">{{
              section.mv.title.title
            }}</span>
            <span :class="section.mv.class + '__h1__subtitle'">{{
              section.mv.title.subtitle
            }}</span>
          </h1>
          <p :class="section.mv.class + '__lead'">
            <span v-html="section.mv.lead"></span>
          </p>
          <div :class="section.mv.class + '__button'">
            <a @click="enterApp()" href="/admin" class="dlp-btn__main l">
              <img src="@/assets/images/lp/pointing-up.svg" />
              <span>Enter App</span>
            </a>
            <a href="/" class="dlp-btn__sub l">
              <img src="@/assets/images/lp/gitbook-icon.svg" />
              <span>Slash docs.</span>
            </a>
          </div>
        </div>
      </section>

      <!-- SECTION HELLO web3 -->
      <section :class="section.hello.class">
        <div class="section__wrap">
          <h2 :class="section.hello.class + '__h2'">
            <span :class="section.hello.class + '__h2__title'">{{
              section.hello.title.title
            }}</span>
            <span :class="section.hello.class + '__h2__subtitle'"
              >{{ section.hello.title.subtitle
              }}<img src="@/assets/images/lp/pointing-up.svg"
            /></span>
            <span :class="section.hello.class + '__h2__text'">{{
              section.hello.title.text
            }}</span>
          </h2>
          <p :class="section.hello.class + '__lead'">
            <span v-html="section.hello.lead"></span>
          </p>
          <!-- [TODO] 画像書き出し直し / shadowをつける -->
          <figure :class="section.hello.class + '__image'">
            <img src="@/assets/images/lp/card.svg" />
          </figure>
        </div>
      </section>

      <!-- SECTION token -->
      <section :class="section.token.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.token.class + '__title'"
            :title="section.token.title"
            color="g"
          />
          <ul :class="section.token.class + '__iconlist'">
            <li v-for="icon in section.token.icons" :key="icon.path">
              <figure>
                <img
                  :src="
                    require('@/assets/images/lp/token/' + icon.path + '.svg')
                  "
                  :alt="icon.text"
                />
              </figure>
            </li>
          </ul>
          <div :class="section.token.class + '__subbox'">
            <h3 :class="section.token.class + '__subbox__title'">
              <span v-html="section.token.sub.title"></span>
            </h3>
            <p :class="section.token.class + '__subbox__text'">
              <span>{{ section.token.sub.text }}</span>
            </p>
            <div :class="section.token.class + '__subbox__link'">
              <a href="/" class="dlp-btn__main m">
                <span>Supported swap routers</span>
                <img
                  v-if="$store.state.theme == 'dark'"
                  src="@/assets/images/lp/right-arrow.svg"
                />
                <img
                  v-if="$store.state.theme == 'light'"
                  src="@/assets/images/lp/right-arrow-l.svg"
                />
              </a>
            </div>
          </div>
          <ul :class="section.token.class + '__card'">
            <li v-for="card in section.token.cards" :key="card.title">
              <div :class="section.token.class + '__card__list'">
                <h4 :class="section.token.class + '__card__title'">
                  <span v-html="card.title"></span>
                </h4>
                <ul :class="section.token.class + '__card__iconlist'">
                  <li v-for="icon in card.icons" :key="icon.path">
                    <figure>
                      <img
                        :src="
                          require('@/assets/images/lp/token/' +
                            icon.path +
                            '.svg')
                        "
                        :alt="icon.text"
                      />
                    </figure>
                  </li>
                </ul>
                <p :class="section.token.class + '__card__text'">
                  <span v-html="card.text"></span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION install -->
      <section :class="section.install.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.install.class + '__title'"
            :title="section.install.title"
          />
          <ul :class="section.install.class + '__feature'">
            <li
              v-for="feature in section.install.features"
              :key="feature.title"
            >
              <div :class="section.install.class + '__feature__list'">
                <LpImage
                  :imgData="feature.image"
                  :class="section.install.class + '__feature__image'"
                />
                <LpTextwrap
                  :class="section.install.class + '__feature__textwrap'"
                  :textData="feature"
                />
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION fee -->
      <section :class="section.fee.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.fee.class + '__title'"
            :title="section.fee.title"
          />
          <ul :class="section.fee.class + '__feature'">
            <li v-for="feature in section.fee.features" :key="feature.title">
              <div :class="section.fee.class + '__feature__list'">
                <LpImage
                  :imgData="feature.image"
                  :class="section.fee.class + '__feature__image'"
                />
                <LpTextwrap
                  :class="section.install.class + '__feature__textwrap'"
                  :textData="feature"
                />
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION trial -->
      <section :class="section.trial.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.trial.class + '__title'"
            :title="section.trial.title"
          />
          <ul :class="section.trial.class + '__feature'">
            <li v-for="list in section.trial.lists" :key="list.logo">
              <div :class="section.trial.class + '__feature__list'">
                <LpImage
                  :imgData="list.image"
                  :class="section.trial.class + '__feature__image'"
                />
                <img
                  :src="require('@/assets/images/' + list.logo)"
                  :alt="list.title"
                />
                <LpTextwrap
                  :class="section.trial.class + '__feature__textwrap'"
                  :textData="list"
                />
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION network -->
      <section :class="section.network.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.network.class + '__title'"
            :title="section.network.title"
          />
          <ul :class="section.network.class + '__logos'">
            <li v-for="logo in section.network.logos" :key="logo.path">
              <figure>
                <img
                  :src="require('@/assets/images/lp/' + logo.path + '.png')"
                />
              </figure>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION roadmap -->
      <section :class="section.roadmap.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.roadmap.class + '__title'"
            :title="section.roadmap.title"
          />
          <ul :class="section.roadmap.class + '__phase'">
            <li v-for="phase in section.roadmap.phases" :key="phase.title">
              <div :class="section.roadmap.class + '__phase__list'">
                <div :class="section.roadmap.class + '__phase__textwrap'">
                  <h3 :class="section.roadmap.class + '__phase__title'">
                    <span v-html="phase.title"></span>
                  </h3>
                  <ul :class="section.roadmap.class + '__phase'">
                    <li v-for="list in phase.list" :key="list.text">
                      {{ list.text }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <ul :class="section.roadmap.class + '__feature'">
            <li
              v-for="feature in section.roadmap.features"
              :key="feature.title"
            >
              <h3 :class="section.roadmap.class + '__feature__title'">
                <span v-html="feature.title"></span>
              </h3>
              <ul :class="section.roadmap.class + '__feature'">
                <li v-for="list in feature.list" :key="list.text">
                  {{ list.text }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION welcome -->
      <section :class="section.welcome.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.welcome.class + '__title'"
            :title="section.welcome.title"
          />
          <ul :class="section.welcome.class + '__list'">
            <li v-for="list in section.welcome.list" :key="list.title">
              <div :class="section.welcome.class + '__list__list'">
                <!-- <LpButton :link="list" type="main" size="m" /> -->
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION contact -->
      <section :class="section.contact.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.contact.class + '__title'"
            :title="section.contact.title"
          />
          <ul :class="section.contact.class + '__list'">
            <li v-for="list in section.contact.list" :key="list.title">
              <div :class="section.contact.class + '__list__list'">
                <!-- <LpButton :link="list" type="main" size="m"/> -->
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
    <LpFooter />
  </div>
</template>


<script>
import LpHeader from "@/components/organisms/lp/lpHeader";
import LpFooter from "@/components/organisms/lp/lpFooter";
import LpAnimation from "@/components/templates/LpAnimation";
// import LpIcon from "@/components/templates/LpParts/Icon";
// import LpButton from "@/components/templates/LpParts/Button";
import LpTitle from "@/components/templates/LpParts/Title";
import LpImage from "@/components/templates/LpParts/Image";
import LpTextwrap from "@/components/templates/LpParts/Textwrap";

export default {
  data() {
    return {
      section: {
        mv: {
          class: "dlp-mv",
          title: {
            title: "Slash",
            subtitle: "Web3 payment",
          },
          lead: "the next generation of decentralized payment methods,<br>to support any Token payment.",
        },
        hello: {
          class: "dlp-hello",
          title: {
            title: "Hello!",
            subtitle: "Web 3.0 ",
            text: "Slash Payment",
          },
          lead: 'Merchants can automatically accept online TOKEN <br class="show_pc" />payments from customers using the Web3 wallet.',
        },
        token: {
          class: "dlp-token",
          title: {
            title: "Customers can choose",
            subtitle: "any type of token they want to pay for",
            text: "Slash Payment",
          },
          icons: [
            {
              text: "",
              path: "icon-crv",
            },
            {
              text: "",
              path: "icon-uni",
            },
            {
              text: "",
              path: "icon-sushi",
            },
            {
              text: "",
              path: "icon-cake",
            },
            {
              text: "",
              path: "icon-quick",
            },
            {
              text: "",
              path: "icon-png",
            },
          ],
          sub: {
            title:
              'Exchanges at DEX automatically <br class="sp" />at the best rate',
            text: "Slash Payment’s payment contracts and core contractsautomatically connect to the best-rate DEX SWAP router whenmaking payments for different tokens. This solution allowsCustomers can pay with any token.",
          },
          cards: [
            {
              title: "Web3 connect",
              icons: [
                {
                  text: "",
                  path: "icon-metamask",
                },
                {
                  text: "",
                  path: "icon-walletconnect",
                },
              ],
              text: "Merchants can automatically accept online TOKEN payments from customers using the Web3 wallet.",
            },
            {
              title: " Auto-exchange <br> via DEX",
              icons: [
                {
                  text: "",
                  path: "icon-crv",
                },
                {
                  text: "",
                  path: "icon-uni",
                },
                {
                  text: "",
                  path: "icon-sushi",
                },
                {
                  text: "",
                  path: "icon-cake",
                },
                {
                  text: "",
                  path: "icon-quick",
                },
                {
                  text: "",
                  path: "icon-png",
                },
              ],
              text: "customer’s payment will reach the merchant instantly in exchange for Stable Token（USDT.USDC.DAI…）via a decentralized exchange.",
            },
            {
              title: "Multiple chain",
              icons: [
                {
                  text: "",
                  path: "icon-eth",
                },
                {
                  text: "",
                  path: "icon-bnb",
                },
                {
                  text: "",
                  path: "icon-matic",
                },
                {
                  text: "",
                  path: "icon-arbitrum",
                },
                {
                  text: "",
                  path: "icon-avax",
                },
                {
                  text: "",
                  path: "icon-ftm",
                },
              ],
              text: "ETH and EVM-based (Ethereum Virtual Machine)  networks are supported.",
            },
          ],
        },
        install: {
          class: "dlp-install",
          title: {
            title: "Easy system",
            subtitle: "installation",
          },
          features: [
            {
              title:
                "Slash makes it extremely easy and<br>safe to introduce cryptocurrency<br>payments.",
              image: {
                src: "lp/install-image.jpg",
                alt: "Slash makes it extremely easy and safe to introduce cryptocurrency payments.",
                lightSrc: "",
              },
              text: "To become a merchant, simply click ［Enter App］and connect your Web3 wallet. There is no screening process. From that day on, your store or service will be able to accept cryptocurrency payments. Also, the payment will be delivered to your Web3 Wallet at that very moment.",
              link: {
                url: "/",
                title: "Slash Payment Install Docs.",
                icon: "right-arrow",
              },
            },
            {
              title: "Integration with any platform",
              image: {
                src: "lp/integration.jpg",
                alt: "Integration with any platform",
                lightSrc: "",
              },
              text: "Slash-specific plugin is available to simplify integration with various open platforms. Because of the ease of implementing payments, Slash Payments may be the first transaction that occurs when you launch your e-commerce site.",
              logos: [
                {
                  path: "woocommerce",
                },
                {
                  path: "opencart",
                },
                {
                  path: "eccube",
                },
              ],
              link: {
                url: "/",
                title: "Details of Integrations",
                icon: "right-arrow",
              },
            },
            {
              title:
                'The best way for Accepting Web3<br class="sp"> Wallet Payments at Physical Stores',
              image: {
                src: "lp/physical.jpg",
                alt: "The best way for Accepting Web3 Wallet Payments at Physical Stores",
                lightSrc: "lp/physical-l.jpg",
              },
              text: "If you are running a store, such as a café or a retail store, how about incorporating cryptocurrency as another means of payment? We are about to launch iOS/android app to make cryptocurrency payment more convenient.",
            },
          ],
        },
        fee: {
          class: "dlp-fee",
          title: {
            title: "Fee & Ecosystem",
            subtitle: "",
          },
          features: [
            {
              title: "Slash Payment fee is 0.2〜0.6%",
              image: {
                src: "lp/fee.jpg",
                alt: "Slash Payment fee is 0.2〜0.6%",
                lightSrc: "",
              },
              text: "There are no commissions paid to Merchants. The commission is 0.2-0.6% of the payment amount and is collected as a platform token along with the gas cost of the customer’s payment transaction.<br><br>The commission is also used to automatically buyback Slash tokens through the ecosystem described in the whitepaper. A portion of the fees will also go towards the Slash donation program, where the recipients of the donation will be determined by a vote.",
              link: {
                url: "/",
                title: "Fee Structure",
                icon: "right-arrow",
              },
            },
            {
              title: "Slash automatically donation program",
              image: {
                src: "lp/donated.jpg",
                alt: "Slash automatically donation program",
                lightSrc: "",
              },
              text: "0.1% of all Slash Payment fees are automatically sent to the Slash Donation Wallet to be donated to social causes.<br><br>We question the Old ecosystem in which people need donations. Ideally, we would like to see a world where people who need donations do not exist, a world of peace and prosperity where children can envision a bright future without being caught up in conflicts between countries.<br><br>In order to contribute as much as possible to this new ideal ecosystem in which people can live their lives, we have incorporated an automated donation system into the Slash Payment.<br><br>In the future, we will form a community so that people can decide where to donate by voting on slash tokens.",
              logos: [
                {
                  path: "save-the-children",
                },
                {
                  path: "unicef",
                },
              ],
              link: {
                url: "/",
                title: "donation program",
                icon: "right-arrow",
              },
            },
            {
              tag: {
                title: "Phase 2",
                text: "coming soon…",
              },
              title: "The All fees Use buyback $Slash*",
              image: {
                src: "lp/buyback.jpg",
                alt: "The All fees Use buyback $Slash*",
                lightSrc: "",
              },
              text: " The Slash Payment fee is 0.2~0.6% of the settlement amount and is collected as a gas fee in platform tokens (ETH, BNB, Matic….).<br><br>Except for the 0.1% fee used for donation, the Slash Payment has a completely new ecosystem that automatically buys back Slash Token from DEX for each transaction. Slash Token can also serve as governance for Slash and can be used to vote for donation recipients or be used in a staking pool with a fee discount feature to be launched later.<br><br>*Slash Token will be issued in Phase 2.",
              link: {
                url: "/",
                title: "Details of $Slash",
                icon: "right-arrow",
              },
            },
          ],
        },
        trial: {
          class: "dlp-trial",
          title: {
            title: "Try Donate with Slash",
            subtitle: "Web3 Crypto payments 👼",
          },
          lists: [
            {
              title: "Experience it first hand.",
              image: {
                src: "lp/donate-image01.jpg",
                alt: "Experience it first hand.",
                lightSrc: "",
              },
              logo: "lp/donate01.svg",
              url: "https://donate.savethechildren.org",
              link: '@click.prevent.stop="paymentForDonate(SAFE_THE_CHILDREN)',
            },
            {
              title: "Experience it first hand.",
              image: {
                src: "lp/donate-image02.jpg",
                alt: "Experience it first hand.",
                lightSrc: "",
              },
              logo: "lp/donate02.svg",
              url: "https://www.unicef.org/",
              link: '@click.prevent.stop="paymentForDonate(UNICEF)',
            },
          ],
        },
        network: {
          class: "dlp-network",
          title: {
            title: "Connected network",
            subtitle: "",
          },
          logos: [
            {
              path: "cn1",
            },
            {
              path: "cn2",
            },
            {
              path: "cn3",
            },
            {
              path: "cn4",
            },
            {
              path: "cn5",
            },
            {
              path: "cn6",
            },
            {
              path: "cn7",
            },
            {
              path: "cn8",
            },
            {
              path: "cn9",
            },
            {
              path: "cn10",
            },
            {
              path: "cn11",
            },
          ],
        },
        roadmap: {
          class: "dlp-roadmap",
          title: {
            title: "Features & Rood Map",
            subtitle: "",
          },
          phases: [
            {
              title: "Phase 1",
              list: [
                { text: "Basic Features" },
                { text: "Open Source Plugin Ver.1" },
              ],
            },
            {
              title: "Phase 2",
              list: [
                { text: "Slash TOKEN" },
                { text: "Additional Features" },
                { text: "Open Source Plugins Ver.2" },
                { text: "Integration Requirements" },
              ],
            },
          ],
          features: [
            {
              title: "Basic Features",
              list: [
                { text: "Web3Payment BSC" },
                { text: "Web3Payment ETH" },
                { text: "Web3Payment Polygon" },
                { text: "Merchant App" },
              ],
            },
            {
              title: "Open Source Plugins Ver.1",
              list: [
                { text: "Woocommerce" },
                { text: "Wellcart" },
                { text: "EC CUBE" },
              ],
            },
            {
              title: "Integration Requirements",
              list: [{ text: "Shopify" }, { text: "Wix" }],
            },
            {
              title: "Additional Features",
              list: [
                { text: "Online tipping feature" },
                { text: "Single EC feature" },
                { text: "Store Payment feature" },
                { text: "Escrow feature" },
              ],
            },
            {
              title: "OpenSource Plugins Ver.2",
              list: [
                { text: "OpenCart" },
                { text: "Zencart" },
                { text: "Drupal-Commerce" },
                { text: "Magento" },
                { text: "Magento2" },
                { text: "WHMCS" },
                { text: "Drupal 8 Ubercart" },
                { text: "Easy Digital Downloads" },
              ],
            },
            {
              title: "Slash TOKEN",
              list: [
                { text: "TOKEN SALE" },
                { text: "Staking pool" },
                { text: "Referral feature" },
                { text: "Coin Market Cap Listing" },
                { text: "CoinGecko Listing" },
                { text: "CEX Listing" },
              ],
            },
          ],
        },
        welcome: {
          class: "dlp-welcome",
          title: {
            title: "Welcome⚡",
            subtitle: "Slash Developers💻",
          },
          list: [
            {
              title: "Slash Payment Docs.",
              icon: "twitter",
              // link: {},
              status: true,
            },
            {
              title: "Slash Payment github",
              icon: "twitter",
              // link: {},
              status: true,
            },
            {
              title: "Media kit",
              icon: "twitter",
              //  link: {},
              status: false,
            },
            {
              title: "Support for Slash Payment System",
              icon: "twitter",
              // link: {},
              status: false,
            },
            {
              title: "Slash Developer Community",
              icon: "twitter",
              // link: {},
              status: false,
            },
            {
              title: "FAQ about system implementation",
              icon: "twitter",
              // link: {},
              status: false,
            },
            {
              title: "Slash Recruit information",
              icon: "twitter",
              // link: {},
              status: true,
            },
          ],
        },
        contact: {
          class: "dlp-contact",
          title: {
            title: "Contact us",
            subtitle: "",
          },
          list: [
            {
              title: "Contact Email",
              icon: "arroba",
              link: "",
              status: true,
              light: true,
            },
            {
              title: "Twitter for DM",
              icon: "twitter",
              link: "",
              status: true,
              light: true,
            },
          ],
        },
      },
      nativeApp: false,
      show: {},
      cont: [
        {
          id: 1,
          title: "BASIC Features",
          lists: [
            { text: "Web3Payment BSC" },
            { text: "Web3Payment ETH" },
            { text: "Web3Payment Polygon" },
            { text: "Merchant App" },
          ],
        },
        {
          id: 2,
          title: "Open Source Plugins Ver.1",
          lists: [
            { text: "Woocommerce" },
            { text: "Wellcart" },
            { text: "EC CUBE" },
          ],
        },
        {
          id: 3,
          title: "Integration Requirements",
          lists: [{ text: "Shopify" }, { text: "Wix" }],
        },
        {
          id: 4,
          title: "Additional Features",
          lists: [
            { text: "Online tipping feature" },
            { text: "Single EC feature" },
            { text: "Store Payment feature" },
            { text: "Escrow feature" },
          ],
        },
        {
          id: 5,
          title: "Open Source Plugins Ver.2",
          lists: [
            { text: "OpenCart" },
            { text: "Zencart" },
            { text: "Drupal-Commerce" },
            { text: "Magento" },
            { text: "Magento2" },
            { text: "WHMCS" },
            { text: "Drupal 8 Ubercart" },
            { text: "Easy Digital Downloads" },
          ],
        },
        {
          id: 6,
          title: "Slash TOKEN",
          lists: [
            { text: "TOKEN SALE" },
            { text: "Staking pool" },
            { text: "Referral feature" },
            { text: "Coin Market Cap Listing" },
            { text: "CoinGecko Listing" },
            { text: "CEX Listing" },
          ],
        },
      ],
    };
  },
  components: {
    LpHeader,
    LpFooter,
    LpAnimation,
    // LpIcon,
    // LpButton,
    LpTitle,
    LpImage,
    LpTextwrap,
  },

  methods: {
    openModal(target) {
      this.$store.dispatch("modal/show", { target: target, size: "small" });
    },
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
    },
    toggle(key) {
      this.$set(this.show, key, !this.show[key]);
    },
    enterApp() {
      this.$store.dispatch("changeTheme", "dark");
    },
    scrollAction() {
      // const scrollActions = document.querySelectorAll(".scrollAction");
      // for (let i = 0; i < scrollActions.length; i++) {
      //   const windowHeight = window.innerHeight;
      //   const elTop = scrollActions[i].getBoundingClientRect().top;
      //   const elVisible = 150;
      //   if (elTop < windowHeight - elVisible) {
      //     scrollActions[i].classList.add("active");
      //   } else {
      //     scrollActions[i].classList.remove("active");
      //   }
      // }
    },
  },
  created() {
    // window.addEventListener("scroll", this.scrollAction);
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
#wrapAll {
  background: var(--color_lp_bg);
  main {
    position: relative;
    z-index: 1;
  }
}

.scrollAction {
  // position: relative;
  // transform: translateY(150px);
  // opacity: 0;
  // transition: 2s all ease;
  // &.active {
  //   transform: translateY(0);
  //   opacity: 1;
  // }
}

.dlp {
  &-btn {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: rem(8);
    margin: rem(0.5);
    color: #fff;
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
      @extend .dlp-btn;
      background: $gradation;
      background: $gradation-pale;
      background: $gradation-light;
      // background-color: red;
    }

    &__sub {
      @extend .dlp-btn;
      background: #55476b;
      // &::after {
      //   background-image: url(/assets/images/lp/gitbook-icon.svg);
      // }
    }
    &__noactive {
      @extend .dlp-btn;
      background: #55476b;
      pointer-events: none;
    }
  }
  &-mv {
    height: 100vh;
    position: relative;
    &__canvas {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      // background-color: red;
    }
    &__title {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      transform: translate(-50%, -50%);
    }
    &__icon {
      width: rem(8);
      margin-left: auto;
      margin-right: auto;
      margin-bottom: rem(1);
    }
    &__h1 {
      text-align: center;
      margin-bottom: 4rem;
      &__title {
        @include font(rem(4.6), 500, 0.02em, 1.2, $ff);
        display: block;
      }
      &__subtitle {
        @include font(rem(1.8), 500, $ls, 1, $ff);
        display: block;
      }
    }
    &__lead {
      margin-bottom: rem(2);
      text-align: center;
      white-space: nowrap;
      @include font(rem(1), $fw, $ls, $lh, $ff);
      // @include font(rem(pow(1)), $fw, $ls, $lh, $ff);
    }
    &__button {
      @include flex(center, center);
      flex-wrap: nowrap;
    }
  }
  &-hello {
    position: relative;
    @include rem_padding(2, 0, 6, 0);
    &__h2 {
      position: relative;
      z-index: 10;
      margin-bottom: rem(2);
      width: 65%;
      * {
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
      }
      img {
        width: rem(6);
      }
      &__title {
        @include font(rem(8), 700, 0em, 1.2, $ff);
        display: block;
      }
      &__subtitle {
        @include font(rem(6), 700, 0em, 1.2, $ff);
        @include flex(flex-start, center);
      }
      &__text {
        @include font(rem(4), 700, 0em, 1.5, $ff);
        display: block;
      }
    }
    &__lead {
      position: relative;
      z-index: 10;
      width: 65%;
      @include font(rem(pow(1)), $fw, $ls, 1.75, $ff);
    }
    &__image {
      position: absolute;
      right: 0;
      top: 50%;
      width: 35%;
      transform-origin: center center;
      transform: translate(0%, -50%);
    }
  }
  &-token {
    @include rem_padding(6, 0, 6, 0);
    &__iconlist {
      @include flex(center, flex-start);
      margin-bottom: rem(5);
      li {
        width: rem(6);
        margin: 0 rem(1);
      }
    }
    &__subbox {
      margin-bottom: rem(6);
      max-width: rem(50);
      margin-left: auto;
      margin-right: auto;
      border-top: rem(0.3) solid var(--color_darken);
      padding-top: rem(3);
      &__title {
        text-align: center;
        @include font(rem(2), 700, 0em, 1.5, $ff);
        display: block;
        margin-bottom: rem(1);
      }
      &__text {
        @include font(rem(1), $fw, $ls, $lh, $ff);
        margin-bottom: rem(1);
      }
      &__link {
        @include flex(center, center);
      }
    }
    &__card {
      @include flex(flex-start, stretch);
      @include list(3, rem(0.5));
      // [TODO] タイル
      &__list {
        height: 100%;
        background-color: var(--color_lp_box);
        @include rem_padding(2, 2, 2, 2);
        border-radius: rem(1);
      }
      &__title {
        @include font(rem(1.5), 700, 0em, 1.5, $ff);
        display: block;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: rem(1.5);
      }
      &__iconlist {
        @include flex(center, flex-start);
        @include list(3, rem(2));
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: rem(1);
        li {
          // width: rem(3);
          margin-bottom: rem(1);
        }
      }
      &__text {
        @include font(rem(0.9), $fw, $ls, $lh, $ff);
      }
    }
  }
  &-install {
    @include rem_padding(6, 0, 6, 0);
    &__feature {
      li {
        &:nth-child(2) {
          [class$="__image"] {
            order: 2;
          }
        }
        &:nth-child(3) {
          [class$="__list"] {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      }
      &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(4);
        margin-bottom: rem(4);
      }
      &__image {
        grid-column: span 1;
      }
      &__textwrap {
        grid-column: span 1;
        align-self: center;
      }
      &__title {
        @include font(rem(pow(2)), 500, $ls, 1.5, $en_go);
      }
      &__text {
        @include font(rem(pow(0)), $fw, $ls, $lh, $en_go);
        margin-top: 2rem;
      }
      &__link {
        margin-top: 2rem;
      }
    }
  }
  &-fee {
    @include rem_padding(6, 0, 6, 0);
    &__sectitle {
      margin-bottom: rem(3);
      text-align: center;
      // * {
      //   background: $gradation-light;
      //   -webkit-background-clip: text;
      //   -webkit-text-fill-color: transparent;
      //   // background-size: 100% 10%;
      // }
      &__title {
        @include font(rem(3), 700, 0em, 1.5, $ff);
        display: block;
      }
      &__subtitle {
        @include font(rem(3), 700, 0em, 1.5, $ff);
      }
    }
    &__feature {
      li {
        &:nth-child(2) {
          [class$="__image"] {
            order: 2;
          }
        }
        &:nth-child(3) {
          [class$="__list"] {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      }
      &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(4);
        margin-bottom: rem(4);
      }
      &__image {
        grid-column: span 1;
      }
      &__textwrap {
        grid-column: span 1;
        align-self: center;
      }
      &__title {
        @include font(rem(pow(2)), 500, $ls, 1.5, $en_go);
      }
      &__text {
        @include font(rem(pow(0)), $fw, $ls, $lh, $en_go);
        margin-top: 2rem;
      }
      &__link {
        margin-top: 2rem;
      }
    }
  }
  &-trial {
    @include rem_padding(6, 0, 6, 0);
    &__feature {
      @include flex(flex-start, flex-start);
      @include list(2, rem(4));
      &__list {
      }
      &__image {
      }
      &__textwrap {
      }
    }
  }
  &-network {
    @include rem_padding(6, 0, 6, 0);
    &__logos {
      @include flex(center, center);
      @include list(4, rem(4));
      li {
        margin-bottom: rem(2);
      }
    }
  }
  &-roadmap {
    @include rem_padding(6, 0, 6, 0);
    display: none;
    &__phase {
      @include flex(center, center);
      @include list(2, 2rem);
    }
    &__feature {
      @include flex(center, center);
      @include list(3, 2rem);
    }
  }
  &-welcome {
    @include rem_padding(6, 0, 6, 0);
    &__list {
    }
  }
  &-contact {
    @include rem_padding(6, 0, 6, 0);
  }
}
</style>

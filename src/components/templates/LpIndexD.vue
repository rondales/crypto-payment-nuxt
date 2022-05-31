<template>
  <div id="wrapAll">
    <LpHeader />
    <main>
      <!-- SECTION MV -->
      <section :class="section.mv.class + ' '">
        <LpAnimation :canvasClass="section.mv.class" type="MvCanvas" />
        <div :class="section.mv.class + '__title'">
          <img
            :class="section.mv.class + '__icon'"
            src="@/assets/images/logo-icon.svg"
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
            <LpButton :link="section.mv.link" type="main" size="m" />
            <LpButton :link="section.mv.link2" type="sub" size="m" />
          </div>
        </div>
      </section>

      <!-- SECTION HELLO web3 -->
      <section :class="section.hello.class">
        <div class="section__wrap">
          <div :class="section.hello.class + '__wrap'">
            <div :class="section.hello.class + '__textwrap'">
              <h2 :class="section.hello.class + '__h2 scrollAction textMove'">
                <span :class="section.hello.class + '__h2__title'">{{
                  section.hello.title.title
                }}</span>
                <span :class="section.hello.class + '__h2__subtitle'">
                  <span>{{ section.hello.title.subtitle }}</span>
                  <img src="@/assets/images/lp/pointing-up.svg" />
                </span>
                <span :class="section.hello.class + '__h2__text'">{{
                  section.hello.title.text
                }}</span>
              </h2>
              <p :class="section.hello.class + '__lead'">
                <span v-html="section.hello.lead"></span>
              </p>
            </div>
            <div
              :class="section.hello.class + '__imagewrap scrollAction capcha'"
            >
              <figure :class="section.hello.class + '__image'">
                <img src="@/assets/images/lp/capcha-2.png" />
              </figure>
              <figure :class="section.hello.class + '__image r'">
                <img src="@/assets/images/lp/capcha-1.png" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION token -->
      <section id="token" :class="section.token.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.token.class + '__title'"
            :title="section.token.title"
            color="g"
          />
          <ul :class="section.token.class + '__iconlist'">
            <li v-for="icon in section.token.icons" :key="icon.src">
              <LpImage :imgData="icon" />
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
              <LpButton :link="section.token.sub.link" type="main" size="s" />
            </div>
          </div>
          <ul :class="section.token.class + '__card'">
            <li v-for="card in section.token.cards" :key="card.title">
              <div :class="section.token.class + '__card__list'">
                <h4 :class="section.token.class + '__card__title'">
                  <span v-html="card.title"></span>
                </h4>
                <ul :class="section.token.class + '__card__iconlist'">
                  <li v-for="icon in card.icons" :key="icon.src">
                    <LpImage :imgData="icon" />
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
              <LpImageText
                :data="feature"
                :class="section.install.class + '__feature__list'"
              />
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION fee -->
      <section id="fee-ecosystem" :class="section.fee.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.fee.class + '__title'"
            :title="section.fee.title"
          />
          <ul :class="section.fee.class + '__feature'">
            <li v-for="feature in section.fee.features" :key="feature.title">
              <LpImageText
                :data="feature"
                :class="section.install.class + '__feature__list'"
              />
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION trial -->
      <section id="donation" :class="section.trial.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.trial.class + '__title'"
            :title="section.trial.title"
          />
        </div>
        <ul :class="section.trial.class + '__feature'">
          <li
            v-for="list in section.trial.lists"
            :key="list.logo"
            class="scrollAction"
          >
            <div :class="section.trial.class + '__feature__list'">
              <div :class="section.trial.class + '__feature__imagewrap'">
                <LpImage
                  :imgData="list.image"
                  :class="section.trial.class + '__feature__image'"
                />
              </div>
              <div :class="section.trial.class + '__feature__textwrap'">
                <LpIcon
                  :class="section.trial.class + '__feature__logo'"
                  :path="list.logo"
                />
                <h3 class="title"><span v-html="list.title"></span></h3>
                <p class="text"><span v-html="list.text"></span></p>
                <div v-if="list.link" class="link">
                  <LpButton :link="list.link" type="main2" size="m" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- SECTION network -->
      <section :class="section.network.class">
        <!-- <LpAnimation :canvasClass="section.network.class" type="SubCanvas4" /> -->
        <div class="section__wrap">
          <LpTitle
           :class="( $store.state.theme == 'light')?section.cv.class + '__title light':section.cv.class + '__title'"
            :title="section.network.title"
          />
          <ul :class="section.network.class + '__logos scrollAction listMove'">
            <li v-for="logo in section.network.logos" :key="logo.src">
              <LpImage :imgData="logo" />
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION roadmap -->
      <section id="roadmap" :class="section.roadmap.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.roadmap.class + '__title'"
            :title="section.roadmap.title"
          />
          <div :class="section.roadmap.class + '__phase'">
            <div
              :class="section.roadmap.class + '__phase__box'"
              v-for="phase in section.roadmap.phases"
              :key="phase.title"
            >
              <h3 :class="section.roadmap.class + '__phase__title'">
                <span v-html="phase.title"></span>
              </h3>
              <ul :class="section.roadmap.class + '__phase__list'">
                <li v-for="list in phase.list" :key="list.text">
                  <div :class="section.roadmap.class + '__phase__listwrap'">
                    <h4 :class="section.roadmap.class + '__phase__subtitle'">
                      <span>{{ list.title }}</span>
                    </h4>
                    <ul :class="section.roadmap.class + '__phase__sublist'">
                      <li v-for="li in list.list" :key="li.text">
                        <span :class="{active: li.active}">
                          {{ li.text }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION welcome -->
      <section id="developers" :class="section.welcome.class">
        <div class="section__wrap">
          <LpTitle
            :class="section.welcome.class + '__title'"
            :title="section.welcome.title"
          />
          <ul :class="section.welcome.class + '__list'">
            <li v-for="list in section.welcome.list" :key="list.title">
              <LpButton
                :link="list"
                :type="list.status ? 'main' : 'noactive'"
                size="s"
                :target="list.blank"
              />
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION CV -->
      <section id="contact" :class="section.cv.class">
        <!-- <LpAnimation :canvasClass="section.cv.class" type="SubCanvas3" /> -->
        <div class="section__wrap ">
          <LpTitle
            :class="( $store.state.theme == 'light')?section.cv.class + '__title light':section.cv.class + '__title'"
            :title="section.cv.title"
          />
          <div :class="section.cv.class + '__wrap'">
            <div :class="section.cv.class + '__textwrap'">
              <div :class="section.cv.class + '__logo'">
                <img src="@/assets/images/logo-icon.svg" alt="Slash payment" />
                <h4>Slash.fi</h4>
              </div>
              <LpButton :link="section.cv.link" type="main" size="m" />
            </div>
            <ul :class="section.cv.class + '__list'">
              <li v-for="list in section.cv.list" :key="list.title">
                <LpButton :link="list" type="main" size="l" />
              </li>
            </ul>
          </div>
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
import LpButton from "@/components/templates/LpParts/Button";
import LpTitle from "@/components/templates/LpParts/Title";
import LpImageText from "@/components/templates/LpParts/ImageText";
import LpImage from "@/components/templates/LpParts/Image";
import LpIcon from "@/components/templates/LpParts/Icon";

export default {
  data() {
    return {
      winH: 0,
      scrollY: 0,
      height: 0,
      position: 0,
      currentWindow: {
        t: 0,
        h: 0,
        b: 0,
      },
      canvasItems: [],
      section: {
        mv: {
          class: "dlp-mv",
          title: {
            title: "Slash",
            subtitle: "Web3 payment",
          },
          lead: "the next generation of decentralized payment methods,<br>to support any Token payment.",
          link: {
            url: "/",
            title: "Enter App",
            // icon: "pointing-up",
            func: "enterApp",
          },
          link2: {
            url: "/",
            title: "Slash docs.",
            icon: "icon/gitbook",
          },
        },
        hello: {
          class: "dlp-hello",
          title: {
            title: "Hello!",
            subtitle: "Web 3 ",
            text: "Slash Payment",
          },
          lead: 'Merchants can accept online TOKEN payments from <br class="pc" />customer’s Web3 wallet in the most reasonable way.',
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
              alt: "",
              lightSrc: "",
              src: "lp/token/icon-crv.svg",
            },
            {
              alt: "",
              lightSrc: "",
              src: "lp/token/icon-uni.svg",
            },
            {
              alt: "",
              lightSrc: "",
              src: "lp/token/icon-sushi.svg",
            },
            {
              alt: "",
              lightSrc: "",
              src: "lp/token/icon-cake.svg",
            },
            {
              alt: "",
              lightSrc: "",
              src: "lp/token/icon-quick.svg",
            },
            {
              alt: "",
              lightSrc: "",
              src: "lp/token/icon-png.svg",
            },
          ],
          sub: {
            title: "Exchanges at DEX automatically <br>at an optimal rate",
            text: "Slash Payment’s smart contracts automatically find an optimal rate through supported DEX SWAP routers. This solution allows Customers can pay with any token at an optimal-rate.",
            link: {
              url: "/",
              title: "See Quick Start",
              icon: "icon/arrow",
              iconAfter: true,
            },
          },
          cards: [
            {
              title: "Web3 connect",
              icons: [
                {
                  alt: "",
                  src: "lp/token/icon-metamask.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-walletconnect.svg",
                  lightSrc: "",
                },
              ],
              text: "Merchants can automatically accept online TOKEN payments from customers using the Web3 wallet.",
            },
            {
              title: " Auto-exchange <br> via DEX",
              icons: [
                {
                  alt: "",
                  src: "lp/token/icon-crv.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-uni.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-sushi.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-cake.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-quick.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-png.svg",
                  lightSrc: "",
                },
              ],
              text: "The merchant receives the amount in Stable Token exchanged at an optimal rate through supported DEX.",
            },
            {
              title: "Multiple chain",
              icons: [
                {
                  alt: "",
                  src: "lp/token/icon-eth.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-bnb.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-matic.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-arbitrum.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-avax.svg",
                  lightSrc: "",
                },
                {
                  alt: "",
                  src: "lp/token/icon-ftm.svg",
                  lightSrc: "",
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
            subtitle: "installation 🖥",
          },
          features: [
            {
              layout: "r",
              title:
                "Slash makes it extremely easy and safe to introduce cryptocurrency payments.",
              image: {
                src: "lp/hand-neon2.jpg",
                alt: "Slash makes it extremely easy and safe to introduce cryptocurrency payments.",
                lightSrc: "",
              },
              text: "To become a merchant, simply click ［Enter App］and connect your Web3 wallet. There is no screening process. From that day on, your store or service will be able to accept cryptocurrency payments. Also, the payment will be delivered to your Web3 Wallet at that very moment.",
              link: {
                url: "/",
                title: "See Quick Start",
                icon: "icon/arrow",
                iconAfter: true,
              },
            },
            {
              layout: "l",
              title: "Integration with <br>any platform",
              canvas: "SubCanvas1",
              image: {
                src: "lp/integration.jpg",
                alt: "Integration with any platform",
                lightSrc: "",
              },
              text: "Slash-specific plugin is available to simplify integration with various open platforms. Because of the ease of implementing payments, Slash Payments may be the first transaction that occurs when you launch your e-commerce site.",
              logos: [
                {
                  alt: "woocommerce",
                  src: "lp/logos/woocommerce.svg",
                  lightSrc: "lp/logos/woocommerce_l.svg",
                },
                {
                  alt: "opencart",
                  src: "lp/logos/opencart.svg",
                  lightSrc: "",
                },
                {
                  alt: "eccube",
                  src: "lp/logos/eccube.svg",
                  lightSrc: "lp/logos/eccube_l.svg",
                },
              ],
              link: {
                url: "/",
                title: "Details of Integrations",
                icon: "icon/arrow",
                iconAfter: true,
              },
            },
            {
              layout: "c",
              title:
                "The best way for Accepting Web3 Wallet Payments at Physical Stores",
              image: {
                src: "lp/app2.png",
                alt: "The best way for Accepting Web3 Wallet Payments at Physical Stores",
                // lightSrc: "lp/physical-l.jpg",
                lightSrc: "",
              },
              text: "If you are running a store, such as a café or a retail store, how about incorporating cryptocurrency as another means of payment? We are about to launch iOS/android app to make cryptocurrency payment more convenient.",
              app: {
                links: [
                  {
                    image: {
                      src: "lp/logos/appstore.svg",
                      alt: "Download on the Appstore",
                      lightSrc: "",
                    },
                    link: "",
                    status: false,
                    title: "Appstore",
                  },
                  {
                    image: {
                      src: "lp/logos/googleplay.svg",
                      alt: "Googleplay",
                      lightSrc: "",
                    },
                    link: "",
                    status: false,
                    title: "Googleplay",
                  },
                ],
                coming: "coming soon…",
                cap: "*In order to start using the Merchant App, you need to issue a one-time login code on SlashApp.",
              },
            },
          ],
        },
        fee: {
          class: "dlp-fee",
          title: {
            title: "Fee & Ecosystem 🔁",
            subtitle: "",
          },
          features: [
            {
              layout: "r",
              title: "Slash Payment fee is 0.2〜0.6%",
              canvas: "SubCanvas2",
              image: {
                src: "lp/fee.jpg",
                alt: "Slash Payment fee is 0.2〜0.6%",
                lightSrc: "",
              },
              text: "There are no commissions charged to the Merchants. The commission is charged to the payers but is only 0.2-0.6% of the payment amount. It is collected along with the gas cost of the  payment transaction.<br><br>The commission is also used to automatically buyback Slash tokens through the ecosystem described in the whitepaper.",
              link: {
                url: "/",
                title: "Fee Structure",
                icon: "icon/arrow",
                iconAfter: true,
              },
            },
            {
              layout: "c",
              title: "Slash automatically donation program",
              image: {
                src: "lp/donated.jpg",
                alt: "Slash automatically donation program",
                lightSrc: "",
              },
              text: "0.1% of the settlement amount charged to the payers apart from commitions. It are automatically sent to the Slash Donation Wallet to be donated to social causes. We question the Old ecosystem in which people need donations. Ideally, we would like to see a world where people who need donations do not exist, a world of peace and prosperity where children can envision a bright future without being caught up in conflicts between countries. In order to contribute as much as possible to this new ideal ecosystem in which people can live their lives, we have incorporated an automated donation system into the Slash Payment. In the future, we will form a community so that people can decide where to donate by voting on slash tokens.",
              logos: [
                {
                  alt: "save-the-children",
                  src: "lp/logos/savethechildren.svg",
                  lightSrc: "lp/logos/savethechildren_l.svg",
                },
                {
                  alt: "unicef",
                  src: "lp/logos/unicef.svg",
                  lightSrc: "",
                },
              ],
              link: {
                url: "/",
                title: "donation program",
                icon: "icon/arrow",
                iconAfter: true,
              },
            },
            {
              layout: "l",
              tag: {
                title: "Phase 2",
                text: "coming soon…",
              },
              title: "The All fees Use <br>buyback $Slash*",
              image: {
                src: "lp/buyback.jpg",
                alt: "The All fees Use buyback $Slash*",
                lightSrc: "",
              },
              text: "The Slash Payment fee is 0.2~0.6% of the settlement amount.<br><br>Except for the 0.1% fee used for donation, the Slash Payment has a completely new ecosystem that automatically buys back Slash Token from DEX for each transaction. Slash Token can also serve as governance for Slash and can be used to vote for donation recipients or be used in a staking pool with a fee discount feature to be launched later.<br><br>*Slash Token will be issued in Phase 2.",
              link: {
                url: "/",
                title: "Details of $Slash",
                icon: "icon/arrow",
                iconAfter: true,
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
              logo: "icon/donate-savethechildren",
              text: "https://donate.savethechildren.org",
              link: {
                title: "Donate Now",
                func: "paymentForDonate_SAFE_THE_CHILDREN",
                icon: "connect",
                status: true,
              },
            },
            {
              title: "Experience it first hand.",
              image: {
                src: "lp/donate-image02.jpg",
                alt: "Experience it first hand.",
                lightSrc: "",
              },
              logo: "icon/donate-unicef",
              text: "https://www.unicef.org/",
              link: {
                title: "Donate Now",
                func: "paymentForDonate_UNICEF",
                icon: "connect",
                status: true,
              },
            },
          ],
        },
        network: {
          class: "dlp-network",
          title: {
            title: 'Connected dapps<br class="sp"> & network 🌎',
            subtitle: "",
          },
          logos: [
            {
              alt: "UNISWAP",
              src: "lp/logos/uniswap.svg",
              lightSrc: "",
            },
            {
              alt: "BINANCE SMART CHAIN",
              src: "lp/logos/binance.svg",
              lightSrc: "",
            },
            {
              alt: "ethereum",
              src: "lp/logos/ethereum.svg",
              // lightSrc: "lp/logos/ethereum_l.svg",
              lightSrc: "",
            },
            {
              alt: "polygonscan",
              src: "lp/logos/polygonscan.svg",
              // lightSrc: "lp/logos/polygonscan_l.svg",
                    lightSrc: "",

            },
            {
              alt: "METAMASK",
              src: "lp/logos/metamask.svg",
              // lightSrc: "lp/logos/metamask_l.svg",
                    lightSrc: "",
            },
            {
              alt: "PancakeSwap",
              src: "lp/logos/pancakeswap.svg",
              // lightSrc: "lp/logos/pancakeswap_l.svg",
                    lightSrc: "",
            },
            {
              alt: "polygon",
              src: "lp/logos/polygon.svg",
              // lightSrc: "lp/logos/polygon_l.svg",
                    lightSrc: "",
            },
            {
              alt: "QUICKSWAP",
              src: "lp/logos/quickswap.svg",
              lightSrc: "",
            },
            {
              alt: "WalletConnect",
              src: "lp/logos/walletconnect.svg",
              lightSrc: "",
            },
            {
              alt: "BscScan",
              src: "lp/logos/bscscan.svg",
              // lightSrc: "lp/logos/bscscan_l.svg",
                    lightSrc: "",
            },
            {
              alt: "etherscan",
              src: "lp/logos/etherscan.svg",
              // lightSrc: "lp/logos/etherscan_l.svg",
                    lightSrc: "",
            },
            {
              alt: "spookeyswap",
              src: "lp/logos/spookeyswap.svg",
              // lightSrc: "lp/logos/spookeyswap_l.svg",
                    lightSrc: "",
            },
            {
              alt: "sushiswap",
              src: "lp/logos/sushiswap.svg",
              // lightSrc: "lp/logos/sushiswap_l.svg",
                    lightSrc: "",
            },
            {
              alt: "ftmscan",
              src: "lp/logos/ftmscan.svg",
              // lightSrc: "lp/logos/ftmscan_l.svg",
                    lightSrc: "",
            },
            {
              alt: "fantom",
              src: "lp/logos/fantom.svg",
              lightSrc: "",
            },
            {
              alt: "avalanche",
              src: "lp/logos/avalanche.svg",
              lightSrc: "",
            },
            {
              alt: "ava_explorer",
              src: "lp/logos/ava_explorer.svg",
              // lightSrc: "lp/logos/ava_explorer_l.svg",
                    lightSrc: "",
            },
            {
              alt: "spritswap",
              src: "lp/logos/spritswap.svg",
              lightSrc: "",
            },
          ],
        },
        roadmap: {
          class: "dlp-roadmap",
          title: {
            title: 'Features <br class="sp">& Rood Map 🗺',
            subtitle: "",
          },
          phases: [
            {
              title: "Phase 1",
              list: [
                {
                  title: "Payment Support",
                  list: [
                    { text: "Ethereum (ETH)", active: true },
                    { text: "BNB Chain (BNB)", active: true },
                    { text: "Polygon (Matic)", active: true },
                    { text: "Avalanche C-Chain (AVAX)", active: true },
                    { text: "Fantom (FTM)", active: false },
                    { text: "Arbitrum One (ETH)", active: false },
                    { text: "Solana (SOL)", active: false },
                  ],
                },
                {
                  title: "DEX Router Support",
                  list: [
                    { text: "Uniswap V2 specification Router", active: true },
                    { text: "Curve.fi Router", active: false },
                    { text: "Uniswap V3 Router", active: false },
                  ],
                },
                {
                  title: "Open Source Plugins",
                  list: [
                    { text: "Woocommerce", active: true },
                    { text: "Wellcart", active: true },
                    { text: "EC CUBE", active: true },
                    { text: "Magento", active: false },
                    { text: "OpenCart", active: false },
                    { text: "Drupal", active: false },
                    { text: "ZenCart", active: false },
                  ],
                },
                {
                  title: "Requests to EC Platforms",
                  list: [
                    { text: "Shopify", active: false },
                    { text: "Wix", active: false },
                    { text: "BASE", active: false },
                    { text: "STORES", active: false },
                  ],
                },
                {
                  title: "Our DApps／Apps",
                  list: [
                    { text: "Store Merchant App (iOS／Android)", active: false },
                    { text: "Article Publishing Platforms (Web DApps)", active: false },
                  ],
                },
                {
                },
              ],
            },
            {
              title: "Phase 2",
              list: [
                {
                  title: "Slash TOKEN",
                  list: [
                    { text: "Token Issuance", active: false },
                    { text: "Launchpad", active: false },
                    { text: "DEX Listing", active: false },
                    { text: "Coin Market Cap Listing", active: false },
                    { text: "CoinGecko Listing", active: false },
                    { text: "CEX Listing", active: false },
                  ],
                },
                {
                  title: "Our DApps／Apps",
                  list: [
                    { text: "Staking pool (DApps)", active: false },
                    { text: "Discount Buy Staking Pool (DApps)", active: false },
                    { text: "Referral feature (DApps)", active: false },
                  ],
                },
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
            title: "Welcome",
            subtitle: "Slash Developers💻",
          },
          list: [
            {
              title: "Slash Payment Docs",
              icon: "icon/gitbook",
              url: "",
              status: true,
              blank: true,
            },
            {
              title: "Slash Payment github",
              icon: "icon/github",
              url: "",
              status: true,
              blank: true,
            },
            {
              title: "Slash Recruit information",
              icon: "icon/recruit",
              url: "",
              status: true,
              blank: true,
            },
            {
              title: "Media kit",
              icon: "icon/mediakit",
              url: "/media_kit",
              status: true,
              blank: false,
            },
            {
              title: "Support for Slash Payment System",
              icon: "icon/telegram",
              url: "",
              status: false,
              blank: true,
            },
            {
              title: "Slash Developer Community",
              icon: "icon/discord",
              url: "",
              status: false,
              blank: true,
            },
            {
              title: "FAQ about system implementation",
              icon: "icon/help",
              url: "",
              status: false,
              blank: true,
            },
          ],
        },
        cv: {
          class: "dlp-cv",
          title: {
            title: "Install on your online service now!⚡",
            subtitle: "",
          },
          link: {
            title: "Enter App",
            icon: "",
            url: "",
            func: "enterApp",
            status: true,
          },
          list: [
            {
              title: "Contact Email",
              icon: "icon/arroba",
              url: "",
              status: true,
            },
            {
              title: "Twitter for DM",
              icon: "icon/twitter",
              url: "",
              status: true,
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
      hash: this.$route.hash,
    };
  },
  components: {
    LpHeader,
    LpFooter,
    LpAnimation,
    LpButton,
    LpTitle,
    LpImage,
    LpIcon,
    LpImageText,
  },
  mounted() {
    document.body.classList.add("is-mounted");
    this.winH = window.innerHeight;
    const scrollActions = document.querySelectorAll(".canvasItem");
    for (let i = 0; i < scrollActions.length; i++) {
      let itemId = scrollActions[i].id;
      this.canvasItems[itemId] = {
        t: scrollActions[i].getBoundingClientRect().top,
        h: scrollActions[i].clientHeight,
        b:
          scrollActions[i].getBoundingClientRect().top +
          scrollActions[i].clientHeight,
      };
    }
  },

  created() {
    // window.addEventListener("scroll", this.scrollAction);
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("load", this.onLoad);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("load", this.onLoad);
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
    // enterApp() {
    // Button.vueに記述
    //   this.$store.dispatch("changeTheme", "dark");
    // },
    scrollAction() {
      const scrollActions = document.querySelectorAll(".scrollAction");
      const windowHeight = this.winH;
      for (let i = 0; i < scrollActions.length; i++) {
        const elTop = scrollActions[i].getBoundingClientRect().top;
        // const elVisible = 150;
        if (elTop < windowHeight - windowHeight * 0.2) {
          scrollActions[i].classList.add("active");
        } else {
          scrollActions[i].classList.remove("active");
        }
      }
    },
    onScroll() {
      this.scrollAction();
      this.scrollY = window.scrollY;
      this.currentWindow.t = this.scrollY;
      this.currentWindow.b = this.scrollY + this.winH;
      for (let index in this.canvasItems) {
        let thisComponent = document.getElementById(index);
        let thisComponentTop = thisComponent.getBoundingClientRect().top;
        let thisComponentBottom =
          thisComponent.getBoundingClientRect().top +
          thisComponent.clientHeight;
        if (thisComponentTop < this.winH && thisComponentBottom > 0) {
          thisComponent.classList.add("active");
        } else {
          thisComponent.classList.remove("active");
        }
      }
    },
    onResize() {
      this.height = document.documentElement.clientHeight;
    },
    onLoad() {
      this.onScroll();
      this.onResize();
    }
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/delaunay.scss";
</style>

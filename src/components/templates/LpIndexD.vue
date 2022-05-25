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
        <LpAnimation :canvasClass="section.network.class" type="SubCanvas4" />
        <div class="section__wrap">
          <LpTitle
            :class="section.network.class + '__title'"
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
                        <span>
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
        <LpAnimation :canvasClass="section.cv.class" type="SubCanvas3" />
        <div class="section__wrap">
          <LpTitle
            :class="section.cv.class + '__title'"
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
            subtitle: "Web 3.0 ",
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
              lightSrc: "lp/logos/ethereum_l.svg",
            },
            {
              alt: "polygonscan",
              src: "lp/logos/polygonscan.svg",
              lightSrc: "lp/logos/polygonscan_l.svg",
            },
            {
              alt: "METAMASK",
              src: "lp/logos/metamask.svg",
              lightSrc: "lp/logos/metamask_l.svg",
            },
            {
              alt: "PancakeSwap",
              src: "lp/logos/pancakeswap.svg",
              lightSrc: "lp/logos/pancakeswap_l.svg",
            },
            {
              alt: "polygon",
              src: "lp/logos/polygon.svg",
              lightSrc: "lp/logos/polygon_l.svg",
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
              lightSrc: "lp/logos/bscscan_l.svg",
            },
            {
              alt: "etherscan",
              src: "lp/logos/etherscan.svg",
              lightSrc: "lp/logos/etherscan_l.svg",
            },
            {
              alt: "spookeyswap",
              src: "lp/logos/spookeyswap.svg",
              lightSrc: "lp/logos/spookeyswap_l.svg",
            },
            {
              alt: "sushiswap",
              src: "lp/logos/sushiswap.svg",
              lightSrc: "lp/logos/sushiswap_l.svg",
            },
            {
              alt: "ftmscan",
              src: "lp/logos/ftmscan.svg",
              lightSrc: "lp/logos/ftmscan_l.svg",
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
              lightSrc: "lp/logos/ava_explorer_l.svg",
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
              ],
            },
            {
              title: "Phase 2",
              list: [
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
                  title: "Integration Requirements",
                  list: [{ text: "Shopify" }, { text: "Wix" }],
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
              blank: true
            },
            {
              title: "Slash Payment github",
              icon: "icon/github",
              url: "",
              status: true,
              blank: true
            },
            {
              title: "Slash Recruit information",
              icon: "icon/recruit",
              url: "",
              status: true,
              blank: true
            },
            {
              title: "Media kit",
              icon: "icon/mediakit",
              url: "/media_kit",
              status: true,
              blank: false
            },
            {
              title: "Support for Slash Payment System",
              icon: "icon/telegram",
              url: "",
              status: false,
              blank: true
            },
            {
              title: "Slash Developer Community",
              icon: "icon/discord",
              url: "",
              status: false,
              blank: true
            },
            {
              title: "FAQ about system implementation",
              icon: "icon/help",
              url: "",
              status: false,
              blank: true
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
      for (let i = 0; i < scrollActions.length; i++) {
        const windowHeight = window.innerHeight;
        const elTop = scrollActions[i].getBoundingClientRect().top;
        // const elVisible = 150;
        if (elTop < windowHeight - windowHeight * 0.2) {
          scrollActions[i].classList.add("active");
        } else {
          scrollActions[i].classList.remove("active");
        }
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.scrollAction);
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
  &.op {
    opacity: 0;
    transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
      visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    &::v-deep {
      opacity: 0;
      transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms,
        visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    }
    &.active {
      opacity: 1;
      &::v-deep {
        opacity: 1;
      }
    }
  }
  &.textMove {
    // opacity: 0;
    transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
    span {
      transform: translate(0, 105%);
      transition: transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1) 800ms;
      &:nth-child(2) {
        transition-delay: 920ms;
      }
      &:nth-child(3) {
        transition-delay: 1040ms;
      }
      @include media(sp) {
        transition: transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1) 0ms;
        &:nth-child(2) {
          transition-delay: 120ms;
        }
        &:nth-child(3) {
          transition-delay: 240ms;
        }
      }
    }
    &::v-deep {
      transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      span {
        transform: translate(0, 105%);
        transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 500ms;
        &:nth-child(2) {
          transition-delay: 120ms;
        }
        &:nth-child(3) {
          transition-delay: 240ms;
        }
      }
    }
    &.active {
      // opacity: 1;
      span {
        transform: translate(0, 0);
      }
      &::v-deep {
        span {
          transform: translate(0, 0);
        }
      }
    }
  }
  &.capcha {
    figure {
      opacity: 0;
      transition: opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1) 600ms;
      &:nth-child(2) {
        transition-delay: 800ms;
      }
      &:nth-child(3) {
        transition-delay: 1000ms;
      }
      @include media(sp) {
        transition: opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
        &:nth-child(2) {
          transition-delay: 200ms;
        }
        &:nth-child(3) {
          transition-delay: 400ms;
        }
      }
    }
    &.active {
      figure {
        opacity: 1;
      }
    }
  }
  &.listMove {
    li {
      opacity: 0;
      transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      @for $i from 1 through 20 {
        &:nth-child($i) {
          transition-delay: 120ms * $i;
        }
      }
    }
    &.active {
      li {
        opacity: 1;
      }
    }
  }
}
body.is-mounted {
  .dlp {
    &-mv {
      &__title {
        opacity: 1;
      }
    }
  }
}
.dlp {
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
    }
    &__title {
      position: absolute;
      z-index: 10;
      opacity: 0;
      transition: opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1) 400ms,
        visibility 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      transform: translate(-50%, -50%);
      @include media(sp) {
        width: 80%;
      }
    }
    &__icon {
      width: rem(6);
      margin-left: auto;
      margin-right: auto;
      margin-bottom: rem(1);
      @include media(sp) {
        width: rem_sp(4);
        margin-bottom: rem_sp(1);
      }
    }
    &__h1 {
      text-align: center;
      margin-bottom: rem(3);
      @include media(sp) {
        margin-bottom: rem_sp(2);
      }
      &__title {
        @include font(rem(4.6), 500, 0.02em, 1.2, $ff);
        display: block;
        @include media(sp) {
          font-size: rem_sp(4);
        }
      }
      &__subtitle {
        @include font(rem(1.8), 500, $ls, 1, $ff);
        display: block;
        @include media(sp) {
          @include font(rem_sp(1.8), 500, 0.02em, 1.2, $ff);
        }
      }
    }
    &__lead {
      margin-bottom: rem(2);
      text-align: center;
      white-space: nowrap;
      @include font(rem(1), $fw, $ls, $lh, $ff);
      @include media(sp) {
        font-size: rem_sp(1);
        white-space: normal;
        br {
          display: none;
        }
      }
    }
    &__button {
      @include flex(center, center);
      flex-wrap: nowrap;
      @include media(sp) {
        flex-direction: column;
        &::v-deep {
          .lpButton.m {
            width: 100%;
          }
        }
      }
    }
  }
  &-hello {
    position: relative;
    @include rem_padding(8, 0, 8, 0);
    @include media(sp) {
      padding-top: rem_sp(2);
      padding-bottom: rem_sp(8);
    }
    &__wrap {
      @include flex(flex-start, center);
      @include media(sp) {
        display: block;
      }
    }
    &__textwrap {
      width: 65%;
      @include media(sp) {
        width: 100%;
      }
    }
    &__h2 {
      position: relative;
      z-index: 10;
      margin-bottom: rem(2);
      @include media(sp) {
        text-align: center;
        margin-bottom: rem_sp(2);
      }
      * {
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
      }

      &__title {
        @include font(rem(8), 700, 0em, 1.2, $ff);
        display: block;
        @include media(tb) {
          font-size: rem_tb(6);
        }
        @include media(sp) {
          font-size: rem_sp(6);
          text-align: center;
        }
      }
      &__subtitle {
        display: block;
        @include media(sp) {
          text-align: center;
          margin-bottom: rem_sp(0.5);
        }
        span {
          @include font(rem(6), 700, 0em, 1.2, $ff);
          display: inline-block;
          vertical-align: middle;
          @include media(tb) {
            font-size: rem_tb(4);
          }
          @include media(sp) {
            font-size: rem_sp(3.5);
          }
        }
        img {
          display: inline-block;
          vertical-align: middle;
          width: rem(6);
          @include media(tb) {
            font-size: rem_tb(4);
          }
          @include media(sp) {
            width: rem_sp(3.5);
          }
        }
      }
      &__text {
        @include font(rem(4), 700, 0em, 1.5, $ff);
        display: block;
        @include media(tb) {
          font-size: rem_tb(3);
        }
        @include media(sp) {
          @include font(rem_sp(2), 700, 0em, 1.2, $ff);
        }
      }
    }
    &__lead {
      position: relative;
      z-index: 10;
      @include font(rem(pow(1)), $fw, $ls, 1.75, $ff);
      @include media(sp) {
        font-size: rem_sp(pow(0));
        span br {
          display: none !important;
        }
      }
    }
    &__imagewrap {
      width: 35%;
      position: relative;
      @include media(sp) {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-top: rem_sp(4);
      }
    }
    &__image {
      width: 75%;
      box-shadow: var(--color_shadow);
      margin-top: 10%;
      margin-left: -20%;
      border-radius: 8px;
      overflow: hidden;
      @include media(sp) {
        margin-left: auto;
        margin-right: 0;
        margin-top: 0;
      }
      &.r {
        margin-top: 10%;
        margin-left: -20%;
        position: absolute;

        top: 50%;
        left: 50%;
        transform-origin: center center;
        transform: translate(-50%, -50%);
        margin-top: -10%;
        margin-left: 20%;
        @include media(sp) {
          margin-left: -10%;
          margin-top: 10%;
        }
      }
    }
  }
  &-token {
    @include rem_padding(6, 0, 6, 0);
    position: relative;
    @include media(sp) {
      padding-top: rem_sp(2);
      padding-bottom: rem_sp(2);
    }
    &__iconlist {
      @include flex(center, flex-start);
      @include list(6, rem(2));
      margin-bottom: rem(5);
      margin-left: auto;
      margin-right: auto;
      max-width: 800px;
      @include media(sp) {
        @include list(3, rem_sp(2));
        margin-bottom: rem_sp(2);
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }
      li {
        @include media(sp) {
          margin-bottom: rem_sp(1);
        }
      }
    }
    &__subbox {
      margin-bottom: rem(6);
      max-width: rem(50);
      margin-left: auto;
      margin-right: auto;
      border-top: rem(0.3) solid var(--color_darken);
      padding-top: rem(3);
      @include media(sp) {
        margin-bottom: rem_sp(2);
        padding-top: rem_sp(3);
      }
      &__title {
        text-align: center;
        @include font(rem(2), 700, 0em, 1.5, $ff);
        display: block;
        margin-bottom: rem(1);
        @include media(sp) {
          font-size: rem_sp(1.5);
          margin-bottom: rem_sp(1);
        }
      }
      &__text {
        @include font(rem(1), $fw, $ls, $lh, $ff);
        margin-bottom: rem(1);
        @include media(sp) {
          font-size: rem_sp(1);
          margin-bottom: rem_sp(1);
        }
      }
      &__link {
        @include flex(center, center);
      }
    }
    &__card {
      @include flex(flex-start, stretch);
      @include list(3, rem(0.5));

      @include media(tb) {
        @include list(1, rem_tb(0.5));
      }
      & > li {
        @include media(tb) {
          margin-bottom: rem_tb(2);
        }
      }
      &__list {
        height: 100%;
        background-color: var(--color_lp_box);
        @include rem_padding(2, 2, 2, 2);
        border-radius: rem(1);
        display: flex;
        flex-direction: column;
        @include media(tb) {
          display: block;
        }
      }
      &__title {
        flex: 1;
        height: 100%;
        min-height: 0%;
        @include font(rem(1.5), 700, 0em, 1.5, $ff);
        display: block;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: rem(1);
        @include media(tb) {
          font-size: rem_sp(1.5);
          flex: auto;
          height: auto;
          min-height: initial;
        }
      }
      &__iconlist {
        flex: 2;
        height: 100%;
        min-height: 0%;
        @include flex(center, center);
        @include list(3, rem(2));
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: rem(1);
        @include media(tb) {
          flex: auto;
          height: auto;
          min-height: initial;
          @include list(6, rem_tb(2));
        }
        @include media(sp) {
          @include list(3, rem_sp(2));
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
        li {
          margin-bottom: rem(1);
          @include media(tb) {
            max-width: 200px;
          }
        }
      }
      &__text {
        flex: 1;
        height: 100%;
        min-height: 0%;
        overflow-wrap: break-word;
        @include font(rem(0.9), $fw, $ls, $lh, $ff);
        @include media(tb) {
          font-size: rem_sp(1);
          flex: auto;
          height: auto;
          min-height: initial;
        }
      }
    }
  }
  &-install {
    @include rem_padding(6, 0, 6, 0);
    @include media(sp) {
      padding-top: rem_sp(2);
      padding-bottom: rem_sp(0);
    }
    &__feature {
      li {
        &:nth-child(3) {
          &::v-deep {
            .textimgwrap__image {
              background-color: var(--color_lp_box);
            }
          }
        }
      }
    }
  }
  &-fee {
    @include rem_padding(6, 0, 6, 0);
    @include media(sp) {
      padding-top: rem_sp(0);
      padding-bottom: rem_sp(0);
    }
  }
  &-trial {
    @include rem_padding(6, 0, 6, 0);
    @include media(sp) {
      padding-top: rem_sp(0);
      padding-bottom: rem_sp(0);
    }
    &__feature {
      @include media(sp) {
        width: 86%;
        margin-left: auto;
        margin-right: auto;
      }
      .scrollAction {
        &.active {
          [class$="__textwrap"] {
            transition: transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)
                300ms,
              opacity 600ms cubic-bezier(0.25, 0.1, 0.25, 1) 300ms;
            opacity: 1;
            transform: perspective(500px) rotateY(12deg);
            @include media(sp) {
              transform: perspective(500px) rotateY(0deg);
            }
            * {
              opacity: 1;
            }
          }
          [class$="__imagewrap"] {
            transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 600ms;
            opacity: 1;
          }
          &:nth-child(2n) {
            [class$="__textwrap"] {
              transform: perspective(500px) rotateY(-12deg);
              @include media(sp) {
                transform: perspective(500px) rotateY(0deg);
              }
            }
          }
        }
      }
      & > li {
        position: relative;
        padding: rem(6) 0;
        & + li {
          margin-top: rem(4);
          @include media(sp) {
            margin-top: rem_sp(2);
          }
        }
        &:nth-child(2n) {
          [class$="list"] {
            flex-direction: row;
          }
          [class$="__trapezoid"] {
            transform-origin: center center;
            transform: translate3d(0%, 0%, 0) rotate(180deg) scale(1, 1);
            left: auto;
            right: 0;
          }
          [class$="__textwrap"] {
            transform: perspective(500px) rotateY(-30deg);
          }
        }

        @include media(sp) {
          padding: rem(0) 0;
        }
      }
      &__list {
        position: relative;
        @include flex(flex-start, center);
        flex-wrap: nowrap;
        flex-direction: row-reverse;
        @extend .section__wrap;
        z-index: 10;
        transform-style: preserve-3d;
        @include media(sp) {
          display: block;
        }
      }

      &__imagewrap {
        flex: 1;
        position: relative;
        z-index: 100;
        opacity: 0;
        will-change: opacity;
        transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 600ms;
        @include media(sp) {
          width: 100%;
          flex: auto;
        }
        &::v-deep {
          img {
            box-shadow: 0px 0px 20px 6px rgba(#000, 0.1);
          }
        }
      }
      &__logo {
        width: 70%;
        margin: rem(2) auto rem(1);
        @include media(sp) {
          width: 75%;
          margin: rem_sp(1) auto;
        }
        &::v-deep {
          svg {
            fill: var(--color_font);
            fill: #fff;
          }
        }
      }
      &__textwrap {
        flex: 1;
        padding: rem(4);
        position: relative;
        transform-origin: center center;
        transform: perspective(500px) rotateY(30deg);
        opacity: 0;
        will-change: opacity, transform;
        transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0ms,
          opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms;
        @include media(sp) {
          padding: rem_sp(2);
        }
        * {
          opacity: 0;
          transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) 800ms;
        }
        &::before {
          content: "";
          display: block;
          width: 150%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          background: linear-gradient(
            90.25deg,
            rgba(#3eb9fc, 1) 5.43%,
            rgba(#6a68ed, 0.7) 59.32%,
            rgba(#8b2ae1, 0.4) 98.19%
          );
          transform-origin: center center;
          transform: translate(-50%, 0%);
          @include media(sp) {
            width: 100%;
          }
        }
        * {
          position: relative;
          z-index: 10;
        }
        &::v-deep {
          text-align: center;
          .title {
            @include font(rem(pow(2)), 700, $ls, $lh, $en_go);
            color: #fff;
            @include media(sp) {
              font-size: rem_sp(pow(1));
              margin-bottom: rem_sp(0.5);
            }
          }
          .text {
            @include font(rem(pow(0)), $fw, $ls, $lh, $en_go);
            color: #fff;
            @include media(sp) {
              font-size: rem_sp(pow(0));
            }
          }

          .link {
            margin-top: rem(2);
            @include media(sp) {
              margin-top: rem_sp(2);
              * {
                margin: 0;
              }
            }
            .lpButton.m .icon {
              width: rem(4);
            }
          }
        }
      }
    }
  }
  &-network {
    position: relative;
    .section__wrap {
      position: relative;
      z-index: 10;
      @include rem_padding(6, 0, 6, 0);
      @include media(sp) {
        padding-top: rem_sp(4);
        padding-bottom: rem_sp(4);
      }
    }

    &__canvas {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      &::v-deep {
        div {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          canvas {
            position: absolute;
            top: 50%;
            left: 0;
            transform-origin: center center;
            transform: translate(0%, -50%);
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    &__logos {
      white-space: nowrap;
      @include flex(flex-start, center);
      @include list(4, rem(3));
      @include media(sp) {
        @include list(2, rem_sp(1));
      }

      li {
        margin-bottom: rem(2);
        @include media(sp) {
          margin-bottom: rem_sp(1);
        }
      }
    }
  }
  &-roadmap {
    @include rem_padding(6, 0, 6, 0);
    @include media(sp) {
      padding-top: rem_sp(3);
      padding-bottom: rem_sp(3);
    }
    &__phase {
      &__box {
        @include flex(flex-start, stretch);
        margin-bottom: rem(4);
        background-color: var(--color_darken);
        overflow: hidden;
        @include media(sp) {
          display: block;
          margin-bottom: rem_sp(2);
        }
      }
      &__title {
        flex: 1;
        @include font(rem(pow(3)), 700, $ls, $lh, $en_go);
        background: $gradation-light;
        color: #fff;
        @include flex(center, center);
        @include media(sp) {
          font-size: rem_sp(1.5);
          padding: rem_sp(1);
        }
      }

      &__list {
        flex: 3;
        @include flex(center, stretch);
        @include list(2, 0);
        @include media(sp) {
          width: 100%;
          @include list(1, rem_sp(2));
        }
        & > li {
          padding: rem(2);
          position: relative;
          @include media(sp) {
            padding: rem_sp(2);
          }
          &:nth-child(n + 3) {
            &::after {
              content: "";
              display: block;
              height: 1px;
              width: 90%;
              background-color: var(--color_update);
              position: absolute;
              top: 0%;
              left: 50%;
              transform-origin: center center;
              transform: translate(-50%, 0%);
            }
          }
          &:nth-child(2n) {
            &::before {
              content: "";
              display: block;
              width: 1px;
              height: 80%;
              background-color: var(--color_update);
              position: absolute;
              top: 50%;
              left: 0;
              transform-origin: center center;
              transform: translate(0%, -50%);
            }
          }
          &:nth-child(n + 2) {
            @include media(sp) {
              &::after {
                content: "";
                display: block;
                height: 1px;
                width: 80%;
                background-color: var(--color_update);
                position: absolute;
                top: 0%;
                left: 50%;
                transform-origin: center center;
                transform: translate(-50%, 0%);
              }
            }
          }
        }
      }
      &__listwrap {
        @include flex(center, center);
        flex-direction: column;
      }
      &__subtitle {
        @include font(rem(pow(1)), 700, $ls, 1, $en_go);
        text-align: center;
        margin-bottom: rem(1);
        @include media(sp) {
          font-size: rem_sp(pow(1));
          margin-bottom: rem_sp(1);
        }
      }
      &__sublist {
        li {
          @include font(rem(pow(0)), 400, $ls, 2, $en_go);
          span {
            display: inline-block;
            padding-left: rem(2);
            position: relative;
            &:before {
              content: "";
              width: rem(1);
              height: rem(1);
              display: block;
              position: absolute;
              top: 50%;
              left: 0;
              background: $gradation-light;
              transform-origin: center center;
              transform: translate3d(0%, -50%, 0) rotate(0deg) scale(1, 1);
              border-radius: 100%;
            }
          }
        }
      }
    }
  }
  &-welcome {
    @include rem_padding(6, 0, 6, 0);
    background-color: var(--color_bg_parts);
    @include media(sp) {
      padding-top: rem_sp(3);
      padding-bottom: rem_sp(3);
    }
    &__list {
      @include flex(center, flex-start);
      li {
        @include media(sp) {
          width: 100%;
        }
        &::v-deep {
          .lpButton.s {
            @include media(sp) {
              margin-left: 0;
              margin-right: 0;
            }
          }
        }
      }
    }
  }

  &-cv {
    @include rem_padding(4, 0, 5, 0);
    position: relative;
    @include media(sp) {
      padding-top: rem_sp(6);
      padding-bottom: rem_sp(6);
    }
    .section__wrap {
      position: relative;
      z-index: 10;
    }
    &__wrap {
      @include flex(flex-start, stretch);
      @include media(sp) {
        flex-direction: column;
      }
    }
    &__canvas {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      &::v-deep {
        div {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          canvas {
            position: absolute;
            top: 50%;
            left: 0;
            transform-origin: center center;
            transform: translate(0%, -50%);
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    &__textwrap {
      background: var(--color_lp_box);
      border-radius: 10px;
      height: 100%;
      @include rem_padding(3, 4, 3, 4);
      // max-width: 600px;
      text-align: center;
      // margin: rem(2) auto;
      margin: auto rem(2);
      flex: 1;
      @include media(sp) {
        margin: 0;
        margin-bottom: rem_sp(2);
      }
      .lpButton.m {
        margin: 0;
        @include media(sp) {
        }
      }
    }
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      @include flex(center, center);
      margin-bottom: rem(1);
      @include media(sp) {
        margin-bottom: rem_sp(0);
      }
      img {
        width: rem(3);
        margin-right: rem(1);
      }
      h4 {
        @include font(rem(pow(4)), 600, $ls, $lh, $en_go);
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &__list {
      flex: 1;
      margin: auto rem(2);
      &::v-deep {
        .lpButton.m {
          margin: 0;
          @include media(sp) {
          }
        }
      }
      @include media(sp) {
        margin: 0;
        &::v-deep {
          .lpButton.main {
            margin: 0;
            margin-bottom: rem_sp(1);
          }
        }
      }
    }
  }
}
</style>

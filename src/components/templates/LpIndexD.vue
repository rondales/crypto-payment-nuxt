<template>
  <div id="wrapAll">
    <!-- [TODO] レスポンシブ -->
    <!-- [TODO] whiteの時のチェック -->
    <!-- [TODO] scroll action -->
    <!-- [TODO] 日本語のチェック -->
    <LpHeader />
    <main>
      <!-- SECTION MV -->
      <section :class="section.mv.class + ' scrollAction'">
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
          <div :class="section.hello.class + '__textwrap'">
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
          </div>
          <div :class="section.hello.class + '__imagewrap'">
            <figure :class="section.hello.class + '__image'">
              <img src="@/assets/images/lp/capcha-1.png" />
            </figure>
            <figure :class="section.hello.class + '__image r'">
              <img src="@/assets/images/lp/capcha-2.png" />
            </figure>
          </div>
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
              :class="feature.layout"
            >
              <div :class="section.install.class + '__feature__list'">
                <LpAnimation
                  v-if="feature.canvas"
                  :canvasClass="section.install.class + '__feature'"
                  type="SubCanvas1"
                />
                <LpImage
                  v-if="!feature.canvas"
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
            <li
              v-for="feature in section.fee.features"
              :key="feature.title"
              :class="feature.layout"
            >
              <div :class="section.fee.class + '__feature__list'">
                <LpAnimation
                  v-if="feature.canvas"
                  :canvasClass="section.fee.class + '__feature'"
                  type="SubCanvas2"
                />
                <LpImage
                  v-if="!feature.canvas"
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
                  :class="section.trial.class + '__feature__logo'"
                  :src="require('@/assets/images/' + list.logo)"
                  :alt="list.title"
                />
                <div :class="section.trial.class + '__feature__textwrap'">
                  <h3 class="title"><span v-html="list.title"></span></h3>
                  <p class="text"><span v-html="list.text"></span></p>
                  <div v-if="list.link" class="link">
                    <LpButton :link="list.link" type="main" size="m" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION network -->
      <section :class="section.network.class">
        <LpAnimation :canvasClass="section.network.class" type="SubCanvas4" />
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
                        {{ li.text }}
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
      <section :class="section.welcome.class">
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
                size="l"
              />
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
              <LpButton :link="list" type="main" size="l" />
            </li>
          </ul>
        </div>
      </section>

      <!-- SECTION CV -->
      <section :class="section.cv.class">
        <LpAnimation :canvasClass="section.cv.class" type="SubCanvas3" />
        <div class="section__wrap">
          <LpTitle
            :class="section.cv.class + '__title'"
            :title="section.cv.title"
          />
          <div :class="section.cv.class + '__textwrap'">
            <div :class="section.cv.class + '__logo'">
              <img src="@/assets/images/logo-icon.svg" alt="Slash payment" />
              <h4>Slash.fi</h4>
            </div>
            <LpButton :link="section.cv.link" type="main" size="m" />
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
// import LpIcon from "@/components/templates/LpParts/Icon";
import LpButton from "@/components/templates/LpParts/Button";
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
          link: {
            url: "/",
            title: "Enter App",
            // icon: "pointing-up",
            func: "enterApp()",
          },
          link2: {
            url: "/",
            title: "Slash docs.",
            icon: "gitbook",
          },
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
            link: {
              url: "/",
              title: "Slash Payment Install Docs.",
              icon: "arrow",
              iconAfter: true,
            },
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
              layout: "r",
              title:
                "Slash makes it extremely easy and safe to introduce cryptocurrency payments.",
              image: {
                src: "lp/install-image.jpg",
                alt: "Slash makes it extremely easy and safe to introduce cryptocurrency payments.",
                lightSrc: "",
              },
              text: "To become a merchant, simply click ［Enter App］and connect your Web3 wallet. There is no screening process. From that day on, your store or service will be able to accept cryptocurrency payments. Also, the payment will be delivered to your Web3 Wallet at that very moment.",
              link: {
                url: "/",
                title: "Slash Payment Install Docs.",
                icon: "arrow",
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
                icon: "arrow",
                iconAfter: true,
              },
            },
            {
              layout: "c",
              title:
                'The best way for Accepting Web3<br class="sp"> Wallet Payments at Physical Stores',
              image: {
                src: "lp/physical.jpg",
                alt: "The best way for Accepting Web3 Wallet Payments at Physical Stores",
                lightSrc: "lp/physical-l.jpg",
              },
              text: "If you are running a store, such as a café or a retail store, how about incorporating cryptocurrency as another means of payment? We are about to launch iOS/android app to make cryptocurrency payment more convenient.",
              app: {
                links: [
                  {
                    image: "appStore",
                    link: "",
                    status: false,
                    title: "",
                  },
                  {
                    image: "googlePlay",
                    link: "",
                    status: false,
                    title: "",
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
            title: "Fee & Ecosystem",
            subtitle: "",
          },
          features: [
            {
              layout: "l",
              title: "Slash Payment fee is 0.2〜0.6%",
              canvas: "SubCanvas2",
              image: {
                src: "lp/fee.jpg",
                alt: "Slash Payment fee is 0.2〜0.6%",
                lightSrc: "",
              },
              text: "There are no commissions paid to Merchants. The commission is 0.2-0.6% of the payment amount and is collected as a platform token along with the gas cost of the customer’s payment transaction.<br><br>The commission is also used to automatically buyback Slash tokens through the ecosystem described in the whitepaper. A portion of the fees will also go towards the Slash donation program, where the recipients of the donation will be determined by a vote.",
              link: {
                url: "/",
                title: "Fee Structure",
                icon: "arrow",
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
              text: "0.1% of all Slash Payment fees are automatically sent to the Slash Donation Wallet to be donated to social causes. We question the Old ecosystem in which people need donations. Ideally, we would like to see a world where people who need donations do not exist, a world of peace and prosperity where children can envision a bright future without being caught up in conflicts between countries. In order to contribute as much as possible to this new ideal ecosystem in which people can live their lives, we have incorporated an automated donation system into the Slash Payment. In the future, we will form a community so that people can decide where to donate by voting on slash tokens.",
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
                icon: "arrow",
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
              text: " The Slash Payment fee is 0.2~0.6% of the settlement amount and is collected as a gas fee in platform tokens (ETH, BNB, Matic….).<br><br>Except for the 0.1% fee used for donation, the Slash Payment has a completely new ecosystem that automatically buys back Slash Token from DEX for each transaction. Slash Token can also serve as governance for Slash and can be used to vote for donation recipients or be used in a staking pool with a fee discount feature to be launched later.<br><br>*Slash Token will be issued in Phase 2.",
              link: {
                url: "/",
                title: "Details of $Slash",
                icon: "arrow",
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
              logo: "lp/donate01.svg",
              text: "https://donate.savethechildren.org",
              link: {
                title: "Donate Now",
                func: "testfunc",
                // func: "paymentForDonate(SAFE_THE_CHILDREN)",
                // icon: "connect",
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
              logo: "lp/donate02.svg",
              text: "https://www.unicef.org/",
              link: {
                title: "Donate Now",
                func: "paymentForDonate(UNICEF)",
                // icon: "connect",
                status: true,
              },
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
            title: "Welcome⚡",
            subtitle: "Slash Developers💻",
          },
          list: [
            {
              title: "Slash Payment Docs.",
              icon: "gitbook",
              url: "",
              status: true,
            },
            {
              title: "Slash Payment github",
              icon: "github",
              url: "",
              status: true,
            },
            {
              title: "Slash Recruit information",
              icon: "recruit",
              url: "",
              status: true,
            },
            {
              title: "Media kit",
              icon: "mediakit",
              url: "",
              status: false,
            },
            {
              title: "Support for Slash Payment System",
              icon: "telegram",
              url: "",
              status: false,
            },
            {
              title: "Slash Developer Community",
              icon: "discord",
              url: "",
              status: false,
            },
            {
              title: "FAQ about system implementation",
              icon: "help",
              url: "",
              status: false,
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
              url: "",
              status: true,
            },
            {
              title: "Twitter for DM",
              icon: "twitter",
              url: "",
              status: true,
            },
          ],
        },
        cv: {
          class: "dlp-cv",
          title: {
            title: "Install on your online service now!",
            subtitle: "",
          },
          link: {
            title: "Enter App",
            icon: "",
            url: "",
            func: "enterApp()",
            status: true,
          },
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
    LpButton,
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
      top: 50%;
      left: 50%;
      transform-origin: center center;
      transform: translate(-50%, -50%);
    }
    &__icon {
      width: rem(6);
      margin-left: auto;
      margin-right: auto;
      margin-bottom: rem(1);
    }
    &__h1 {
      text-align: center;
      margin-bottom: rem(3);
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
    @include rem_padding(8, 0, 8, 0);
    .section__wrap {
      @include flex(flex-start, center);
    }
    &__textwrap {
      width: 65%;
    }
    &__h2 {
      position: relative;
      z-index: 10;
      margin-bottom: rem(2);
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
      @include font(rem(pow(1)), $fw, $ls, 1.75, $ff);
    }
    &__imagewrap {
      width: 35%;
      position: relative;
    }
    &__image {
      position: absolute;
      width: 75%;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      transform: translate(-50%, -50%);
      margin-top: -10%;
      margin-left: 20%;
      box-shadow: var(--color_shadow);
      &.r {
        margin-top: 10%;
        margin-left: -20%;
      }
    }
  }
  &-token {
    @include rem_padding(6, 0, 6, 0);
    position: relative;
    .section__wrap {
      position: relative;
      z-index: 10;
    }
    &__canvas {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
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
      &__list {
        height: 100%;
        background-color: var(--color_lp_box);
        @include rem_padding(2, 2, 2, 2);
        border-radius: rem(1);
        display: flex;
        flex-direction: column;
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
        li {
          // width: rem(3);
          margin-bottom: rem(1);
        }
      }
      &__text {
        flex: 1;
        height: 100%;
        min-height: 0%;
        overflow-wrap: break-word;
        @include font(rem(0.9), $fw, $ls, $lh, $ff);
      }
    }
  }
  &-install {
    @include rem_padding(6, 0, 6, 0);
    &__feature {
      li {
        &.r {
          [class$="__image"] {
            order: 2;
          }
        }

        &.c {
          [class$="__list"] {
            grid-template-columns: repeat(1, 1fr);
          }
          [class$="__textwrap"] {
            grid-column: span 2;
            padding-right: 60%;
            position: relative;
            &::v-deep {
              .absTest {
                position: absolute;
                top: 0;
                right: 0;
                width: 55%;
              }
            }
          }
        }
      }
      &__list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: rem(4);
        margin-bottom: rem(6);
      }
      &__canvas {
        grid-column: span 2;
        position: relative;
        z-index: 1;
        &::v-deep {
          div {
            position: relative;
            width: 100%;
            &::before {
              content: "";
              display: block;
              width: 100%;
              padding-top: 100%;
            }
            canvas {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        }
      }
      &__image {
        grid-column: span 2;
      }
      &__textwrap {
        grid-column: span 3;
        align-self: center;
        position: relative;
        z-index: 10;
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
        &.r {
          [class$="__image"] {
            order: 2;
          }
        }

        &.c {
          [class$="__list"] {
            grid-template-columns: repeat(1, 1fr);
          }
          [class$="__textwrap"] {
            grid-column: span 2;
            padding-right: 60%;
            position: relative;
            &::v-deep {
              .absTest {
                position: absolute;
                top: 0;
                right: 0;
                width: 55%;
              }
            }
          }
        }
      }
      &__list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: rem(4);
        margin-bottom: rem(6);
      }
      &__canvas {
        grid-column: span 2;
        position: relative;
        z-index: 1;
        &::v-deep {
          div {
            position: relative;
            width: 100%;
            &::before {
              content: "";
              display: block;
              width: 100%;
              padding-top: 100%;
            }
            canvas {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        }
      }
      &__image {
        grid-column: span 2;
      }
      &__textwrap {
        grid-column: span 3;
        align-self: center;
        position: relative;
        z-index: 10;
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
        position: relative;
        padding-top: rem(4);
      }
      &__image {
      }
      &__logo {
        width: 70%;
        margin: rem(1) auto;
      }
      &__textwrap {
        &::v-deep {
          text-align: center;
          .title {
            @include font(rem(pow(3)), 700, $ls, $lh, $en_go);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: $gradation-light;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .link {
            margin-top: rem(2);
            .lpButton.m .icon {
              width: rem(4);
            }
          }
        }
      }
    }
  }
  &-network {
    @include rem_padding(6, 0, 6, 0);
    position: relative;
    .section__wrap {
      position: relative;
      z-index: 10;
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
          // height: 100px @;
          // &::before {
          //   content: "";
          //   display: block;
          //   width: 100%;
          //   padding-top: 100%;
          // }
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
      @include flex(center, center);
      @include list(4, rem(4));
      @include media(sp) {
        @include flex(flex-start, center);
        @include list(2, rem(1));
      }
      li {
        margin-bottom: rem(2);
      }
    }
  }
  &-roadmap {
    @include rem_padding(6, 0, 6, 0);
    &__phase {
      // @include list(2, 2rem);
      &__box {
        @include flex(flex-start, flex-start);
        margin-bottom: rem(4);
      }
      &__title {
        width: 30%;
        @include font(rem(pow(3)), 700, $ls, $lh, $en_go);
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &__list {
        @include flex(flex-start, stretch);
        @include list(2, rem(2));
        width: 70%;
        & > li {
          margin-bottom: rem(2);
        }
      }
      &__listwrap {
        height: 100%;
        border-radius: rem(1);
        overflow: hidden;
        border: 1px solid var(--color_border);
      }
      &__subtitle {
        @include font(rem(pow(1)), 700, $ls, $lh, $en_go);

        background: $gradation-light;
        text-align: center;
        padding: rem(0.5);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
      }
      &__sublist {
        padding: rem(1);
        li {
          @include font(rem(pow(0)), 400, $ls, $lh, $en_go);
          text-align: center;
        }
      }
    }
    // &__feature {
    //   @include flex(center, center);
    //   @include list(3, 2rem);
    // }
  }
  &-welcome {
    @include rem_padding(6, 0, 6, 0);
    &__list {
      // @include flex(flex-start, flex-start);
      // @include list(2, 2rem);
      text-align: center;
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
      @include media(sp) {
        width: 100%;
      }
    }
  }
  &-contact {
    @include rem_padding(6, 0, 6, 0);
    &__list {
      text-align: center;
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
      @include media(sp) {
        width: 100%;
      }
    }
  }
  &-cv {
    // background-image: url(/assets/images/lp/last_back_m.jpg);
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: cover;
    @include rem_padding(4, 0, 5, 0);
    position: relative;
    .section__wrap {
      position: relative;
      z-index: 10;
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
          // height: 100px @;
          // &::before {
          //   content: "";
          //   display: block;
          //   width: 100%;
          //   padding-top: 100%;
          // }
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
      @include rem_padding(3, 4, 3, 4);
      max-width: 600px;
      text-align: center;
      margin: rem(2) auto;
    }
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      @include flex(center, center);
      margin-bottom: rem(1);
      @include media(sp) {
        margin-bottom: rem(2);
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
  }
}
</style>

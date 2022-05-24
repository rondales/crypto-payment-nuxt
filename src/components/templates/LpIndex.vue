<template>
  <div class="lp-wrapper">
    <lp-header />
    <article class="lp">
      <section class="lp-first">
        <div class="lp-first_bg"></div>
        <div class="lp-first_contents">
          <div class="lp-first_icon">
            <img src="@/assets/images/lp/logo.png" alt="" />
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
          <div class="btn-content mb-2">
            <a @click="enterApp()" href="/admin">
              <div class="btn __pg lp-first_enter">Enter App</div>
            </a>
          </div>
          <div class="btn-content">
            <a href="/">
              <div class="btn lp-first_docs">Slash docs.</div>
            </a>
          </div>
        </div>
      </section>
      <section class="lp-second">
        <div class="lp-secondrow add-flex a-center display">
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
                <br class="pc" />
                from customers using the Web3 wallet.
              </p>
            </div>
          </div>
          <div class="lp-second_r">
            <figure>
              <img src="@/assets/images/lp/card.svg" />
            </figure>
          </div>
        </div>
        <div class="lp-second_sub">
          <div class="lp-second_bg"></div>
          <div class="lp-second_content">
            <div class="lp-second_subtitle add-flex a-center display">
              <h3>Customers can choose</h3>
              <h3 class="mb-5">any type of token they want to pay for</h3>
              <div class="lp-second_icons add-flex a-center display">
                <figure>
                  <img src="@/assets/images/lp/dex.svg" alt="" />
                </figure>
              </div>
            </div>
            <div class="lp-second_subdsc add-flex a-center display">
              <h4>
                Exchanges at DEX automatically
                <br class="sp" />
                at the best rate
              </h4>
              <p>
                Slash Payment’s payment contracts and core contracts
                automatically connect to the best-rate DEX SWAP router when
                making payments for different tokens. This solution allows
                Customers can pay with any token.
              </p>
            </div>
            <div class="lp-second_link display">
              <a href="/">
                Supported swap routers
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
        <div class="lp-second_cardlist display">
          <div class="lp-second_cardwrap add-flex a-center j-between">
            <div class="lp-second_card">
              <h4 class="lp-second_cardtitle">Web3 connect</h4>
              <div class="lp-second_cardicons mb-6">
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
                for Stable Token（USDT.USDC.DAI…） via a decentralized exchange.
              </div>
            </div>
            <div class="lp-second_card">
              <h4 class="lp-second_cardtitle">Multiple chain</h4>
              <div class="lp-second_cardicons">
                <img
                  v-if="$store.state.theme == 'dark'"
                  src="@/assets/images/lp/chain.svg"
                />
                <img
                  v-if="$store.state.theme == 'light'"
                  src="@/assets/images/lp/chain-l.svg"
                />
              </div>
              <div class="lp-second_carddsc">
                ETH and EVM-based
                <br class="sp" />
                (Ethereum Virtual Machine)
                <br class="sp" />
                networks are supported.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="lp-third display">
        <div class="lp-third_title">
          <h2>Easy system <br class="sp" />installation</h2>
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
                Slash makes it extremely easy and
                <br />
                safe to introduce cryptocurrency
                <br />
                payments.
              </h3>
            </div>
            <div class="lp-third_subdsc">
              <div class="sp-bg"></div>
              <p>
                To become a merchant, simply click ［Enter App］and connect your
                Web3 wallet. There is no screening process. From that day on,
                your store or service will be able to accept cryptocurrency
                payments. Also, the payment will be delivered to your Web3
                Wallet at that very moment.
              </p>
            </div>
            <div class="lp-third_link">
              <a href="/">
                Slash Payment Install Docs.
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
                Slash-specific plugin is available to simplify integration with
                various open platforms. Because of the ease of implementing
                payments, Slash Payments may be the first transaction that
                occurs when you launch your e-commerce site.
              </p>
            </div>
            <div class="lp-third_logos add-flex j-evenly">
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
              The best way for Accepting Web3
              <br class="sp" />
              Wallet Payments at Physical Stores
            </h3>
          </div>
          <div class="lp-third_image">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/physical.jpg"
              alt=""
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/physical-l.jpg"
              alt=""
            />
          </div>
          <div class="lp-third_subdsc">
            <p>
              If you are running a store, such as a café or a retail store, how
              about incorporating cryptocurrency as another means of payment? We
              are about to launch iOS/android app to make cryptocurrency payment
              more convenient.
            </p>
          </div>
          <div class="lp-third_app add-flex">
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
            <div class="lp-third_appright" id="fee-ecosystem">
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
              <h3>Slash Payment fee is 0.2〜0.6%</h3>
            </div>
            <div class="lp-third_subdsc">
              <div v-if="$store.state.theme == 'dark'" class="sp-bg"></div>
              <div v-if="$store.state.theme == 'light'" class="sp-bg-l"></div>
              <p class="mb-3">
                There are no commissions paid to Merchants. The commission is
                0.2-0.6% of the payment amount and is collected as a platform
                token along with the gas cost of the customer’s payment
                transaction.
              </p>
              <p class="sp-position">
                The commission is also used to automatically buyback Slash
                tokens through the ecosystem described in the whitepaper. A
                portion of the fees will also go towards the Slash donation
                program, where the recipients of the donation will be determined
                by a vote.
              </p>
            </div>
            <div class="lp-third_link inversion" id="donation">
              <a href="/">
                Fee Structure
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
          <h3>Slash automatically donation program</h3>
        </div>
        <div class="lp-third_image pc">
          <img src="@/assets/images/lp/donated.jpg" alt="" />
        </div>
        <div class="lp-third_image sp">
          <img
            v-if="$store.state.theme == 'dark'"
            src="@/assets/images/lp/donated-sp.svg"
            alt=""
          />
          <img
            v-if="$store.state.theme == 'light'"
            src="@/assets/images/lp/donated-sp-l.svg"
            alt=""
          />
        </div>
        <div class="lp-fourth_subdsc">
          <p class="mb-4">
            0.1% of all Slash Payment fees are automatically sent to the Slash
            Donation Wallet to be donated to social causes.
          </p>
          <p class="mb-4">
            We question the Old ecosystem in which people need donations.
            Ideally, we would like to see a world where people who need
            donations do not exist, a world of peace and prosperity where
            children can envision a bright future without being caught up in
            conflicts between countries.
          </p>
          <p class="mb-4">
            In order to contribute as much as possible to this new ideal
            ecosystem in which people can live their lives, we have incorporated
            an automated donation system into the Slash Payment.
          </p>
          <p class="mb-4">
            In the future, we will form a community so that people can decide
            where to donate by voting on slash tokens.
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
              donation program
            </a>
          </div>
          <div class="lp-fourth_logos add-flex j-around" id="token">
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
        <div class="lp-fourth_buyback add-flex j-between a-center">
          <div class="lp-third_left">
            <div class="phase-wrap">
              <div class="phase">Phase 2</div>
              <span>coming soon…</span>
            </div>
            <div class="lp-third_subtitle">
              <h3>All fees Use buyback $Slash*</h3>
            </div>
            <div class="lp-third_subdsc sp-mb">
              <div v-if="$store.state.theme == 'dark'" class="sp-bg"></div>
              <div v-if="$store.state.theme == 'light'" class="sp-bg-l"></div>
              <p>
                The Slash Payment fee is 0.2~0.6% of the settlement amount and
                is collected as a gas fee in platform tokens (ETH, BNB,
                Matic….).
                <br />
                <br />
                Except for the 0.1% fee used for donation, the Slash Payment has
                a completely new ecosystem that automatically buys back Slash
                Token from DEX for each transaction. Slash Token can also serve
                as governance for Slash and can be used to vote for donation
                recipients or be used in a staking pool with a fee discount
                feature to be launched later.
                <br />
                <br />
                *Slash Token will be issued in Phase 2.
              </p>
            </div>
            <div class="lp-third_link">
              <a class="pc-sp" href="/">
                <span v-if="$store.state.theme == 'dark'">
                  <img src="@/assets/images/lp/right-arrow.svg" />
                </span>
                <span v-if="$store.state.theme == 'light'">
                  <img src="@/assets/images/lp/right-arrow-l.svg" />
                </span>
                Details of $Slash
              </a>
              <a class="sp" href="/">
                Details of $Slash
                <span v-if="$store.state.theme == 'dark'">
                  <img src="@/assets/images/lp/right-arrow.svg" />
                </span>
                <span v-if="$store.state.theme == 'light'">
                  <img src="@/assets/images/lp/right-arrow-l.svg" />
                </span>
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
              <a href="" @click.prevent.stop="paymentForDonate(SAFE_THE_CHILDREN)">
                <span>
                  <img src="@/assets/images/lp/connect.svg" alt="" />
                </span>
                Donate Now
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
              <a href="" @click.prevent.stop="paymentForDonate(UNICEF)">
                <span>
                  <img src="@/assets/images/lp/connect.svg" alt="" />
                </span>
                Donate Now
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
          <li class="lp-cn1 pc">
            <img src="@/assets/images/lp/cn2.png" />
          </li>
          <li class="lp-cn1 sp">
            <img src="@/assets/images/lp/cn2-sp.png" />
          </li>
          <li class="lp-cn2 pc">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn3.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn3-l.svg"
            />
          </li>
          <li class="lp-cn2 sp">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn3-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn3-l-sp.png"
            />
          </li>
          <li class="lp-cn3 pc">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn7.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn7-l.svg"
            />
          </li>
          <li class="lp-cn3 sp">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn7-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn7-l-sp.png"
            />
          </li>
          <li class="lp-cn4 pc">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn5.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn5-l.svg"
            />
          </li>
          <li class="lp-cn4 sp">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn5-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn5-l-sp.png"
            />
          </li>
          <li class="lp-cn5 pc">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn6.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn6-l.svg"
            />
          </li>
          <li class="lp-cn5 sp">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn6-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn6-l-sp.png"
            />
          </li>
          <li class="lp-cn6 pc">
            <img src="@/assets/images/lp/cn1.png" />
          </li>
          <li class="lp-cn6 sp">
            <img src="@/assets/images/lp/cn1-sp.png" />
          </li>
          <li class="lp-cn7 pc">
            <img src="@/assets/images/lp/cn8.png" />
          </li>
          <li class="lp-cn7 sp">
            <img src="@/assets/images/lp/cn8-sp.png" />
          </li>
          <li class="lp-cn8 pc">
            <img src="@/assets/images/lp/cn9.png" />
          </li>
          <li class="lp-cn8 sp">
            <img src="@/assets/images/lp/cn9-sp.png" />
          </li>
          <li class="lp-cn9 pc">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn10.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn10-l.svg"
            />
          </li>
          <li class="lp-cn9 sp">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn10-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn10-l-sp.png"
            />
          </li>
          <li class="lp-cn10 pc">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn11.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn11-l.svg"
            />
          </li>
          <li class="lp-cn10 sp">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn11-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn11-l-sp.png"
            />
          </li>
          <li class="lp-cn11 pc" id="roadmap">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn4.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn4-l.svg"
            />
          </li>
          <li class="lp-cn11 sp" id="roadmap">
            <img
              v-if="$store.state.theme == 'dark'"
              src="@/assets/images/lp/cn4-sp.png"
            />
            <img
              v-if="$store.state.theme == 'light'"
              src="@/assets/images/lp/cn4-l-sp.png"
            />
          </li>
        </ul>
      </section>
      <section class="lp-sixth display">
        <div class="lp-sixth_title">
          <h2>Features & Road Map</h2>
        </div>
        <div class="lp-fourth_donate add-flex a-center j-between">
          <div class="lp-six_donateitem">
            <div class="lp-sixth_mintitle">
              <p>Phase 1</p>
            </div>
            <div class="lp-six_donatetitle">
              <h4>Basic Features<br />Open Source Plugins Ver.1</h4>
            </div>
          </div>
          <div class="lp-six_donateitem">
            <div class="lp-sixth_mintitle">
              <p>Phase 2</p>
            </div>
            <div class="lp-six_donatetitle">
              <h4>
                <span>Slash TOKEN</span> <br />Additional Feature <br />Open
                Source Plugins Ver.2 <br />Integration Requirements
              </h4>
            </div>
          </div>
        </div>
        <div class="lp-sixth_flex pc">
          <div class="box">
            <div class="cont" v-for="(item, index) in cont" :key="index">
              <h3>
                {{ item.title }}
              </h3>
              <div class="cont-item">
                <p v-for="(list, key) in item.lists" :key="key">
                  {{ list.text }}
                </p>
              </div>
            </div>
            <div id="developers"></div>
          </div>
        </div>
        <div class="lp-sixth_flex sp">
          <div class="box">
            <div
              class="cont"
              v-for="(item, index) in cont"
              :key="item.id"
              :class="{ active: show[index] }"
            >
              <h3 @click="toggle(index)">
                {{ item.title }}
                <span>
                  <img src="@/assets/images/lp/list-arrow.svg" alt="" />
                </span>
              </h3>
              <div class="cont-item" v-show="show[index]">
                <p v-for="(list, key) in item.lists" :key="key">
                  {{ list.text }}
                </p>
              </div>
            </div>
          </div>
          <div id="developers"></div>
        </div>
      </section>

      <section class="lp-seventh display">
        <div class="lp-seventh_title">
          <h2>
            Welcome⚡
            <br />
            Slash Developers💻
          </h2>
        </div>
        <div class="lp-referral_inner mb-6">
          <a href="/" class="box add-flex a-center mb-3">
            <figure>
              <img
                v-if="$store.state.theme == 'dark'"
                src="@/assets/images/lp/gitbook-icon.svg"
                alt=""
              />
              <img
                v-if="$store.state.theme == 'light'"
                src="@/assets/images/lp/gitbook-icon-l.svg"
                alt=""
              />
            </figure>
            <p>Slash Payment Docs.</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3">
            <figure>
              <img
                v-if="$store.state.theme == 'dark'"
                src="@/assets/images/lp/github.svg"
                alt=""
              />
              <img
                v-if="$store.state.theme == 'light'"
                src="@/assets/images/lp/github-l.svg"
                alt=""
              />
            </figure>
            <p>Slash Payment github</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3 disable">
            <figure>
              <img src="@/assets/images/lp/save-instagram.svg" alt="" />
            </figure>
            <p>Media kit</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3 disable">
            <figure>
              <img src="@/assets/images/lp/telegram.svg" alt="" />
            </figure>
            <p>Support for Slash Payment System</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3 disable">
            <figure>
              <img src="@/assets/images/lp/discord.svg" alt="" />
            </figure>
            <p>Slash Developer Community</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3 disable">
            <figure>
              <img src="@/assets/images/lp/help.svg" alt="" />
            </figure>
            <p>FAQ about system implementation</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3" id="contact">
            <figure>
              <img
                v-if="$store.state.theme == 'dark'"
                src="@/assets/images/lp/recruit.svg"
                alt=""
              />
              <img
                v-if="$store.state.theme == 'light'"
                src="@/assets/images/lp/recruit-l.svg"
                alt=""
              />
            </figure>
            <p>Slash Recruit Information</p>
          </a>
        </div>
        <div class="lp-seventh_title">
          <h2>Contact us</h2>
        </div>
        <div class="lp-referral_inner">
          <a href="/" class="box add-flex a-center mb-3">
            <figure>
              <img
                v-if="$store.state.theme == 'dark'"
                src="@/assets/images/lp/arroba.svg"
                alt=""
              />
              <img
                v-if="$store.state.theme == 'light'"
                src="@/assets/images/lp/arroba-l.svg"
                alt=""
              />
            </figure>
            <p>Contact Email</p>
          </a>
          <a href="/" class="box add-flex a-center mb-3">
            <figure>
              <img
                v-if="$store.state.theme == 'dark'"
                src="@/assets/images/lp/twitter.svg"
                alt=""
              />
              <img
                v-if="$store.state.theme == 'light'"
                src="@/assets/images/lp/twitter-l.svg"
                alt=""
              />
            </figure>
            <p>Twitter for DM</p>
          </a>
        </div>
      </section>
      <section class="lp-eighth display">
        <h3>
          Install on your online
          <br class="sp" />
          service now!
        </h3>
        <div class="lp-b_back">
          <div class="lp-first_icon">
            <img src="@/assets/images/lp/logo.png" alt="" />
            <h4>Slash.fi</h4>
          </div>
          <a @click="enterApp()" href="/admin">
            <div class="btn __pg lp-first_enter">Enter App</div>
          </a>
        </div>
      </section>
      <footer>
        <div class="footer-wrap">
          <div class="lp-footer_left">
            <div class="lp-first_icon">
              <img src="@/assets/images/lp/logo.png" alt="" />
              <h4>Slash Payment</h4>
            </div>
            <div class="lp-footer_link">
              <p>
                <a href="">Terms of Service</a> | <a href="">Privacy Terms</a>
              </p>
            </div>
            <div class="lp-footer_info">
              <p>
                <span>SLASH FINTECH LIMITED（BVI）</span>
                <br />
                3rd Floor, J & C Building, Road
                <br />
                Town, Tortola, British Virgin Islands, VG1110
              </p>
            </div>
            <div class="lp-footer_info">
              <p>
                <span>SLASH FINTECH LIMITED（CANADA）</span>
                <br />
                1700-777 DUNSMUIR ST.
                <br />
                VANCOUVER, BRITISH COLUMBIA V7Y1K4
                <br />
                Money Services Business (MSB) Registration number is M22785834
              </p>
            </div>
          </div>
          <div class="lp-footer_right">
            <div class="lp-footer_rightbox">
              <div class="box start">
                <h4>Developers</h4>
                <p><a href="" target="_blank">Integrations</a></p>
                <p><a href="" target="_blank">Plugins</a></p>
                <p><a href="" target="_blank">Docs</a></p>
                <p><a href="" target="_blank">Slash Developers</a></p>
              </div>
              <div class="box">
                <h4>Fee & Ecosystem</h4>
                <p><a href="#fee-ecosystem">Fee & Ecosystem</a></p>
                <p><a href="#donation">Donation Program</a></p>
                <p><a href="#token">Slash Token</a></p>
              </div>
              <div class="box end">
                <h4>Other</h4>
                <p><a href="#roadmap">Road Map</a></p>
                <p><a href="#developers">Referral</a></p>
                <p><a href="#contact">Contact</a></p>
              </div>
            </div>
            <div class="footer_icon-wrap">
              <div class="footer_icon">
                <figure>
                  <a href="">
                    <img
                      v-if="$store.state.theme == 'dark'"
                      src="@/assets/images/lp/twitter.svg"
                      alt=""
                    />
                    <img
                      v-if="$store.state.theme == 'light'"
                      src="@/assets/images/lp/twitter-l.svg"
                      alt=""
                    />
                  </a>
                </figure>
                <figure>
                  <a class="disable" href=""
                    ><img src="@/assets/images/lp/telegram.svg" alt=""
                  /></a>
                </figure>
                <figure>
                  <a class="disable" href=""
                    ><img src="@/assets/images/lp/discord.svg" alt=""
                  /></a>
                </figure>
                <figure>
                  <a href="">
                    <img
                      v-if="$store.state.theme == 'dark'"
                      src="@/assets/images/lp/arroba.svg"
                      alt=""
                    />
                    <img
                      v-if="$store.state.theme == 'light'"
                      src="@/assets/images/lp/arroba-l.svg"
                      alt=""
                    />
                  </a>
                </figure>
                <figure>
                  <a href="">
                    <img
                      v-if="$store.state.theme == 'dark'"
                      src="@/assets/images/lp/gitbook-icon.svg"
                      alt=""
                    />
                    <img
                      v-if="$store.state.theme == 'light'"
                      src="@/assets/images/lp/gitbook-icon-l.svg"
                      alt=""
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>
        <p class="copy">
          @ 2022 Copyrights by SLASH FINTECH LIMITED . All Rights Reserved.
        </p>
      </footer>
    </article>
  </div>
</template>


<script>
import JsSHA from 'jssha'
import { SAFE_THE_CHILDREN, UNICEF } from '@/constants'
import LpHeader from "@/components/organisms/lp/lpHeader";
import LpFooter from "@/components/organisms/lp/lpFooter";

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
  },
  computed: {
    API_BASE_URL() {
      return process.env.VUE_APP_API_BASE_URL
    },
    SAFE_THE_CHILDREN() {
      return SAFE_THE_CHILDREN
    },
    UNICEF() {
      return UNICEF
    },
    SAFE_THE_CHILDREN_MERCAHNT_IDENTIFICATION_TOKEN() {
      return process.env.VUE_APP_SAFE_THE_CHILDREN_MERCHANT_IDENTIFICATION_TOKEN
    },
    SAFE_THE_CHILDREN_MERCAHNT_HASH_TOKEN() {
      return process.env.VUE_APP_SAFE_THE_CHILDREN_MERCHANT_HASH_TOKEN
    },
    UNICEF_MERCAHNT_IDENTIFICATION_TOKEN() {
      return process.env.VUE_APP_UNICEF_MERCHANT_IDENTIFICATION_TOKEN
    },
    UNICEF_MERCAHNT_HASH_TOKEN() {
      return process.env.VUE_APP_UNICEF_MERCHANT_HASH_TOKEN
    }
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
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.home {
  text-align: center;
}
section {
  width: 100%;
  margin: auto;
}

.lp {
  &-wrapper {
    text-align: center;
    padding-top: 100px;
    @include media(sp) {
      padding-top: 62px;
    }
    a {
      display: block;
      font: 24px;
      color: #fff;
      margin-bottom: 20px;
    }
  }
  &-first {
    width: 100%;
    position: relative;
    &_bg {
      background: url(/assets/images/lp/mv.jpg) no-repeat center center;
      background-size: cover;
      width: 100%;
      height: 820px;
      @include media(sp) {
        background: url(/assets/images/lp/mv-sp.jpg) no-repeat center center;
        background-size: cover;
        height: 700px;
      }
    }
    &_contents {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -40%);
      @include media(sp) {
        width: 90%;
        transform: translate(-50%, -45%);
      }
      h1 {
        font-weight: 500;
        color: #fff;
        font-size: 26px;
        margin-bottom: 24px;
        @include media(sp) {
          font-size: 23px;
          margin-bottom: 16px;
        }
      }
      p {
        font-size: 26px;
        margin-bottom: 40px;
        color: #fff;
        @include media(sp) {
          font-size: 18px;
          font-weight: 300;
          margin-bottom: 48px;
        }
      }
      .btn-content {
        display: block;
      }
    }
    &_icon {
      width: 140px;
      margin: 0 auto 24px;
      @include media(sp) {
        width: 100px;
        margin: 0 auto 48px;
      }
    }
    &_enter {
      border-radius: 1.2rem;
      padding: 0;
      height: 6.2rem;
      line-height: 6.2rem;
      display: inline-block;
      font-size: 18px;
      box-shadow: 0 0 25px #fff;
      color: #fff;
      width: 40%;
      @include media(sp) {
        width: 80%;
      }
    }
    &_docs {
      position: relative;
      border-radius: 1.2rem;
      padding: 0;
      height: 6.2rem;
      line-height: 6.2rem;
      display: inline-block;
      font-size: 18px;
      color: #fff;
      background: #55476b;
      width: 40%;
      padding-left: 4.4rem;
      @include media(sp) {
        width: 80%;
      }
      &::after {
        position: absolute;
        top: 50%;
        left: 30%;
        transform: translate(-50%, -50%);
        content: "";
        background: url(/assets/images/lp/gitbook-icon.svg) no-repeat center
          center;
        background-size: cover;
        width: 34px;
        height: 24px;
        @include media(sp) {
          left: 28%;
        }
      }
    }
  }
  &-second {
    &row {
      margin-bottom: 24px;
      height: 540px;
      position: relative;
      @include media(sp) {
        height: 820px;
        align-items: flex-start;
        padding-top: 48px;
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
        right: 16px;
        height: 440px;
        width: 360px;
        animation: fuwafuwa 1.2s ease-in-out infinite alternate;
        @include media(sp) {
          bottom: 0;
          top: auto;
          right: 50%;
          transform: translate(50%, 0);
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
            bottom: 16px;
          }
          100% {
            bottom: 24px;
          }
        }
      }
      @include media(sp) {
        margin-bottom: 56px;
      }
    }
    &_title {
      font-size: 72px;
      letter-spacing: 0.035em;
      line-height: 1.45;
      background: $gradation-light;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 100% 10%;
      display: inline-block;
      @include media(sp) {
        letter-spacing: 0.01em;
      }
      span {
        width: 70px;
        display: inline-block;
        img {
          margin-bottom: 14px;
        }
      }
      @include media(sp) {
        font-size: 42px;
        span {
          img {
            width: 46px;
          }
        }
      }
    }
    &_dsc {
      font-size: 19px;
      margin-top: 15px;
      @include media(sp) {
        font-size: 14px;
      }
      p {
        font-weight: 400;
      }
      @include media(sp) {
        padding-top: 0;
        margin-bottom: 32px;
      }
    }
    &_sub {
      margin-bottom: 100px;
      position: relative;
      .lp-second_bg {
        z-index: 0;
        background: url(/assets/images/lp/lp-second_bg.jpg) no-repeat center
          center;
        background-size: cover;
        min-height: 540px;
        width: 100%;
        margin-bottom: 120px;
        opacity: 0.4;
        @include media(sp) {
          background: url(/assets/images/lp/lp-second_bg.jpg) no-repeat center
            center;
          background-size: cover;
          min-height: 260px;
          margin-bottom: 240px;
          opacity: 0.55;
        }
      }
      @include media(sp) {
        margin-bottom: 60px;
      }
    }
    &_content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      @include media(sp) {
        transform: none;
        position: relative;
        top: auto;
        left: auto;
        margin-top: -480px;
      }
    }
    &_subtitle {
      margin-bottom: 52px;
      @include media(sp) {
        width: 100%;
        margin-bottom: 0;
        h3 {
          width: 100%;
          order: 2;
          &.mb-5 {
            margin-bottom: 7rem;
          }
        }
      }
      h3 {
        font-size: 42px;
        text-align: center;
        letter-spacing: 0.03em;
        line-height: 1.9;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
        display: block;
        margin: auto;
        @include media(sp) {
          font-size: 16px;
        }
      }
    }
    &_icons {
      width: 50%;
      @include media(sp) {
        width: 90%;
        order: 2;
        margin-bottom: 32px;
      }
    }
    &_subdsc {
      text-align: left;
      @include media(sp) {
        margin: 0 auto 24px;
      }
      h4 {
        font-size: 30px;
        text-align: center;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
        display: block;
        margin: 0 auto 40px;
        @include media(sp) {
          font-size: 18px;
          margin: 0 auto 24px;
        }
      }
      p {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 16px;
        @include media(sp) {
          margin-bottom: 0;
          font-size: 15px;
          font-weight: 200;
        }
      }
    }
    &_link {
      text-align: right;
      a {
        font-weight: 400;
        @include media(sp) {
          font-weight: 500;
          font-size: 15px;
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
        @include media(sp) {
          margin-left: 8px;
          width: 26px;
        }
      }
    }
    &_cardlist {
      margin-bottom: 80px;
      @include media(sp) {
        margin-bottom: 0;
      }
    }
    &_cardwrap {
      margin-bottom: 40px;
      @include media(tb) {
        margin-bottom: 8px;
      }
    }
    &_card {
      width: 31.5%;
      height: 460px;
      background: var(--color_lp_box);
      padding: 40px 27px 32px;
      border-radius: 10px;
      @include media(tb) {
        width: 100%;
        margin-bottom: 32px;
        height: 400px;
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
      line-height: 1.5;
    }
    &_cardicons {
      margin-bottom: 24px;
    }
    &_carddsc {
      text-align: left;
      font-size: 19px;
      font-weight: 400;
      letter-spacing: -0.02rem;
      @include media(tb) {
        text-align: center;
        font-size: 17px;
      }
    }
  }
  &-third {
    @include media(sp) {
      margin-bottom: 80px;
    }
    &_install {
      margin-bottom: 80px;
      @include media(sp) {
        margin-bottom: 48px;
      }
      .lp-third_right {
        width: 67.5%;
        text-align: left;
        padding: 0 0 36px 36px;
        @include media(sp) {
          display: block;
          width: 100%;
          padding: 0;
          p {
            color: #fff;
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translate(0, 70%);
            line-height: 1.6;
            padding: 0;
            font-size: 15px;
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
        font-size: 49px;
        font-weight: 500;
        margin-bottom: 56px;
      }
      @include media(sp) {
        text-align: center;
        h2 {
          font-size: 30px;
          margin-bottom: 32px;
          line-height: 1.4;
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
      padding: 0 0 36px 36px;
      @include media(sp) {
        width: 100%;
      }
    }
    &_subtitle {
      h3 {
        font-size: 35px;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 100% 10%;
        display: inline-block;
        margin-bottom: 32px;
        @include media(sp) {
          font-size: 32px;
          background-size: 100% 10%;
          line-height: 1.4;
          margin-bottom: 24px;
        }
      }
    }
    &_subdsc {
      margin-bottom: 35px;
      p {
        font-size: 20px;
        font-weight: 400;
        @include media(sp) {
          font-size: 15px;
          margin-top: -48px;
          font-weight: 200;
        }
      }
      @include media(sp) {
        position: relative;
        height: 460px;
        margin-bottom: 16px;
      }
    }
    &_link {
      text-align: right;
      a {
        font-weight: 400;
        @include media(sp) {
          font-weight: 500;
          font-size: 15px;
        }
      }
      &.inversion {
        span {
          transform: rotate(0deg) !important;
          margin-left: 8px !important;
          margin-right: 0;
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
        @include media(sp) {
          margin-left: 8px;
          width: 26px;
        }
      }
    }
    &_integration {
      margin-bottom: 100px;
      @include media(sp) {
        margin-bottom: 60px;
      }
      .lp-third_subtitle {
        background-size: 100% 10%;
      }
      .lp-third_sub {
        height: auto;
      }
      .lp-third_left {
        width: 67.5%;
        text-align: left;
        padding: 36px 36px 36px 0;
        @include media(sp) {
          display: block;
          width: 100%;
          padding: 0;
          p {
            color: #fff;
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translate(0, 75%);
            line-height: 1.6;
            padding: 0;
            font-size: 15px;
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
          margin-right: 8px;
        }
      }
      .lp-third_logos {
        margin-bottom: 62px;
        @include media(sp) {
          justify-content: space-around;
          margin-bottom: 32px;
          figure {
            margin-bottom: 16px;
            width: 40%;
            img {
              width: 100%;
            }
          }
        }
      }
      .phase-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .phase {
          background: $gradation-double;
          padding: 4px 30px;
          background-size: 100% 200%;
          font-size: 19px;
          font-weight: 400;
        }
        span {
          font-size: 12px;
          margin-left: 24px;
          font-weight: 400;
        }
      }
    }
    &_physical {
      margin-bottom: 96px;
      @include media(sp) {
        margin-bottom: 60px;
      }
      .lp-third_subtitle {
        background-size: 100% 10%;
        text-align: left;
      }
      .lp-third_subdsc {
        text-align: left;
        font-size: 19px;
        font-weight: 400;
        margin-bottom: 56px;
        @include media(sp) {
          position: relative;
          margin-bottom: 40px;
          height: auto;
        }
      }
    }
    &_image {
      margin-bottom: 0;
      @include media(sp) {
        margin-bottom: 25px;
      }
    }
    &_app {
      width: 100%;
    }
    &_applogos {
      margin-bottom: 16px;
      flex-wrap: nowrap;
      @include media(sp) {
        justify-content: space-between;
      }
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
        font-weight: 400;
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
        font-weight: 400;
        @include media(pc) {
          margin-top: 20px;
        }
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
    .lp-third_subdsc {
      margin-bottom: 32px;
      @include media(sp) {
        margin-bottom: 160px;
        &.sp-mb {
          margin-bottom: 260px;
        }
      }
    }
    .lp-third_link {
      span {
        transform: rotate(180deg);
        margin-left: 0;
        margin-right: 16px;
        @include media(sp) {
          transform: rotate(180deg);
        }
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
          z-index: 2;
          line-height: 1.6;
          padding: 0 5px;
          font-size: 15px;
          margin-top: -96px !important;
          &.sp-position {
            margin-top: -16px !important;
          }
        }
        .sp-bg {
          background: url(/assets/images/lp/fee-sp.jpg) no-repeat center center;
          background-size: cover;
          width: 100%;
          height: 425px;
        }
        .sp-bg-l {
          background: url(/assets/images/lp/fee-sp-l.jpg) no-repeat center
            center;
          background-size: cover;
          width: 100%;
          height: 425px;
        }
      }
    }
    &_fee {
      margin-bottom: 80px;
      @include media(sp) {
        margin-bottom: 60px;
        .lp-third_left {
          display: none !important;
        }
      }
    }
    &_subdsc {
      text-align: left;
      margin-bottom: 24px;
      @include media(sp) {
        margin-top: -64px;
        margin-bottom: 48px;
      }
      p {
        font-weight: 400;
        @include media(sp) {
          font-weight: 200;
          font-size: 15px;
          &.mb-4 {
            margin-bottom: 2rem !important;
          }
        }
      }
    }
    &_linkwrap {
      margin-bottom: 80px;
    }
    &_logos {
      @include media(sp) {
        width: 100%;
        justify-content: space-evenly !important;
      }
      figure {
        @include media(sp) {
          width: 40%;
          &:nth-child(2) {
            width: 35%;
            margin-left: 5% !important;
          }
        }
        &:nth-child(2) {
          margin-left: 24px;
        }
      }
      @include media(sp) {
        order: 1;
        margin-bottom: 48px;
      }
    }
    &_title {
      h2 {
        font-size: 49px;
        font-weight: 500;
        margin-bottom: 48px;
        @include media(sp) {
          font-size: 25px;
          text-align: center;
          padding: 0;
          margin-bottom: 56px;
          line-height: 1.4;
        }
      }
    }

    &_donateitem {
      @include media(sp) {
        margin-bottom: 40px;
      }
    }
    &_donate {
      margin-bottom: 64px;
      @include media(sp) {
        margin-bottom: 0px;
      }
      &item {
        width: calc(50% - 20px);
        background: var(--color_lp_box);
        border-radius: 10px;
        padding: 50px;
        @include media(sp) {
          width: 100%;
          padding: 36px;
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
        span {
          background: $gradation-orange;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        h4 {
          font-weight: 500;
        }
        @include media(sp) {
          font-size: 23px;
          margin-bottom: 16px;
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
        font-weight: 500;
        letter-spacing: 0.4px;
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
          font-weight: 500;
        }
      }
    }
    &_buyback {
      margin-bottom: 80px;
      @include media(sp) {
        margin-bottom: 64px;
      }
      .lp-third_subtitle {
        background-size: 100% 10%;
      }
      .lp-third_sub {
        height: auto;
      }
      .lp-third_left {
        width: 67.5%;
        text-align: left;
        padding: 36px 36px 36px 0;
        @include media(sp) {
          display: block;
          width: 100%;
          padding: 0;
          p {
            padding: 0 5px;
            font-size: 15px;
            position: absolute;
            z-index: 2;
            top: 50%;
            transform: translate(0, 55%);
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
          .sp-bg-l {
            background: url(/assets/images/lp/buyback-sp-l.jpg) no-repeat center
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
        @include media(sp) {
          text-align: right;
        }
        span {
          transform: rotate(180deg);
          margin-left: 0;
          margin-right: 16px;
          @include media(sp) {
            transform: rotate(0deg);
            margin-left: 8px;
          }
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
          background: $gradation-double;
          padding: 4px 30px;
          background-size: 100% 200%;
          font-size: 19px;
          color: #fff;
          font-weight: 500;
          letter-spacing: 0.4px;
        }
        span {
          font-size: 12px;
          margin-left: 24px;
          font-weight: 400;
        }
      }
    }
  }
  &-fifth {
    padding: 60px 0;
    @include media(sp) {
      padding: 30px 16px 0;
      margin-bottom: 16px;
    }
    &_title {
      h2 {
        font-size: 49px;
        font-weight: 500;
        margin-bottom: 48px;
        @include media(sp) {
          text-align: center;
          margin-bottom: 48px;
          line-height: 1.4;
          font-size: 25px;
        }
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      @include media(sp) {
        text-align: left;
        justify-content: flex-start;
      }
      li {
        width: auto;
        height: 40px;
        margin: 25px 24px;
        @include media(sp) {
          width: 50%;
          margin: 4px 0;
          height: 50px !important;
          text-align: center;
          img {
            height: 100%;
          }
        }
        &.lp-cn1 {
          height: 43px;
        }
        &.lp-cn2 {
          height: 38px;
        }
        &.lp-cn3 {
          height: 31px;
        }
        &.lp-cn4 {
          height: 34px;
        }
        &.lp-cn5 {
          height: 32px;
        }
        &.lp-cn6 {
          height: 49px;
        }
        &.lp-cn7 {
          height: 73px;
        }
        &.lp-cn8 {
          height: 35px;
        }
        &.lp-cn9 {
          height: 41px;
        }
        &.lp-cn10 {
          height: 40px;
        }
        &.lp-cn11 {
          height: 35px;
        }
      }
    }
  }
  &-sixth {
    padding: 60px 0;
    @include media(sp) {
      padding: 30px 16px 0;
      margin-bottom: 80px;
    }
    &_title {
      h2 {
        font-size: 49px;
        font-weight: 500;
        margin-bottom: 48px;
        @include media(sp) {
          text-align: center;
          margin-bottom: 56px;
          line-height: 1.4;
          font-size: 25px;
        }
      }
    }

    .lp-sixth_mintitle {
      background: $gradation-light;
      text-align: center;
      padding: 4px 0;
      font-weight: 400;
      color: #fff;
      border-radius: 4px 4px 0 0;
      p {
        font-size: 17px;
      }
    }
    .lp-fourth_donate {
      align-items: inherit;
      margin-bottom: 88px;
      @include media(sp) {
        margin-bottom: 32px;
      }
    }
    .lp-six_donateitem {
      width: calc(50% - 20px);
      background: var(--color_lp_box);
      border-radius: 4px;
      padding: 56px;
      @include media(sp) {
        width: 100%;
        padding: 0;
        margin-bottom: 24px;
      }
      padding: 0;
      p {
        margin-bottom: 0;
      }
      .lp-six_donatetitle {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 35px;
        height: calc(100% - 35px);
        margin-bottom: 0;
        @include media(sp) {
          padding: 24px;
          height: calc(32vh - 30px);
          margin-bottom: 0;
        }
        h4 {
          font-size: 24px;
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 100% 10%;
          display: block;
          line-height: 2;
          font-weight: 600;
          @include media(sp) {
            font-size: 18px;
          }
          span {
            background: $gradation-orange;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    .lp-sixth_flex {
      width: 100%;
      .box {
        width: 100%;
        @include media(pc) {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        @include media(sp) {
          margin-right: 0;
        }
        &.end {
          margin-right: 0;
        }
        .cont {
          margin-bottom: 40px;
          font-weight: 400;
          text-align: left;
          &:nth-child(6) {
            h3 {
              background: $gradation-orange;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          @include media(pc) {
            width: 33.3333%;
          }
          &.active {
            h3 {
              span {
                transform: rotate(-180deg);
              }
            }
          }
          h3 {
            position: relative;
            display: inline;
            span {
              position: absolute;
              top: 12px;
              right: -32px;
              background: url(/assets/images/lp/list-arrow.svg);
              width: 20px;
              height: 12px;
              img {
                vertical-align: text-top;
              }
            }
          }
          .cont-item {
            margin-top: 16px;
          }
        }
        h3 {
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 25px;
          span {
            background: $gradation-orange;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        p {
          padding: 6px 0;
          @include media(sp) {
            font-size: 15px;
            font-weight: 200;
          }
        }
      }
    }
  }
  &-seventh {
    margin-bottom: 150px;
    @include media(sp) {
      margin-bottom: 60px;
    }
    &_title {
      h2 {
        font-size: 49px;
        font-weight: 500;
        margin-bottom: 40px;
        @include media(sp) {
          text-align: center;
          margin-bottom: 56px;
          line-height: 1.4;
          font-size: 24px;
        }
      }
    }
    .lp-referral_inner {
      .box {
        background: var(--color_lp_box);
        border-radius: 10px;
        padding: 0 64px;
        text-align: left;
        max-width: 700px;
        height: 110px;
        line-height: 110px;
        margin: auto;
        @include media(sp) {
          padding: 0 64px;
          line-height: 1;
          height: auto;
        }
        &:nth-child(1) {
          figure {
            img {
              width: 52px;
            }
          }
        }
        &:nth-child(2) {
          figure {
            img {
              width: 48px;
            }
          }
        }
        &:nth-child(3) {
          figure {
            img {
              width: 27px;
            }
          }
        }
        figure {
          width: 48px;
          text-align: center;
          img {
            width: 100%;
          }
        }
        &.disable {
          pointer-events: none;
          opacity: 0.7;
          p {
            color: #4e455a;
          }
        }
        p {
          margin-left: 48px;
          @include media(sp) {
            width: 60%;
          }
        }
        @include media(sp) {
          padding: 32px;
        }
      }
    }
  }
  &-eighth {
    background: url(/assets/images/lp/last_back_m.jpg) no-repeat center center;
    background-size: cover;
    padding: 60px 0 85px;
    max-width: inherit;
    width: 100%;
    @include media(sp) {
      background: url(/assets/images/lp/last_back_m-sp.svg) no-repeat center
        center;
    }
    h3 {
      font-weight: 500;
      color: #fff;
      font-size: 30px;
    }
    .lp-b_back {
      background: var(--color_lp_box);
      border-radius: 10px;
      padding: 40px 60px;
      width: 400px;
      text-align: center;
      margin: 30px auto 0;
      .btn {
        width: 100%;
        @include media(sp) {
          width: 80%;
        }
      }
      @include media(sp) {
        width: 85%;
        padding: 30px 10px;
      }
      .lp-first_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        @include media(sp) {
          margin-bottom: 32px;
        }
        img {
          width: 40px;
          margin-right: 15px;
        }
        h4 {
          font-size: 30px;
          background: $gradation-light;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .lp-first_enter {
      box-shadow: none;
    }
  }
}
footer {
  .footer-wrap {
    padding: 90px 0 62px;
    display: flex;
    justify-content: space-between;
    text-align: left;
    max-width: 1030px;
    width: 90%;
    margin: 0 auto;
    font-weight: 400;
    @include media(sp) {
      display: block;
      padding: 35px 0;
    }
    .lp-first_icon {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      width: 100%;
      @include media(sp) {
        margin-bottom: 40px;
      }
      img {
        width: 40px;
        margin-right: 15px;
      }
      h4 {
        font-size: 30px;
        background: $gradation-light;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .lp-footer_left {
      @include media(sp) {
        width: 100%;
        margin-bottom: 40px;
      }
      p {
        font-size: 15px;
      }
      .lp-footer_link {
        margin-top: 10px;
        @include media(sp) {
          margin-bottom: 35px;
        }
      }
      .lp-footer_info {
        margin-top: 60px;
        @include media(sp) {
          margin-top: 24px;
        }
        p {
          font-size: 12px;
          font-weight: 200;
          @include media(sp) {
            font-size: 10px;
          }
        }
        span {
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 8px;
          display: inline-block;
          @include media(sp) {
            font-size: 14px;
          }
        }
      }
    }
    @include media(sp) {
      .lp-footer_info {
        font-size: 15px;
        margin-top: 25px;
      }
    }

    .lp-footer_right {
      width: 60%;
      @include media(sp) {
        width: 100%;
      }
      .lp-footer_rightbox {
        display: flex;
        justify-content: space-between;
        @include media(sp) {
          display: block;
        }
        .box {
          @include media(sp) {
            margin-left: 0;
            border-bottom: 1px solid #554b6a;
            padding: 24px 0;
            &.start {
              border-top: 1px solid #554b6a;
            }
            &.end {
              margin-bottom: 62px;
            }
          }
          h4 {
            font-weight: 600;
            margin-bottom: 15px;
          }
          p {
            font-weight: 300;
            margin-bottom: 11px;
            font-size: 19px;
          }
        }
      }
      .footer_icon-wrap {
        width: 50%;
        margin-top: 120px;
        margin-right: 0;
        margin-left: auto;
        @include media(sp) {
          width: 80%;
          margin: 20px auto;
        }
      }
      .footer_icon {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .disable {
          opacity: 0.5;
        }
        figure {
          width: 20%;
          text-align: right;
          @include media(sp) {
            text-align: center;
          }
          img {
            width: 30px;
          }
        }
      }
    }
  }
  .copy {
    font-weight: 200;
    font-size: 16px;
    padding-bottom: 32px;
    @include media(sp) {
      font-size: 10px;
      padding-bottom: 48px;
    }
  }
}
</style>

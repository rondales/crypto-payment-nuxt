<template>
  <div class="style">
    <div class="amount">
      <PaymentTitle
        class="amount__title"
        type="h3_g"
        html="Enter the payment amount"
        emoji="&#128591;"
        layout="c"
      />
      <PaymentTitle
        class="amount__subtitle"
        type="h4"
        html="How much would you pay?"
        layout=""
      />
      <PaymentForm class="amount__form">
        <input
          v-model="legalCurrencyAmount"
          class="price"
          type="text"
          placeholder="0"
        />
        <div class="selectwrap">
          <PaymentIcon path="token-usdt" />
          <select name="currency" v-model="selectedCurrency">
            <option
              v-for="(currency, key) in currencies"
              :value="currency.name"
              :key="key"
            >
              {{ currency.name }}
            </option>
          </select>
        </div>
      </PaymentForm>
      <PaymentAmountBilled
        class="amount__bill"
        :symbol="receiveTokenSymbol"
        icon="token-usdt"
        :price="exchangedAmount"
        :priceClass="{ inactive: requireUpdateExchange }"
        size="big"
      />
      <div class="amount__pay">
        <PaymentTitle
          class="amount__pay__title"
          type="h3"
          html="Payment with Web3 Wallet"
          layout="c"
        />
        <PaymentAction
          class="amount__pay__action"
          icon="warning"
          text="Price Updated"
        >
          <PaymentButton text="Accept" size="s" @click.native="test" />
        </PaymentAction>

        <PaymentButton
          class="amount__pay__button"
          size="l"
          text="Go Payment"
          icon="logo-icon"
          :loading="loading"
          @click.native="test"
        />
        <PaymentButton
          class="amount__pay__button"
          size="l"
          text="Go Payment"
          icon="logo-icon"
          color="inactive"
          :loading="true"
          @click.native="test"
        />
        <PaymentVia />
      </div>
    </div>

    <PaymentButton
      v-for="(m, index) in modalList"
      :key="index"
      :text="m.name"
      size="s"
      :color="m.doneStatus ? 'primary' : 'cancel'"
      @click.native="showModal(m.name)"
    />
    <PaymentTitle type="h3" html="Color Valiation" layout="c" />
    <ul class="color">
      <li v-for="n in 10" :key="n"></li>
    </ul>
    <PaymentIcon class="icon" path="logo-icon" />
    <PaymentTitle type="h2_g" html="Your Balance" icon="reload" />
    <PaymentTitle
      type="h3_g"
      html="Do you want a receipt?"
      emoji="&#x1F9FE;"
      layout="c"
    />
    <PaymentTitle
      type="h3_g"
      html="Enter the payment amount"
      emoji="&#128591;"
      layout="c"
    />
    <PaymentTitle type="h2" html="Waiting for Confimation" layout="c" />
    <PaymentTitle type="h3" html="Payment with Web3 Wallet" layout="c" />
    <PaymentText type="h2b" html="Payment with Web3 Wallet" />
    <PaymentText type="h2" html="Payment with Web3 Wallet" />
    <PaymentText type="h3b" html="Payment with Web3 Wallet" />
    <PaymentText type="h3" html="Payment with Web3 Wallet" />
    <PaymentText type="h4b" html="Payment with Web3 Wallet" />
    <PaymentText type="h4" html="Payment with Web3 Wallet" />
    <PaymentText type="h5" html="Payment with Web3 Wallet" />
    <PaymentText
      tag="p"
      type="p"
      html="Select the network and currency you wish to pay for.  If the currency you want is not on the list, you can import it by contract address 👍"
    />
    <PaymentText
      tag="p"
      type="cap"
      html="Output is estimated. You will receive at least 1001.00 USDT or the transaction will revert."
    />
    <PaymentText
      tag="p"
      type="p"
      color="red"
      html="balance is insufficient  for this transaction."
    />

    <PaymentAmountBilled symbol="USDT" icon="usdt" price="1000.00" />
    <PaymentAmountBilled
      title="Amount Billed"
      symbol="USDT"
      icon="usdt"
      price="1000.00"
    />
    <PaymentAmountBilled
      symboltext="Tether USD"
      symbol="USDT"
      icon="usdt"
      :table="[
        {
          title: 'Balance',
          price: '2340',
          symbol: 'USDT'
        },
        {
          title: 'Balance',
          price: '2340',
          symbol: 'USDT'
        }
      ]"
    />
    <div class="d-payboxwrap">
      <PaymentTable
        :table="[
          {
            title: 'Minimum received',
            price: '',
            text: '1,000 USDT'
          },
          {
            title: 'Minimum received',
            price: '1,000',
            text: 'USDT'
          }
        ]"
      />
      <PaymentTransaction
        type="loading"
        title="Waiting for Confimation"
        text="Pay 1000.00 USDT for 1000.00 USDT"
        explorerUrl="https://www.google.com/"
        :link="{
          url: 'https://www.google.com/',
          title: 'Processing...',
          color: 'inactive'
        }"
      />
      <PaymentTransaction
        type="success"
        title="Transaction Submitted"
        explorerUrl="https://www.google.com/"
        :link="{
          url: 'https://www.google.com/',
          title: 'Back to Payee’s Services'
        }"
      />
      <PaymentTransaction
        type="dismiss"
        cap="The transaction cannot succeed due to error: execution reverted: PancakeRouter: INSUFFICIENT_OUTPUT_AMOUNT."
        explorerUrl="https://www.google.com/"
        :link="{
          url: 'https://www.google.com/',
          title: 'Back to Payee’s Services'
        }"
      />

      <PaymentVia />
    </div>
    <PaymentPrice symbol="USDT" cap="499 USDT equivalent" price="499.00" />
    <PaymentPrice
      symbol="USDT"
      cap="499 USDT equivalent"
      price="499.00"
      status="error"
    />

    <!-- <PaymentIdTable /> -->

    <PaymentForm error="Enter valid token address">
      <input type="text" placeholder="000000000" />
    </PaymentForm>
    <PaymentSelectToken />
    <PaymentToken symbol="USDT" icon="usdt" />
    <PaymentAction icon="network-ethereum" text="Ethereum Main net" />
    <PaymentAction icon="network-matic" text="Matic Main net" />
    <PaymentAction icon="network-avalanche" text="Avalanche Main net" />
    <PaymentAction icon="network-unknown" text="Unknown Main net" />
    <PaymentTab
      status="1"
      @changeToList="switchTab('list')"
      @changeToToken="switchTab('token')"
    ></PaymentTab>

    <PaymentNav :list="['Lists', 'Tokens']" :active="0" />
    <div class="button">
      <div class="pay__btnwrap">
        <PaymentButton text="Confirm Wallet" color="inactive" />
      </div>
      <div class="pay__btnwrap">
        <PaymentButton text="Confirm Pay" />
      </div>
      <div class="pay__btnwrap">
        <PaymentButton text="Button Text" />
        <PaymentButton color="cancel" text="Button Text" />
      </div>
      <PaymentButton size="l" text="MetaMask" icon="wallet-metamask" />
      <PaymentButton
        size="l"
        text="MetaMask"
        subtext="Easy-to-use Browser extension"
        icon="wallet-metamask"
        layout="wallet"
      />
      <PaymentButton
        size="l"
        text="WalletConnect"
        icon="wallet-walletconnect"
      />
      <PaymentButton size="l" text="Go Payment" icon="logo-icon" />

      <PaymentButton size="l" text="Button Text" />
      <PaymentButton text="Button Text" />
      <PaymentButton
        text="Binance Smart Chain Mainnet"
        icon="usdt"
        layout="left"
      />
      <PaymentButton size="icon" color="icon" icon="usdt" />
      <PaymentButton size="s" icon="light" text="aaaaaa" />
      <PaymentButton
        size="s"
        color="secondary"
        icon="light"
        text="aaaaaa"
        layout="reverse"
      />
      <PaymentButton size="s" color="cancel" icon="light" text="aaaaaa" />
      <PaymentButton size="s" color="inactive" icon="light" text="aaaaaa" />
      <PaymentButton size="s" color="danger" icon="light" text="aaaaaa" />
    </div>
  </div>
</template>
<script>
import PaymentButton from '@/components/organisms/Payment/Button'
import PaymentTitle from '@/components/organisms/Payment/Title'
import PaymentText from '@/components/organisms/Payment/Text'
import PaymentIcon from '@/components/organisms/Payment/Icon'
import PaymentTable from '@/components/organisms/Payment/Table'
import PaymentAmountBilled from '@/components/organisms/Payment/AmountBilled'
import PaymentTransaction from '@/components/organisms/Payment/Transaction'
import PaymentVia from '@/components/organisms/Payment/Via'
import PaymentPrice from '@/components/organisms/Payment/Price'
// import PaymentIdTable from "@/components/organisms/Payment/IdTable";
import PaymentForm from '@/components/organisms/Payment/Form'
import PaymentToken from '@/components/organisms/Payment/Token'
import PaymentSelectToken from '@/components/organisms/Payment/SelectToken'
import PaymentAction from '@/components/organisms/Payment/Action'
import PaymentTab from '@/components/organisms/Payment/Tab'
import PaymentNav from '@/components/organisms/Payment/Nav'
import { CURRENCIES } from '@/constants'
export default {
  name: 'PaymentIndex',
  components: {
    PaymentButton,
    PaymentTitle,
    PaymentText,
    PaymentAmountBilled,
    PaymentIcon,
    PaymentTable,
    PaymentTransaction,
    PaymentVia,
    PaymentPrice,
    // PaymentIdTable,
    PaymentForm,
    PaymentToken,
    PaymentSelectToken,
    PaymentAction,
    PaymentTab,
    PaymentNav
  },
  props: [],
  data() {
    return {
      modalList: [
        { doneStatus: false, name: 'accountModal' },
        { doneStatus: false, name: 'addChainModal' },
        { doneStatus: false, name: 'adminContractPausedModal' },
        { doneStatus: true, name: 'cautionPaymentRiskDisclaimerModal' },
        { doneStatus: true, name: 'cautionWalletConnectModal' },
        { doneStatus: false, name: 'contractCashbackChangeModal' },
        { doneStatus: false, name: 'contractIssuanceModal' },
        { doneStatus: false, name: 'contractReceiveAddressChangeModal' },
        { doneStatus: false, name: 'editAccountNoteModal' },
        { doneStatus: false, name: 'errorCurrentNetworkModal' },
        { doneStatus: true, name: 'errorForbiddenBackPaymentModal' },
        { doneStatus: true, name: 'errorMetamaskModal' },
        { doneStatus: true, name: 'errorModal' },
        {
          doneStatus: true,
          name: 'errorNotExistAvailablePaymentContractModal'
        },
        { doneStatus: true, name: 'errorWalletModal' },
        { doneStatus: true, name: 'networkModal' },
        { doneStatus: false, name: 'receiveModal' },
        { doneStatus: false, name: 'refundInfoModal' },
        { doneStatus: false, name: 'regeneratePaymentUrlModal' },
        { doneStatus: false, name: 'switchNetworkForAdminModal' },
        { doneStatus: true, name: 'walletModal' }
      ]
    }
  },
  computed: {
    currencies() {
      let list = {}
      Object.entries(this.$store.state.payment.allowCurrencies).forEach(
        ([key, value]) => {
          if (value) {
            list[key] = CURRENCIES[key]
          }
        }
      )
      return list
    }
  },
  methods: {
    switchTab(tab) {
      console.log('aaaa')
      console.log(tab)
    },
    showModal(target) {
      this.$store.dispatch('modal/show', {
        target: target,
        size: 'small',
        params: {
          message: 'This is dummy massage.'
        }
      })
    },
    test() {
      alert('aaaaaaa')
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
@import '@/assets/scss/delaunay.scss';

.amount {
  &__title {
    margin-bottom: 2rem;
  }
  &__subtitle {
    margin-bottom: 0.5rem;
  }
  &__form {
    margin-bottom: 2rem;
    .selectwrap {
      @include flex(flex-start, center);
      width: auto;
      padding-left: 1rem;
      border-left: 1px solid var(--Border);
      .svg {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
  &__bill {
    margin-bottom: 4rem;
  }
  &__pay {
    &__title {
      margin-bottom: 2rem;
    }
    &__action {
      margin-bottom: 1rem;
    }
    &__button {
      margin: 1rem;
    }
  }
}
.style {
  width: 35rem;
  margin: 5rem auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 8px 2rem rgba(139, 42, 225, 0.7),
    0px -8px 2rem rgba(62, 185, 252, 0.7);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  // box-shadow: rgba(139, 42, 225, 0.4) 5px 5px,
  //   rgba(139, 42, 225, 0.3) 10px 10px, rgba(139, 42, 225, 0.2) 15px 15px,
  //   rgba(139, 42, 225, 0.1) 20px 20px, rgba(139, 42, 225, 0.05) 25px 25px;
  box-shadow: rgba(139, 42, 225, 0.3) -4px 9px 25px -6px,
    rgba(62, 185, 252, 0.7) 4px -9px 25px -10px;
  @include media(sp) {
    width: 90%;
    width: 100%;
    box-shadow: none;
    // border: 0px solid #eee;
  }
  padding: 5rem 2rem;
  @include media(sp) {
    padding: 5rem 5vw;
  }
  & > * {
    margin-bottom: 3rem;
  }

  &__box {
    margin-bottom: 5rem;
  }
  &__title {
    margin-bottom: 2rem;
  }

  .color {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    li {
      border: 1px solid var(--SubText);
      border-radius: 100%;
      &::before {
        content: '';
        display: block;
        width: 100%;
        padding-top: 100%;
      }
      &:nth-child(1) {
        background: var(--Text);
      }
      &:nth-child(2) {
        background: var(--SubText);
      }
      &:nth-child(3) {
        background: var(--Base);
      }
      &:nth-child(4) {
        background: var(--Base2);
      }
      &:nth-child(5) {
        background: var(--Border);
      }
      &:nth-child(6) {
        background: var(--Success);
      }
      &:nth-child(7) {
        background: var(--Alert);
      }
      &:nth-child(8) {
        background: $gradation-pale;
      }
      &:nth-child(9) {
        background: var(--Button2);
      }
      &:nth-child(10) {
        background: var(--Button3);
      }
    }
  }
}
</style>

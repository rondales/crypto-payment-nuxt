<template>
  <div>
    <div class="manage-setting">
      <div class="setting-wrap">
        <div class="setting-toggle add-flex">
          <router-link
            to="/admin/payment/settings/contract"
            tag="div"
            class="setting-toggle-right"
            :class="{ active: isContractSettingTab }"
          >
            Contract Setting
          </router-link>
          <router-link
            to="/admin/payment/settings/basic"
            tag="div"
            class="setting-toggle-center"
            :class="{ active: isPaymentSettingTab }"
          >
            Payment Setting
          </router-link>
          <router-link
            to="/admin/payment/settings/domain"
            tag="div"
            class="setting-toggle-left"
            :class="{ active: isDomainSettingTab }"
          >
            Domain Setting
          </router-link>
          <router-link
              to="/admin/payment/settings/qr-code"
              tag="div"
              class="setting-toggle-left"
              :class="{ active: isDomainQrTab }"
          >
            Qr Code
          </router-link>
        </div>
        <AdminContractSettings v-if="isContractSettingTab" />
        <AdminPaymentSettings v-if="isPaymentSettingTab" />
        <AdminDomainSettings v-if="isDomainSettingTab" />
        <AdminQrCodeSetting v-if="isDomainQrTab" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminContractSettings from '@/components/organisms/admin/AdminContractSettings';
import AdminPaymentSettings from '@/components/organisms/admin/AdminPaymentSettings';
import AdminDomainSettings from '@/components/organisms/admin/AdminDomainSettings';
import AdminQrCodeSetting from "@/components/organisms/admin/AdminQrCodeSetting";

export default {
  name: 'AdminSettings',
  components: {
    AdminContractSettings,
    AdminPaymentSettings,
    AdminDomainSettings,
    AdminQrCodeSetting,
  },
  computed: {
    isContractSettingTab() {
      const targetPath = '/admin/payment/settings/contract';
      return this.$route.path === targetPath;
    },
    isPaymentSettingTab() {
      const targetPath = '/admin/payment/settings/basic';
      return this.$route.path === targetPath;
    },
    isDomainSettingTab() {
      const targetPath = '/admin/payment/settings/domain';
      return this.$route.path === targetPath;
    },
    isDomainQrTab() {
      const targetPath = '/admin/payment/settings/qr-code';
      return this.$route.path === targetPath;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.setting-toggle {
  background: #292536;
  width: 700px;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 40px;
  @include media(sp) {
    width: 100%;
  }
  &-right,
  &-center,
  &-left {
    text-align: center;
    width: 25%;
    font-size: 15px;
    padding: 8px 0;
    cursor: pointer;
    color: #8d8d8d;
    &.active {
      cursor: unset;
      background: #4e455a;
      border-radius: 8px;
      color: #fff;
    }
    @include media(sp) {
      width: 50%;
    }
  }
}
</style>

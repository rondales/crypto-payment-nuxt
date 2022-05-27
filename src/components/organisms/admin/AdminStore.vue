<template>
  <div class="store">
    <div class="title-gradation">Slash Store Apps</div>
    <p class="store-desc">
      Your sales deposit address
      <span> （*Currently logged in Web3 address） </span>
    </p>
    <div class="store-copy">
      <span>
        {{ currentAddres }}
      </span>
      <img
        class="copy"
        @click="copy(currentAddres)"
        src="@/assets/images/copy.svg"
      />
    </div>
    <p class="store-desc">Slash Store Apps Login Deeplink Issuance</p>
    <div class="comfirm-wrap">
      <div @click="create()" class="confirm-btn">Create</div>
      <p>
        In order to activate the Slash Store Apps, you must issue a deep link to
        activate your account. If you are using the same account on multiple
        devices, please issue multiple deeplinks.
      </p>
    </div>

    <div class="manage-content">
      <div class="search-wrap add-flex j-between">
        <div class="manage-function add-flex a-center">
          <div class="manage-show add-flex a-center">
            <div class="manage-show-title">show</div>
            <div class="show-select">
              <select
                v-model="paginateParams.perPage.value"
                @change="searchHistory"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div class="manage-show-unit">entries</div>
          </div>
        </div>
        <div class="select-status add-flex">
          <div class="select-status_title">Status</div>
          <select v-model="searchParams.status.value">
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div class="select-date-wrap add-flex">
          <div class="select-date">
            <DatetimePicker
              v-model="searchParams.datetimeFrom.value"
              :id="'from'"
              :locale="'en'"
              :first-day-of-week="1"
              :format="'YYYY-MM-DD HH:mm:00'"
              :formatted="'DD/MM/YYYY HH:mm'"
              :label="'from'"
              :no-label="true"
              :no-header="true"
              :dark="true"
            ></DatetimePicker>
          </div>
          <div class="select-date">
            <DatetimePicker
              v-model="searchParams.datetimeTo.value"
              :id="'to'"
              :locale="'en'"
              :first-day-of-week="1"
              :format="'YYYY-MM-DD HH:mm:59'"
              :formatted="'DD/MM/YYYY HH:mm'"
              :label="'to'"
              :no-label="true"
              :no-header="true"
              :dark="true"
              :right="true"
            ></DatetimePicker>
          </div>
        </div>
        <div class="search-btn" @click="searchHistory()">Search</div>
      </div>
      <div class="manage-table">
        <table>
          <thead>
            <tr>
              <th>QR／URL</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Note</th>
              <th>Other Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in summaries.records" :key="index">
              <td>
                <img
                  @click="openQr(record)"
                  class="qricon"
                  src="@/assets/images/store-qricon.png"
                />
                <span>
                  {{ record.linkUrl }}
                </span>
                <img
                  class="copy"
                  @click="copy(record.linkUrl)"
                  src="@/assets/images/copy.svg"
                />
              </td>
              <td>
                <div v-if="record.status === 1" class="status-active">
                  Active
                </div>
                <div v-if="record.status === 0" class="status-invalid">
                  Inactive
                </div>
              </td>
              <td>
                {{ record.lastLogin | empty }}
              </td>
              <td>
                <p>
                  {{ record.note }}
                  <br />
                  <span>Device ：{{ record.device }} </span>
                </p>
                <img @click="editNote(record)" src="@/assets/images/edit.svg" />
              </td>
              <td>
                <div class="option add-flex a-center j-between">
                  <div class="toggle_switch" v-if="record.status === 1">
                    <input
                      type="checkbox"
                      v-bind:id="record.id"
                      checked
                      @click="inactivateLink(record)"
                    />
                    <label v-bind:for="record.id"></label>
                  </div>
                  <div class="toggle_switch" v-if="record.status === 0">
                    <input
                      type="checkbox"
                      v-bind:id="record.id"
                      @click="activateLink(record)"
                    />
                    <label v-bind:for="record.id"></label>
                  </div>
                  <div class="switch-empty" v-if="record.status === 2">-</div>
                  <button class="btn refresh" @click="urlRefresh(record)">
                    <img src="@/assets/images/url-refresh.svg" />
                    Url refresh
                  </button>
                  <button class="btn delete" @click="deleteRow(record)">
                    <img src="@/assets/images/trash-box.svg" />
                    delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination add-flex j-between a-center">
          <div class="page-count">
            Showing {{ summaries.fromItemNumber }} to
            {{ summaries.toItemNumber }} of {{ summaries.total }} entries
          </div>
          <div>
            <Paginate
              :page-count="summaries.lastPageNumber"
              :page-range="3"
              :margin-pages="1"
              :click-handler="searchHistory"
              :prev-text="'Previous'"
              :next-text="'Next'"
              :container-class="'pagenation-wrap'"
              :prev-class="'prev-item'"
              :page-class="'p-num'"
              :next-class="'next-item'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import "@/../node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import DatetimePicker from "vue-ctk-date-time-picker";
import RequestUtility from "@/utils/request";
import { errorCodeList } from "@/enum/error_code";
import moment from "moment";
import Paginate from "vuejs-paginate";

export default {
  name: "AdminTransactionHistory",
  components: {
    DatetimePicker,
    Paginate,
  },
  data() {
    return {
      searchParams: {
        variable: { key: "transaction_address", value: null },
        status: { key: "active", value: "" },
        datetimeFrom: { key: "updated_at_from", value: null },
        datetimeTo: { key: "updated_at_to", value: null },
        sortKey: { key: "sort_key", value: null },
        sortType: { key: "sort_value", value: null },
      },
      paginateParams: {
        perPage: { key: "per_page", value: "10" },
        currentPage: { key: "current_page", value: "1" },
      },

      checkbox: [],
    };
  },
  filters: {
    empty(value) {
      if (!value) {
        return "-";
      } else {
        return value;
      }
    },
  },
  computed: {
    currentAddres() {
      return this.$store.state.account.address;
    },
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL;
    },
    deeplinks() {
      return this.$store.state.deeplink.links;
    },
    summaries() {
      return {
        lastPageNumber: this.deeplinks.last_page,
        fromItemNumber: this.deeplinks.from,
        toItemNumber: this.deeplinks.to,
        total: this.deeplinks.total,
        records: this.$store.getters["deeplink/links"],
      };
    },
  },
  methods: {
    copy(value) {
      this.$store.dispatch("account/copied");
      this.$clipboard(value);
    },
    openQr(record) {
      this.$store.dispatch("modal/show", {
        target: "open-qr-modal",
        size: "small",
        params: {
          record,
        },
      });
    },
    deleteRow(record) {
      this.$store.dispatch("modal/show", {
        target: "delete-row-modal",
        size: "small",
        params: {
          record,
        },
      });
    },
    urlRefresh(record) {
      this.$store.dispatch("modal/show", {
        target: "url-refresh-modal",
        size: "small",
        params: {
          record,
        },
      });
    },
    create() {
      this.$store.dispatch("modal/show", {
        target: "create-deeplink-modal",
        size: "small",
      });
    },
    editNote(record) {
      this.$store.dispatch("modal/show", {
        target: "edit-note-modal",
        size: "small",
        params: {
          record,
        },
      });
    },
    inactivateLink(record) {
      const status = 0;
      this.apiUpdateDeepLinkActiveStatus(record, status)
        .then((res) => {
          if (res.data.updated) {
            this.$store.dispatch("deeplink/updateLinks", {
              ...this.deeplinks,
              data: this.deeplinks.data.map((deeplink) => {
                if (deeplink.id === record.id) {
                  return {
                    ...deeplink,
                    active: status,
                  };
                }
                return deeplink;
              }),
            });
          }
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.showErrorModal(message);
        });
    },
    activateLink(record) {
      const status = 1;
      this.apiUpdateDeepLinkActiveStatus(record, status)
        .then((res) => {
          if (res.data.updated) {
            this.$store.dispatch("deeplink/updateLinks", {
              ...this.deeplinks,
              data: this.deeplinks.data.map((deeplink) => {
                if (deeplink.id === record.id) {
                  return {
                    ...deeplink,
                    active: status,
                  };
                }
                return deeplink;
              }),
            });
          }
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.showErrorModal(message);
        });
    },
    apiUpdateDeepLinkActiveStatus(record, status) {
      const url = `${this.baseUrl}/api/v1/management/authorization-code/${record.id}/updateActive`;
      const options = {
        headers: { Authorization: RequestUtility.getBearer() },
      };
      const data = {
        active: status,
      };

      return this.axios.patch(url, data, options);
    },
    searchHistory(page = 1) {
      this.paginateParams.currentPage.value = page;
      this.apiGetDeepLinks()
        .then((res) => {
          this.$store.dispatch("deeplink/updateLinks", res.data);
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = errorCodeList[error.response.data.errors.shift()].msg;
          } else {
            message = "Please try again after a while.";
          }
          this.showErrorModal(message);
        });
    },
    apiGetDeepLinks() {
      const url = `${this.baseUrl}/api/v1/management/authorization-code`;
      const inputedParams = Object.entries(this.searchParams)
        .map(([key, param]) => {
          if (
            (param.key !== "status" && param.value) ||
            (param.key === "status" && param.value !== "")
          ) {
            const value =
              key === "datetimeFrom" || key === "datetimeTo"
                ? String(moment(param.value).unix())
                : param.value;
            return [param.key, value];
          }
        })
        .filter((param) => param);

      const controlParams = Object.values(this.paginateParams).map((param) => {
        return [param.key, param.value];
      });

      const timezoneParam = [["offset", moment().utcOffset()]];
      const convertedParams = new URLSearchParams(
        inputedParams.concat(controlParams, timezoneParam)
      );

      const request = {
        headers: { Authorization: RequestUtility.getBearer() },
        params: convertedParams,
      };

      return this.axios.get(url, request);
    },
    showErrorModal(message) {
      this.$store.dispatch("modal/show", {
        target: "error-modal",
        size: "small",
        params: {
          message: message,
        },
      });
    },
  },
  mounted() {
    this.searchHistory();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.title-gradation {
  background: $gradation-light;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 150% 150%;
  font-weight: 600;
  display: inline-block;
  font-size: 24px;
  margin-bottom: 16px;
}
.store-desc {
  font-size: 20px;
  margin-bottom: 32px;
  span {
    font-size: 15px;
  }
}
.store-copy {
  background: #292536;
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 13px;
  width: 60%;
  border-radius: 8px;
  margin-bottom: 32px;
  @include media(tb) {
    width: 100%;
  }
  span {
    display: inline-block;
  }
  img {
    float: right;
  }
}
.comfirm-wrap {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 35px;
  padding: 24px;
  background: #292536;
  border-radius: 8px;
  margin-bottom: 48px;
  @include media(tb) {
    .confirm-btn {
      order: 2;
      width: 100%;
    }
    p {
      margin-bottom: 32px;
    }
  }
  p {
    font-size: 12px;
    font-weight: 300;
    width: 75%;
    line-height: 1.7;
  }
}
.confirm-btn {
  font-weight: 400;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  background: $gradation-light;
  border-radius: 8px;
  cursor: pointer;
  width: 200px;
  text-align: center;
  @include media(sp) {
    width: 100%;
    text-align: center;
  }
  &:hover {
    opacity: 0.8;
  }
}
.search-wrap {
  margin-bottom: 32px;
  .select-id {
    width: 28%;
    border: 1px solid #78668d;
    position: relative;
    border-radius: 8px;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &::after {
      position: absolute;
      right: 50%;
      transform: translate(-50%, 0);
      content: "";
      height: 35px;
      width: 1px;
      background: #78668d;
    }
    &::before {
      position: absolute;
      content: "";
      background: url(/assets/images/down-arrow.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 45%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    select,
    input {
      width: 50%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 300;
    }
    input {
      text-align: right;
      padding: 0 4px;
    }
    select {
      padding: 0 8px;
    }
  }
  .select-status {
    width: 20%;
    border: 1px solid #78668d;
    position: relative;
    border-radius: 8px;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &::after {
      position: absolute;
      right: 70%;
      transform: translate(-50%, 0);
      content: "";
      height: 35px;
      width: 1px;
      background: #78668d;
      @include media(sp) {
        right: 50%;
      }
    }
    &::before {
      position: absolute;
      content: "";
      background: url(/assets/images/down-arrow.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 95%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    &_title {
      width: 30%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 300;
      padding: 0 8px;
      @include media(sp) {
        width: 50%;
      }
    }
    select {
      width: 70%;
      font-size: 13px;
      line-height: 32px;
      font-weight: 300;
      padding: 0 8px;
      @include media(sp) {
        width: 50%;
      }
    }
  }
  .select-date-wrap {
    width: 35%;
    position: relative;
    @include media(sp) {
      width: 100%;
      margin-bottom: 16px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 2px;
      background: #fff;
    }
  }
  .select-date {
    width: 46%;
    border: 1px solid #78668d;
    position: relative;
    border-radius: 8px;
    &:nth-child(1) {
      margin-right: 8%;
    }
    &::before {
      position: absolute;
      content: "";
      background: url(/assets/images/calender.svg) no-repeat center center;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 8px;
      transform: translate(0%, -50%);
      z-index: 1;
    }
  }
  .search-btn {
    font-weight: 200;
    font-size: 14px;
    line-height: 35px;
    background: $gradation-light;
    padding: 2px 12px;
    border-radius: 8px;
    cursor: pointer;
    @include media(sp) {
      width: 100%;
      text-align: center;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
.toggle_switch {
  display: table;
  font-size: 60px;
  input {
    display: none;
  }
  label {
    display: block;
    position: relative;
    width: 0.6em;
    height: 0.35em;
    border-radius: 0.35em;
    background-color: #b0bec5;
    cursor: pointer;
    &::before {
      position: absolute;
      top: 0.03em;
      left: 0.04em;
      width: calc(0.35em - 0.06em);
      height: calc(0.35em - 0.06em);
      border-radius: calc(0.35em - 0.06em);
      background-color: #fff;
      transition: 0.5s;
      content: "";
    }
  }
  input:checked + label {
    background-color: #2dcb45;
  }
}

.toggle_switch > input:checked + label::before {
  left: calc(100% - 0.35em + 0.04em);
}

.select-date::v-deep {
  .date-time-picker {
    $base-bg-color: #161421;
    $base-font-color: #ffffff;
    .field-input {
      height: 35px;
      min-height: 30px;
      padding-left: 32px;
      padding-right: 0px;
      background: $base-bg-color;
      border: none !important;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: $base-font-color;
    }
    .field-clear-button {
      right: 3px;
    }
    .datepicker {
      margin-top: 4px;
    }
  }
}

.manage-function {
  .manage-show {
    &-title,
    &-unit {
      font-size: 14px;
      font-weight: 200;
    }
    .show-select {
      position: relative;
      width: 50px;
      margin: 0 8px;
      &::before {
        position: absolute;
        content: "";
        background: url(/assets/images/down-arrow.svg) no-repeat center center;
        width: 20px;
        height: 20px;
        top: 50%;
        right: 5%;
        transform: translate(0, -50%);
        z-index: 0;
      }
    }
    select {
      font-size: 14px;
      font-weight: 200;
      width: 50px;
      border: 1px solid #78668d;
      position: relative;
      border-radius: 8px;
      padding: 8px;
    }
  }
}

.manage-table {
  z-index: 10;
  width: 100%;
  @include media(tb) {
    width: 100%;
    overflow: auto;
    position: unset;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 32px;
    display: block;
    overflow-x: auto;
    height: 50vh;
    &::-webkit-scrollbar {
      display: none;
    }
    @include media(tb) {
      width: 1100px;
      overflow-x: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      margin-bottom: 0;
    }
    thead,
    tbody {
      width: 100%;
      @include media(tb) {
        width: 1100px;
      }
      tr {
        border-bottom: 2px solid #58466e;
        th {
          font-size: 16px;
          text-align: left;
          padding-bottom: 8px;
          padding: 0 8px 8px 8px;
        }
        td {
          font-size: 10px;
          padding: 16px 8px;
          height: 90px;
          &:nth-child(2) {
            font-size: 12px;
          }
          &:nth-child(4) {
            margin-top: -16px;
          }
          div {
            text-align: left;
            border-radius: 8px;
            font-weight: 300;
            span {
              font-size: 12px;
            }
          }
        }
        th,
        td {
          overflow-wrap: break-word;
          font-weight: 400;
          &:nth-child(1) {
            display: flex;
            align-items: center;
            width: 20vw;
            @include media(tb) {
              width: 300px;
            }
            .qricon {
              widows: 30px;
              height: 30px;
              cursor: pointer;
            }
            span {
              width: 200px;
              padding: 0px 8px;
              font-weight: 300;
            }
          }
          &:nth-child(2) {
            width: 8vw;
            @include media(tb) {
              width: 96px;
            }
            .status-active {
              color: #4caf50;
            }
            .status-invalid {
              color: #ce3a3a;
            }
            .status-invitation {
              color: #fedc90;
            }
          }
          &:nth-child(3) {
            width: 10vw;
            text-align: center;
            @include media(tb) {
              width: 120px;
            }
          }
          &:nth-child(4) {
            width: 22vw;
            display: inline-flex;
            align-items: center;
            @include media(tb) {
              width: 264px;
            }
            p {
              span {
                color: #707070;
              }
            }
            img {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
          }
          &:nth-child(5) {
            width: 30vw;
            @include media(tb) {
              width: 400px;
            }
            .switch-empty {
              width: 40px;
              text-align: center;
            }
            .option {
              .btn {
                font-size: 10px;
                font-weight: 300;
                padding: 0 1.5rem 0 1.5rem;
                img {
                  width: 14px;
                  margin-right: 0.5em;
                }
              }
              .refresh {
                background: #4e455a;
                img {
                  margin-top: -4px;
                }
              }
              .delete {
                background: #707070;
                img {
                  margin-top: -3px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.pagination {
  margin-bottom: 32px;
  width: calc(100% - 40px);
  .page-count {
    font-size: 16px;
    font-weight: 300;
  }
  .pagenation-wrap {
    font-weight: 300;
    font-size: 16px;
  }
}
</style>

<style lang="scss">
.prev-item {
  font-size: 16px;
  margin: 0 8px;
  display: inline;
}

.next-item {
  font-size: 16px;
  margin: 0 8px;
  display: inline;
}

.p-num {
  padding: 8px;
  font-size: 13px;
  border-radius: 8px;
  display: inline;
  cursor: pointer;
  &.active {
    background: #4e455a;
  }
}
</style>
<template>
  <transition name="fade">
    <div class="pay-warp">
      <errDom v-if="errSwitch" @freshen="freshen">
      </errDom>
      <div v-else class="pay">
        <dl>
          <dt>
            选择支付年级
          </dt>
          <dd>
            <gradeDom @changeGradeExam="changeGrade">
            </gradeDom>
          </dd>
        </dl>
        <dl v-if="payList.length" class="pay-item">
          <dt>选择支付时间</dt>
          <dd v-for="item in payList" class="clearfix">
            <span>{{item.name}}</span><span class="text-warning">¥{{item.price}}</span>
            <button class="btn btn-warning float-right" @click="pay(item.good_id)">立即购买</button>
          </dd>
        </dl>
      </div>
      <subSuccess v-if="successText" :successText="successText">
      </subSuccess>
      <errModal v-if="corryText" :errText="corryText">
      </errModal>
    </div>
  </transition>
</template>

<script>
  import gradeDom from "./grade";
  import errDom from "./status/err";
  import subSuccess from "./status/sub_success";
  import errModal from "./status/err_modal";
  import {mapActions, mapState} from "vuex";
  import * as wexinPay from "./../utils/wexinPay";
  import * as is_weixin from "./../utils/is-weixin";

  let payGrade = "";
  export default {
    name: "pay",
    data() {
      return {
        payList: [],
        successText: "",
        corryText: ""
      }
    },
    methods: {
      ...mapActions(["gain_goods", "gain_order","destroyFun"]),
      changeGoods(grade) {
        for (let i in this.goodsList) {
          if (this.goodsList[i].grade === grade) {
            this.payList = this.goodsList[i].goods;
            break;
          }
        }
      },
      changeGrade(gradeData) {
        payGrade = gradeData;
        this.changeGoods(gradeData)
      },
      pay(good_id) {
        let page = {
          url: `${process.env.API_HOST}/order/create`,
          methods: "post",
          data: {"good_id": good_id, "grade": payGrade}
        };
        this.gain_order(page).then(res => {
          if (!is_weixin.isWeixin()) {
            this.corryText = "无法掉起支付接口";
            setTimeout(() => {
              this.corryText = "";
            }, 1000)
          } else {
            wexinPay.weixin_pay(res.data, () => {
              this.successText = "支付成功";
              setTimeout(() => {
                this.successText = "";
              }, 1000)
            }, err => {
              console.log("payerr is:", err);
              this.corryText = "支付失败";
              setTimeout(() => {
                this.corryText = "";
              }, 1000)
            });
          }
        })
      }
    },
    computed: {
      ...mapState(["errSwitch", "gradeNum", "goodsList"])
    },
    components: {
      gradeDom, errDom, subSuccess, errModal
    },
    mounted() {
      let page = {
        url: `${process.env.API_HOST}/grade/goods`,
        methods: "post",
        data: {}
      };
      payGrade = this.gradeNum;
      this.gain_goods(page).then(() => {
        this.changeGoods(this.gradeNum);
      })
    },
    destroyed() {
      this.destroyFun(true);
    }
  }
</script>

<style scoped>

</style>

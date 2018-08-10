<template>
  <!--报告页面-->
  <transition name="fade">
    <div class="report">
      <loadingModal v-if="spinning" :loadText="loadText"></loadingModal>
      <div class="report-head">
        <div>
        <span class="report-head-item" :class="headNum==index?'report-head-item-active':''"
              v-for="(item,index) in linkArr"
              @click="goLink(index,item.src)">{{item.text}}</span>
        </div>
      </div>
      <div class="report-content" v-if="!spinning&&!errSwitch&&reportList">
        <keep-alive>
          <component :is="tabView"></component>
        </keep-alive>
      </div>
      <errDom v-if="errSwitch" @freshen="freshen"></errDom>
    </div>
  </transition>
</template>

<script>
  import {mapActions, mapState, mapMutations} from "vuex";
  import synthesize from "./synthesize";
  import knowledge from "./knowledge";
  import respondence from "./respondence";
  import loadingModal from "./../status/loading_modal";
  import errDom from "./../status/err";


  export default {
    name: "report",
    data() {
      return {
        linkArr: [{"src": "synthesize", "text": "综合分析"}, {
          "src": "knowledge",
          "text": "知识点分析"
        }, {"src": "respondence", "text": "卷面作答"}],
        tabView: "synthesize",
        loadText: "数据正在生成",
        paperId: "",
        headNum: 0
      }
    },
    computed: {
      ...mapState(["spinning", "errSwitch", "reportList", "reportEmerge"])
    },
    methods: {
      ...mapActions(["destroyFun", "gain_report"]),
      ...mapMutations(["REQUEST_START"]),
      /*头部tab切换*/
      goLink(index, src) {
        this.tabView = src;
        this.headNum = index
      },

      //刷新本页面的数据
      freshen() {
        this.gainReport();
      },
      gainReport() {
        let that = this;
        let page = {
          url: `${process.env.API_HOST}/report`,
          methods: "post",
          data: {"paper_id": this.paperId}
        };
        this.gain_report(page).then(res => {
          if (!res.code) {
            if (res.data.status == 1) {
              that.REQUEST_START();
              setTimeout(() => {
                that.gainReport()
              }, 2000)
            } else {
              return;
            }
          }
        });
      }
    },
    mounted() {
      if (!this.reportEmerge) {
        this.tabView = "respondence";
        this.headNum = 2;
        this.$store.commit("CHANGE_EMERGE", true);
      } else {
        this.tabView = "synthesize";
        this.headNum = 0;
      }
      this.paperId = this.$route.query.dataObj.paper_id;
      this.gainReport();
    },
    destroyed() {
      this.destroyFun(true);
    },

    components: {
      synthesize, knowledge, respondence, loadingModal, errDom
    }
  }
</script>

<style scoped>

</style>

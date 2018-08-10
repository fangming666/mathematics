<template>
  <!--考试列表页面-->
  <div class="exam-list" :style="{paddingTop:coluntTop}">
    <loadingModal v-if="spinning&&nativeLoading" :loadText="loadText">
    </loadingModal>
    <errModal v-if="(errModalSwitch&&!errFirst&&errSwitch)||sendSwitch" :errText="errModalInfo">
    </errModal>
    <mt-loadmore :bottomMethod="loadBottom" @bottom-status-change="handleBottomChange"
                 ref="loadmore" :bottom-all-loaded="allLoaded" :autoFill="false" v-if="!errFirst">
      <div class="men-grade" ref="menGradeS">
        <examErr v-if="!errFirst&&errSwitch" :errText="errInfo">
        </examErr>
        <member v-if="memberDate" :memberDate="memberDate">
        </member>
        <gradeDom v-if="gradeList.length||gradeList.length>1" @changeGradeExam="changeGrade">
        </gradeDom>
      </div>
      <div class="exam" v-for="item in examList">
        <p>{{createTime(item.create_date)}}</p>
        <div v-for="examItem in item.list" class="exam-item"
             @click="toQuestions(examItem.status,examItem.paper_id,examItem.chapter_name,examItem.send_status,examItem.vip_status)">
          <h5>{{examItem.name}}</h5>
          <p><span>{{examItem.create_time}}</span><span>提交人数：{{examItem.finish_num}}</span></p>
          <div class="answer-start" v-if="examItem.status==1">开始作答</div>
          <div class="answer-continue" v-if="examItem.status==2">继续作答</div>
          <div class="answer-end" v-if="examItem.status==3">
            <p><span>{{examItem.correct_rate}}</span>%</p>
            <p>正确率</p>
          </div>
        </div>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom text-center">
        <span v-show="bottomStatus === 'loading'">加载中<i class="fa fa-spin fa-spinner"></i></span>
      </div>
    </mt-loadmore>
    <p v-if="allLoaded" class="no-info">没有更多了</p>
    <errDom v-if="errFirst&&errSwitch" @freshen="freshen">
    </errDom>
  </div>
</template>
<script>
  import loadingModal from "./status/loading_modal";
  import {mapActions, mapState} from "vuex";
  import errDom from "./status/err";
  import examErr from "./status/exam_err";
  import errModal from "./status/err_modal";
  import member from "./status/member";
  import gradeDom from "./grade";

  let destroy = true, examScrollTop = 0, upSwitch = true;
  export default {
    data() {
      return {
        nativeLoading: false,
        allLoaded: false,
        bottomStatus: "",
        errFirst: false,
        errModalInfo: "网络中断，请检查网络设置",
        errInfo: "网络链接不可用，请检查网络设置。",
        loadText: "加载中",
        errModalSwitch: false,
        memberDate: "",
        sendSwitch: false,
        examList: [],
        coluntTop: "0px"
      }
    },
    computed: {
      ...mapState(["spinning", "errSwitch", "multipleArr", "gradeList", "gradeNum", "pubDestroy", "gradeSpring"]),
    },
    methods: {
      ...mapActions(["gain_exam", "destroyFun", "gain_grade", "set_grade"]),

      //请求年级的数据
      obtainGrade() {
        let page = {url: `${process.env.API_HOST}/grade/index`, methods: "post", data: {}};
        this.gain_grade(page).then(res => {
          this.errFirst = false;
          if (res.data.length && !this.gradeNum) {
            this.set_grade(res.data[0].grade)
          }
          this.$store.commit("PUSH_MULTIPLEARR");
          this.obtainExam(1, res.data.length ? this.gradeNum ? this.gradeNum : res.data[0].grade : "")
        }).catch(() => {
          this.errFirst = true;
        })
      },
      //年级的点击事件
      changeGrade(gradeData) {
        upSwitch = true;
        this.set_grade(gradeData);
        this.$store.commit("CHANGE_GRADESPRING", true);
        this.loopMultiple();
      },
      //请求考试列表数据
      obtainExam(num, gradeNum, examDerail = false, examPageNum = num) {
        let that = this;
        if (num === 1) {
          this.nativeLoading = true;
          this.$store.commit("CLEAR_EXAM");
        } else {
          this.nativeLoading = false;
        }
        let page = {
          url: `${process.env.API_HOST}/paper/index`,
          methods: "post",
          data: {"page": num, "grade": gradeNum}
        };
        this.gain_exam(page).then(res => {
          this.memberDate = res.vip_last_day;
          this.errFirst = false;
          this.errModalSwitch = false
          if (examDerail) {
            upSwitch = false;
          }
          if (!examDerail || examPageNum === num) {
            this.setExamList();
            this.getScrollTop();
            upSwitch = true;
          }
          if (!res.data.length) {
            this.allLoaded = true
          } else {
            this.allLoaded = false;
          }
        }).catch(() => {
          this.errModalSwitch = true;
          setTimeout(function () {
            that.errModalSwitch = false;
          }, 2000);
          if (num === 1) {
            this.errFirst = true;
          } else {
            this.errFirst = false;
          }
        });
      },
      /*点击进入不同状态的路由*/
      toQuestions(status, paper_id, chapter_name, send_status, vip_status) {
        if (!send_status) {
          this.sendSwitch = true;
          this.errModalInfo = "尚未发布";
          setTimeout(() => {
            this.sendSwitch = false;
            this.errModalInfo = "网络中断，请检查网络设置";
          }, 1000)
        } else if (!vip_status) {
          this.sendSwitch = false;
          this.errModalInfo = "网络中断，请检查网络设置";
          this.$router.push({
            path: '/pay',
            name: 'pay'
          });
        } else {
          this.sendSwitch = false;
          this.errModalInfo = "网络中断，请检查网络设置";
          if (status !== 3) {
            this.$router.push({
              path: '/question',
              name: 'question',
              query: {
                name: 'paper',
                dataObj: {"paper_id": paper_id, "chapter_name": chapter_name}
              }
            })
          } else {
            this.$router.push({
              path: '/report',
              name: 'report',
              query: {
                name: 'paper',
                dataObj: {"paper_id": paper_id}
              }
            })
          }
        }
      },
      //赋值给data里面的examList
      setExamList() {
        for (let i in this.multipleArr) {
          if (this.gradeNum == this.multipleArr[i].grade) {
            this.examList = this.multipleArr[i].examList;
            break;
          }
        }
      },
      //循环multiple数组
      loopMultiple(derail = false) {
        for (let i in this.multipleArr) {
          if (this.gradeNum == this.multipleArr[i].grade) {
            if (derail) {
              for (let j = 1; j < this.multipleArr[i].num; j++) {
                this.obtainExam(j, this.gradeNum, true, this.multipleArr[i].num - 1);
              }
            } else {
              this.obtainExam(this.multipleArr[i].num, this.gradeNum);
            }
            break;
          }
        }
      },
      //展示当前的位置scrollTop
      getScrollTop() {
        for (let i in this.multipleArr) {
          if (this.gradeNum === this.multipleArr[i].grade) {
            $(".exam-list").scrollTop(this.multipleArr[i].scrollTop);
            break;
          }
        }
      },
      //当前月份显示当月
      createTime(time) {
        let date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (time == `${year}年${month}月`) return "本月";
        return time;
      },
      loadBottom() {
        upSwitch = false;
        setTimeout(() => {
          this.destroyFun(false);
          this.$store.commit("CHANGE_GRADESPRING", false);
          this.loopMultiple();
          this.$refs.loadmore.onBottomLoaded();
        }, 1500)
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      //刷新本页面的数据
      freshen() {
        this.obtainGrade();
      }
    },
    components: {
      loadingModal, errDom, examErr, errModal, member, gradeDom
    },
    mounted() {
      $(".exam-list").scroll((e) => {
        examScrollTop = $(e.target).scrollTop();
      });
      if (!this.pubDestroy) {
        this.obtainGrade()
      } else {
        this.loopMultiple(true);
      }
    },
    beforeDestroy() {
      this.$store.commit("CHANGE_MULTIPLEARR", examScrollTop)
    },
    updated() {
      if (upSwitch) {
        this.getScrollTop();
      }
      this.coluntTop = window.getComputedStyle(this.$refs.menGradeS).height;
    },
    destroyed() {
      this.$store.commit("CHANGE_GRADESPRING", false);
    },
  }
</script>

<!--试卷试题-->
<template>
  <transition name="fade">
    <div>
      <errDom v-if="errFirst&&errSwitch" @freshen="freshen"></errDom>
      <div class="question-warp" v-if="questionList.length&&!errFirst">
        <div v-if="!finishAnswerSwitch">
          <div class="question-title clearfix">
            <span class="float-left">{{title}}</span>
            <p class="float-right"><span>{{questionList[pageNum].question_num}}</span><span>&nbsp;/&nbsp;{{questionList.length}}</span>
            </p>
          </div>
          <div class="question-insulate"></div>
          <div class="question">
            <div class="question-content" v-html="questionList[pageNum].question_content">
            </div>
            <div class="question-answers"
                 :class="[answerNum == index?'question-answers-active':'',questionList[pageNum].my_answer==item.option?'question-answers-active-other':'']"
                 v-for="(item,index) in questionList[pageNum].answers"
                 @click="submitAnswer(item.option,questionList[pageNum].question_id,index)">
              <span class="question-answers-title">{{item.option}}</span>
              <p class="m-b-0 d-inline-block" v-html="item.content"></p>
            </div>
          </div>
          <div class="question-window" v-if="windowSwitch" @click="revealWindow(false)">修改答案</div>
          <modify v-else @toExaminationFinish="toExaminationQuest" @closeModify="revealWindow(true)"></modify>
        </div>
        <finishAnswer @toExaminationFinish="toExaminationQuest" v-else @finish="finishAll"></finishAnswer>
        <subFail v-if="errSwitch" @leave="leave_err" @againSub="againSub"></subFail>
        <loading-modal v-if="spinning" :loadText="loadText"></loading-modal>
        <subSuccess v-if="successSwitch" :successText="successText"></subSuccess>
        <transition name="fade">
          <errModal v-if="corrySwitch" :errText="corryText"></errModal>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  let subData = "";
  import {mapActions, mapState} from "vuex";
  import loadingModal from "./../status/loading_modal";
  import subFail from "./../status/sub_fail";
  import errDom from "./../status/err";
  import finishAnswer from "./finish_answer"
  import subSuccess from "./../status/sub_success";
  import errModal from "./../status/err_modal";
  import modify from "./modify";

  export default {
    name: "question",
    data() {
      return {
        title: this.$route.query.dataObj.chapter_name,
        pageNum: 0,
        answerNum: -1,
        finishAnswerSwitch: false,
        paperId: "",
        errFirst: false,
        successSwitch: false,
        successText: "恭喜成功交卷",
        corrySwitch: false,
        corryText: "",
        windowSwitch: true,
        loadText: "加载中"
      }
    },
    computed: {
      ...mapState(["questionList", "spinning", "errSwitch"]),
    },

    methods: {
      ...mapActions(["gain_question", "submit_answer", "leave_err", "destroyFun", "revise_question"]),
      //获得题目的总数
      askQuestion(paper_id) {
        let page = {url: `${process.env.API_HOST}/paper/question`, methods: "post", data: {"paper_id": paper_id}};
        this.gain_question(page).then(res => {
          this.errFirst = false;
          this.$store.state.reveal = true;
          this.carryQuest();
        }).catch(err => {
          this.errFirst = true
        })
      },

      carryQuest() {
        let sum = 0, that = this;
        for (let index in this.questionList) {
          if (!this.questionList[index].my_answer) {
            if (!+index) {
              this.corrySwitch = false;
            } else {
              if (this.$store.state.reveal) {
                this.corrySwitch = true;
                this.corryText = `回到第${+index + 1}题，请继续答题`;
                setTimeout(() => {
                  that.corrySwitch = false
                }, 1000);
              }
              this.pageNum = +index;
            }
            break
          } else {
            sum = +index
          }
        }
        this.$store.state.reveal = false;
        if (sum == this.questionList.length - 1) {
          this.finishAnswerSwitch = true;
        }
        this.answerNum = -1;
      },

      //提交答案
      submitAnswer(option, question_id, index) {
        this.answerNum = index;
        let page = {
          url: `${process.env.API_HOST}/paper/finish-quesiton`,
          methods: "post",
          data: {"paper_id": this.paperId, "question_id": question_id, "option": option}
        };
        this.submit_answer(page).then(res => {
          subData = "";
          this.$store.state.reveal = true;
          let reviseObj = {"index": this.pageNum, "my_answer": option};
          this.revise_question(reviseObj);
          this.carryQuest();
        }).catch(err => {
          subData = {"option": option, "question_id": question_id, "index": index}
        })

      },

      //题目点击以后的事件
      toExaminationQuest(index) {
        this.pageNum = index;
        this.finishAnswerSwitch = false;
        this.windowSwitch = true;
      },

      //提交所有的题目
      finishAll() {
        let page = {url: `${process.env.API_HOST}/paper/finish`, methods: "post", data: {"paper_id": this.paperId}};
        this.submit_answer(page).then(() => {
          this.successSwitch = true;
          setTimeout(() => {
            this.successSwitch = false;
            this.$router.push({
              path: '/report',
              name: 'report',
              query: {
                name: 'paper',
                dataObj: {"paper_id": this.paperId}
              }
            })
          }, 1000)
        });
      },

      againSub() {
        if (!this.finishAnswerSwitch) {
          this.submitAnswer(subData.option, subData.question_id, subData.index);
        } else {
          this.finishAll();
        }
      },


      //悬浮窗的点击事件
      revealWindow(result) {
        this.windowSwitch = result
      }
    },

    mounted() {
      if (!this.$route.query.dataObj.paper_id) {
        this.$router.replace({
          path: "/"
        });
        return;
      }
      this.paperId = this.$route.query.dataObj.paper_id || "";
      this.askQuestion(this.paperId)
    }
    ,

    components: {
      loadingModal, finishAnswer, subFail, errDom, subSuccess, errModal, modify
    }
    ,

    destroyed() {
      this.destroyFun(true)
    }
  }
</script>



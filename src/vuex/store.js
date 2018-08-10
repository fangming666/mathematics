import vue from "vue";
import vueX from "vuex";
import * as actions from "./action";

vue.use(vueX);

const state = {
    gradeList: [],
    goodsList: [],
    gradeNum: "",
    multipleArr: [],
    questionList: [],
    errSwitch: false,
    spinning: false,
    pubDestroy: false,
    reveal: false,
    reportList: [],
    reportEmerge: true,
    gradeSpring: false
  }
;

const mutations = {
    GAIN_GRADE(state, result) {
      state.gradeList = result.data
    },
    GAIN_GOODS(state, result) {
      state.goodsList = result.data
    },
    GAIN_EXAM(state, result) {
      for (let i in state.multipleArr) {
        if (state.gradeNum === state.multipleArr[i].grade) {
          if (state.gradeSpring && state.multipleArr[i].num > 1) {
            break;
          }
          if (!state.pubDestroy) {
            state.multipleArr[i].num += 1;
          }else if(state.gradeSpring){
            state.multipleArr[i].num += 1;
          }
          if (!result.data.length) return;
          if (!state.multipleArr[i].examList.length) {
            state.multipleArr[i].examList = state.multipleArr[i].examList.concat(result.data)
          } else {
            result.data.map(item => {
              let contrast = false;
              state.multipleArr[i].examList.map(examItem => {
                if (examItem.create_date == item.create_date) {
                  examItem.list = examItem.list.concat(item.list);
                  contrast = true;
                }
              });
              if (!contrast) {
                state.multipleArr[i].examList.push(item)
              }
            });
          }
          break;
        }
      }
    },
    CLEAR_EXAM(state) {
      for (let i in state.multipleArr) {
        if (state.gradeNum === state.multipleArr[i].grade) {
          state.multipleArr[i].examList = [];
          break;
        }
      }
    },
    GAIN_QUESTION(state, result) {
      state.questionList = result.data
    },
    ERROR(state) {
      state.spinning = false;
      state.errSwitch = true;
    }
    ,
    SET_GRADE(state, num) {
      state.gradeNum = num
    }
    ,
    CHANGE_GRADESPRING(state, result) {
      state.gradeSpring = result
    },
    REQUEST_START(state) {
      state.spinning = true;
      state.errSwitch = false;
    }
    ,
    RESPONSE_START(state) {
      state.spinning = false;
      state.errSwitch = false;
    }
    ,
    LEAVE_ERR(state) {
      state.errSwitch = false
    }
    ,
    DESTROY(state, result) {
      state.pubDestroy = result
    }
    ,
    REVISE_QUESTION(state, page) {
      for (let i in state.questionList) {
        if (i == page.index) {
          state.questionList[i].my_answer = page.my_answer;
          break;
        }
      }
    }
    ,
    GAIN_REPORT(state, page) {
      state.reportList = page.data
    }
    ,
    CHANGE_EMERGE(state, result) {
      state.reportEmerge = result
    }
    ,
    PUSH_MULTIPLEARR(state) {
      if (state.gradeList.length) {
        state.gradeList.map(item => {
          state.multipleArr.push({"grade": item.grade, "scrollTop": 0, "num": 1, "examList": []})
        })
      }
    }
    ,
    CHANGE_MULTIPLEARR(state, scrollTop) {
      for (let i in state.multipleArr) {
        if (state.gradeNum === state.multipleArr[i].grade) {
          state.multipleArr[i].scrollTop = scrollTop;
          break;
        }
      }
    }
  }
;
export default new vueX.Store({
  state,
  mutations,
  actions
})

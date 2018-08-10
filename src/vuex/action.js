import * as server from "./ajax";

const token = "abcd";

export const wechat = async function (page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};

export const gain_grade = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    commit("GAIN_GRADE", result.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};

export const gain_goods = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    commit("GAIN_GOODS", result.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};

export const gain_order = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};

export const gain_exam = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    commit("GAIN_EXAM", result.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};

export const gain_question = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    commit("GAIN_QUESTION", result.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};

export const submit_answer = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};
export const leave_err = function ({commit}) {
  commit("LEAVE_ERR")
};

export const destroyFun = function ({commit}, result) {
  commit("DESTROY", result)
};
export const revise_question = function ({commit}, page) {
  commit("REVISE_QUESTION", page)
};
export const gain_report = async function ({commit}, page) {
  try {
    page.data["access-token"] = token;
    let result = await server._askAxios(page.url, page.methods, page.data);
    commit("GAIN_REPORT", result.data);
    return result.data;
  } catch (err) {
    commit("ERROR");
    return Promise.reject(err);
  }
};
export const set_grade = function ({commit}, num) {
  commit("SET_GRADE", num)
};


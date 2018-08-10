import axios from "axios/index";
export const _askAxios = async function (url, methods, data) {
  return await axios({
      method: methods,
      url: url,
      data: data,
      timeout: 5000,
      responseType: 'json'
    }
  )
};


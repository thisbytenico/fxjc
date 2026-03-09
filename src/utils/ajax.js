import axios from "axios";
import qs from "qs";
// import merge from "lodash/merge";
import store from "../store";
import { debounce } from "./common.js";
// import { ElNotification, ElMessage } from 'element-plus'
import { baseURL, statusField, okCode, defaultOpenid, getIsNotTipCode } from "@/config";
import { localGet,localRemove } from "@/utils";
// import router from '@/router/index'

const ERROR_MSG = {
    /* 网络类异常 */
    OFF_LINE: "抱歉，您貌似还没连接到网络，请检查网络连接",

    400: "请求错误",
    401: "抱歉，请登录",

    403: "拒绝访问",
    404: "您访问的接口地址貌似不存在",
    408: "请求超时",
    413: "抱歉，您上传文件太大",

    // 500: "当前服务器异常，请稍后再试",
    // 501: "服务未实现",
    502: "网关错误",
    503: "当前服务器异常，请稍后再试",
    504: "网关超时",
    505: "HTTP版本不受支持"
};

export const http = axios.create({
    timeout: 1000 * 60,
    withCredentials: true,
    crossDomain: true,
    baseURL
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
    config => {
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json; charset=utf-8";
        }
        if(localGet('token'))
        config.headers.Authorization = localGet('token'); // 请求头带上token

        // 如果params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        config.paramsSerializer = params => {
            return qs.stringify(params, { arrayFormat: "repeat" });
        };
        config.transformRequest = [
            function (response) {
                // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
                if (/application\/json/.test(config.headers["Content-Type"])) {
                    response = JSON.stringify(response);
                } else if (response != undefined) {
                    response = qs.stringify(response);
                }
                return response;
            }
        ];
        return config;
    },
    error => {
        if (error && error.response && Number(error.response.code) === 401) {
            // 401, token失效
            return logOut(error)
        }
        return createError(error);
    }
);


/**
 * 响应拦截
 */
http.interceptors.response.use(
    response => {
        // console.log('response0000',response)
        if (
            response.data[statusField] == undefined
        ) {
            store.commit('SET_LOADING', { show: false })
            return response.data;
        }
        return returnResponse(response);
    },
    error => {
        if (error && error.response && Number(error.response.code || error.response.status) === 401) {
            //401, token失效
            return logOut(error)
        }
        return createError(error);
    }
);

const logOut = (response) => {
    // store.dispatch("user/FedLogOut").then(() => {
    //     setTimeout(() => {
    //         location.reload();
    //     }, 1500)
    // });
    // _request({url:"/api/user/signout",data:{}},'get').then(()=>{
    // })
    localRemove('token');
    // localRemove('userName');
    setTimeout(() => {
        location.reload();
    }, 1500)
    // router.push({ path: '/login' })
    return createError(response);
}
/**
 * 对response处理的公共部分
 * @param {*} response
 */
function returnResponse(response) {
    // console.log('response',response)

    if (response && response.data && Number(response.data[statusField]) === 401) {
        // 401, token失效
        return logOut(response)
    }

    const reqMethod = response.config.method
    const data = response.data;
    if (data && data instanceof Object) {
        const statusCode = data[statusField]

        if (statusCode != okCode) {
            if (reqMethod == 'get' && getIsNotTipCode(statusCode)) {
                //这样写方便代码阅读，这里不能写return中断代码执行
            } else {
                return createError(response);
            }
        }
    }
    if (data == undefined) return createError(response);

    store.commit('SET_LOADING', { show: false })
    const resData = response.data;
    const msg = resData.msg || resData.message;
    if (
        reqMethod != "get" &&
        store.getters["showHttpMsg"] &&
        msg &&
        msg != "success"
    ) {
        ElMessage({
            message: msg,
            type: "success"
        });
    }

    //response.config.method
    return resData;
}

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = actionName => {
    return process.env.BASE_API + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        t: new Date().getTime()
    };
    // console.log('Object.assign(defaults, params)', Object.assign(defaults, params))
    return openDefultParams ? Object.assign(defaults, params) : params;
    //return openDefultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 * json: 'application/json; charset=utf-8'
 * form: 'application/x-www-form-urlencoded; charset=utf-8'
 * form-data: 'multipart/form-data'
 */
// http.adornData = (data = {}, openDefultdata = true, contentType = "json") => {
//     var defaults = {
//         t: new Date().getTime()
//     };
//     // data = openDefultdata ? merge(defaults, data) : data;
//     return contentType === "json" ? JSON.stringify(data) : qs.stringify(data);
// };

// export default http;

const errorTip = debounce(msg => {
    ElNotification({
        title: "提示",
        message: msg,
        type: "error",
        duration: 5 * 1000
    });
}, 500)


/**
 * @description 返回一个以包装后的error对象为拒绝原因的promise
 *
 * @return {promise}
 */
function createError(responseError) {
    let error_code;
    let error_msg;
    let response = {};
    // 请求已经发送，并且服务器有返回
    if (responseError.response || responseError.status == 200) {
        response = responseError.response || responseError;
        // 接口的返回内容
        const body = response.data;

        if (body && typeof body === "object") {
            // 有的接口错误描述还被包了一层，所以也尝试解析
            const realBody = body.data;
            if (realBody && typeof realBody === "object") {
                const msg =
                    realBody.info ||
                    realBody.error ||
                    realBody.error_msg ||
                    realBody.error_description ||
                    realBody.error_message ||
                    realBody.message ||
                    realBody.msg ||
                    realBody.description;
                const code = realBody.error_code || realBody.code;
                if (msg) {
                    error_msg = msg;
                }

                if (code) {
                    error_code = code;
                }
            }

            // 如果error_msg error_code有任何一个还没有取到
            if (!error_msg || !error_code) {
                const msg =
                    body.info ||
                    body.error ||
                    body.error_msg ||
                    body.error_description ||
                    body.error_message ||
                    body.message ||
                    body.result ||
                    body.msg ||
                    body.description;
                const code = body.error_code || body.code || body.status;

                if (!error_msg) {
                    error_msg = msg;
                }

                if (!error_code) {
                    error_code = code;
                }

            }
        }

        if (!error_code) {
            error_code = response.code;
        }
    } else if (responseError.request) {
        // 请求已发送但是没有收到服务器响应
        if ("onLine" in navigator && navigator.onLine === false) {
            error_code = "OFF_LINE";
        } else if (responseError.code === "ECONNABORTED") {
            error_code = 504;
            error_msg = `网络请求超时(${responseError.config.timeout}ms)，请确认网络正常并重试`;
        }
    } else {
        // 请求未发出
        error_msg = responseError.message;
    }

    if (!error_code) {
        error_code = -1;
    }
    if (!error_msg) {
        error_msg =
            ERROR_MSG[error_code] ||
            response.msg ||
            `抱歉，当前请求异常(${error_code})`;
    }
    if (ERROR_MSG[error_code]) {
        error_msg = ERROR_MSG[error_code];
    }
    // console.log('error_msg', error_msg);
    const error = new Error(error_msg);
    error.code = error_code;
    error.msg = error_msg;
    error.response = response;
    console.log("error", error);
    store.commit('SET_LOADING', { show: false })


    if (error.msg && store.getters["showHttpMsg"])
        errorTip(error.msg)

    return Promise.reject(error);
}

//这里其实应该独立出去成一个文件,时间紧急没考虑到
function _request(
    {
        url,
        data,
        contentType = "application/json",//"application/x-www-form-urlencoded",
        loading = true,
        showMsg = true,
        isDataQueryString = true,
        responseType
    },
    method
) {
    store.commit('SET_LOADING', { show: loading })
    // if (method != "get") {
    store.commit('SET_SHOW_HTTP_MSG', showMsg)
    // }

    if (/get|delete/.test(method)) {
        if (isDataQueryString) {
            data = {
                params: data
            };
        } else {
            data = {
                data
            };
        }

        if (data && data.params) {
            data.params.t = new Date().getTime()
            // if (data.params.openid === undefined)
            //     data.params.openid = defaultOpenid
        }
        // console.log('data00000', JSON.parse(JSON.stringify(data)))

    }
    if (data) {
        // if (data.openid === undefined)
        //     data.openid = defaultOpenid
    }

    if(responseType)
         data.responseType=responseType
    return http[method](url, data, {
        headers: {
            "Content-Type": contentType
        }
    });
}



export default {
    post: function (params) {
        return _request(params, "post");
    },
    get: function (params) {
        return _request(params, "get");
    },
    delete: function (params) {
        return _request(params, "delete");
    },
    put: function (params) {
        return _request(params, "put");
    },
    jsonp: function ({ url, data, timeout = 5000 }) {
        if (!url) throw new Error("url is necessary");
        const callback = "CALLBACK" + Math.random().toString().substr(9, 18);

        const script = document.createElement("script");
        script.setAttribute("type", "text/javascript");

        const headEle = document.getElementsByTagName("head")[0];

        let ret = "";
        if (data) {
            if (typeof data === "string") ret = "&" + data;
            else if (typeof data === "object") {
                for (let key in data)
                    ret += "&" + key + "=" + encodeURIComponent(data[key]);
            }
        }
        script.src = `${url}?callback=${callback}${ret}`;

        return new Promise((resolve, reject) => {
            var timer;
            if (timeout) {
                timer = setTimeout(function () {
                    cleanup();
                    ElNotification({
                        title: "提示",
                        message: "服务器繁忙,请稍后再试",
                        type: "error",
                        duration: 5 * 1000
                    });
                    // reject(new Error("请求超时"));
                    // console.log('请求超时');
                    reject("请求超时");
                }, timeout);
            }

            function cleanup() {
                if (script.parentNode) script.parentNode.removeChild(script);
                if (timer) clearTimeout(timer);
            }

            window[callback] = res => {
                if (res.errorCode == "21300014" || res.errorCode == "21300001") {

                } else {
                    resolve(res);
                }

                // headEle.removeChild(script);
                cleanup();
                delete window[callback];
            };
            headEle.appendChild(script);
        });
    }
};

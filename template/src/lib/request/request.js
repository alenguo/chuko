/**
 * @author chauvetxiao
 * @date 2018-02-26
 *
 * 统一的请求组件
 * <p>
 * 在底层统一登录、授权并对回调进行处理
 * </p>
*/

const ContentTypeJson = 'application/json';
const ContentTypeForm = 'application/x-www-form-urlencoded';

const config = require('../../config/app.config');
const storage = require('../storage/storage');

// 常量先分离，以便未来国际化
const NATE_ERR_TITLE   = '网络异常';
const NATE_ERR_TEXT    = '请确保网络通畅，并重试';
const SYS_ERR_TEXT     = '系统繁忙，请稍后重试';
const NATE_ERR_BUTTON  = '确定';
const NO_AUTH_TITLE    = '用户未授权';
const NO_AUTH_TEXT     = '如需正常使用此小程序服务，请点击确定，允许微信授权';
const LOGIN_ERR_TITLE  = '登录失败';

let isReTryLogin = false;
let reloginWaitQueue = [];
let maxTryLogin = config.request.max_try || 3;
let appType = config.request.app_type;

const wxLogin = function () {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: resolve,
            fail: reject,
        });
    });
};

const wxGetUserInfo = function () {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo({
            withCredentials: true,
            success: resolve,
            fail: reject,
        });
    });
};

var assignGlobalSession = function (data) {
    var session = getSessionInfo();

    return Object.assign(data || {}, {
        token: session.token,
        vid: session.vid,
        skey: session.skey,
        type: session.type,
        corpid: session.corpid
    });
};

const httpStatusCheck = function (response) {
    var errText;

    if (response.statusCode !== 200) {
        errText = /^5\d+/g.test(response.statusCode) ? SYS_ERR_TEXT : NATE_ERR_TEXT;

        wx.showModal({
            showCancel: false,
            title: NATE_ERR_TITLE,
            content: errText,
            confirmText: NATE_ERR_BUTTON,
        });
        return false;
    }
    return true;
};

const checkLogin = function (options) {
    return new Promise(function (resolve, reject) {
        var session = getSessionInfo();

        if ((session.skey && session.token) || (options.ignore === true)) {
            resolve();
        }
        else {
            reject(new Error('empty session'));
        }
    });
};

const setSessionInfo = function (session) {
    storage.initNameSpace(session.vid, function(oldNs, oldNsData) {
        if (oldNs === 'default_ns' && oldNsData['freego']) {
            storage.setStorage('freego', oldNsData['freego']);
        }
    });

    storage.setStorage('session', session);
};

const getSessionInfo = function () {
    return storage.getStorage('session') || {};
};

export const doLogin = function (unsilent) {

    var freego = storage.getStorage('freego') || {};

    return new Promise(function (resolve, reject) {
        wxLogin().then(function (codeInfo) {
            wxGetUserInfo().then(function (userInfo) {
                var loginCode = codeInfo;

                if (loginCode && userInfo && userInfo.encryptedData && userInfo.iv) {
                    wx.request({
                        url: config.request.api_prefix + 'xcx/login',
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            type: appType,
                            code: loginCode.code,
                            encrypted_data: userInfo.encryptedData,
                            iv: userInfo.iv,
                            strcorpid: '',
                        },
                        header: {
                            'cookie': freego.cookie || '',
                            'Content-Type': ContentTypeForm,
                        },
                        success: function (res) {
                            var tmpData = res.data.data;

                            if (httpStatusCheck(res) && tmpData) {
                                if ('skey' in tmpData) {
                                    setSessionInfo({
                                        gid: tmpData.gid,
                                        skey: tmpData.skey,
                                        token: tmpData.token_base64,
                                        vid: tmpData.vid,
                                        corpid: tmpData.corpid,
                                        type: appType,
                                        corpname: tmpData.corp_name,
                                    });

                                    resolve(res);
                                }
                                else if (tmpData.status === 'NotExistMember') {
                                    // TODO: 处理异常，考虑跳转到另外一个独立的小程序进行企业加入流程
                                }
                                else {
                                    reject(res);
                                }
                            }
                            else {
                                reject(res);
                            }
                        },
                        fail: reject,
                    });
                }
                else if (!unsilent) {
                    wx.showModal({
                        content: LOGIN_ERR_TITLE,
                        showCancel: false,
                    });
                }
            }).catch(function () {
                if (!unsilent) {
                    wx.showModal({
                        title: NO_AUTH_TITLE,
                        content: NO_AUTH_TEXT,
                        showCancel: false,
                        success: function () {
                            wx.openSetting();
                        },
                    });
                }
            });
        });
    });
};

/**
 * 通用的请求接口方法
 * 配置 ignore:true ，可以不进行登录态校验
 */
export const request = function (options) {

    var freego = storage.getStorage('freego') || {};

    // 发起请求
    const makeRequest = function (resolve, reject) {

        options.success = function (response) {

            if (httpStatusCheck(response)) {
                if (response.data && response.data.result && response.data.result.errCode === -3) {
                    options.tryTimes = options.tryTimes || 0;
                    options.tryTimes++;

                    if (options.tryTimes < maxTryLogin) {
                        if (!isReTryLogin) {

                            isReTryLogin = true;
                            reloginWaitQueue = [];

                            doLogin().then(function () {
                                isReTryLogin = false;

                                options.data = assignGlobalSession(options.data);
                                wx.request(options);

                                reloginWaitQueue.forEach(function (v, k) {
                                    v.data = assignGlobalSession(v.data);
                                    wx.request(v);
                                });
                            }).catch(function () {
                                isReTryLogin = false;
                            });
                        }
                        else {
                            reloginWaitQueue.push(options);
                        }
                    }
                    else {
                        resolve({
                            data: {
                                retcode: -102,
                                retmsg: 'login abort',
                            },
                        });
                    }
                }
                else {
                    resolve(response);
                }
            }
            else {
                reject(response);
            }
        };

        options.fail = function (res) {
            wx.showModal({
                showCancel: false,
                title: NATE_ERR_TITLE,
                content: NATE_ERR_TEXT,
                confirmText: NATE_ERR_BUTTON,
            });

            reject(res);
        };
        // 如果一些特殊的请求不使用通用的地址前缀，可以使用完整地址
        options.url = /^http/g.test(options.url) ? options.url : config.request.api_prefix + options.url;
        options.data = assignGlobalSession(options.data);
        options.method = options.method || 'GET';
        options.header = Object.assign(options.header || {}, {
            'cookie': freego.cookie || '',
            'Content-Type': options.method === 'GET' ? ContentTypeJson : ContentTypeForm,
        });

        wx.request(options);
    };

    return new Promise(function (resolve, reject) {

        checkLogin(options).then(function () {
            makeRequest(resolve, reject);
        }).catch(function () {
            doLogin().then(function () {
                makeRequest(resolve, reject);
            }).catch(function() {
                wx.showModal({
                    content: LOGIN_ERR_TITLE,
                    showCancel: false,
                });
            });
        });
    });
};

export default{
    request,
    doLogin,
}

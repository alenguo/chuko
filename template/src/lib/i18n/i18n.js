/**
 * @author chauvetxiao
 * @date 2018-03-09
 *
 * 国际化脚本
 * <p>
 * 1、自动探测当前语言类型，也可手动设置语言
 * 2、可调用get接口获取语言配置字符串并进行逻辑格式化操作
 * </p>
*/

let _lang = 'zh_CN';
let LANG_CONFIG = require('../../config/lang.config');

export let _setLang = function(lang) {
    _lang = lang || 'zh_CN';
};

export let _getLang = function() {
    return _lang;
};

let _format = function(tpl, param) {
    param = param || {};

    var tmp = tpl;
    var key;

    for (key in param) {
        if (param.hasOwnProperty(key)) {
            tmp = tmp.replace(new RegExp('\\$\\{' + key + '\\}', 'gm'), param[key]);
        }
    }
    return tmp;
};

/**
 * 合并国际化对象到页面执行的作用域
 */
export let _autoCombine = function(context) {
    var keys = Object.keys(LANG_CONFIG.zh_CN);
    var tmpData = context.data;

    keys.forEach(function(v, k) {
        tmpData[v] = _get(v);
    });

    context.setData(tmpData);
};

/**
 * 检测当前的语言类型
 */
let _detectSysLang = function() {
    var systemInfo = wx.getSystemInfoSync();

    _setLang((systemInfo.language == 'zh' || systemInfo.language == 'zh_CN') ? 'zh_CN' : 'en');
};

/**
* 根据语言和KEY获取对应的wording
* @param  {String} key  字符串键值
* @param  {String} lang  语言类型
* @param  {data} object  格式化对象
* @return {String}   语言目标字符串
*/
export let _get = function (key, data, lang) {
    lang = lang || _lang;

    return LANG_CONFIG[lang] ? _format(LANG_CONFIG[lang][key], data) : '';
};

_detectSysLang();

export default {
    get: _get,
    setLang: _setLang,
    getLang: _getLang,
    autoCombine: _autoCombine
}
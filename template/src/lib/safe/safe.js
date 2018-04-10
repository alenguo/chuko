/**
 * 安全相关的接口，XSS防范相关的转换接口
 * @class amount
 * @module global
 * @author chauvetxiao
 * @date  2017-10-13
 */

export let safeObj = {
    /**
     * 过滤URL脚本，目前此方法已经废弃，可以直接使用 $.filterScript 代替
     * @method filterScript
     * @param str 字符串
     * @return {String} 进行XSS过滤后的字符串
     */
    filterScript: function (str) {
        str = str || '';
        str = str.replace(/<.*>/g, ''); // 过滤标签注入
        str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
        str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
        return str;
    },
    /**
     * 转义<>&字符
     * 安全输出innerHTML内容
     *
     * @method outputSafeContent
     * @param {String} str 需要进行安全输出的字符串
     * @return {String} 进行安全处理后的字符串
     */
    outputSafeContent: function (str) {
        return str.replace('&', '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;').replace(/\"/g, '&quot;');
    },
    /**
     * @function escapeHTML 转义html脚本 < > & " '
     * @param a -
     *            字符串
     */
    escapeHTML: function (a) {
        a = '' + a;
        return a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

    },
    /**
     * @function unescapeHTML 还原html脚本 < > & " '
     * @param a -
     *            字符串
     */
    unescapeHTML: function (a) {
        a = '' + a;
        return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    },
};

export default safeObj;
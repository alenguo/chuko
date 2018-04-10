/**
 * 字符串操作相关的接口
 * @class string
 * @module global
 * @author chauvetxiao
 * @date  2017-10-13
 */

export let stringObj = {
    /**
     * 匹配字符串是否以prefix开头
     * @method startsWith
     * @param {String} instr 输入的字符串
     * @param {String} prefix 前缀
     * @param {Number} offset 起始的偏移位置
     * @return {Boolean} true/false
     */
    startsWith: function (instr, prefix, offset) {
        offset = typeof (offset) === 'number' ? offset : 0;

        if (instr.length >= (prefix.length + offset)) {
            return (instr.substr(offset, prefix.length) == prefix);
        }

        return false;
    },
    /**
     * 匹配字符串是否以suffix结尾
     * @method endsWith
     * @param {String} instr 输入的字符串
     * @param {String} suffix
     * @return {Boolean} true/false
     */
    endsWith: function (instr, suffix) {
        if (instr.length >= suffix.length) {
            return (instr.substr((instr.length - suffix.length), suffix.length) == suffix);
        }

        return false;
    },
    /**
     * 去空字符
     * @method trim
     * @param {String} instr 输入的字符串
     * @return {String} 去空后的字符串
     */
    trim: function (instr) {
        var pattern = /[\s ]+/gmi;
        var tmp = instr.replace(pattern, '');

        return tmp;
    },
    /**
     * 去左空字符
     * @method trimLeft
     * @param {String} instr 输入的字符串
     * @return {String} 去空后的字符串
     */
    trimLeft: function (instr) {
        var pattern = /^[\s ]+/gmi;
        var tmp = instr.replace(pattern, '');

        return tmp;
    },
    /**
     * 去右空字符
     * @method trimRight
     * @param {String} instr 输入的字符串
     * @return {String} 去空后的字符串
     */
    trimRight: function (instr) {
        var pattern = /[\s ]+$/gmi;
        var tmp = instr.replace(pattern, '');

        return tmp;
    },
    /**
     * 去两侧空字符
     * @method trimBoth
     * @param {String} instr 输入的字符串
     * @return {String} 去空后的字符串
     */
    trimBoth: function (instr) {
        return this.trimRight(this.trimLeft(instr));
    },
    /**
     * 字符串长度，将中文看成两个字符计算
     * @method bytes
     * @param {String} instr 输入的字符串
     * @return {Number} 字符串长度
     */
    bytes: function (instr) {
        return instr.replace(/[^\u0000-\u00FF]/gmi, '**').length;
    },
    /**
     * 前导填充
     * @method fillBefore
     * @param {String} instr 输入的字符串
     * @param {String} chr 填充的字符
     * @param {Number} bit 位数
     * @return {String} 填充后的字符串
     */
    fillBefore: function (instr, chr, bit) {
        var len = instr.length;
        var shift = bit - len + 1;
        var str = instr;

        if (shift > 0) {
            var a = new Array(shift);

            str = a.join(chr) + str;
            a = null;
        }

        return str;
    },
    /**
     * 向后填充
     * @method fillAfter
     * @param {String} instr 输入的字符串
     * @param {String} chr 填充的字符
     * @param {Number} bit 位数
     * @return {String} 填充后的字符串
     */
    fillAfter: function (instr, chr, bit) {
        var len = instr.length;
        var shift = bit - len + 1;
        var str = instr;

        if (shift > 0) {
            var a = new Array(shift);

            str = str + a.join(chr);
            a = null;
        }

        return str;
    }
};

export default stringObj;
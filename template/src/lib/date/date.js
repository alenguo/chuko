/**
 * 日期操作相关的接口
 * @class date
 * @module global
 * @author chauvetxiao
 * @date  2017-10-13
 */

let I18N = require('./date-lang');
let str = require('../string/string');

export let instance = {
    /**
     * 格式化日期文本为日期对象
     *
     * @method parseFromString
     * @param {String} date 文本日期
     * @param {String} [p:%Y-%M-%d %h:%m:%s] 文本日期的格式
     * @return {Date}
     */
    parseFromString: function (date, p) {
        p = p || '%Y-%M-%d %h:%m:%s';
        p = p.replace(/\-/g, '\\-');
        p = p.replace(/\|/g, '\\|');
        p = p.replace(/\./g, '\\.');
        p = p.replace(/\+/g, '\\+');
        p = p.replace('%Y', '(\\d{4})');
        p = p.replace('%M', '(\\d{1,2})');
        p = p.replace('%d', '(\\d{1,2})');
        p = p.replace('%h', '(\\d{1,2})');
        p = p.replace('%m', '(\\d{1,2})');
        p = p.replace('%s', '(\\d{1,2})');

        var regExp = new RegExp('^' + p + '$'),
            group = regExp.exec(date),
            Y = (group[1] || 0) - 0,
            M = (group[2] || 1) - 1,
            d = (group[3] || 0) - 0,
            h = (group[4] || 0) - 0,
            m = (group[5] || 0) - 0,
            s = (group[6] || 0) - 0;

        return new Date(Y, M, d, h, m, s);
    },

    /**
     * 格式化日期为指定的格式
     *
     * @method format
     * @param {Date} date
     * @param {Object} options
     * @return {String}
     *
     * @pattern
     *
     * %Y: 年
     * %M：月
     * %d: 日
     * %h: 小时
     * %m: 分钟
     * %s: 秒
     * %D: 上/下午
     * %W: 周三/周日
     * %R: 一分钟前
     * %WN: 下周一/本周一
     * %LY: 语言包格式化的年参数
     * %LM: 语言包格式化的月参数
     * %LD: 语言包格式化的日参数
     *
     * @example
     *
     * date2Str(date,{
     *     "pattern": "%Y-%M-%d %h:%m:%s %D %W",
     *     "isFill" : false,         
     *     "lang"   : "zh_CN"
     * })
     *
     * %Y-%M-%d %h:%m:%s %WN %D => 2017-10-16 10:54:05 本周一 上午
     */
    format: function (date, options) {
        var Y = date.getFullYear(),
            M = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            D = date.getHours() < 12 ? I18N.get('am', options.lang) : I18N.get('pm', options.lang),
            W = _getCurrentWeekInfo(date, options.lang, true),
            R = options.noRange ? '' : _getDateRangeInfo(date, options.lang),
            WN = _getWeekInfoFromNow(date, options.lang),
            LY = I18N.get('year', options.lang),
            LM = I18N.get('month', options.lang),

            // NOTE:此处使用seven获取“日”对应的翻译文本，不是太合理，如果后续有国际化要求再和产品同步文案
            LD = I18N.get('seven', options.lang);

        var isFill = options.isFill || true;

        if (isFill) {
            M = M < 10 ? '0' + M : M;
            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
        }

        var p = options.pattern || '%Y-%M-%d %h:%m:%s';

        p = p.replace(/%Y/g, Y).replace(/%M/g, M).replace(/%d/g, d).replace(/%h/g, h).replace(/%m/g, m).replace(/%s/g, s).replace(/%WN/g, WN).replace(/%D/g, D).replace(/%LY/g, LY).replace(/%LM/g, LM).replace(/%LD/g, LD).replace(/%W/g, W).replace(/%R/g, R);

        return p;
    },

    /**
     * 判断是否是闰年
     *
     * @method leapYear
     * @param {Date} indate 输入的日期
     * @return {Object} 对象(是否是闰年，各月份的天数集，当前月的天数)
     */
    leapYear: function (indate) {
        var days = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        var isLeap = false;
        var d = 365;

        if ((indate.getFullYear() % 4 === 0 && indate.getFullYear() % 100 !== 0) || indate.getFullYear() % 400 === 0) {
            days.splice(1, 1, 29);
            isLeap = true;
            d = 366;
        } else {
            days.splice(1, 1, 28);
            isLeap = false;
            d = 365;
        }

        return {
            isLeapYear: isLeap,
            days: days,
            yearDays: d,
            monthDays: days[indate.getMonth()]
        };
    },

    /**
     * 日期比较(d1 - d2)
     *
     * @method dateDiff
     * @param {Date} d1
     * @param {Date} d2
     * @param {String} [cmpType:ms] 比较类型, 可选值: Y/M/d/h/m/s/ms -> 年/月/日/时/分/妙/毫秒
     * @return {Float}
     */
    dateDiff: function (d1, d2, cmpType) {
        var diff = 0;
        switch (cmpType) {
            case 'Y':
                diff = d1.getFullYear() - d2.getFullYear();
                break;
            case 'M':
                diff = (d1.getFullYear() - d2.getFullYear()) * 12 + (d1.getMonth() - d2.getMonth());
                break;
            case 'd':
                diff = (d1 - d2) / 86400000;
                break;
            case 'h':
                diff = (d1 - d2) / 3600000;
                break;
            case 'm':
                diff = (d1 - d2) / 60000;
                break;
            case 's':
                diff = (d1 - d2) / 1000;
                break;
            default:
                diff = d1 - d2;
                break;
        }
        return diff;
    },

    /**
     * 日期相加
     *
     * @method dateAdd
     * @param char interval 间隔参数
     *        y 年
     *        q 季度
     *        n 月
     *        d 日
     *        w 周
     *        h 小时
     *        m 分钟
     *        s 秒
     *        i 毫秒
     * @param {Date} indate 输入的日期
     * @param {Number} offset 差值
     * @return {Date} date 相加后的日期
     */
    dateAdd: function (interval, indate, offset) {
        var newDate = new Date(indate);

        switch (interval) {
            case 'y':
                newDate.setFullYear(indate.getFullYear() + offset);
                break;
            case 'q':
                newDate.setMonth(indate.getMonth() + (offset * 3));
                break;
            case 'n':
                newDate.setMonth(indate.getMonth() + offset);
                break;
            case 'd':
                newDate.setDate(indate.getDate() + offset);
                break;
            case 'w':
                newDate.setDate(indate.getDate() + (offset * 7));
                break;
            case 'h':
                newDate.setHours(indate.getHours() + offset);
                break;
            case 'm':
                newDate.setMinutes(indate.getMinutes() + offset);
                break;
            case 's':
                newDate.setSeconds(indate.getSeconds() + offset);
                break;
            case 'i':
                newDate.setMilliseconds(indate.getMilliseconds() + offset);
                break;
            default:
                newDate.setMilliseconds(indate.getMilliseconds() + offset);
                break;
        }
        return newDate;
    },

    /**
     * 判断当前日期是否为周末
     *
     * @method isWeekend
     * @param  {Date}  date 输入的日期
     * @return {Boolean}   是否为周末
     */
    isWeekend: function (date) {
        try {
            return date.getDay() == 0 || date.getDay() == 6;
        } catch (e) {
            return false;
        }
    }
};

/**
 * 获取当前日期是周几
 * @param  {Date} date 当前日期
 * @param  {String} lang  语言选项
 * @param  {Boolean} isShort  true:周一  false: 星期一
 * @return {String}   目标日期字符串
 */
let _getCurrentWeekInfo = function (date, lang, isShort) {
    var day = date.getDay();
    var tail = isShort ? 'Z' : '';
    var weekarr = [ I18N.get('sunday' + tail, lang), I18N.get('monday' + tail, lang), I18N.get('tuesday' + tail, lang),
        I18N.get('wednesday' + tail, lang), I18N.get('thursday' + tail, lang), I18N.get('friday' + tail, lang),
        I18N.get('saturday' + tail, lang) ];

    return weekarr[day] || '';
}

/**
 * 把数字翻译为对应的中文或者英文日期
 * @param  {Int} number 1...7
 * @param  {String} lang  语言选项
 * @return {String}   翻译后中文的一、二...、七
 */
let _getWeekDayFromNum = function (number, lang) {
    var weekarr = [ I18N.get('seven', lang), I18N.get('one', lang), I18N.get('two', lang), I18N.get('three', lang),
        I18N.get('four', lang), I18N.get('five', lang), I18N.get('fix', lang) ];

    return weekarr[number] || '';
}

/**
 * 把目标时间和当前时间比较转换为时间区间
 * @param  {Date} targetDate 目标时间
 * @param  {String} lang  语言选项
 * @return {String}  转换后的字符串  52分钟前
 */
let _getDateRangeInfo = function (targetDate, lang) {
    var now = new Date(),
        diffY = instance.dateDiff(now, targetDate, 'Y');

    // 跨年的情况直接返回年份信息
    if (diffY >= 1) {
        return instance.format(targetDate, {'pattern': '%Y-%M-%d', 'noRange': true});
    }

    var pre_date = instance.dateAdd('d', now, -7);
    if (targetDate.getTime() <= pre_date) {
        return instance.format(targetDate, {'pattern': '%M/%d', 'noRange': true});
    }

    pre_date = instance.dateAdd('d', now, -2);
    if (targetDate.getTime() <= pre_date) {
        return _getCurrentWeekInfo(targetDate, lang, false);
    }

    pre_date = instance.dateAdd('d', now, -1);
    if (targetDate.getTime() <= pre_date) {
        return I18N.get('yesterday', lang);
    }

    var dalteH = instance.dateDiff(now, targetDate, 'h') + '';
    var dalteM = instance.dateDiff(now, targetDate, 'm') + '';

    if (dalteH >= 1) {
        return str.fillBefore(dalteH, '0', 2) + ':' + str.fillBefore(dalteM, '0', 2);
    }

    return parseInt(dalteM) + I18N.get('minuteAgo', lang);
}

/**
 * 判断目标日期距离当前日期是处于本周还是下周
 * @param  {Date} targetDate 比较的目标日期
 * @param  {String} lang  语言类型
 * @return {String} 本周/下周/""
 */
let _getWeekInfoFromNow = function (targetDate, lang) {
    var now = new Date(),
        day = now.getDay(),
        date = now.getDate(),
        month = now.getMonth(),
        year = now.getFullYear();

    var timeStamp = targetDate.getTime();
    var currentWeekStartDate = new Date(year, month, date - day + 1);
    var nextWeekStartDate = new Date(year, month, date + (8 - day));
    var nextWeekEndDate = new Date(year, month, date + (15 - day));

    if (timeStamp >= currentWeekStartDate.getTime() && timeStamp < nextWeekStartDate.getTime()) {
        return I18N.get('crtWeek', lang) + _getWeekDayFromNum(day, lang);
    }
    else if (timeStamp >= nextWeekStartDate.getTime() && timeStamp < nextWeekEndDate.getTime()) {
        return I18N.get('nextWeek', lang) + _getWeekDayFromNum(day, lang);
    }
    return '';
}

export default instance;
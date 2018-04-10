/**
 * 时间操作相关的语言包
 * @class date-lang
 * @module global
 * @author chauvetxiao
 * @date  2017-10-13
 *
 */

export let LANG_CONFIG = {
    zh_CN: {
        'am': '上午',
        'pm': '下午',
        'day': '天',
        'crtWeek': '本周',
        'nextWeek': '下周',
        'hour': '小时',
        'year': '年',
        'month': '月',

        'sunday': '星期日',
        'monday': '星期一',
        'tuesday': '星期二',
        'wednesday': '星期三',
        'thursday': '星期四',
        'friday': '星期五',
        'saturday': '星期六',

        'yesterday': '昨天',
        'today': '今天',
        'minuteAgo': '分钟前',
        'justNow': '刚刚',

        'sundayZ': '周日',
        'mondayZ': '周一',
        'tuesdayZ': '周二',
        'wednesdayZ': '周三',
        'thursdayZ': '周四',
        'fridayZ': '周五',
        'saturdayZ': '周六',

        'one': '一',
        'two': '二',
        'three': '三',
        'four': '四',
        'five': '五',
        'six': '六',
        'seven': '日',
    },

    en: {
        'am': 'AM',
        'pm': 'PM',
        'day': ' day(s) ',
        'crtWeek': 'This week',
        'nextWeek': 'Next week',
        'hour': ' hour(s) ',
        'year': 'year',
        'month': 'Month',

        'sunday': 'Sunday',
        'monday': 'Monday',
        'tuesday': 'Tuesday',
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday',

        'yesterday': 'yesterday',
        'today': 'Today',
        'minuteAgo': 'min(s) ago',
        'justNow': 'just now',

        'sundayZ': 'Sun',
        'mondayZ': 'Mon',
        'tuesdayZ': 'Tue',
        'wednesdayZ': 'Wed',
        'thursdayZ': 'Thu',
        'fridayZ': 'Fri',
        'saturdayZ': 'Sat',

        'one': 'Mon',
        'two': 'Tue',
        'three': 'Wed',
        'four': 'Thu',
        'five': 'Fri',
        'six': 'Sat',
        'seven': 'Sun',
    }
}

/**
 * 根据语言和KEY获取对应的wording
 * @param  {String} key  字符串键值
 * @param  {String} lang  语言类型
 * @return {String}   语言目标字符串
 */
export let _get = function (key, lang) {
    lang = lang || 'zh_CN';

    return LANG_CONFIG[lang] ? LANG_CONFIG[lang][key] : '';
}

export default {
    zh_CN: LANG_CONFIG.zh_CN,
    en: LANG_CONFIG.en,
    get: _get
}
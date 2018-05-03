349
var holidayArry = [1465401600, 1465488000, 1465574400, 1473868800, 1473955200, 1474041600, 1475251200, 1475337600, 1475424000, 1475510400, 1475596800, 1475683200, 1475769600, 1483113600, 1483200000, 1483286400, 1485446400, 1485532800, 1485619200, 1485705600, 1485792000, 1485878400, 1485964800, 1491062400, 1491148800, 1491235200, 1493395200, 1493481600, 1493568000, 1495900800, 1495987200, 1496073600, 1506787200, 1506873600, 1506960000, 1507046400, 1507132800, 1507219200, 1507305600, 1507392000, 1514736000, 1518624000, 1518710400, 1518796800, 1518883200, 1518969600, 1519056000, 1519142400, 1522857600, 1522944000, 1523030400, 1524931200, 1525017600, 1525104000, 1529251200, 1537718400, 1538323200, 1538409600, 1538496000, 1538582400, 1538668800, 1538755200, 1538841600];
var workdayArry = [1475856000, 1475942400, 1485014400, 1486137600, 1490976000, 1495814400, 1506700800, 1518278400, 1519401600, 1523116800, 1524844800, 1538150400, 1538236800];
/* eslint-disable */
var timeFormat;
timeFormat = {
    /**
     * 格式化日期文本为日期对象
     *
     * @method str2Date
     * @param {String} date 文本日期
     * @param {String} [p:%Y-%M-%d %h:%m:%s] 文本日期的格式
     * @return {Date}
     */
    str2Date: function (date, p) {
        p = p || '%Y-%M-%d %h:%m:%s';
        p = p.replace(/\-/g, '\\-');
        p = p.replace(/\|/g, '\\|');
        p = p.replace(/\./g, '\\.');
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
     * @method date2Str
     * @param {Date} date
     * @param {String} p 输出格式, %Y/%M/%d/%h/%m/%s的组合
     * @param {Boolean} [isFill:false] 不足两位是否补0
     * @return {String}
     */
    date2Str: function (date, p, isFill) {
        var Y = date.getFullYear(),
            M = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();

        if (isFill) {
            M = (M < 10) ? ('0' + M) : M;
            d = (d < 10) ? ('0' + d) : d;
            h = (h < 10) ? ('0' + h) : h;
            m = (m < 10) ? ('0' + m) : m;
            s = (s < 10) ? ('0' + s) : s;
        }
        p = p || '%Y-%M-%d %h:%m:%s';
        p = p.replace(/%Y/g, Y).replace(/%M/g, M).replace(/%d/g, d).replace(/%h/g, h).replace(/%m/g, m).replace(/%s/g, s);
        return p;
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
        switch (interval) {
            case 'y':
                indate.setFullYear(indate.getFullYear() + offset);
                break;
            case 'q':
                indate.setMonth(indate.getMonth() + (offset * 3));
                break;
            case 'n':
                indate.setMonth(indate.getMonth() + offset);
                break;
            case 'd':
                indate.setDate(indate.getDate() + offset);
                break;
            case 'w':
                indate.setDate(indate.getDate() + (offset * 7));
                break;
            case 'h':
                indate.setHours(indate.getHours() + offset);
                break;
            case 'm':
                indate.setMinutes(indate.getMinutes() + offset);
                break;
            case 's':
                indate.setSeconds(indate.getSeconds() + offset);
                break;
            case 'i':
                indate.setMilliseconds(indate.getMilliseconds() + offset);
                break;
            default:
                indate.setMilliseconds(indate.getMilliseconds() + offset);
                break;
        }
        return indate;
    },
    customFormat: function (milliseconds, hideTime) {
        var date = new Date(milliseconds);
        var day = CDate.date2Str(date, '%Y-%M-%d', true);
        var hours = date.getHours();

        return hideTime ? day : (day + ' ' + (hours < 12 ? "上午" : "下午"));
    },
    dateDiffWithoutWeekend: function (d1, d2) {
        var diff = 0;
        var holiday = 0;

        if (d1 > d2) {

            var diffDays = (d1 - d2) / 86400000;
            var tmp;

            if (d1.getDay() != d2.getDay() && CDate.isWeekend(d1)) {
                diffDays = Math.ceil(diffDays);
            }

            for (var i = 1; i <= diffDays; i++) {
                tmp = new Date(d2.getTime());
                tmp = new Date(tmp.setDate(d2.getDate() + i));

                if (!CDate.isWeekend(tmp)) {
                    diff++;
                }
                else {
                    holiday++;
                }
            }
        }

        return {
            diff: diff,
            holiday: holiday,
        };
    },
    isWeekend: function (date) {
        try {
            return date.getDay() == 0 || date.getDay() == 6;
        }
        catch (e) {
            return false;
        }
    },
    /**
     * 判断当前日期是否是调休要上班的日期
     * @param date
     */
    isWorkOffDay: function (date) {
        var _date = new Date(date);
        _date.setHours(0, 0, 0, 0);
        _date = _date / 1000;
        var is;
        var time;
        for (time in workdayArry) {
            if (workdayArry[time] == _date) {
                is = true;
                break;
            }
            else {
                is = false;
            }
        }
        return is;
    },
    /**
     * 判断当前日期是否是法定假日
     */
    isHoliday: function (date) {
        var _date = new Date(date);
        _date.setHours(0, 0, 0, 0);
        _date = _date / 1000;
        var is;
        var time;
        for (time in holidayArry) {
            if (holidayArry[time] == _date) {
                is = true;
                break;
            }
            else {
                is = false;
            }
        }
        return is;
    },
    getNextWeekDay: function (date) {
        var newDate = new Date(date.getTime());

        while (CDate.isWeekend(newDate)) {
            newDate = new Date(newDate.setDate(newDate.getDate() + 1));
            newDate = new Date(newDate.setHours(0));
            newDate = new Date(newDate.setMinutes(0));
            newDate = new Date(newDate.setSeconds(0));
            newDate = new Date(newDate.setMilliseconds(0));
        }

        return newDate;
    },
    getNextDiffDays: function (date) {
        var count = 0;

        while (CDate.isWeekend(date)) {
            date = new Date(date.setDate(date.getDate() + 1));
            count++;
        }
        return count;
    },
    // 按小时请假
    getDiffDaysForHours: function (startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        var offsetWeekDay = 0; // 假期天数
        var offsetWeekEnd = 0; // 周末天数
        var weekdayHours = 0;// 假期小时
        var weekendHours = 0;// 周末小时

        var startTime = new Date(startDate);
        var endTime = new Date(endDate);


        // 请假总小时
        weekdayHours = (endTime - startTime);

        // 周末总小时 start
        // 掐头去尾
        var starHours = 0;
        var endHours = 0;

        // 如果起止时间是0点则偏移1分钟
        if (startTime.getHours() == 0 && startTime.getMinutes() == 0) {
            // startTime.setMinutes(1);
        }

        if (endTime.getHours() == 0 && endTime.getMinutes() == 0) {
            endTime.setMinutes(1);
        }

        if (startTime.getDay() == 6 || startTime.getDay() == 0) {
            var startTimeWithZero = new Date(startTime);
            startTimeWithZero.setHours(0, 0, 0, 0);
            starHours = 24 * 60 * 60 * 1000 - (startTime - startTimeWithZero);
        }
        if (endTime.getDay() == 6 || endTime.getDay() == 0) {
            var endTimeWithZero = new Date(endTime);
            endTimeWithZero.setHours(0, 0, 0, 0);
            endHours = (endTime - endTimeWithZero);

        }

        while (startDate.getTime() <= endDate.getTime()) {
            if (CDate.isWeekend(startDate)) {
                offsetWeekEnd += 1;
            }
            startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            startDate.setHours(0, 0, 0, 0);
        }


        if (endHours > 0) {
            offsetWeekEnd -= 1;
        }
        if (starHours > 0) {
            offsetWeekEnd -= 1;
        }
        weekendHours = starHours + endHours + offsetWeekEnd * 60 * 60 * 24 * 1000;

        // 周末总小时 end

        weekendHours = weekendHours / (60 * 60 * 1000); // 周末总小时
        weekdayHours = weekdayHours / (60 * 60 * 1000); // 休假总小时

        offsetWeekDay = parseInt((weekdayHours - weekendHours) / 24);
        offsetWeekEnd = parseInt((weekendHours) / 24);


        var info = {
            weekday: (offsetWeekDay < 0 ? 0 : offsetWeekDay), // 假期天数
            weekend: (offsetWeekEnd < 0 ? 0 : offsetWeekEnd), // 周末天数
            weekdayHours: (weekdayHours - weekendHours) % 24 < 0 ? 0 : ((Math.ceil(((weekdayHours - weekendHours) % 24) * 10)) / 10).toFixed(1), // 假期小时
            weekendHours: weekendHours % 24 < 0 ? 0 : ((Math.ceil((weekendHours % 24) * 10)) / 10).toFixed(1), // 周末小时
        };


        return info;
    },
    /**
     * 去除节假日的工具函数 - 小时
     * @param startDate
     * @param endDate
     * @returns {weekday: *, weekend: *, weekdayHours: *, weekendHours: *}
     */
    getDiffHoursForHoliday: function (startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        var offsetWeekDay = 0; // 假期天数
        var offsetWeekEnd = 0; // 周末天数
        var weekdayHours = 0;// 假期小时
        var weekendHours = 0;// 周末小时

        var startTime = new Date(startDate);
        var endTime = new Date(endDate);

        var holidayDateArry; // 休假日期
        var workdayDateArry; // 调休日期

        // 请假总小时
        weekdayHours = (endTime - startTime);

        // 周末总小时 start
        // 掐头去尾
        var starHours = 0;
        var endHours = 0;

        // 如果起止时间是0点则偏移1分钟
        if (startTime.getHours() == 0 && startTime.getMinutes() == 0) {
            // startTime.setMinutes(1);
        }

        if (endTime.getHours() == 0 && endTime.getMinutes() == 0) {
            endTime.setMinutes(1);
        }

        if (startTime.getDay() == 6 || startTime.getDay() == 0 || CDate.isHoliday(startTime)) {
            if (!CDate.isWorkOffDay(startTime)) {
                var startTimeWithZero = new Date(startTime);
                startTimeWithZero.setHours(0, 0, 0, 0);
                starHours = 24 * 60 * 60 * 1000 - (startTime - startTimeWithZero);
            }

        }
        if (endTime.getDay() == 6 || endTime.getDay() == 0 || CDate.isHoliday(endTime)) {
            if (!CDate.isWorkOffDay(endTime)) {
                var endTimeWithZero = new Date(endTime);
                endTimeWithZero.setHours(0, 0, 0, 0);
                endHours = (endTime - endTimeWithZero);
            }

        }

        // 筛选出周末和节假日
        while (startDate.getTime() <= endDate.getTime()) {
            if (CDate.isWeekend(startDate) || CDate.isHoliday(startDate)) {
                if (!CDate.isWorkOffDay(startDate)) {
                    offsetWeekEnd += 1;
                }

            }
            startDate = new Date(startDate.setDate(startDate.getDate() + 1));
            startDate.setHours(0, 0, 0, 0);
        }


        if (endHours > 0) {
            offsetWeekEnd -= 1;
        }
        if (starHours > 0) {
            offsetWeekEnd -= 1;
        }
        weekendHours = starHours + endHours + offsetWeekEnd * 60 * 60 * 24 * 1000;

        // 周末总小时 end

        // weekendHours = Math.round(weekendHours/(60*60*1000)); //周末总小时
        weekendHours = (weekendHours / (60 * 60 * 1000)); // 周末总小时
        weekdayHours = weekdayHours / (60 * 60 * 1000); // 休假总小时


        var weekDayHoursNum = (weekdayHours - weekendHours) / 24;

        // 当发现结束时间落到了0点，上面补了个1分钟，在这里要重置回去
        // if (weekendHours > 0.01 && weekendHours < 0.5) {
        //     weekendHours = 0;
        // }

        offsetWeekDay = parseInt((weekdayHours - weekendHours) / 24);
        offsetWeekEnd = parseInt((weekendHours) / 24);


        var info = {
            weekday: (offsetWeekDay < 0 ? 0 : offsetWeekDay), // 假期天数
            weekend: (offsetWeekEnd < 0 ? 0 : offsetWeekEnd), // 周末天数
            weekdayHours: (weekdayHours - weekendHours) % 24 < 0 ? 0 : ((Math.ceil(((weekdayHours - weekendHours) % 24) * 10)) / 10).toFixed(1), // 假期小时
            weekendHours: weekendHours % 24 < 0 ? 0 : ((Math.ceil((weekendHours % 24) * 10)) / 10).toFixed(1), // 周末小时
        };


        return info;
    },
    getDiffDays: function (startDate, endDate) {
        var offsetWeekDay = 0;
        var offsetWeekEnd = 0;

        endDate = new Date(endDate.setHours(endDate.getHours() + 12));

        while (startDate < endDate) {
            if (CDate.isWeekend(startDate)) {
                offsetWeekEnd += 12;
            }
            else {
                offsetWeekDay += 12;
            }

            startDate = new Date(startDate.setHours(startDate.getHours() + 12)); // 分两次来叠加 下午加12个小时就到了第二天 造成判断是否是周末错误
        }

        return {
            weekday: offsetWeekDay > 0 ? (offsetWeekDay / 24).toFixed(1) : 0,
            weekend: offsetWeekEnd > 0 ? (offsetWeekEnd / 24).toFixed(1) : 0,
            weekdayHours: offsetWeekDay,
            weekendHours: offsetWeekEnd,
        };
    },
    /**
     * 去除周末和法定节假日的工具函数 - 上午下午
     * @param startDate
     * @param endDate
     * @returns {{weekday: *, weekend: *, weekdayHours: number, weekendHours: number}}
     */
    getDiffDaysForHoliday: function (startDate, endDate) {
        var offsetWeekDay = 0;
        var offsetWeekEnd = 0;

        endDate = new Date(endDate.setHours(endDate.getHours() + 12));

        while (startDate < endDate) {

            if (CDate.isWeekend(startDate) || CDate.isHoliday(startDate)) {

                if (CDate.isWorkOffDay(startDate)) {
                    offsetWeekDay += 12;
                }
                else {
                    offsetWeekEnd += 12;
                }

            }
            else {
                offsetWeekDay += 12;
            }

            startDate = new Date(startDate.setHours(startDate.getHours() + 12)); // 分两次来叠加 下午加12个小时就到了第二天 造成判断是否是周末错误
        }

        return {
            weekday: offsetWeekDay > 0 ? (offsetWeekDay / 24).toFixed(1) : 0,
            weekend: offsetWeekEnd > 0 ? (offsetWeekEnd / 24).toFixed(1) : 0,
            weekdayHours: offsetWeekDay,
            weekendHours: offsetWeekEnd,
        };
    },

    getWeekInfo: function (time) {
        var week_info = '';
        var now = new Date(); // 当前日期
        var nowDayOfWeek = now.getDay(); // 今天本周的第几天
        var nowDay = now.getDate(); // 当前日
        var nowMonth = now.getMonth(); // 当前月
        var nowYear = now.getFullYear(); // 当前年
        var getWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        var getNextWeekStartDate = new Date(nowYear, nowMonth, nowDay + (8 - nowDayOfWeek));
        var getNextNWeekStartDate = new Date(nowYear, nowMonth, nowDay + (15 - nowDayOfWeek));
        var timeStamp = time.getTime();
        if (timeStamp >= getWeekStartDate.getTime() && timeStamp < getNextWeekStartDate.getTime()) {
            week_info = '本周';
        }
        else if (timeStamp >= getNextWeekStartDate.getTime() && timeStamp < getNextNWeekStartDate.getTime()) {
            week_info = '下周';
        }
        return week_info;
    },
    datePreString: function (time) {
        var month = time.getMonth() + 1;
        return time.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate());
    },
    // 带上午和下午的时间转换，例如：2017-04-12 上午
    dateFomateWithAm: function (time, flag) {
        var date = new Date(time * 1000);// .转换成毫秒
        var weekarr = ['日', '一', '二', '三', '四', '五', '六'];
        // 上午下午
        var am = date.getHours() < 12 ? "上午" : "下午";
        if (flag) {
            var week_info = this.getWeekInfo(date);
            var week_day = week_info ? weekarr[date.getDay()] : '';
            return this.datePreString(date) + ' ' + am + ' ' + week_info + week_day;
        }
        return this.datePreString(date) + ' ' + am;
    },


    // 根据开始时间和结束时间 获取一个时长格式

    // @parameter startDate    开始时间，格式 Date
    // @parameter endDate      结束时间，格式 Date
    // @parameter type         时间格式类型，格式 String
    // type : day      按天
    // type : halfday  半天
    // type : hour     按小时

    // @return weekday:天数
    // @return weekdayHours:小时数

    getNormalDuration: function (startDate, endDate, type) {

        var dayCount = 0;
        var hourCount = 0;

        var length = (endDate.getTime() - startDate.getTime()) / 1000;

        if (length >= 0) {
            hourCount = parseFloat(length / 3600);
            switch (type) {

                case 'dayhour':

                    dayCount = parseInt(hourCount / 24.0);
                    hourCount = ((Math.ceil(hourCount % 24 * 10)) / 10);
                    break;
                case 'dayhalfday':
                    dayCount = parseFloat(parseFloat(hourCount / 24.0).toFixed(1));
                    hourCount = hourCount % 24;
                    dayCount += 0.5;
                    break;


                default:

                    break;

            }
        }

        return {
            weekday: dayCount,
            weekdayHours: hourCount,

        };


    },
};
/* eslint-disable */
export {
    timeFormat
}

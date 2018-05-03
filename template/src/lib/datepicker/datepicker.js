
import {timeFormat} from "./time.js";

let currentTime = new Date();
let current = {
    year:currentTime.getFullYear(),
    month:currentTime.getMonth(),                        
    day:currentTime.getDate(),
    hour:currentTime.getHours(),
    minute:currentTime.getMinutes()
}
let daysStampRange = [];

// 某一年的总天数
let getDaysCountOfYear = function(year){
    let daysCount = 0;
    var dateFebruar = new Date(year - 1, 2, 0);    
    if (dateFebruar.getDate() == 29) {
        daysCount = 366;
    }
    else{
        daysCount = 365;
    }
    return daysCount;
}


// 日期的列数据源
let daysRange = function(){
    let days = [];    
    for(let year = current.year - 1; year <= current.year + 1 ; year ++){
        for(let month = 1; month <= 12; month ++){
            const newDate = new Date(year, month, 0);
            const daysOfMonth = newDate.getDate();
            for(let day = 1; day <= daysOfMonth; day ++){
                if(year == current.year){
                    days.push(month + "月" + day + '日');
                }
                else{
                    days.push(year + "年" + month + "月" + day + '日');
                }
                let stamp = new Date(year + "/" + month + "/" + day).getTime();                
                daysStampRange.push(stamp);
            }
        }
    }    
    return days;
};

// 小时列数据源
let hoursRange = function(){
    let hours = [];
    for(let index = 0;index < 24;index++){
        hours[index] = (index < 10 ? "0" : "") + index;
    }
    return hours;
};

// 分钟列数据源
let minutesRange = function(){
    let minutes = [];
    for(let index = 0;index < 60;index++){
        minutes[index] = (index < 10 ? "0" : "") + index;        
    }
    return minutes;
};


let dateRange = [daysRange(),hoursRange(),minutesRange()];


// 获取当前 天 所在列表的序号
function getDaysIndex(selectDate){    
    let firstDay = new Date(current.year - 1 + '/' + '1' + '/' + '1');    
    let selectDay = new Date(selectDate.getFullYear() + '/' + (selectDate.getMonth() + 1) + '/' + selectDate.getDate());
    let length = (selectDay - firstDay) / 1000 / 60 / 60 / 24;
    return length;
}

// 根据给定的时间戳，得到当前选择序列
function stampToIndex(timeStamp){
    let time ;
    let dateIndex = [];

    // 如果没有传如时间戳，就是取当前时间
    if(timeStamp){
        time = new Date(timeStamp);
    }
    else{
        time = new Date();
    }    

    let columnDays = getDaysIndex(time);
    let columnHours = time.getHours();
    let columnMinutes = time.getMinutes();
    dateIndex.push(columnDays);
    dateIndex.push(columnHours);
    dateIndex.push(columnMinutes);
    return dateIndex;
}


// 根据选择的序列，得到当前选择的时间戳
function indexToStamp(index){
    
    let timeStamp ;
    let selectDate = new Date(daysStampRange[index[0]]);    
    let hour = index[1];
    let minute = index[2]    
    timeStamp = new Date(selectDate.getFullYear() + "/" + (selectDate.getMonth() + 1) + "/" + selectDate.getDate() + " " + hour + ":" + minute );
    
    return timeStamp.getTime();
}

// 根据当前的时间戳 格式化时间
function stampToDisplay  (timeStamp){
    let displayTime = "";
    let selectDate = new Date(timeStamp);
    displayTime = timeFormat.date2Str(selectDate,"%Y-%M-%d %h:%m",true);
    return displayTime ;
}

export {
    dateRange,
    stampToIndex,
    stampToDisplay,
    indexToStamp
}
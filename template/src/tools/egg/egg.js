/**
 * @author chauvetxiao
 * @date 2018-02-27
 *
 * 彩蛋切换工具，用于检测指定的事件是否触发到一定的次数
 * <p>
 * 可以调用config方法配置彩蛋的点击次数和间隔时间，可以缺省配置
 * </p>
*/

var app = getApp();
var preclick = 0;
var clickCount = 5;
var currentClick = 0;
var freq = 300;

const CURRENT_VERSION_TITLE = '当前版本';
const CURRENT_VERSION_BUTTON = '确定';

function config(click = 5, frequence = 300) {
    clickCount = click;
    freq = frequence;
}

function checkIsEggEvent(callback) {
    var now = (+new Date());

    if (now - preclick < freq) {
        currentClick++;

        if (currentClick >= clickCount) {
            if (callback) {
                callback();
            } else {
                showMinAppVersion();
            }
            currentClick = 0;
        }
    }
    else {
        currentClick = 0;
    }

    preclick = now;
}

function showMinAppVersion() {
    wx.showModal({
        title: CURRENT_VERSION_TITLE,
        content: app.getVersion() + '',
        confirmText: CURRENT_VERSION_BUTTON,
        showCancel: false,
    });
}

export {
    config,
    checkIsEggEvent,
    showMinAppVersion
};

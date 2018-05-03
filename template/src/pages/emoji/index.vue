<template>
    <div class="container">
        <!--评论列表-->
        <div class="comments">
            <div class="item touch-active" v-for="item in comments" :key="item.id">
                <div class="i-left">
                    <img class="c-u-img" :src="item.avatar" />
                </div>
                <div class="i-right">
                    <div class="top">
                        <span class="u-name">{{item.uName}}</span>
                        <span class="time">{{item.time}}</span>
                    </div>
                    <!--评论内容-->
                    <div class="content">
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
        <!--评论盒子-->
        <div class="cf-bg" @click="cemojiCfBg" :style="{display: cfBg ? 'block' : 'none'}"></div>
        <div class="comment-fixed">
            <div class="cf-box">
                <!-- <div class="emoji iconfont icon-emoji" catchtap="emojiShowHide"></div> -->
                <textarea class="cf-content" v-model="content" bindfocus="textAreaFocus" maxlength="200" bindblur="textAreaBlur" auto-height :value="content" placeholder="我要评论" />
                <ww-button @click="send" type="primary" text=“提交” rounded></ww-button>
            </div>
            <!--emoji表情盒子-->
            <div class="emoji-box" :class=" { 'emoji-move-in': isShow,  'emoji-move-out': !emoji-move-out, 'no-emoji-move': isLoad}">
                <scroll-view scroll-y="true" bindscroll="emojiScroll" style="height:200px">
                    <div v-for="item in emojis" :key="item.id" class="emoji-cell">
                        <img class="touch-active" @click="emojiChoose" :src="'http://soupu.oss-cn-shanghai.aliyuncs.com/emoji/' + item.emoji + '.png'" :data-emoji="item.char" :data-oxf="item.emoji" />
                    </div>
                </scroll-view>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '@/lib/request/request'
    import WwButton from '@/components/button'
    export default {
        data() {
            return {
                isShow: false, //控制emoji表情是否显示
                isLoad: true, //解决初试加载时emoji动画执行一次
                content: "", //评论框的内容
                disabled: true,
                cfBg: false,
                _index: 0,
                comments: [],
                emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
                emoji: [
                    "60a", "60b", "60c", "60d", "60f",
                    "61b", "61d", "61e", "61f",
                    "62a", "62c", "62e",
                    "602", "603", "605", "606", "608",
                    "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
                    "63a", "63b", "63c", "63d", "63e", "63f",
                    "64a", "64b", "64f", "681",
                    "68a", "68b", "68c",
                    "344", "345", "346", "347", "348", "349", "351", "352", "353",
                    "414", "415", "416",
                    "466", "467", "468", "469", "470", "471", "472", "473",
                    "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
                ],
                emojis: [], //qq、微信原始表情
            }
        },
        components: {
            WwButton,
        },
        computed: {},
        methods: {
            //文本域失去焦点时 事件处理
            textAreaBlur: function(e) {
                //获取此时文本域值
                console.log('内容：', e.detail.value)
                this.content = e.detail.value;
            },
            //文本域获得焦点事件处理
            textAreaFocus: function() {
                this.isShow = false;
                this.cfBg = false;
            },
            //点击表情显示隐藏表情盒子
            emojiShowHide: function() {
                this.isShow = !this.isShow;
                this.isLoad = false;
                this.cfBg = false;
            },
            //表情选择
            emojiChoose: function(e) {
                console.log('emojiChoose', e.currentTarget.dataset.emoji);
                //当前输入内容和表情合并
                this.content = this.content + e.currentTarget.dataset.emoji;
            },
            //点击emoji背景遮罩隐藏emoji盒子
            cemojiCfBg: function() {
                let self = this;
                self.isShow = false;
                self.cfBg = false;
            },
            //发送评论评论 事件处理
            send: function() {
                let self = this,
                    conArr = [];
                //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
                setTimeout(function() {
                    if (self.content.trim().length > 0) {
                        conArr.push({
                            avatar: 'http://p.qlogo.cn/bizmail/cxq0z1ag143QyMjnmkIpiaeyzHaUlEOrnbpeEicmdK9cWiaRw7aqWvlkA/0',
                            uName: 'jinhui',
                            time: self.formatTime(new Date()),
                            content: self.content
                        })
                        self.comments = self.comments.concat(conArr);
                        self.content = '';
                        self.isShow = false;
                        self.cfBg = false;
                        console.log('comments---', self.comments);
                    } else {
                        self.content = '';
                    }
                }, 100)
            },
            //解决滑动穿透问题
            emojiScroll: function(e) {
                console.log(e)
            },
            formatTime: function(date) {
                let self = this;
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let minute = date.getMinutes()
                let second = date.getSeconds()
                return [year, month, day].map(self.formatNumber).join('-') + ' ' + [hour, minute, second].map(self.formatNumber).join(':')
            },
            formatNumber: function(n) {
                n = n.toString()
                return n[1] ? n : '0' + n
            }
        },
        created() {
            let em = {},
                self = this,
                emChar = self.emojiChar.split("-");
            let emojis = []
            self.emoji.forEach(function(v, i) {
                em = {
                    char: emChar[i],
                    emoji: "0x1f" + v
                };
                emojis.push(em)
            });
            self.emojis = emojis;
        }
    }
</script>

<style scoped>
    .container {
        padding-bottom: 45px;
    }
    
  
    .comments {
        margin-top: 10px;
    }
    .content {
        word-break: break-all;
        font-size: 14px;
    }
    .item {
        display: flex;
        position: relative;
        padding: 15px;
        background-color: #fff;
        margin-bottom: 1px;
    }
    .i-right {
        width: 100%;
    }
    .c-u-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
    }
    .item .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3px;
    }
    .item .u-name {
        color: deepskyblue;
        font-size: 14px;
    }
    .item .time {
        color: #888;
        font-size: 12px;
    }
    .comment-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
        z-index: 100;
    }
    .cf-bg {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: transparent;
        z-index: 99;
    }
    .cf-box {
        padding: 8px 5px;
        display: flex;
        justify-content: center;
    }
    
    .cf-content {
        background-color: #f2f2f2;
        padding: 8px 5px;
        font-size: 12px;
        height: 30px;
        max-height: 40px;
        width: 80%;
        flex: 1;
    }
    .cf-send {
        width: 50px;
        display: flex !important;
        flex-direction: column;
        justify-content: center;
        margin-left: 5px;
        border-radius: 2px;
        text-align: center;
        padding: 0 2px !important;
        font-size: 12px;
        background-color: #e64340;
        color: #fff;
    }
    .cf-send.touch-active:active {
        background-color: #b03f3e;
    }
    .emoji {
        background-color: #fff;
        width: 30px;
        height: 30px;
        text-align: center;
        padding-top: 2px;
        box-sizing: border-box;
        font-size: 20px;
    }
    .emoji-box {
        position: relative;
        height: 200px;
        padding: 5px 0;
        box-sizing: border-box;
        margin-bottom: -200px;
    }
    .emoji-cell {
        width: 9.09%;
        height: 33px;
        display: inline-block;
    }
    .emoji-cell image {
        width: 23px;
        height: 23px;
        padding: 5px;
        border-radius: 3px;
    }
    .emoji-move-in {
        -webkit-animation: emoji-move-in 0.3s forwards;
        animation: emoji-move-in 0.3s forwards;
    }
    .emoji-move-out {
        -webkit-animation: emoji-move-out 0.3s forwards;
        animation: emoji-move-out 0.3s forwards;
    }
    .no-emoji-move {
        -webkit-animation: none;
        animation: none;
    }
    @-webkit-keyframes emoji-move-in {
        0% {
            margin-bottom: -200px;
        }
        100% {
            margin-bottom: 0;
        }
    }
    @keyframes emoji-move-in {
        0% {
            margin-bottom: -200px;
        }
        100% {
            margin-bottom: 0;
        }
    }
    @-webkit-keyframes emoji-move-out {
        0% {
            margin-bottom: 0;
        }
        100% {
            margin-bottom: -200px;
        }
    }
    @keyframes emoji-move-out {
        0% {
            margin-bottom: 0;
        }
        100% {
            margin-bottom: -200px;
        }
    }
    @-webkit-keyframes pd-left-move {
        0% {
            padding-left: 5px;
        }
        100% {
            padding-left: 15px;
        }
    }
    @keyframes pd-left-move {
        0% {
            padding-left: 5px;
        }
        100% {
            padding-left: 15px;
        }
    }
</style>

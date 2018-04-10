<template>
    <div class="pupup-anim-main">
        <div class="scroll-section" :animation="animationData" :style="{top: windowHeight + 'px', height: screenHeight + 'px'}">
            <div class="wwui-bottom__bar" @mousedown="showCardTouchStart" @touchstart="showCardTouchStart" @mousemove="showCardTouchMove" @touchmove="showCardTouchMove" @mouseup="showCardTouchCancel" @touchend="showCardTouchEnd" @mouseleave="showCardTouchEnd" @click="showCardList">
                <div class="wwui-footer__bar">点击或上滑展开列表</div>
            </div>
            <div class="wwui-card__list-group">
                <div class="wwui-card__scroll-list-view" :style="{height: windowHeight + 'px'}" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
                    <!-- mpvue目前不支持slot特性 -->
                    <div class="wwui-scroll-list">弹窗列表</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        model: {},
        props: {},
        data() {
            return {
                tapShowList: false,
                animationDuration: 340,
                animationData: {},
                rotateArrowAnimationData: {},
                windowHeight: 620, // 默认高度，屏幕高度减去标题栏的高度
                screenHeight: 672,
                toucheStartPointY: 0,
                distanceTop: 0,
                columnTranslateYHeight: 54,
                tempFilePath: '',
            };
        },
        created() {
            let self = this;
            self.getScreenHeight();
        },
        destroyed() {},
        watch: {},
        methods: {
            /**
             * 显示名片夹列表 touchStart事件
             */
            showCardTouchStart(event) {
                this.toucheStartPointY = event.mp && event.mp.changedTouches[0] && event.mp.changedTouches[0].clientY || 0;
            },
            /**
             * 显示名片夹列表 touchMove事件
             */
            showCardTouchMove(event) {

                const moveHeight = event.mp && event.mp.changedTouches[0].clientY - this.toucheStartPointY;
                // console.log('showCardTouchMove:' + moveHeight);
                if (moveHeight <= 0 && -moveHeight <= this.windowHeight || moveHeight >= 0 && moveHeight <= this.windowHeight) {
                    this.distanceTop = moveHeight;
                }
                const animation = wx.createAnimation({
                    duration: 0,
                    timingFunction: 'ease',
                });
                if (this.distanceTop <= 0 && !this.tapShowList) {
                    animation.translateY(this.distanceTop).step();
                } else if (this.distanceTop > 0 && this.tapShowList) {
                    animation.translateY(this.distanceTop - this.windowHeight).step();
                }
                this.animationData = animation.export();
            },
            /**
             * 显示名片夹列表 touchCancel事件
             */
            showCardTouchCancel() {
            },
            /**
             * 显示名片夹列表 touchEnd事件
             */
            showCardTouchEnd(event) {
                // 底部Bar的高度，用于计算偏移量
                const footerBarHeight = this.columnTranslateYHeight;
                console.log('reviewListTouchEndAction:%o', event);
                /* eslint-disable */
                if (!this.distanceTop) {
                    return;
                } else {
                    let animation = wx.createAnimation({
                        duration: this.animationDuration,
                        timingFunction: 'ease'
                    });
                    this.rotateArrowAnimation();
                    if (this.distanceTop < -footerBarHeight && !this.tapShowList) {
                        animation.translateY(-this.windowHeight + 20).step();
                        this.animationData = animation.export();
                        this.tapShowList = true;
                    } else if (this.distanceTop >= -footerBarHeight && this.distanceTop < 0 && !this.tapShowList) {
                        animation.translateY(0).step();
                        this.animationData = animation.export();
                        this.tapShowList = false;
                        this.distanceTop = 0;
                    } else if (this.distanceTop > 0 && this.distanceTop <= footerBarHeight && this.tapShowList) {
                        animation.translateY(-this.windowHeight + 20).step();
                        this.animationData = animation.export();
                        this.tapShowList = true;
                    } else if (this.distanceTop > footerBarHeight && this.tapShowList) {
                        animation.translateY(0).step();
                        this.animationData = animation.export();
                        this.tapShowList = false;
                        this.distanceTop = 0;
                    }
                }
                console.log('move: %o', this.tapShowList);
            },
            showCardList(bool) {
                let animation = wx.createAnimation({
                    duration: this.animationDuration,
                    timingFunction: 'ease'
                });
                // 旋转icon动画
                this.rotateArrowAnimation();
                if (!this.tapShowList) {
                    animation.translateY(-this.windowHeight + 20).step();
                    this.tapShowList = true;
                } else {
                    animation.translateY(0).step();
                    this.tapShowList = false;
                    this.distanceTop = 0;
                }
                this.animationData = animation.export();
            },
            /**
             * 旋转icon动画
             * @param bool
             */
            rotateArrowAnimation() {
                let rotateArrowAnimation = wx.createAnimation({
                    duration: this.animationDuration,
                    timingFunction: 'ease'
                });
                if (!this.tapShowList) {
                    rotateArrowAnimation.rotate(180).step();
                } else {
                    rotateArrowAnimation.rotate(0).step();
                }
                this.rotateArrowAnimationData = rotateArrowAnimation.export();
            },
            getScreenHeight() {
                let self = this;
                wx.getSystemInfo({
                    success: function(res) {
                        console.log(res);
                        self.windowHeight = res.windowHeight - 54;
                        self.screenHeight = res.screenHeight;
                    },
                });
            },
            /**
             * 向上滚动
             * @param e
             */
            upper(event) {
                console.log(event)
            },
            /**
             * 向下滑动，滑动到底部时触发分页加载
             * @param event
             */
            lower(event) {
                console.log(event)
            },
            /**
             * scroll view 滑动事件监听
             * @param event
             */
            scroll(event) {
                console.log(event);
            },
        },
        components: {}
    };
</script>

<style scoped>
    .pupup-anim-main {
        overflow: hidden;
        position: fixed;
    }
    .scroll-section {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: white;
    }
    .wwui-bottom__bar{
        height: 54px;
        line-height: 54px;
        border-top: 1rpx solid #efefef;
    }
    .wwui-card__scroll-list-view {
        overflow: hidden;
        overflow-y: auto;
        height: 100%;
    }
    .wwui-card__list_box {
        padding-bottom: 10px;
    }
    .wwui-card__list-group {
        margin-bottom: 100px;
    }
    .wwui-footer__bar{
        text-align: center;
    }
    .wwui-scroll-list{
        padding: 10px;
        border-bottom: 1rpx solid #efefef;
    }
</style>

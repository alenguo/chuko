<template>
    <div class="wwui-navbar">
        <block v-for="(item, index) in sliderData.tabs" v-bind:key="item.id" v-bind:data-index="index">
            <div :id="index" class="wwui-navbar__item" :class="sliderData.activeIndex == index ? 'wwui-bar__item_on' : ''" @click="onSliderClick">
                <div class="wwui-navbar__title">{{item}}</div>
            </div>
        </block>
        <div class="wwui-navbar__slider" :style="{width: sliderData.sliderWidth + 'px', left: sliderData.sliderLeft + 'px', marginLeft: sliderData.sliderOffset + 'px'}"></div>
    </div>
</template>

<script>
    export default {
        model: {},
        props: {
            tabList: {
                type: Array,
                default: ['选项一', '选项二']
            },
            activeIndex: {
                type: Number,
                default: 0,
                observer(newValue) {
                    this.onSliderClick({
                        currentTarget: {
                            id: newValue
                        }
                    });
                }
            },
            extendClass: {
                type: String,
                value: '',
                observer(newValue) {
                    this.extendClass = newValue;
                }
            }
        },
        data() {
            return {
                sliderWidth: 96,
                offsetArr: [],
                sliderData: {},
            };
        },
        created() {
            let tabList = this.tabList;
            wx.getSystemInfo({
                success: (res) => {
                    this.getSliderOffset(res.windowWidth);
                    this.sliderBarIndex = this.activeIndex;
                    this.extendClass = this.extendClass;
                    this.sliderData = {
                        tabs: tabList,
                        sliderLeft: (res.windowWidth / tabList.length - this.sliderWidth) / 2,
                        sliderOffset: res.windowWidth / tabList.length * this.activeIndex,
                        sliderWidth: this.sliderWidth,
                        activeIndex: this.activeIndex,
                    };
                },
            });
        },
        destroyed() {},
        watch: {},
        methods: {
            getSliderOffset(width) {
                let i = 0,
                    arr = [];
                for (i = 0; i < this.tabList.length; i++) {
                    arr.push(width / this.tabList.length * i);
                }
                this.offsetArr = arr;
            },
            onSliderClick(e) {
                let id = e.currentTarget.id;
                if (this.sliderBarIndex != id) {
                    this.changeSlider(id);
                    // this.triggerEvent('onSliderClick', {
                    //     activeIndex: id
                    // });
                }
            },
            changeSlider(id) {
                this.sliderData.sliderOffset = this.offsetArr[id];
                this.sliderData.activeIndex = id;
                this.sliderBarIndex = id;
            }
        },
        components: {}
    };
</script>

<style scoped>
    .wwui-navbar {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: absolute;
        z-index: 500;
        top: 0;
        width: 100%;
        border-bottom: 1rpx solid #ccc
    }
    .wwui-navbar__item {
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 13px 0;
        text-align: center;
        font-size: 0
    }
    .wwui-navbar__item.wwui-bar__item_on {
        color: #437dba
    }
    .wwui-navbar__slider {
        position: absolute;
        content: " ";
        left: 0;
        bottom: 0;
        width: 6em;
        height: 3px;
        background-color: #437dba;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s
    }
    .wwui-navbar__title {
        display: inline-block;
        font-size: 15px;
        max-width: 8em;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }
</style>

<template>
    <div class="checkbox-main">
        <div @click="onPickerMultiTap" class="checkbox-slot">
            <button>点击</button>
        </div>
        <div class="mask mask-animate-fade-in" :animation="pickerMaskAnimation" catchtap="hidePickerMask" catchtouchmove="stopMove" catchtouchend="stopMove" v-if="showPickerMask"></div>
        <div :animation="picker_animationData" catchtouchmove="stopMove" catchtouchend="stopMove" class="pickermulti-box" v-if="checkboxData.showpickermulti">
            <div class="picker-main__header">
                <span class="picker-main__btn picker-main__cancel" @click="onCancelPicker">取消</span>
                <span class="picker-main__btn picker-main__ok" @click="onCheckPicker">确定</span>
            </div>
            <scroll-view scroll-y style="height: 400rpx;">
                <div class="picker-main__content" :style="{height: height}">
                    <div v-for="item in checkboxData.value" :key="item.id">
                        <div class="picker-main__cell" :value="item.name" @click="onCheckboxChange">
                            <span class="picker-main__text">{{item.name}}</span>
                            <span class="picker-main__text">
                                <icon v-if="item.checked" class="picker-main__checkicon" color="#437dba" type="success" size="23" />
                                <icon v-else class="picker-main__checkicon" type="circle" size="23" @click="onCheckboxChange" />
                            </span>
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>

<script>
    export default {
        model: {},
        props: {
            selects: {
                type: Array,
                default: ['选项A', '选项B', '选项C'],
            },
            selected: {
                type: Array,
                default: [],
            }
        },
        data() {
            return {
                checkboxData: {
                    showpickermulti: false,
                    height: 0
                }
            };
        },
        created() {
            let self = this;
        },
        destroyed() {},
        watch: {
            selects: function (val, oldVal) {
                // console.log('new: %s, old: %s', val, oldVal)
                if(val != oldVal){
                    
                }
            },
        },
        methods: {
            onPickerMultiTap() {
                let value = this.selects;
                let setvalue = this.selected;
                let arr = [],
                    i,
                    checked;
                for (i = 0; i < value.length; i++) {
                    checked = false;
                    if (setvalue.indexOf(value[i]) != -1) {
                        checked = true;
                    }
                    arr.push({
                        name: value[i],
                        checked: checked
                    });
                }
                this.showPickerMaskFn(() => {
                    let height = value.length * 48 + 'px';
                    this.checkboxData = {
                        value: arr,
                        setvalue: setvalue,
                        showpickermulti: true,
                        height: height
                    }
                });
            },
            onCheckboxChange(e) {
                let items = this.checkboxData.value,
                    value = e.currentTarget.dataset.value;
                let setvalue = [];
                for (let i = 0; i < items.length; i++) {
                    if (value == items[i].name) {
                        items[i].checked = !items[i].checked;
                    }
                    if (items[i].checked) {
                        setvalue.push(items[i].name);
                    }
                }
                this.checkboxData = {
                    value: items,
                    setvalue: setvalue,
                    showpickermulti: true,
                    height: this.checkboxData.height
                };
            },
            onCancelPicker() {
                this.hidePickerMask();
            },
            onCheckPicker() {
                this.$emit('input', this.checkboxData.setvalue);
                this.hidePickerMask();
            },
            showPickerMaskFn(callback) {
                // 显示遮罩层
                let animation = wx.createAnimation({
                    duration: 200,
                    delay: 0,
                });
                this.animation = animation;
                animation.translateY(320).step();
                this.picker_animationData = animation.export();
                this.showPickerMask = true;
                callback && callback();
                animation.translateY(0).step();
                this.picker_animationData = animation.export();
            },
            hidePickerMask(callback) {
                // 隐藏遮罩层
                let animation = wx.createAnimation({
                    duration: 200,
                    delay: 0,
                });
                this.animation = animation;
                animation.translateY(320).step();
                this.picker_animationData = animation.export();
                setTimeout(() => {
                    animation.translateY(0).step();
                    if (typeof callback === 'function') {
                        callback();
                    }
                    this.picker_animationData = animation.export();
                    this.showPickerMask = false;
                    this.checkboxData = {
                        showpickermulti: false
                    }
                }, 200);
            },
            stopMove: function() {}
        },
        components: {}
    };
</script>

<style scoped>
    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        overflow: hidden;
        z-index: 1000;
        color: #fff;
    }
    .pickermulti-box {
        width: 100%;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2000;
        background: #fff;
    }
    .picker-main__cell {
        display: flex;
        border-bottom: 1px solid #d9d9d9;
        margin-left: 15px;
        padding: 10px 15px 10px 0;
    }
    .picker-main__header {
        padding: 10px 0;
        overflow: hidden;
        border-bottom: 1rpx solid #d9d9d9;
    }
    .picker-main__btn {
        padding: 0 15px;
        display: inline-block;
        float: left;
        font-size: 17px;
        color: #9b9b9b;
    }
    .picker-main__ok {
        float: right;
        color: #437dba;
    }
    .picker-main__checkicon {
        float: right;
    }
    .picker-main__text {
        margin-right: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        font-size: 17px;
    }
</style>

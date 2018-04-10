<template>
    <div class="page-search-bar">
        <div class="weui-search-bar">
            <div class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                    <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="searchValue" :focus="inputShowed" @keyup.enter="onInputConfirm" v-on:change="onInputConfirm" v-on:input="onInput"/>
                    <div class="weui-icon-clear" v-if="searchValue.length" @click="onClearInput">
                        <icon type="clear" size="14"></icon>
                    </div>
                </div>
                <label class="weui-search-bar__label" :hidden="inputShowed" @click="onShowInput">
                    <icon class="weui-icon-search" type="search" size="14"></icon>
                    <div class="weui-search-bar__text">{{searchPlaceholder}}</div>
                </label>
            </div>
        </div>
        <div v-if="searchList.length" class="wwui-search-bar__mask">
        </div>
    </div>
</template>

<script>
    import storage from '../lib/storage/storage';
    import request from '../lib/request/request';
    export default {
        model: {},
        props: {
            searchPlaceholder: {
                type: String,
                value: '搜索'
            },
            searchList: {
                type: Array,
                value: [],
            }
        },
        data() {
            return {
                showResult: false,
                inputShowed: false,
                searchValue: '',
            };
        },
        watch: {
            searchList: function (val, oldVal) {
                console.log('searchList new: %s, old: %s', val, oldVal)
            },
        },
        created() {},
        destroyed() {},
        methods: {
            onShowInput: function() {
                this.inputShowed = true;
            },
            onHideInput: function() {
                this.searchValue = '';
                this.inputShowed = false;
            },
            onClearInput: function() {
                this.searchValue = '';
                this.showResult = false;
            },
            onInputConfirm(e) {
                console.log(e);
                this.$emit('input', this.searchValue);

                // this.showResult = true;
            },
            onInput(e) {
                let val = e.target.value;
                // this.searchValue = e.target.value;
                console.log('onInput', val);
            },
        },
        components: {}
    };
</script>

<style scoped>
    .page-search-bar{
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 999;
    }
    .weui-search-bar {
        position: relative;
        padding: 8px 10px;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        background-color: #efeff4;
        border-top: 1rpx solid #d7d6dc;
        border-bottom: 1rpx solid #d7d6dc
    }
    .weui-icon-search {
        margin-right: 8px;
        font-size: inherit
    }
    .weui-icon-search_in-box {
        position: absolute;
        left: 10px;
        top: 7px
    }
    .weui-search-bar__text {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle
    }
    .weui-search-bar__form {
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: auto;
        flex: auto;
        border-radius: 5px;
        background: #fff;
        border: 1rpx solid #e6e6ea
    }
    .weui-search-bar__box {
        position: relative;
        padding-left: 30px;
        padding-right: 30px;
        width: 100%;
        box-sizing: border-box;
        z-index: 1
    }
    .weui-search-bar__input {
        height: 28px;
        line-height: 28px;
        font-size: 14px
    }
    .weui-icon-clear {
        position: absolute;
        top: 0;
        right: 0;
        padding: 7px 8px;
        font-size: 0
    }
    .weui-search-bar__label {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        border-radius: 3px;
        text-align: center;
        color: #9b9b9b;
        background: #fff;
        line-height: 28px
    }
    .weui-search-bar__cancel-btn {
        margin-left: 10px;
        line-height: 28px;
        color: #09bb07;
        white-space: nowrap
    }
    .weui-search-bar {
        background: #f5f5f5;
    }
    .weui-search-bar__box {
        background: #fff;
    }
    .wwui-search-bar__mask {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #000;
        z-index: 999;
        opacity: 0.5;
        display: none;
    }
    
</style>

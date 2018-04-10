<template>
    <div class="authcode-main">
        <div class="authcode-text">
            <input class="authcode-text__content" placeholder-class="authcode-text__placeholder" v-model="inputValue" v-on:input="onTextInput" v-on:change="onInputConfirm" placeholder="请输入" />
            <span v-if="!reset" class="authcode-text__count">{{count}}秒后发送</span>
            <span v-else class="authcode-text__count" @click="onResendCode">重新发送</span>
        </div>
    </div>
</template>

<script>
    export default {
        model: {},
        props: {
            autoCountDown: {
                type: Boolean,
                value: false,
                observer(value) {
                    if (value) {
                        setTimeout(() => {
                            this.onResendCode();
                        }, 0);
                    }
                }
            }
        },
        data() {
            return {
                count: 59,
                reset: true,
                intervalTimer: null,
                inputValue: ''
            };
        },
        created() {
            let self = this;
            self.clearTimeout();
        },
        destroyed() {},
        watch: {},
        methods: {
            onTextInput(e) {
                let value = e.target.value;
                this.$emit('input', value);
            },
            clearTimeout() {
                clearInterval(this.intervalTimer);
                this.count = 59;
                this.reset = true;
            },
            onResendCode() {
                this.clearTimeout();
                this.setCountDown();
                this.reset = false;
            },
            setCountDown() {
                this.intervalTimer = setInterval(() => {
                    try {
                        this.count = this.count - 1;
                        if (this.count < 0) {
                            clearInterval(this.intervalTimer);
                            this.count = 59;
                            this.reset = true;
                        }
                    } catch (e) {
                    }
                }, 1000);
            },
            onInputConfirm(e){
                this.$emit('input', this.inputValue);
            }
        },
        components: {}
    };
</script>

<style scoped>
    .authcode-text {
        margin: 40px 0 30px 0;
        background-color: #fff;
        padding: 12px 0;
        border-bottom: 1rpx solid #e3e5e8;
        display: flex;
    }
    .authcode-text__content {
        width: 100%;
        background-color: #fff;
        font-size: 17px;
    }
    .authcode-text__placeholder {
        color: #DCDFE3;
    }
    .authcode-button {
        margin: 0 20px;
    }
    .authcode-text__count {
        font-size: 12px;
        color: #000;
        border: 1px solid #C8CACD;
        border-radius: 2px;
        width: 87px;
        height: 25px;
        text-align: center;
        line-height: 25px;
    }
</style>

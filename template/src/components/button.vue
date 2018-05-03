<template>
    <button class="button" 
        :hover-class="[disalbled || loading ? '' : 'button_hover']" 
        :open-type="opentype" 
        :disabled="disabled" 
        :class="[
                type ? 'button_' + type : '',
                {
                    'button_block': block,
                    'button_loading':loading
                }  
                ]" 
        @click="onClick">   
            <i v-if="loading" class="button__icon">
                <!-- activity 有两种，一个深色一个浅色，默认用深色 -->
                <block v-if="type == 'primary' || type == 'danger'">
                    <ww-activity lighter/>
                </block>
                <block v-else>
                    <ww-activity/>
                </block>
            </i>
            <span class="button__title">{{title}}</span>
    </button>
</template>

<script>
    import WwActivity from "@/components/activity.vue";
    export default {
        components:{
            WwActivity
        },
        props: {
            title: {
                type: String,
                default: "default"
            },
            type: {
                type: String,
                default: "default" // default / primary / danger
            },       
            block: {
                type: Boolean
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: ""
            },
            opentype: {
                type: String,
                default: ""
            }
        },
        methods: {
            onClick: function(event) {
                // disabled 和 loading 的状态下，按钮不可点击
                if (this.disabled || this.loading) {                    
                    return;
                } else {                    
                    this.$emit("click", event);
                }
            }
        }
    };
</script>


<style lang="less" scoped>
    @import url("../styles/vareribles.less");
    
    /* 普通按钮样式 */
    
    .button {
        display: inline-block;
        color: @buttonTextColor;
        background-color: @buttonBackgroundColor;
        font-weight: normal;
        text-align: center;
        box-sizing: content-box;
        line-height: 24px;
        height: 24px;
        overflow: hidden;
        padding: 9px 20px;
        vertical-align: top;
        border: 0 none;
    }
    
    .button__title {
        font-size: 16px;
        height: 24px;
        line-height: 24px;
        vertical-align: top;
        overflow: hidden;
    }
    
    .button:before {
        display: none;
    }
    
    .button:after {
        border-color: #d4d4d4;
    }
    
    .button_hover {
        color: @buttonHoveredTextColor;
        background-color: @buttonHoveredBackgroundColor;
    }
    
    .button[disabled] ,
    .button_loading{
        color: @buttonDisabedTextColor;
        background-color: @buttonDisabledBackgroundColor;
    }
    
    
    /* 主要按钮样式 */
    
    .button_primary {
        background: @buttonPrimaryBackgroundColor;
        color: @buttonPrimaryTextColor;
    }
    
    .button_primary:after {
        display: none;
    }
    
    .button_primary.button_hover {
        background-color: @buttonPrimaryHoveredBackgroundColor;
        color: @buttonPrimaryHoveredTextColor;
    }
    
    .button_primary[disabled] ,
    .button_primary.button_loading{
        color: @buttonPrimaryDisabledTextColor;
        background-color: @buttonPrimaryDisabledBackgroundColor;
    }
    
    
    /* 危险按钮样式 */
    
    .button_danger {
        color: @buttonDangerTextColor;
        background: @buttonDangerBackgroundColor;
    }
    
    .button_danger:after {
        display: none;
    }
    
    .button_danger.button_hover{
        color: @buttonDangerHoveredTextColor;
        background-color: @buttonDangerHoveredBackgroundColor;
    }
    
    .button_danger[disabled] ,
    .button_danger.button_loading{
        color: @buttonDangerDisabledTextColor;
        background-color: @buttonDangerDisabledBackgroundColor;
    }
    
    .button_block {
        display: block;
        padding-left: 5px;
        padding-right: 5px;
    }

    .button__icon{
        display: inline-block;
        vertical-align: top;
        margin-right: 3px;
        height:24px;
        width:24px;
        overflow: hidden;
    }
    

</style>


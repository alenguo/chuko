<template>
    <div class="control" :class="[{
                    'control_error' : error
                }]">
        <div class="control__main">
            <div class="control__title">
                <h2 class="control__label">{{title}}</h2>
                <span class="control__validate" :class="[
                                {
                                    'control__validate_visible' :   validate                        
                                }
                            ]">*</span>
            </div>
    
            <div class="control__body">
                <input class="control__input" :placeholder-class="error?'control__input_error':'control__input_placeholder'" type="digit" cursor-spacing="35" :placeholder="displayPlaceholder" adjust-position="true" v-model="value" @blur="controlChanged" />
            </div>
        </div>
        <!-- 金额大写的部分 -->
        <div class="control__extra control__extra_price">
            <div class="control__extra-title">大写</div>
            <div class="control__extra-info">{{upperprice}}</div>
        </div>
    
    </div>
</template>


<script>
    export default {
        props: {
            index:{
                type:Number                
            },
            title: {
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: "请输入"
            },
            value: {
                type: String,
                default: ""
            },
            validate: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: "price"
            }
        },
        computed: {
            error: function() {
                if (this.validate && this.value == "") {
                    return true;
                } else {
                    return false;
                }
            },
            displayPlaceholder:function(){
                return this.placeholder?this.placeholder:'请输入';
            },
            upperprice: function() {
                var n = this.value;
                if (!n && parseFloat(n) != 0) {
                    return "零";
                }
                if (!/^(0|[0-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
                if (n.length > 20) return "数据非法";
                if (n == 0) return "零";
                var i = 0;
                var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾圆角分",
                    str = "";
                n += "00";
                var p = n.indexOf(".");
                if (p >= 0) {
                    n =
                        (n.substring(0, p).length > 1 ?
                            n.substring(0, p).replace(/^0+/, "") :
                            n.substring(0, p)) + n.substr(p + 1, 2);
                } else {
                    n = n.replace(/^0+/, "");
                }
                unit = unit.substr(unit.length - n.length);
                for (i = 0; i < n.length; i++)
                    str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);
                return str
                    .replace(/零(仟|佰|拾|角)/g, "零")
                    .replace(/(零)+/g, "零")
                    .replace(/零(兆|万|亿|圆)/g, "$1")
                    .replace(/(兆|亿)万/g, "$1")
                    .replace(/(京|兆)亿/g, "$1")
                    .replace(/(京)兆/g, "$1")
                    .replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟")
                    .replace(/^圆零?|零分/g, "")
                    .replace(/(圆|角)$/g, "$1");
            }
        },
        methods: {
            controlChanged:function(){
                console.log('Control Price Changed.');
                this.$emit('change',{
                        'index':this.index,
                        'type':this.type,
                        'displayValue':this.upperprice,
                        'setValue':this.value,
                        'validate':!this.error
                })
            }
        }
    };
</script>

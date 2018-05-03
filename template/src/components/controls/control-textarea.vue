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
        </div>
        <!-- 金额大写的部分 -->
        <div class="control__extra control__extra_textarea">
            <textarea class="control__textarea" :placeholder-class="error?'control__input_error':'control__input_placeholder'" type="digit" cursor-spacing="71" :placeholder="displayPlaceholder" adjust-position="true" v-model="value" @blur="controlChanged" ></textarea>
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
                default: "text"
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
            }
        },
        methods: {
            controlChanged:function(){
                console.log('Control Textarea Changed.');
                this.$emit('change',{
                        'index':this.index,
                        'type':this.type,
                        'displayValue':this.value,
                        'setValue':this.value,
                        'validate':!this.error
                })
            }
        }
    };
</script>

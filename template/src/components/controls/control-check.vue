<template>
    <div class="control" 
        :class="[{
            'control_error'   :   error
        }]">
        <div class="control__main">
            <div class="control__title">
                <h2 class="control__label">{{title}}</h2>
                <span class="control__validate" 
                    :class="[
                        {
                            'control__validate_visible' :   validate                        
                        }
                    ]"
                >*</span>
            </div>
            
            <div class="control__body">            
                <input class="control__input" :placeholder-class="error?'control__input_error':'control__input_placeholder'" type="text" cursor-spacing="5"  :placeholder="placeholder"  adjust-position="true" v-model="value" @blur="error" />                        
            </div>    
        </div>    
    </div>
</template>


<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            value: {
                type: String,
                default: ''
            },
            validate:{
                type:Boolean,
                default: false
            },
            type:{
                type:String,
                default:'text'
            }
        },
        computed:{
            error:function(){
                if(this.validate && this.value == ''){                    
                    return true;                         
                }
                else{
                    return false;                    
                }
            }
        },
        methods:{
            
        }
    }
</script>

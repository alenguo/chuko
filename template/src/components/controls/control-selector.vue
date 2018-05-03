<template>
    <div class="control control_accessible" hover-class="control_hover"
        :class="[{
            'control_error'   :   error
        }]">
        <picker mode="selector" :range="range" value="0" @change="controlChanged">
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
                    <div 
                    class="control__text"
                    :class="{
                        'control__text_error':error
                        }"
                    >{{setValue?setValue:displayPlaceholder}}</div>
                </div>    
            </div>    
        </picker>
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
                default:'select'
            }
        },
        data:function(){
            return {
                range:this.value.split(','),                                
                setValue:'',
                setIndex:0
            };
        },
        computed:{            
            error:function(){
                if(this.validate && this.setValue == ''){                    
                    return true;                         
                }
                else{
                    return false;                    
                }
            },
            displayPlaceholder:function(){
                return this.placeholder?this.placeholder:'请选择';
            }
        },
        created:function(){            
        },
        methods:{
            controlChanged:function(event){                
                this.setIndex = parseInt(event.mp.detail.value)
                this.setValue = this.range[this.setIndex];
                console.log('Control Selector Changed.');
                this.$emit('change',{
                        'index':this.index,
                        'type':this.type,
                        'displayValue':this.setValue,
                        'setValue':this.setIndex,
                        'validate':!this.error
                })
            }
        }
    }
</script>

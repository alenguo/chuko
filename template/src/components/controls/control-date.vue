<template>
    <div class="control control_accessible" hover-class="control_hover"
        :class="[{
            'control_error'   :   error
        }]" >

        <block v-if="datetype == 'date'">
            <picker mode="date" @change="controlChanged" fields="day">
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
                        :class="{'control__text_error':error}"
                        >{{displayValue?displayValue:displayPlaceholder}}</div>
                    </div>    
                </div>    
            </picker>
        </block>

        <block v-if="datetype == 'time'">
            <picker mode="multiSelector" :range="range" :value="rangeValue" @change="controlChanged">
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
                        :class="{'control__text_error':error}"
                        >{{displayValue?displayValue:displayPlaceholder}}</div>
                    </div>    
                </div>    
            </picker>
        </block>
    </div>
</template>

<script>
    import {dateRange,stampToIndex,indexToStamp,stampToDisplay} from "@/lib/datepicker/datepicker.js"
    
    export default {
        props: {      
            index:{
                type:Number                
            },     
            title: {
                type: String,
                default: ''
            },
            datetype:{
                type:String,
                default: 'date' // date,选择天；time，选择到小时
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            type:{
                type:String                                
            },
            value: {
                type: String,
                default: ''
            },
            validate:{
                type:Boolean,
                default: false
            },
            satValue:{
                type:String                
            }
        },
        data:function(){
            return {                
                displayValue:'',
                setValue:'',
                range:this.renderRange(),
                rangeValue: this.renderValue()
                
            };
        },
        computed:{            
            error:function(){
                if(this.validate && this.displayValue == ''){                    
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

                if(this.datetype == "date"){                    
                    this.displayValue = event.mp.detail.value;
                    console.log('Control Date Changed. Type is Date');
                    this.$emit('change',{
                            'index':this.index,
                            'type':this.type,
                            'displayValue':this.displayValue,
                            'setValue':new Date(this.displayValue + " 00:00:00").getTime(),
                            'validate':!this.error
                    })
                }
                else{

                    this.setValue = indexToStamp(event.mp.detail.value);                    
                    this.displayValue = stampToDisplay(this.setValue);
                    this.rangeValue = stampToIndex(this.setValue);

                    console.log('Control Date Changed. Type is Time');
                    this.$emit('change',{
                            'index':this.index,
                            'type':this.type,
                            'displayValue':this.displayValue,
                            'setValue':this.setValue,
                            'validate':!this.error
                    })
                }
                
            },
            
            daysRange:function(){

            },
            
            renderRange:function(){
                
                return dateRange;
                
                
            },
            
            currentTime:function(){
                    let current = new Date();
                    return {
                        year:current.getFullYear(),
                        month:current.getMonth(),                        
                        day:current.getDate(),
                        hour:current.getHours(),
                        minute:current.getMinutes()
                    }
                },
            renderValue:function(){                
                return stampToIndex();
            }
            
        }
    }
</script>

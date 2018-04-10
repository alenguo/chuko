<template>
    <div class="ww-button"
        :class="[
            type ? 'ww-button_' + type : '',
            {
                'ww-button_rounded': rounded,
                'ww-button_disabled':disabled
            }                     
               
        ]"
        @click="onClick"
        >        
        <span class="ww-button__title"><slot></slot></span>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type: String,
            default: 'default'
        },
        rounded:{
            type: Boolean
        },
        disabled:{
            type: Boolean,
            default: false
        },
        icon:{
            type:String,
            default:''
        }
    },
    methods:{
        onClick:function(event){
            if(this.disabled){                
                return;
            }
            else{
                this.$emit('click',event)
            }
            
        }
    }
}
</script>


<style scoped>
    .ww-button{
        display:inline-block;
        height: 24px;
        line-height: 24px;
        padding:4px 20px;
        border:1px solid #0085DD;
        color:#0085DD;
        font-size: 14px;
        font-weight: normal;
        overflow: hidden;        

    }    
    .ww-button_rounded{
        border-radius: 3px;
    }
    .ww-button_primary{
        background: #0085DD;
        color:#FFF;
    }
    .ww-button_disabled{
        border-color:#e7e7e7;
        background: #eee;
        color:#aaa;
    }
</style>


<template>
    <div class="cell" 
        :class="[
            icon?'':'cell_no-icon',
            {
                'cell_accessible':accessible,
            }
        ]"
        :hover-class="accessible?'cell_hover':''">
        <div class="cell__head">
            <div class="cell__image">
                <div class="cell__avatar"></div>    
            </div>
        </div>
    
        <div class="cell__body">
            <h2 class="cell__title">{{title}}</h2>            
        </div>
        <div class="cell__foot">{{description}}</div>
    
    </div>
</template>

<script>    
    export default {
        props:{
            icon:{
                type:String,
                default:''
            },
            title:{
                type:String,
                default:''
            },
            description:{
                type:String,
                default:''
            },
            accessible:{
                type:Boolean,
                default:false
            }
        }
    }
</script>





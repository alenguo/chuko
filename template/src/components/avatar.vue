<template>

  <img 
  class="ww-avatar"
  :src="url" 
  :class="[
        size ? 'ww-avatar_' + size :'',
        {
            'ww-avatar_rounded':rounded,
            'ww-avatar_disabled':disabled          
        }
    ]" 
   />

</template>

<script>
export default {
  props:{
      url:{
          type:String,
          default:'https://p.qlogo.cn/bizmail/tgpOXnXbR8g4TYicRwic5nzyNZfDh04oBNdxuWjCk3S2u5Husl2xKEKg/0'
      },
      size:{
          type:String,
          default:'medium'
      },
      rounded:{
          type:Boolean,
          default:false
      },
      disabled:{
          type:Boolean,
          default:false
      }
  },  
}
</script>


<style lang="less" scoped>
.ww-avatar{
    vertical-align: top;
}
.ww-avatar_medium{
    width:50px;
    height:50px;
}
.ww-avatar_small{
    width:24px;
    height:24px;
}
.ww-avatar_large{
    width:64px;
    height:64px;
}
.ww-avatar_rounded{
    border-radius: 50%;
    overflow: hidden;
}
.ww-avatar_disabled{
    opacity: 0.1;    
    background:#000;
}
</style>


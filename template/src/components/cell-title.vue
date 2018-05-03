<template>
  <h3 class="cell-title">
      <span>{{title}}</span>
  </h3>
</template>

<script>

export default {
  props:{
      title:{
          type:String,
          default:''
      }
  }
}
</script>

<style lang="less" scoped>
    .cell-title{
        margin-top:10px;        
        margin-bottom:4px;
        font-size:14px;
        color: #808080;
        line-height: 20px;
        padding-left:15px;
        padding-right:15px;
    }
</style>



<template>
  <div class="root">


    <ww-cell-title title="表单中的单选" />        
    <div>
        <ww-control-selector title="单选" placeholder="请选择" value="选项1,选项2" />
        <ww-control-selector title="单选" placeholder="请选择" value="a,b,c" validate />
    </div>

    <ww-cell-title title="表单中的日期" />        
    <div>
        <ww-control-date title="日期" placeholder="请选择日期"  value="" />
        <ww-control-date title="日期和时间" placeholder="请选择时间" datetype="time" value=""  />
    </div>

    <ww-cell-title title="表单中的文本输入框" />        
    <div>
        <ww-control-text title="选项名称" placeholder="请填写" />
        <ww-control-text title="选项名称必填" placeholder="请填写" value="用户填写的内容" validate />
        <ww-control-text title="选项名称很长很长" placeholder="请填写" value="用户输入的内容很长很长很长很长很长很长很长很长" validate />
        <ww-control-text title="选项名称必填" placeholder="请填写" value="" validate />
    </div>

    <ww-cell-title title="表单中的数字输入框" />        
    <div>
        <ww-control-number title="数字选项" placeholder="请填写" />
        <ww-control-number title="数字选项必填" placeholder="请填写" value="3.1415926" validate />
        <ww-control-number title="数字选项很长很长" placeholder="请填写" value="188888888" validate />
        <ww-control-number title="数字选项必填" placeholder="请填写" value="" validate />
    </div>

    <ww-cell-title title="表单中的金额输入框" />        
    <div>
        <ww-control-price title="金额选项" placeholder="请填写" />
        <ww-control-price title="金额选项必填" placeholder="请填写" value="16588" validate />
        <ww-control-price title="金额选项很长很长" placeholder="请填写" value="8733.5" validate />
        <ww-control-price title="金额选项必填" placeholder="请填写" value="" validate />
    </div>


    <ww-cell-title title="表单中的多行输入框" />        
    <div>
        <ww-control-textarea title="多行输入框选项" placeholder="请填写" />
        <ww-control-textarea title="多行输入框选项" placeholder="请填写" value="微信小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。" validate />
    </div>

   

  </div>
</template>

<script>

import WwCellTitle from "@/components/cell-title";

import WwControlText from "@/components/controls/control-text";
import WwControlTextarea from "@/components/controls/control-textarea";
import WwControlNumber from "@/components/controls/control-number";
import WwControlPrice from "@/components/controls/control-price";
import WwControlSelector from "@/components/controls/control-selector";
import WwControlDate from "@/components/controls/control-date";



export default {
  
  components:{
      WwCellTitle,
      WwControlText,
      WwControlTextarea,
      WwControlNumber,
      WwControlPrice,      
      WwControlSelector,
      WwControlDate
  }
}
</script>


<style lang="less">

</style>



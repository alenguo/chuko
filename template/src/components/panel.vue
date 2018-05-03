<template>
    <div class="root">

        <div class="panel">
            <block v-for="(item , index) in config" :key="item.id">
                <div class="controls" v-if="item.type == 'text'">
                    <ww-control-text :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                 </div>

                <div class="controls" v-if="item.type == 'textarea'">
                    <ww-control-textarea :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

                <div class="controls" v-if="item.type == 'number'">
                    <ww-control-number :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

                <div class="controls" v-if="item.type == 'price'">
                    <ww-control-price :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

                <div class="controls" v-if="item.type == 'date'">
                    <ww-control-date :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

                <div class="controls" v-if="item.type == 'datehour'">
                    <ww-control-date datetype="time" :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

                <div class="controls" v-if="item.type == 'select'">
                    <ww-control-selector :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

                <div class="controls" v-if="item.type == 'list'">
                    <ww-control-list :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="handleControl"/>
                </div>

            </block>
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
import WwControlList from "@/components/controls/control-list";


export default {
  props:{
      config:{
          type:Array
      }
  },  
  components:{
      WwCellTitle,
      WwControlText,
      WwControlTextarea,
      WwControlNumber,
      WwControlPrice,      
      WwControlSelector,
      WwControlDate,
      WwControlList
  },  
  data:function(){
      return {
          panelData:this.config
      }
  },

  created:function(){      
  },
  methods:{
      handleControl: function(data){
                    
          console.log(data);
      }
  }

}
</script>
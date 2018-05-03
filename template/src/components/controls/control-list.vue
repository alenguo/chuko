<template>
    <div>        
        <div class="control__list" v-for="(config , listIndex) in setValue" :key="config.id">
            <div class="control__list-header" >
                <span class="header__action">删除</span>
                <span class="header__title">{{title + (listIndex+1)}}</span>
            </div>
            <div class="control__list-body">
                <block v-for="(item , index) in config" :key="item.id">
                    <block v-if="item.type == 'text'">
                        <ww-control-text  v-if="item.type == 'text'" :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                        </block>

                    <block v-if="item.type == 'textarea'">
                        <ww-control-textarea :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                    </block>

                    <block v-if="item.type == 'number'">
                        <ww-control-number :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                    </block>

                    <block v-if="item.type == 'price'">
                        <ww-control-price :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                    </block>

                    <block v-if="item.type == 'date'">
                        <ww-control-date :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                    </block>

                    <block v-if="item.type == 'datehour'">
                        <ww-control-date datetype="time" :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                    </block>

                    <block v-if="item.type == 'select'">
                        <ww-control-selector :title="item.title" :placeholder="item.placeholder" :value = "item.value" :validate="item.validate" :index="index" :type='item.type' @change="controlChanged"/>
                    </block>
                </block>
            </div>
            <div class="control__list-footer" hover-class="control__list-footer_hover"  @click="eventAddItem">
                <span>添加明细</span>
            </div>            
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
  props: {
    value: {
      type: Array
    },    
    index:{
        type:Number                
    },
    title: {
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
  components: {
    WwCellTitle,
    WwControlText,
    WwControlTextarea,
    WwControlNumber,
    WwControlPrice,
    WwControlSelector,
    WwControlDate
  },
  data: function() {
    return {
      setValue:[this.value]
    };
  },

  created: function() {},
  methods: {
    eventAddItem:function(){
        console.log("添加明细");
        let currentItem = this.setValue[0];
        this.setValue.push(currentItem);
    },
    controlChanged: function(data) {
        console.log('Control List Changed.');        
        this.$emit('change',{
                'index':this.index,
                'type':this.type,
                'displayValue':this.value,
                'setValue':this.setValue,
                'validate':!this.error
        })
    }
  }
};
</script>
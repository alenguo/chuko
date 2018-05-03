<template>
    <div>
        <ww-panel :config='templateConfig'></ww-panel>

        <div class="deom-button-bar">
            <ww-button title="提交" block type='primary' @click="commitHandler" :loading="loading"/>
        </div>
    </div>
</template>

<script>

let templateConfig = [
    {
        "id": "1524051663390",
        "locked": false,
        "placeholder": "",
        "title": "文本选项名称",
        "type": "text",
        "un_print": false,
        "validate": true,
        "value": ""
    },
    {
        "id": "1524051666372",
        "locked": false,
        "placeholder": "",
        "title": "多行文本",
        "type": "textarea",
        "un_print": false,
        "validate": false,
        "value": ""
    },
    {
        "id": "1524051667891",
        "locked": false,
        "placeholder": "",
        "title": "数字",
        "type": "number",
        "un_print": false,
        "validate": false,
        "value": ""
    },
    {
        "id": "1524051671828",
        "locked": false,
        "placeholder": "",
        "title": "金额",
        "type": "price",
        "un_print": false,
        "validate": true,
        "value": ""
    },
    {
        "id": "1524051669231",
        "locked": false,
        "placeholder": "",
        "title": "日期",
        "type": "date",
        "un_print": false,
        "validate": false,
        "value": ""
    },
    {
        "id": "1524051676227",
        "locked": false,
        "placeholder": "",
        "title": "日期+时间",
        "type": "datehour",
        "un_print": false,
        "validate": false,
        "value": ""
    },
    {
        "id": "1524051673043",
        "locked": false,
        "placeholder": "",
        "title": "单选",
        "type": "select",
        "un_print": false,
        "validate": false,
        "value": "选项1,选项2"
    },
    {
        "id": "1524051674281",
        "locked": false,
        "placeholder": "",
        "title": "多选",
        "type": "checkbox",
        "un_print": false,
        "validate": false,
        "value": "选项1,选项2"
    },
    {
        "id": "1524051678162",
        "locked": false,
        "placeholder": "",
        "title": "附件",
        "type": "file",
        "un_print": false,
        "validate": false,
        "value": ""
    },
    {
    id: "1522238319615",
    locked: false,
    placeholder: "",
    title: "今日销售额(元)",
    type: "number",
    un_print: false,
    validate: true,
    value: ""
  },
  {
    id: "item-1524898642847",
    locked: false,
    placeholder: "",
    title: "报销明细",
    type: "list",
    un_print: false,
    validate: false,
    value: [
      {
        id: "item-1524898644591",
        locked: false,
        placeholder: "",
        title: "报销事由",
        type: "text",
        un_print: false,
        validate: true,
        value: ""
      },
      {
        id: "item-1524898646661",
        locked: false,
        placeholder: "",
        title: "备注",
        type: "textarea",
        un_print: false,
        validate: false,
        value: ""
      },
      {
        id: "item-1524898648056",
        locked: false,
        placeholder: "",
        title: "报销笔数",
        type: "number",
        un_print: false,
        validate: true,
        value: ""
      },
      {
        id: "item-1524898649743",
        locked: false,
        placeholder: "",
        title: "发生日期",
        type: "date",
        un_print: false,
        validate: true,
        value: ""
      },
      {
        id: "item-1524898652792",
        locked: false,
        placeholder: "",
        title: "发生时间",
        type: "datehour",
        un_print: false,
        validate: false,
        value: ""
      },
      {
        id: "item-1524898654682",
        locked: false,
        placeholder: "",
        title: "金额",
        type: "price",
        un_print: false,
        validate: true,
        value: ""
      },
      {
        id: "item-1524898656043",
        locked: false,
        placeholder: "",
        title: "类型",
        type: "select",
        un_print: false,
        validate: true,
        value: "用车,差旅,活动运营,日常开销"
      }
    ]
  }
];

// [
//   {
//     id: "1522238319615",
//     locked: false,
//     placeholder: "",
//     title: "今日销售额(元)",
//     type: "number",
//     un_print: false,
//     validate: true,
//     value: ""
//   },
//   {
//     id: "item-1524898642847",
//     locked: false,
//     placeholder: "",
//     title: "报销明细",
//     type: "list",
//     un_print: false,
//     validate: false,
//     value: [
//       {
//         id: "item-1524898644591",
//         locked: false,
//         placeholder: "",
//         title: "报销事由",
//         type: "text",
//         un_print: false,
//         validate: true,
//         value: ""
//       },
//       {
//         id: "item-1524898646661",
//         locked: false,
//         placeholder: "",
//         title: "备注",
//         type: "textarea",
//         un_print: false,
//         validate: false,
//         value: ""
//       },
//       {
//         id: "item-1524898648056",
//         locked: false,
//         placeholder: "",
//         title: "报销笔数",
//         type: "number",
//         un_print: false,
//         validate: true,
//         value: ""
//       },
//       {
//         id: "item-1524898649743",
//         locked: false,
//         placeholder: "",
//         title: "发生日期",
//         type: "date",
//         un_print: false,
//         validate: true,
//         value: ""
//       },
//       {
//         id: "item-1524898652792",
//         locked: false,
//         placeholder: "",
//         title: "发生时间",
//         type: "datehour",
//         un_print: false,
//         validate: false,
//         value: ""
//       },
//       {
//         id: "item-1524898654682",
//         locked: false,
//         placeholder: "",
//         title: "金额",
//         type: "price",
//         un_print: false,
//         validate: true,
//         value: ""
//       },
//       {
//         id: "item-1524898656043",
//         locked: false,
//         placeholder: "",
//         title: "类型",
//         type: "select",
//         un_print: false,
//         validate: true,
//         value: "用车,差旅,活动运营,日常开销"
//       }
//     ]
//   }
// ]
   
    import WwPanel from '@/components/panel.vue';
    import WwButton from '@/components/button.vue';

    export default {
        data:function() {
            return {                
                loading:false,
                templateConfig:templateConfig
            }
        },
    
        components: {
            WwPanel,
            WwButton
        },
    
        methods: {
            commitHandler:function(){                
                this.loading = true;                
                setTimeout(() => {                    
                    this.loading = false;
                }, 2000);
            }
        }
            
    }
</script>

<style>
    
    .deom-button-bar{
        margin:0 20px;
        padding-bottom:20px;
    }
    
</style>


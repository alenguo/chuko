<template>
    <div class="container">
        <ww-cell-title title="带说明的列表项" />        
        <div class="">
            <ww-cell v-for="item in list1" :key="item.id" :title="item.title" :description="item.description" :accessible="item.accessible" />
        </div>
        <ww-cell-title title="带跳转的列表项" />
        <div class="">
            <ww-cell v-for="item in list2" :key="item.id" :title="item.title" :description="item.description" :accessible="item.accessible" />
        </div>
        <ww-cell-title title="带说明、跳转的列表项" />
        <div class="">
            <ww-cell v-for="item in list3" :key="item.id" :title="item.title" :description="item.description" :accessible="item.accessible" />
        </div>
    </div>
</template>

<script>
    import WwCell from '@/components/cell'
    import WwCellTitle from '@/components/cell-title'
    
    export default {
        data() {
            return {
                list1: [{
                        title: '标题文字',
                        description: '说明文字',
                        accessible: false
                    },
                    {
                        title: '标题文字',
                        description: '说明文字',
                        accessible: false
                    }
                ],
                list2: [{
                        title: '标题文字',
                        description: '',
                        accessible: true
                    },
                    {
                        title: '标题文字',
                        description: '',
                        accessible: true
                    }
                    
                ],
                list3: [{
                        title: '标题文字',
                        description: '说明文字',
                        accessible: true
                    },
                    {
                        title: '标题文字',
                        description: '说明文字',
                        accessible: true
                    }
                    
                ]
            }
        },
    
        components: {
            WwCell,
            WwCellTitle
        },
    
        methods: {},    
        created() {}
    }
</script>

<style>

.container {
    padding:0;    
    
}
</style>

<template>
    <div class="container">
        
        <div class="block__title">
            <h2>按钮</h2>
            <p>常用的操作按钮。</p>
        </div>
        
        <div class="block__cell">
            <ww-button title="普通按钮" block />
        </div>
        <div class="block__cell">
            <ww-button title="普通按钮 Loading" block loading/>
        </div>
        <div class="block__cell">
            <ww-button title="普通按钮 Disabled" disabled block/>
        </div>
        <div class="block__cell">
            <ww-button title="主要按钮" type="primary" block/>
        </div>
        <div class="block__cell">
            <ww-button title="主要按钮 Loading" type="primary" block loading/>
        </div>
        <div class="block__cell">                  
            <ww-button title="主要按钮 Disabled" type="primary" disabled block/>    
        </div>
         <div class="block__cell">
            <ww-button title="警告按钮" type="danger" block/>
        </div>       


        <div class="block__title">
            <h2>按钮组</h2>
            <p>以按钮组的方式出现，常用于多项类似操作。</p>
        </div>

         <div class="block__cell flex">
            <div class="flex__item">
                <ww-button type="" title="取消" block />
            </div>            
            <div class="flex__item">
                <ww-button title="删除" type="danger" block />
            </div>
        </div>

        <div class="block__cell flex">
            
            <div class="flex__item">
                <ww-button title="同意" type="primary" block />
            </div>
            <div class="flex__item">
                <ww-button title="转审" type="primary" block />
            </div>
            <div class="flex__item">
                <ww-button title="驳回" type="danger" block />
            </div>
            
        </div>

       

          
    </div>
</template>

<script>
    import WwButton from '@/components/button'
    import WwAvatar from '@/components/avatar'
    
    export default {
        data() {
            return {
                motto: 'Hello World',
                userInfo: {}
            }
        },
    
        components: {
            WwButton,
            WwAvatar
        },
    
        methods: {
            bindViewTap() {
                const url = '../logs/main'
                wx.navigateTo({
                    url
                })
            },
            getUserInfo() {
                // 调用登录接口
                wx.login({
                    success: () => {
                        wx.getUserInfo({
                            success: (res) => {
                                this.userInfo = res.userInfo
                            }
                        })
                    }
                })
            },
            clickHandle(msg, ev) {
                console.log('clickHandle:', msg, ev)
            }
        },
    
        created() {
            // 调用应用实例的方法获取全局数据
            this.getUserInfo()
        }
    }
</script>

<style >
    page{
        background-color: white;
    }
</style>

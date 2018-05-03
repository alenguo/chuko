<template>
    <div class="container">
        
        <div class="block__title">
            <h2>头像</h2>
            <p>不同的场景下，用户头像的不同展示方式。</p>
        </div>        
        
        <div class="block__cell">
            <ww-avatar size="small" />
            <ww-avatar size="small" rounded />
        </div>
        <div class="block__cell">
            <ww-avatar  />
            <ww-avatar rounded />
        </div>
        <div class="block__cell">
            <ww-avatar size="large" />
            <ww-avatar rounded size="large" />
        </div>
        <div class="block__cell">
            <ww-avatar size="large" disabled />
            <ww-avatar rounded size="large" disabled />
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

<style>
    page{
        background: white;
    }
</style>

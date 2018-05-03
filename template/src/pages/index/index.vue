<template>
    <div>

        <div class="grids">
            <div class="grids__head">
                风格
            </div>
            <div class="grids__body">
                <div class="grid" hover-class="grid_hover">
                    <img class="grid__icon" src="../../images/demo/color.png" />
                    <div class="grid__title">颜色</div>
                </div>    
                <div class="grid" hover-class="grid_hover">
                    <img class="grid__icon" src="../../images/demo/font.png" />
                    <div class="grid__title">字体</div>
                </div>
                <div class="grid" hover-class="grid_hover">
                    <img class="grid__icon" src="../../images/demo/icon.png" />
                    <div class="grid__title">图标</div>
                </div>                    
            </div>
        </div>
    
        <div class="grids">
            <div class="grids__head">
                基础样式
            </div>
            <div class="grids__body">
                <div class="grid" hover-class="grid_hover" @click="onDemoButton">
                    <img class="grid__icon" src="../../images/demo/button.png" />
                    <div class="grid__title">按钮</div>
                </div>    
                <div class="grid" hover-class="grid_hover" @click="onDemoCell">
                    <img class="grid__icon" src="../../images/demo/list.png" />
                    <div class="grid__title">列表</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoAvatar">
                    <img class="grid__icon" src="../../images/demo/avatar.png" />
                    <div class="grid__title">头像</div>
                </div>
            </div>
        </div>
    
        <div class="grids">
            <div class="grids__head">
                表单控件
            </div>
            <div class="grids__body">
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <img class="grid__icon" src="../../images/demo/text.png" />
                    <div class="grid__title">文本</div>
                </div>    
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <img class="grid__icon" src="../../images/demo/number.png" />
                    <div class="grid__title">数字</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <img class="grid__icon" src="../../images/demo/price.png" />
                    <div class="grid__title">金额</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <div class="grid__icon"></div>
                    <div class="grid__title">多行文本</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <div class="grid__icon"></div>
                    <div class="grid__title">单选</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <div class="grid__icon"></div>
                    <div class="grid__title">多选</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <div class="grid__icon"></div>
                    <div class="grid__title">日期</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoForm">
                    <div class="grid__icon"></div>
                    <div class="grid__title">时间</div>
                </div>
                 <div class="grid" hover-class="grid_hover" @click="onDemoPanel">
                    <div class="grid__icon"></div>
                    <div class="grid__title">附件</div>
                </div>    
            </div>
        </div>


        <div class="grids">
            <div class="grids__head">
                组件
            </div>
            <div class="grids__body">
                <div class="grid" hover-class="grid_hover" @click="onDemoContacts">
                    <div class="grid__icon"></div>
                    <div class="grid__title">选人</div>
                </div>    
                <div class="grid" hover-class="grid_hover" @click="onDemoAuthCode">
                    <div class="grid__icon"></div>
                    <div class="grid__title">验证码</div>
                </div>
                <div class="grid" hover-class="grid_hover" @click="onDemoCheckBox">
                    <div class="grid__icon"></div>
                    <div class="grid__title">多选</div>
                </div>      
                <div class="grid" hover-class="grid_hover" @click="onDemoEmpty">
                    <div class="grid__icon"></div>
                    <div class="grid__title">空白页</div>
                </div>  
                <div class="grid" hover-class="grid_hover" @click="onDemoNavBar">
                    <div class="grid__icon"></div>
                    <div class="grid__title">navBar</div>
                </div>  
                <div class="grid" hover-class="grid_hover" @click="onDemoPopupAnim">
                    <div class="grid__icon"></div>
                    <div class="grid__title">popupAnim</div>
                </div>  

            </div>
        </div>
    
        <!-- <div class="block__title" block>Chuko UIKit</div>
        
            <div class="block__cell">
                <ww-button title="Button" block @click="onDemoButton" />
            </div>
            <div class="block__cell">
                <ww-button title="Avatar" block @click="onDemoAvatar" />
            </div>
            <div class="block__cell">
                <ww-button title="List" block @click="onDemoCell" />
            </div> -->
    
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
            },
            onDemoAvatar(event) {                
                wx.navigateTo({
                    url: '/pages/demo-avatar/main'
                })
            },
            onDemoButton(event) {
                wx.navigateTo({
                    url: '/pages/demo-button/main'
                })
            },
            onDemoCell(event) {
                wx.navigateTo({
                    url: '/pages/demo-cell/main'
                })
            },
            onDemoForm(event) {
                wx.navigateTo({
                    url: '/pages/demo-form/main'
                })
            },
            onDemoPanel(event) {
                wx.navigateTo({
                    url: '/pages/demo-panel/main'
                })
            },
            onDemoContacts(event) {
                wx.navigateTo({
                    url: '/pages/contacts/main'
                })
            },
            onDemoAuthCode(event) {
                wx.navigateTo({
                    url: '/pages/authCode/main'
                })
            },
            onDemoCheckBox(event) {
                wx.navigateTo({
                    url: '/pages/checkBox/main'
                })
            },
            onDemoEmpty(event) {
                wx.navigateTo({
                    url: '/pages/empty/main'
                })
            },
            onDemoNavBar(event) {
                wx.navigateTo({
                    url: '/pages/navBar/main'
                })
            },
            onDemoPopupAnim(event) {
                wx.navigateTo({
                    url: '/pages/popupAnim/main'
                })
            },
        },
    
        created() {
            // 调用应用实例的方法获取全局数据
            this.getUserInfo()
        }
    }
</script>

<style>
    
    page {
        background-color: #F5F5F5;        
        padding-bottom: 1px;
    }
    
</style>


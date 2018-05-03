<template>
    <div class="page page__contacts" :class="isIphoneX ? 'page__contacts_iphoneX' : ''">
        
        <search-bar v-model="searchValue" :search-list="searchList"></search-bar>
        <div v-show="searchList.length" class="wwui-search-bar__result">
            <div class="search-user-list" v-for="item in searchList" :key="item.id">
                <label class="weui-cell weui-check__label contacts-cell__item" @click="onTapLabelItem(item, 'search')">
                    <input type="checkbox" class="contacts__user-list_checkbox" value="" :checked="item.checked"/>
                    <div class="weui-cell__hd weui-check__hd_in-checkbox">
                        <img class="contacts-icon-checkbox icon-checkbox_circle" src="/images/icon-checkbox_circle.png" v-if="!item.checked"/>
                        <img class="contacts-icon-checkbox icon-checkbox_success" src="/images/icon-checkbox_success.png" v-if="item.checked"/>
                    </div>
                    <img class="user-avatar" :src="item.head_url || '/images/default-avatar.png'"/>
                    <div class="weui-cell__bd">
                        <div class="contacts-name">{{item.name}}</div>
                        <div class="contacts-position">{{item.position}}</div>
                    </div>
                </label>
            </div>
        </div>
        
        
        <div class="contacts__body">
            <div v-if="navPaths.length > 1" class="nav-paths">
                <div class="contacts-nav-path__back" @click="onTapNavPathItem(navPaths[navPaths.length-2].partyId)" >
                    <img class="contacts-nav-path__icon-forward" src="/images/icon-forward.png" />
                    <span class="contacts-nav-path__back-text">返回上一级</span>
                    <span class="contacts-nav-path__gap">|</span>
                </div>
                <span class="nav-paths__link" v-html="navPaths[navPaths.length-1].partyName"></span>
            </div>
            <div v-if="pageReady" class="weui-cells weui-cells_after-title" :class="selectedUserList.length ? 'weui-cells_margin-bottom': ''">
                <div class="contacts-scroll-view" :style="{height: scrollViewHeight}">
                    <div v-for="item in userList" :key="item.id">
                        <label class="weui-cell weui-check__label contacts-cell__item" @click="onTapLabelItem(item)">
                            <input type="checkbox" class="contacts__user-list_checkbox" value="" :checked="item.checked"/>
                            <div class="weui-cell__hd weui-check__hd_in-checkbox">
                                <img class="contacts-icon-checkbox icon-checkbox_circle" src="/images/icon-checkbox_circle.png" v-if="!item.checked"/>
                                <img class="contacts-icon-checkbox icon-checkbox_success" src="/images/icon-checkbox_success.png" v-if="item.checked"/>
                            </div>
                            <img class="user-avatar" :src="item.head_url || '/images/default-avatar.png'"/>
                            <div class="weui-cell__bd">
                                <div class="contacts-name">{{item.name}}</div>
                                <div class="contacts-position">{{item.position}}</div>
                            </div>
                        </label>
                    </div>
                    <div v-for="partyItem in partyList" :key="partyItem.id">
                        <div class="weui-cell weui-cell_access contacts-cell__item" hover-class="weui-cell_active" @click="onTapPartyItem(partyItem)">
                            <div class="weui-cell__hd">
                                <img class="contacts-party-icon" src="/images/default-party.png" />
                            </div>
                            <div class="weui-cell__bd">{{partyItem.partyName}}</div>
                            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!pageReady" class="wwui-empty">
                <img class="wwui-empty__loading-icon" src="/images/icon-loading.gif" />
                <span class="wwui-empty__text">加载中</span>
            </div>
            <div v-if="selectedUserList.length" class="contacts__selects-user">
                <scroll-view scroll-x class="contacts-scroll-view__select-user" style="width: 73%;white-space: nowrap; display: flex;" :scroll-left="scrollLeft">
                    <block v-for="item in selectedUserList" :key="item.id">
                        <img class="user-avatar" :src="item.head_url || '/images/default-avatar-small.png'"  @click="onTapSelectItem(item)"/>
                    </block>
                </scroll-view>
                <div class="contacts__selects-button" @click="onTapSelectConfirm">
                    确定({{selectedUserList.length}})
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import searchBar from '@/components/searchBar'
    import storage from '../lib/storage/storage';
    import request from '../lib/request/request';
    export default {
        model: {},
        props: {
            isRadioMode: {
                type: Boolean
            },
            selectedUsers: {
                type: Array,
                value: []
            }
        },
        data() {
            return {
                navPaths: [],
                userList: [],
                partyList: [],
                selectedUserList: [],
                storageNavPaths: [],
                isIphoneX: false,
                pageReady: false,
                scrollViewHeight: 0,
                scrollLeft: 100,
                isCorpBaseRoot: true,
                APPROVAL_ERROR_TIPS: '审批人最多支持10人',
                CONTACT_PAGE_TITLE: '选择审批人',
                searchValue: '',
                searchList: [],
            };
        },
        created() {
            let self = this;
            // console.log(self.properties);
            self.removeLocalStorage();
            self.selectedUserList = self.selectedUserList.length ? self.selectedUserList : (storage.getStorage('selectedUserList') || []);
            self.getPartyData();
            
            self.getScrollHeight();

            wx.setNavigationBarTitle({
                title: this.CONTACT_PAGE_TITLE,
            });
        },
        destroyed() {
            this.removeLocalStorage();
        },
        watch: {
            searchValue: function (val, oldVal) {
                // console.log('new: %s, old: %s', val, oldVal)
                if(val != oldVal){
                    this.searchContacts(val);
                }
            },
        },
        methods: {
            /**
             * getScrollHeight 获取屏幕高度
             */
            getScrollHeight: function() {
                let self = this;
                wx.getSystemInfo({
                    success: function(res) {
                        // console.log(res);
                        self.scrollViewHeight = res.windowHeight - 145;
                        // iphoneX手机需要减去底部控制区的高度
                        if (self.isIphoneX) {
                            self.scrollViewHeight -= 34;
                        }
                    }
                });
            },
            /**
             * 获取组织架构数据
             */
            getPartyData: function(partyId) {
                let self = this;
                let option = {
                    start: 0,
                    limit: 30,
                };
                if (partyId) {
                    Object.assign(option, {
                        partyid: partyId,
                    });
                }
                
                request.request({
                    url: 'shenpi_XCX_get_party_contacts_wx',
                    data: option,
                }).then(function(response) {
                    self.loadPartyDataCallback(partyId, response.data);
                });
            },
            /**
             * 从本地存储中获取组织架构的数据
             * @param partyid
             * @returns {T}
             */
            getNavPathName: function(partyId) {
                let self = this;
                self.storageNavPaths = storage.getStorage('navPaths') || [];
                let findItem = self.storageNavPaths.find(function(item) {
                    return item.partyId == partyId;
                });
                return findItem;
            },
            /**
             * 拉取组织结构数据的回调处理方法
             * @param partyId
             * @param res
             */
            loadPartyDataCallback: function (partyId, res) {
                let self = this;
                self.partyList = res.data.party_data;
                self.userList = res.data.user_data;
                // 如果是组织架构的根目录，只有一个企业名时，再次发起请求获取二级目录结构
                if (self.isCorpBaseRoot && self.partyList) {
                    self.getPartyData(self.partyList[0].partyId);
                    self.isCorpBaseRoot = false;
                    
                    return;
                }
                if (partyId) {
                    let pathInfo = (res.data.party_data && res.data.party_data.length && res.data.party_data[0].pathInfo) || [];
                    if (pathInfo.length) {
                        self.navPaths = [];
                        pathInfo.map((partyid, index) => {
                            if (index < (pathInfo.length - 1)) {
                                if (self.getNavPathName(partyid)) {
                                    self.navPaths.push(self.getNavPathName(partyid));
                                }
                            }
                        });
                    }
                }
                self.userList.map((val, key) => {
                    val.checked = false;
                    self.selectedUserList.map((item, index) => {
                        if (val.vid == item.vid) {
                            val.checked = true;
                        }
                    });
                });
                self.pageReady = true;

            },
            initDefaultState: function() {
                let self = this;
                self.selectedUserList = [];
                self.removeLocalStorage();
                self.userList.map((item, index) => {
                    item.checked = false;
                });
            },
            /**
             * 选人确定按钮
             * @param e
             */
            onTapSelectConfirm: function(e) {
                let self = this;
                if (self.selectedUserList.length > 10) {
                    self.showToast(self.APPROVAL_ERROR_TIPS, 1);
                    return;
                }
                self.initDefaultState();

                // 通过input绑定机制通知数据到父级页面，父级页面使用v-modle接受数据
                // this.$emit('input', this.selectedUserList);

                // 通过传递自定义事件名传递数据，父级页面使用@confirm事件绑定接受事件函数
                this.$emit('confirm', this.selectedUserList);
            },
            /**
             * 点击组织架构列表，进入子组织结构
             * @param e
             */
            onTapPartyItem: function(data) {
                let self = this;
                let target = data;
                // console.log(e);
                self.pageReady = false;
                self.navPaths.push({
                    partyId: target.partyId,
                    partyName: target.partyName,
                });
                storage.setStorage('navPaths', self.navPaths);
                
                self.getPartyData(target.partyId);
            },
            /**
             * 点击面包屑上的组织架构，返回已访问的目录
             * @param e
             */
            onTapNavPathItem: function(partyId) {
                let self = this;
                self.getPartyData(partyId);
            },
            /**
             * 点击选中用户
             * @param e
             */
            onTapSelectItem: function(data) {
                let self = this;
                let target = data;
                self.initSelectUserArray(target);
            },
            /**
             * 选择用户点击事件
             * @param e
             */
            onTapLabelItem: function(data, type) {
                let self = this;
                let target = data;
                // 单选模式
                if (!self.isRadioMode) {
                    
                    target.checked = target.checked ? false: true;
                    
                    let hasSel = self.selectedUserList.filter((item, index) => {
                            return item.vid == target.vid;
                        })

                    if(target.checked){

                        if(!hasSel.length){
                            self.selectedUserList.push({
                                name: target.name,
                                vid: target.vid,
                                head_url: target.head_url,
                                checked: true,
                            });
                        }
                        
                    }else{
                        if(hasSel.length){
                            self.selectedUserList.map((item, index) => {
                                if(item.vid == target.vid){
                                    self.selectedUserList.splice(index, 1);
                                }
                            })
                        }
                    }
                    
                }
                self.scrollLeft *= self.selectedUserList.length;

                if(type == 'search'){
                    self.searchList = [];
                    self.initSelectUserArray(target);
                }
            },
            /**
             * 更新已选择用户的数据
             * @param data
             */
            initSelectUserArray: function(data) {
                let self = this;
                self.userList.map((item, index) => {
                    if (item.vid == data.vid) {
                        item.checked ? item.checked = false : item.checked = true;
                    }
                });
                self.selectedUserList.map((item, index) => {
                    if (data.vid == item.vid && (data.checked == true || data.checked == 'true')) {
                        self.selectedUserList.splice(index, 1);
                    }
                });
               
                storage.setStorage('selectedUserList', self.selectedUserList);
            },
            /**
             * 搜索联系人
             * @param keyword
             */
            searchContacts: function (keyword) {
                let self = this;
                let params = {
                    keyword
                };
                let searchContacts = [];
                
                request.request({
                    url: 'shenpi_XCX_search_member_wx',
                    data: params,
                }).then(function(response) {
                    console.log(response);
                    searchContacts = response && response.data && response.data.data && response.data.data.search_data;

                    searchContacts.map((val, key) => {
                        val.checked = false;
                        self.selectedUserList.map((item, index) => {
                            if (val.vid == item.vid) {
                                val.checked = true;
                            }
                        });
                    });
                    
                    self.searchList = searchContacts;
                });
                
            },
            /**
             * 清理控件的缓存
             */
            removeLocalStorage: function() {
                storage.removeStorage('selectedUserList');
            },
            showToast: function(text, type, callback) {
                var self = this;
                self.toast.text = text;
                self.toast.show = true;
                self.toast.type = type;
                // toast.showCustomToast.bind(this)(self.toast, callback);
            },
        },
        components: {
            searchBar
        }
    };
</script>

<style scoped>
    .page__contacts {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        background: #f5f5f5;
        z-index: 99;
    }
    .contacts__body {
        position: relative;
        display: block;
        flex: 1;
        margin-top: 44px;
        height: 100%;
        z-index: 99;
    }
    .weui-cells_after-title {
        height: 100%;
        border: none;
    }
    .weui-cells_margin-bottom{
        margin-bottom: 65px;
    }
    .user-avatar {
        width: 42px;
        height: 42px;
        margin: 0 12px 0 0;
        vertical-align: middle;
        border-radius: 5px;
        background: #f0f2f4;
        border: 1px solid #f0f2f4;
    }
    .contacts-party-icon {
        width: 42px;
        height: 42px;
        margin: 0 12px 0 0;
        border-radius: 5px;
        vertical-align: middle;
    }
    .contacts-icon-checkbox {
        width: 23px;
        height: 23px;
        margin-left: 4.6px;
        margin-right: 4.6px;
        vertical-align: middle;
    }
    .nav-paths {
        padding: 10px 15px;
        font-size: 17px;
        background: #fff;
    }
    .contacts-nav-path__back {
        display: inline-block;
    }
    .contacts-nav-path__icon-forward {
        width: 8px;
        height: 14px;
        vertical-align: middle;
        margin: 0 6px 3px 0;
    }
    .contacts-nav-path__back-text {
        color: #4F77AA;
    }
    .contacts-nav-path__gap {
        color: #BBB;
        margin: 0 10px;
    }
    .nav-paths__link {}
    .contacts__body {
        background: #fff;
    }
    .contacts__selects-user {
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 90%;
        height: 50px;
        line-height: 50px;
        padding: 0 7% 0 3%;
        background: #fafafa;
        border-top: 1rpx solid #eaeaeb;
    }
    .page__contacts_iphoneX .contacts__selects-user {
        padding-bottom: 34px;
    }
    .contacts__selects-user .user-avatar {
        width: 38px;
        height: 38px;
        margin: 0 3px 0.3em 3px;
    }
    .contacts__selects-button {
        position: absolute;
        right: 20px;
        top: 0;
        color: #468ceb;
        font-size: 17px;
    }
    .contacts-scroll-view {
        overflow: hidden;
        overflow-y: auto;
    }
    .contacts-scroll-view__select-user {
        position: absolute;
        left: 5px;
        right: 140px;
        top: 0;
        height: 44px;
        width: 73%;
    }
    .contacts__user-list_checkbox {
        width: 0;
        height: 0;
        opacity: 0;
    }
    .contacts-cell__item {
        padding: 8px 12px;
        font-size: 17px;
    }
    .contacts-cell__item:before {
        border-color: #ededed;
    }
    .contacts-name {
        font-size: 17px;
        color: #000;
    }
    .contacts-position {
        font-size: 14px;
        color: #9B9B9B;
    }
    /*为空页临时样式*/
    .wwui-empty {
        display: block;
        width: 100%;
        text-align: center;
        color: #8FA2B5;
        padding-top: 34%;
        font-size: 12px;
    }
    .wwui-empty__icon {
        vertical-align: top;
        width: 107px;
        height: 107px;
    }
    .wwui-empty__network-icon {
        width: 80px;
        height: 82px;
    }
    .wwui-empty__text {
        margin-top: 10px;
        display: block;
        font-size: 16px;
        line-height: 20px;
        color: #ACB2BB;
    }
    .wwui-empty__intro {
        padding-top: 5px;
        font-size: 13px;
    }
    /*loading要居中，这里的百分比不包括topBar的高度*/
    .wwui-empty__loading {
        position: absolute;
        top: 45%;
        width: 100%;
        text-align: center;
    }
    .wwui-empty__loading-icon {
        width: 25px;
        height: 25px;
    }
    .wwui-empty__network-icon_hover {
        opacity: 0.6;
    }
    .wwui-empty__loading-text {
        margin-top: 0;
        display: block;
        font-size: 14px;
        line-height: 20px;
        color: #ACB2BB;
    }

    .wwui-search-bar__result {
        position: fixed;
        top: 44px;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
    .search-user-list{
        background: #fff;
    }

    
</style>

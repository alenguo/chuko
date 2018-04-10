<template>
  <div class="container">

    <div v-if="selectedUsersString" style="padding:20px;word-break:break-all;">
      <h3>已选择用户:</h3>
      {{selectedUsersString}}
    </div>
    <contacts v-else v-model='selectedUsers' :selected-users="[]" @confirm="onTapSelectConfirm"></contacts>

  </div>
</template>

<script>
import contacts from '@/components/contacts'
import request from '@/lib/request/request'

export default {
  data () {
    return {
      userInfo: {},
      selectedUsers: []
    }
  },

  components: {
    contacts,
  },
  computed: {
    selectedUsersString: function () {
        return this.selectedUsers.length ? JSON.stringify(this.selectedUsers) : null;
    }
  },
  methods: {
    onTapSelectConfirm (data){
        console.log('onTapSelectConfirm---', data);
        this.selectedUsers = data;
    },
    getUserInfo () {

      request.doLogin();
      
      // 调用登录接口
      wx.login({
        success: (res) => {
          console.log(res);
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log(res);
            }
          })
        }
      })
    },
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>



</style>

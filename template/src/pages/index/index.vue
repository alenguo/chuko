<template>
  <div class="container">
    <ww-button @click="handleClick" type="primary" rounded>提交审批</ww-button>
    <ww-button @click="handleClick" rounded>提交审批</ww-button>
    <ww-button @click="handleClick" disabled>提交审批</ww-button>
  </div>
</template>

<script>
  import request from '@/lib/request/request'
  import WwButton from '@/components/button'
  export default {
    data() {
      return {
        userInfo: {},
        selectedUsers: []
      }
    },
    components: {
      WwButton,
    },
    computed: {
      selectedUsersString: function() {
        return this.selectedUsers.length ? JSON.stringify(this.selectedUsers) : null;
      }
    },
    methods: {
      handleClick() {
        console.log("clicked!");
      },
      getUserInfo() {
        
      },
    },
    created() {
      // 调用应用实例的方法获取全局数据
      request.doLogin();
    }
  }
</script>

<style scoped>

</style>

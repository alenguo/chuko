<template>
  <div class="container">
    <empty empty-logo="../../static/images/icon-blank.png" empty-wording="为空页面提示文字111"></empty>
  </div>
</template>

<script>
  import empty from '@/components/empty'
  export default {
    data() {
      return {
        userInfo: {},
      }
    },
    components: {
      empty,
    },
    computed: {},
    methods: {
      handleClick() {
        console.log("clicked!");
      },
      getUserInfo() {
      },
    },
    created() {
      // 调用应用实例的方法获取全局数据
    }
  }
</script>

<style scoped>

</style>

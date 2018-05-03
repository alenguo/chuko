<template>
  <div class="container">
    <navBar></navBar>
  </div>
</template>

<script>
  import navBar from '@/components/navBar'
  export default {
    data() {
      return {
        userInfo: {},
      }
    },
    components: {
      navBar,
    },
    computed: {},
    methods: {},
    created() {
      // 调用应用实例的方法获取全局数据
    }
  }
</script>

<style scoped>

</style>

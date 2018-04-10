<template>
  <div class="container">
    <check-box></check-box>
  </div>
</template>

<script>
  import checkBox from '@/components/checkBox'
  export default {
    data() {
      return {
        userInfo: {},
      }
    },
    components: {
      checkBox,
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

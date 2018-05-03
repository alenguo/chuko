<template>
  <div class="container">
    <popup-anim></popup-anim>
  </div>
</template>

<script>
  import popupAnim from '@/components/popupAnim'
  export default {
    data() {
      return {
        userInfo: {},
      }
    },
    components: {
      popupAnim,
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

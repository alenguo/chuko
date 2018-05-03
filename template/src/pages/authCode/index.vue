<template>
  <div class="container">
    <auth-code v-model="inputValue">提交审批</auth-code>
  </div>
</template>

<script>
  import authCode from '@/components/authCode'
  export default {
    data() {
      return {
        inputValue: '',
      }
    },
    components: {
      authCode,
    },
    computed: {
      
    },
    methods: {
      
    },
    created() {
      
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="login_container">
    <div>Login</div>
    <div class="login_button" @click="testRequest">Логин</div>
  </div>
</template>

<script>
import { test } from '@/request'
export default {
  name: 'Login',
  data() {
    return {}
  },
  methods: {
    testRequest() {
      // const getData = async () =>{
      //   const data = await test()
      //   console.log('data', data)
      // }
      // getData.then(data =>{
      //   console.log('tada', data)
      // })
      test().then((data) => {
        console.log('data', data)
      })
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login_button {
  width: 150px;
  height: 50px;
  background: green;
  color: black;
  margin: 0 auto;
  cursor: pointer;
}
</style>

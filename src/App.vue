<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  font-family: 'Montserrat', sans-serif;
  background: #f7f3eb;
  min-height: 100vh;
  overflow-y: hidden;
}
body {
  margin: 0 auto;
  padding: 0;
}
.disable-button{
  opacity: .6;
  pointer-events: none;
}
</style>
<script>
import Navbar from '@/components/Navbar'
export default {
  components: { Navbar }
}
</script>

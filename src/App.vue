<template>
  <div id="app">
    <Navbar/>
    <router-view />
  </div>
</template>


<style lang="scss">
#app {
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  background: #f7f3eb;
  height: 100vh;
}
body {
  margin: 0 auto;
  padding: 0;
}
</style>
<script>
import Navbar from "@/components/Navbar";
export default {
  components: { Navbar }
};
</script>

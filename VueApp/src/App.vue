<template>
  <div id="app">
    <img alt="Vue logo" src="https://cdn.discordapp.com/icons/563287374784888852/ca8febea51760fd3eab11827f67c500c.webp?size=2048">
    <Client/>
    
  </div>
</template>

<script>
import Client from './components/Client.vue'

export default {
  name: 'App',
  components: {
    Client
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  /* background: rgb(75, 74, 74); */
}
body {
  background: rgb(49, 49, 49);
  overflow-x: hidden;
  color: #fff;
}

* {
  padding: 0;
  margin: 0;
}
</style>

<template>
  <b-row align-h="start" id="app">
    <SideMenu></SideMenu>
    <b-col sm="9">
      <router-view/>
    </b-col>
  </b-row>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  width: 100vw;
}
</style>

<script>
import SideMenu from '@/components/SideMenu.vue';

export default {
  components: {
    SideMenu,
  },
};
</script>

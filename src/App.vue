<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/nav/nav'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="scss">

</style>

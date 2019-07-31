<template>
  <div class="wrapper">
    <div id="header">
      <v-header></v-header>
    </div>
    <div class="layout ui-flex">
      <div id="nav">
        <v-left></v-left>
      </div>
      <div class="layoutRight ui-flex-1">
        <div id="contain">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VHeader from '../components/header';
  import VLeft from '../components/left';
export default {
  data(){
    return{

    }
  },
  created(){
  },
  components:{
    VHeader, VLeft
  }
}
</script>
<style lang="scss">
</style>

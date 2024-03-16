
<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vx">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view/>
      </a-layout-content>
      <a-layout-footer class="footer">版权xh@好累啊！！！</a-layout-footer>
    </a-layout>
  </div>
   
  </template>
  
<script setup lang="ts">
 import GlobalHeader from '../components/GlobalHeader.vue';

</script>
<style scoped>
#basicLayout{
 top: 0;
}

#basicLayout .content{
  margin-bottom: 16px;
}

#basicLayout .footer{
  background:  greenyellow;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
  
<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vx">
      <a-layout-header class="header">
        <div class="logo-bar">
          <img class="logo" src="../assets/oj-logo.svg">
          <div class="title">XH-OJ</div>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">版权xh@好累啊！！！</a-layout-footer>
    </a-layout>
  </div>
</template>
    
<script setup lang="ts">
import GlobalHeader from '../components/GlobalHeader.vue';

</script>
<style scoped>
#userLayout{
}
.logo-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 64px;
  margin-left: 20px;
}

#userLayout .content {
  margin-bottom: 16px;
}

#userLayout .footer {
  background: gray;
  padding: 16px;
  position: sticky;
 
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
    
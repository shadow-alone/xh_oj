<template>
  <div id="app">
   <template v-if="route.path.startsWith('/user')">
    <router-view/>
   </template>
    <template v-else>
      <Basiclayout />
    </template>
  </div>
</template>

<script setup>
import Basiclayout from '@/layouts/Basiclayout.vue';
import {useRoute}  from 'vue-router'

const route=useRoute();

// const doInit=()=>{
     
// };

// onMounted(() => {
//   doInit();
// });




</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

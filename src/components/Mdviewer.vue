<template>
  <Viewer  :value="discribe" :plugins="plugins"/>
  <Viewer  :value="example" :plugins="plugins"   style="margin-top: 100px;"/>
  <Viewer  :value="tip" :plugins="plugins"  style="margin-top: 150px;"/>
</template>


<script setup lang="ts">
import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/vue-next';
import {withDefaults,defineProps} from 'vue';

interface Props{
    value:string;
}
const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});

const text=props.value.split("\\n")
const discribe=text[0];
const example=text[1];
const tip=text[2];

console.log(text)
</script>



<style >
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child{
    display: none;
}
</style>
<template>
  <a-row id="hander" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="selectedkeys" @menu-item-click="doMenuclick">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="logo-bar">
            <img class="logo" src="../assets/oj-logo.svg">
            <div class="title">XH-OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleroutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      {{ store.state.user?.longinuser?.userName ?? "未登录" }}
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { routes } from '../router/routes';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import accessEnum from '@/access/accessEnum';
import accessCheck from '@/access/accessCheck';

const router = useRouter();
const store = useStore()

// 点击跳转路由组件界面
const doMenuclick = (key: string) => {
  router.push({ path: key })
};

// 高亮显示
const selectedkeys = ref(["/"]);
router.afterEach((to, from, failure) => {
  selectedkeys.value = [to.path]
});

// 组件过滤
const visibleroutes = computed(() => {
  return routes.filter(
    (item, index) => {
      const isvisable=item?.meta?.isvisable??true;
      if(!isvisable)
      {
        return false;
      }
      if (item?.meta?.access===accessEnum.ADMIN) {
        console.log("global",store.state.user?.longinuser)
        if (accessCheck(store.state.user?.longinuser, item?.meta?.access as string)) {
          return true;
        }
        else {
          return false;
        }
      }
      return true;
    })
}
);



</script>


<style scoped>
.logo-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 64px;
}

.title {
  color: black;
  margin-left: 16px;
}
</style>

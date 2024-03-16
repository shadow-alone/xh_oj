<template>

    <div id="loginview">
        <div class="title">
            <h2>用户登录</h2>
        </div>
        <div class="from">
            <a-form :model="form" :style="{ width: '600px' }" auto-label-width @submit="handleSubmit">
                <a-form-item field="userAccount" label="账号">
                    <a-input v-model="form.userAccount" placeholder="请输入账号" />
                </a-form-item>
                <a-form-item field="userPassword" label="密码">
                    <a-input-password v-model="form.userPassword" placeholder="请输入密码." />
                </a-form-item>
                <a-form-item>
                    <a-button style="width: 160px;" type="primary" html-type="submit">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import message from '@arco-design/web-vue/es/message';
import { UserControllerService, UserLoginRequest } from '../../generated';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useStore } from 'vuex';

const form = reactive({
    userAccount: '',
    userPassword: '',
})

const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
    const res = await UserControllerService.userLoginUsingPost(form);
    if (res.code === 0) {
        await store.dispatch("getloginuser");
        router.push({
            path: "/",
            replace: true
        });
        message.success("登录成功")
    }
    else {
        message.error("登录失败" + res.message);
    }
}
</script>

<style scoped>
#loginview {
    margin-left: 500px;
    margin-top: 200px;
    height: 63.9vh;
    /* 设置高度以确保垂直居中 */

}

#loginview .title {
    margin-left: 270px;
    padding: 20px;
}

#loginview .from {
    margin-left: auto;
}
</style>
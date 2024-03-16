import { RouteRecordRaw } from "vue-router";
import viewQuestion from '@/views/question/ViewQuestion.vue'
import accessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import userLogin from "@/views/userLogin.vue";
import userRegister from "@/views/userRegister.vue";
import Management from "@/views/userManagement.vue";
export const routes: Array<RouteRecordRaw> = [
{
    path:"/user",
    name:"用户布局",
    component:UserLayout,
    meta:{
        isvisable:false
    },
    children:[
        {
            path:"/user/userLogin",
            name:"用户登录",
            component:userLogin,
        },
        {
            path:"/user/userRegister",
            name:"用户注册",
            component:userRegister,
        }
    ],
},
{
    path:"/",
    name:"浏览题目",
    component:viewQuestion,
},
{
    path:"/question/do",
    name:"做题目",
    meta:{
        access:accessEnum.USER,  
        isvisable:false
     },
    component:()=>import( "@/views/question/doQuestion.vue")
},
{
    path:"/question/add",
    name:"上传题目",
    meta:{
        access:accessEnum.ADMIN  
     },
    component:()=>import( "@/views/question/AddQuestion.vue")
},
{
    path:"/question/update",
    name:"更新题目",
    meta:{
        isvisable:false
    },
    component:()=>import( "@/views/question/AddQuestion.vue")
},
{
    path:"/question/manage",
    name:"管理题目",
    meta:{
        access:accessEnum.ADMIN  
     },
    component:()=>import( "@/views/question/ManageQuestion.vue")
},
{
    path:"/doQuestionRecode",
    name:"做题记录",
    meta:{
        access:accessEnum.USER
    },
    component:()=>import( "@/views/question/doQuestionRecode.vue")
},

{
    path:"/about",
    name:"关于我们",
    component:()=>import( "@/views/about.vue")
},
{
    path:"/Management",
    name:"用户管理",
    meta:{
       access:accessEnum.ADMIN  
    },
    component:Management
},


]
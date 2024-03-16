import accessEnum from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import  {UserControllerService} from "../../generated"


export default {
    namespace:true,
    state:()=> ({
        longinuser:{
            userName:"未登录",
        },
    }),
    actions: {
       async  getloginuser({commit,state},payload){
        const res=await UserControllerService.getLoginUserUsingGet();
        console.log("store",res)
        if(res.code===0)
        {
         
         commit("updateuser",res.data);
        }
        else
        commit("updateuser",{...state.longinuser,userRole:accessEnum.NOT_LOG});
    },
    },
    mutations:{
        updateuser(state,payload){
         state.longinuser=payload;
        }
    },
  }as StoreOptions<any>
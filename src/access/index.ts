import  store from '@/store';
import  router from '@/router';
import accessEnum from './accessEnum';
import accessCheck from './accessCheck';




router.beforeEach(async (to, from, next) => {
  let longinuser=store.state.user.longinuser;
  // if(!longinuser||!longinuser.userRole){
  //   await store.dispatch("getloginuser");
  // }
  const needAccess=to.meta?.access??accessEnum.NOT_LOG;
  if(needAccess!==accessEnum.NOT_LOG){
    {
     await store.dispatch("getloginuser");
      longinuser = store.state.user.longinuser;
   }
    if(!longinuser.userRole||longinuser.userRole===accessEnum.NOT_LOG){
      next({ name: '用户登录' });
      return;
    }
    if(accessCheck(longinuser,needAccess as string))
    {
        next();
        return;
    }
  }
  next();

})
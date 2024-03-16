import accessEnum from'./accessEnum'


const accessCheck=(loginuser:any,needAccess=accessEnum.NOT_LOG)=>{
    const loginuserrole=loginuser?.userRole??accessEnum.NOT_LOG;

     if(needAccess===accessEnum.NOT_LOG)
     {    return true;}
     if(needAccess===accessEnum.USER)
     {
        if(loginuserrole!==accessEnum.USER)
        return false;

     }
     if(needAccess===accessEnum.ADMIN)
     {
        if(loginuserrole!==accessEnum.ADMIN)
        return false;
     }
     return true;
     


}

export default accessCheck
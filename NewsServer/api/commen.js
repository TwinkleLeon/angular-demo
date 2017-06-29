// 检测用户名是否为空
exports.testAccount=function(account){
     if(account && account.trim() && account.length>=5){
           return true;
     }else{
           return false;
     }
}
// 检测密码是否为空
exports.testPassword = function(password){
     if(password&&password.trim()&&password.length>=5&&password.length<=15){
           return true;
     }else{
           return false;
     }
}
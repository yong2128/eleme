module.exports.getNowTime=function(){
    var date=new Date();
    return date.getFullYear()+"-"
        +(date.getMonth()+1).toString().padStart(2,"0")+"-"
        +date.getDate().toString().padStart(2,"0")
        +" "+date.getHours().toString().padStart(2,"0")
        +":"+date.getMinutes().toString().padStart(2,"0")
        +":"+date.getSeconds().toString().padStart(2,"0");
}
module.exports.end=function(res,ok=0,msg="网络连接错误"){
    res.end(JSON.stringify({
        ok,
        msg
    }))
}

//随机生成验证码
module.exports.getRandom = function(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
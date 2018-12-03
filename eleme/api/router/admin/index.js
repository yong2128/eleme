const common = require("../../modules/common");
const db = require("../../modules/db");
const md5 = require("md5");
const myEnum = require("../../modules/enum");

//获取验证码
module.exports.sendCode = function(req,res){
    var phoneId = req.query.phoneId;
    var code = common.getRandom(100000,999999);
    function insertCode(){
        db.insertOne("codeList",{
            phoneId,
            code,
            createTime : Date.now()
        },function(err,results){
            res.json({
                ok : 1,
                code
            })
        })
    }
    db.findOne("codeList",{phoneId},function(err,info){
        if(info){     //已存在该手机号码
            if(info.createTime + 1 * 60 * 1000 > Date.now()){   //验证码已发送且未过期
                var time = ((info.createTime + 1 * 60 * 1000 - Date.now()) / 1000).toFixed(2)
                res.json({
                    ok : 1,
                    msg : "您距离下一次发送验证码的时间还有" + time + "秒！"
                })
            }else{    //发送的验证码已过期，添加验证码
                insertCode();
            }
        }else{     //未存在时添加
            insertCode();
        }
    })
}

module.exports.login = function(req,res) {
    var adminName = req.query.adminName;
    var password = md5(req.query.password + "@!Ele.Com");
    var phoneId = req.query.phoneId;
    var code = req.query.code / 1;

    db.findOne("codeList",{
        phoneId,code
    },function(err,info){
        if(info){
            if(info.createTime + 1 * 60 * 1000 > Date.now()){   //成功
                db.findOne("adminList",{
                    adminName,password,phoneId
                },function(err,adminInfo){
                    if(adminInfo){
                        db.insertOne("adminLog", {
                            adminId: adminInfo._id,
                            logType: 1,
                            addTime: Date.now(),
                            detail: adminInfo.adminName + "在" + common.getNowTime() + "登录过！"
                        }, function (err, results) {
                            db.updateOneById("adminList", adminInfo._id, {$set: {lastTime: Date.now()}}, function (err, results) {
                                res.json({
                                    ok: 1,
                                    adminId: adminInfo._id,
                                    adminName: adminInfo.adminName,
                                    msg: "登录成功！"
                                })
                            })
                        });
                    }else{
                        db.insertOne("adminList",{
                            adminName,
                            password,
                            addTime : Date.now(),
                            lastTime : Date.now(),
                            phoneId,
                            goldNum:9999999
                        },function(err,results){
                            res.json({
                                ok:1,
                                adminName,
                                password,
                                phoneId,
                                goldNum:9999999,
                                msg : "注册成功！"
                            })
                        });
                    }
                })
            }else{
                res.json({
                    ok:0,
                    msg:"验证码过期!"
                })
            }
        }else{
            res.json({
                ok:0,
                msg:"验证码错误!"
            })
        }
    })
}

module.exports.register = function(req,res){
    var adminName = req.body.adminName;
    var password = md5(req.body.password + "@!Ele.Com");
    var phoneId = req.query.phoneId;
    db.count("adminList",{adminName,password},function(count){
        if(count > 0){
            commmon.end(res,0,"该用户已添加！");
        }else{
            db.insertOne("adminList",{
                adminName,
                password,
                phoneId,
                addTime : Date.now(),
                lastTime : Date.now(),
                goldNum:9999999
            },function(err,results){
                if(results.result.ok && results.result.n){
                    common.end(res,1,"添加管理员成功！");
                }else{
                    common.end(res,0,"添加管理员失败！");
                }
            });
        }
    })
}

module.exports.getAdminLogList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var pageSum = 1;
    var pageNum = 8;
    db.count("adminLog",{},function(count){
        pageSum = Math.ceil(count / pageNum);
        if(pageSum < 0){
            pageSum = 1;
        }
        if(pageIndex > pageSum){
            pageIndex = pageSum;
        }
        db.findAdminLogList("adminLog",pageNum,(pageIndex - 1) * pageNum,function(err,adminLogList){
            res.json({
                ok : 1,
                adminLogList,
                pageSum,
                pageIndex,
                adminLogEnum : myEnum.adminLogEnum
            });
        })
    })
}

module.exports.delAdminLogList = function(req,res){
    db.deleteOneById("adminLog",req.query.id,function(err,results){
        if(!err){
            if(results.result.ok && results.result.n){
                common.end(res,1,"删除管理员日志成功！");
            }else{
                common.end(res,0,"删除管理员日志失败！");
            }
        }else{
            common.end(res);
        }
    })
}

module.exports.getAdminList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var pageSum = 1;
    var pageNum = 8;
    db.count("adminList",{},function(count){
        pageSum = Math.ceil(count / pageNum);
        if(pageSum < 1){
            pageSum = 1;
        }
        if(pageIndex > pageSum){
            pageIndex = pageSum;
        }
        db.find("adminList",{
            sortObj : {addTime : -1},
            limitNum : pageNum,
            skipNum : (pageIndex - 1) * pageNum
        },function(err,adminList){
            res.json({
                ok : 1,
                adminList,
                pageIndex ,
                pageSum
            });
        })
    });
}

module.exports.delAdminList = function(req,res){
    var adminId = req.query.id;
    db.deleteOneById("adminList",adminId,function(err,results){
        db.deleteMany("adminLog",adminId,function(err,results) {
            if (!err && results.result.ok) {
                common.end(res, 1, "删除管理员成功！");
            } else {
                common.end(res, 0, "删除管理员失败！");
            }
        })
    })
}

module.exports.updateAdmin = function(req,res){
    var id = req.body.id;
    var adminName = req.body.adminName;
    var password = md5(req.body.password + "@!Ele.Com");
    db.findOneById("adminList",id,function(err,oneInfo){
        //先将传过来的密码与原来的密码比较，如果相同返回“不能一致的提示”
        if(oneInfo.password === password){
            common.end(res,0,"不能与原密码相同！");
        }else{
            db.updateOneById("adminList",id,{$set : {
                    adminName,
                    password
                }},function(err,results){
                if(results.result.ok){
                    common.end(res, 1, "修改管理员信息成功！");
                }else{
                    common.end(res,0,"修改管理员信息失败！");
                }
            })
        }
    })
}
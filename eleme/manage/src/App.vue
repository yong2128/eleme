<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="8" class="logo" :style="{width : isCollapse ? '64px' : '240px'}">
                    <strong>{{isCollapse ? "饿" : "饿了么管理系统"}}</strong>
                </el-col>

                <el-col :span="8" class="tool">
                    <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" @click="isCollapse = !isCollapse"></i>
                    <el-button type="primary" plain @click="$router.push('/')">首页</el-button>
                    <el-button type="primary" plain @click="$router.push('/addAdmin')">添加管理员</el-button>
                </el-col>

                <el-col :span="8" class="adminInfo">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{$store.state.admin.adminName}}
                            <img src="./assets/self.jpg" alt="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span  @click="$store.commit('OUT_LOGIN')">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>

        <el-container>
            <el-aside width="240px">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo menu" :collapse-transition="false"
                         :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">管理员管理</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/showAdmin')">管理员信息</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/showAdminLogList')">查看管理员日志</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-printer"></i>
                            <span slot="title">店铺管理</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/showShopTypeList')">店铺类别管理</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/showShopList')">店铺管理</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-printer"></i>
                            <span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/goodsTypeList')">商品类别管理</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/goodsList')">商品管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main :style="{left : isCollapse ? '64px' : '240px'}">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                isCollapse : false
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    body,html{
        height: 100%;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        height: 60px;
        padding: 0;
    }
    .logo {
        width: 240px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-right: 1px solid rgba(238,241,146,0.3);
    }
    .logo strong {
        font-size: 30px;
        color: #fff;
    }
    .tool {
        text-align: left;
        height: 60px;
    }
    .tool i{
        font-style: normal;
        font-size: 30px;
        line-height: 60px;
        color: #fff;
        margin-left: 20px;
    }
    .tool .el-button{
        margin: -10px 0 0 20px;
        vertical-align: middle;
    }
    .adminInfo{
        float: right;
        text-align: right;
    }
    .adminInfo img{
        width: 50px;
        border-radius: 50%;
        margin-right: 30px;
        vertical-align: middle;
    }
    .el-aside{
        box-sizing: border-box;
        background-color: #fff;
        position: absolute;
        top: 60px;
        bottom: 0;
    }
    .menu{
        height: 100%;
        border-right: 1px solid rgb(230,230,230);
    }
    .el-main{
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        padding: 0;
    }
    .el-table{
        border: 1px solid #aaa;
        margin: 20px;
    }
    .el-table th{
        box-sizing:border-box;
    }
    .el-table th,.el-table td{
        text-align: center;
    }
    .el-pagination{
        text-align: right;
        margin: 30px 20px 0 0;
    }
    .toolbar{
        margin: 30px 20px 0;
    }
</style>

<template>
    <div class="header">
        <!-- <div class="left">
            <i v-if="hasBack" class="el-icon-back" @click="back"></i>
        </div>
        <div class="right">
            <el-popover
                placement="bottom"
                :width="180"
                trigger="click"
                popper-class="popper-user-box"
            >
                <template #reference>
                    <div class="author">
                        <el-icon><UserFilled /></el-icon>
                        {{ (userInfo && userInfo.userName) || '' }}
                       <el-icon><CaretBottom /></el-icon>
                    </div>
                </template>
                <div class="nickname">
                    <p>
                        登录名：{{ (userInfo && userInfo.userName) || '' }}
                    </p>
                    <el-tag
                        size="small"
                        effect="dark"
                        class="logout"
                        @click="logout"
                        >退出</el-tag
                    >
                </div>
            </el-popover>
        </div> -->
         <div class="top-nav">
            <div class="logo">
                <!-- <div class="logo-icon"></div> -->
                <div class="logo-text">国家追溯平台大数据智慧监管平台</div>
                <span class="logo-divider">■</span>
                <div class="logo-subtitle">数据分析</div>
            </div>
            <div class="right">
                <div class="nav-tabs">
                    <div class="nav-item" :class="{ active: activeTab === 'data-monitor' }" @click="handleTabClick('data-monitor')">
                        <span class="nav-icon"></span>
                        数据监控
                    </div>
                    <div class="nav-item" :class="{ active: activeTab === 'regulatory' }" @click="handleTabClick('regulatory')">
                        <span class="nav-icon"></span>
                        监管业务
                    </div>
                    <div class="nav-item" :class="{ active: activeTab === 'traceability' }" @click="handleTabClick('traceability')">
                        <span class="nav-icon"></span>
                        追溯业务
                    </div>
                    <div class="nav-item" :class="{ active: activeTab === 'subject' }" @click="handleTabClick('subject')">
                        <span class="nav-icon"></span>
                        追溯主体
                    </div>
                </div>
                <div class="nav-right">
                    <div class="nav-item">信息查询</div>
                    <div class="nav-item">监管系统</div>
                    <div class="user-info"><el-popover
                    placement="bottom"
                    :width="180"
                    trigger="click"
                    popper-class="popper-user-box"
                >
                    <template #reference>
                        <div class="author">
                            <el-icon><UserFilled /></el-icon>
                            {{ (userInfo && userInfo.userName) || '张三' }}
                        <el-icon><CaretBottom /></el-icon>
                        </div>
                    </template>
                    <div class="nickname">
                        <p>
                            登录名：{{ (userInfo && userInfo.userName) || '张三' }}
                        </p>
                        <el-tag
                            size="small"
                            effect="dark"
                            class="logout"
                            @click="logout"
                            >退出</el-tag
                        >
                    </div>
                </el-popover></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { localRemove, pathMap,localGet } from '@/utils';
import ajax from "@/utils/ajax";

export default {
    name: 'Header',
    setup() {
        const activeTab = ref('data-monitor');
        
        const handleTabClick = (tab) => {
            activeTab.value = tab;
        };

        const router = useRouter();
        const state = reactive({
            name: 'dashboard',
            userInfo: null,
            hasBack: false
        });
        onMounted(() => {
            const pathname = window.location.hash.split('/')[1] || '';
            // if (!['login'].includes(pathname)) {
            //     getUserInfo();
            // }
            if(localGet('token')){
                getUserInfo()
            }
        });
        const getUserInfo = async () => {
            // const userInfo = await axios.get('/adminUser/profile');
            state.userInfo = {userName:localGet('userName')};
        };
        const logout = () => {
        //      localRemove('token');
        //     // router.push({ path: '/login' })
        //    // window.location.href="/#/login"
        //      window.location.reload();
            // axios.delete('/logout').then(() => {
            //     localRemove('token');
            //     window.location.reload();
            // });

            ajax.get({url:'/api/user/signout',data: {}})
            .then(()=>{
                localRemove('token');
                localRemove('password');
                window.location.reload();
            })
        };
        const back = () => {
            router.back();
        };
        router.afterEach((to) => {
            // console.log('to', to)
            const { id } = to.query;
            state.name = pathMap[to.name];
         
            state.hasBack = ['level2', 'level3', 'order_detail'].includes(
                to.name
            );
        });
        return {
            ...toRefs(state),
            logout,
            back,
            activeTab,
            handleTabClick
        };
    }
};
</script>

<style  lang="less" >
.header {
    // height: 50px;
    // border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0 20px;
    box-sizing: border-box;
    background-color: #0a1428;
    font-family: 'Microsoft YaHei', sans-serif;
    color:#fff;
    .top-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 16px 0px 30px;
        background: linear-gradient(180deg, rgba(0, 50, 100, 0.3) 0%, rgba(0, 30, 60, 0.5) 100%);
        border-bottom: 1px solid rgba(#00d4ff,0.2);
        position: relative;
        width: 100%;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%2300d4ff" stop-opacity="0.1"/><stop offset="1" stop-color="%2300d4ff" stop-opacity="0"/></linearGradient></defs><path d="M0 0 L30 0 L30 2 L2 2 L2 100 L0 100 Z" fill="url(%23g)"/><path d="M70 0 L100 0 L100 100 L98 100 L98 2 L70 2 Z" fill="url(%23g)"/></svg>') left top no-repeat,
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%2300d4ff" stop-opacity="0.1"/><stop offset="1" stop-color="%2300d4ff" stop-opacity="0"/></linearGradient></defs><path d="M0 0 L30 0 L30 2 L2 2 L2 100 L0 100 Z" fill="url(%23g)"/><path d="M70 0 L100 0 L100 100 L98 100 L98 2 L70 2 Z" fill="url(%23g)"/></svg>') right top no-repeat;
            background-size: 200px 100%, 200px 100%;
            pointer-events: none;
        }
        
        .logo {
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
            
            .logo-icon {
                width: 60px;
                height: 40px;
                background: linear-gradient(135deg, #00d4ff 0%, #0066cc 100%);
                clip-path: polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%);
                margin-right: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .logo-text {
                font-size: 20px;
                font-weight: bold;
                color: #ffffff;
                text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                margin-right: 10px;
            }
            .logo-divider {
                font-size: 8px;
            }
            .logo-subtitle {
                font-size: 20px;
                font-weight: bold;
                padding: 3px 12px;
                border-radius: 2px;
            }
        }
        .right {
            display: flex;
            align-items: center;
        }
        .nav-tabs {
            display: flex;
            gap: 5px;
            position: relative;
            z-index: 1;
            
            .nav-item {
                padding: 10px 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                border: 1px solid transparent;
                position: relative;
                
                &:hover {
                    color: #00d4ff;
                    // background: rgba(0, 212, 255, 0.1);
                }
                
                &.active {
                    color: #00d4ff;
                    &::after {
                        content: '';
                        position: absolute;
                        bottom: -3px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 30%;
                        height: 2px;
                        background: #00d4ff;
                    }
                }
            }
        }
        
        .nav-right {
            display: flex;
            gap: 20px;
            position: relative;
            z-index: 1;
            margin-left: 50px;
            .nav-item {
                padding: 8px 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                display: inline-flex;
                align-items: center;
                &:hover {
                    color: #ffffff;
                }
            }
            
            .user-info {
                padding: 8px 0;
                cursor: pointer;
                color: #ffffff;
                font-size: 14px;
                border-radius: 3px;
                justify-content: flex-end;
                .author{
                    padding: 6px 10px;
                }
            }
        }
    }
}
.el-icon-back {
    border: 1px solid #e9e9e9;
    padding: 4px;
    border-radius: 50px;
    margin-right: 10px;
}
.right > div > .icon {
    font-size: 18px;
    margin-right: 6px;
}
.right .el-icon{
    font-size: 18px;
    margin-right: 6px;
}
.right .author{
    display: flex;
    align-items: center;
}
.author {
    cursor: pointer;
    color:#fff;
}
.el-popover.popper-user-box {
    /* background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png')
        50% 50% no-repeat !important; */
    background-size: cover !important;
    /* border-radius: 0 !important; */
    background: linear-gradient(180deg, rgba(0, 50, 100, 0.5) 0%, rgba(0, 30, 60, 0.7) 100%);
    color:#fff;
     .el-popper__arrow:before {
             background: linear-gradient(180deg, rgba(0, 50, 100, 0.5) 0%, rgba(0, 30, 60, 0.7) 100%);
    }
}   
.popper-user-box .nickname {
    position: relative;
    // color: #000;
}
.popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
</style>


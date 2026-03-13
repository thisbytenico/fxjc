<template>
    <div class="layout">
        <el-container v-if="state.showMenu" class="container">
            <!-- <el-aside class="aside">
                <div class="head">
                    <div>
                        <span>数字收集器管理平台</span>
                    </div>
                </div>
                <el-menu
                    :default-openeds="state.defaultOpen"
                    :router="true"
                    :default-active="state.currentPath"
                     @select="menuSelect"
                >
                    <el-menu-item index="/overview">
                        <el-icon><PieChart /></el-icon>统计概览
                     </el-menu-item>
                    <el-menu-item index="/dataAnalysis">
                        <el-icon><DataAnalysis /></el-icon>数据分析
                    </el-menu-item>
                    <el-menu-item index="/assets">
                        <el-icon><Monitor /></el-icon>资产管理
                    </el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><Operation /></el-icon> <span>系统管理</span>
                        </template>
                        <el-menu-item index="/weightManage"
                            >权重管理
                        </el-menu-item>
                        <el-menu-item index="/sysUser" v-if="state.isAdmin">
                            用户管理
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside> -->
            <el-container class="content">
                <Header />
                <div
                    class="main"
                    v-loading="g_loading && g_loading.show"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.4)"
                    element-loading-text="处理中请稍候..."
                >
                    <!-- <div class="div-breadcrumbs">
                        {{breadcrumbsName}} (热更新测试)
                    </div> -->
                    <ElConfigProvider :locale="locale">
                        <router-view />
                    </ElConfigProvider>
                </div>
                <!-- <Footer /> -->
            </el-container>
        </el-container>
        <el-container v-else class="container"   v-loading="g_loading && g_loading.show"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.4)"
                    element-loading-text="处理中请稍候...">
            <!-- <router-view  /> -->
            <ElConfigProvider :locale="locale">
                        <router-view />
             </ElConfigProvider>
        </el-container>
    </div>
</template>

<script>
import { onUnmounted, reactive, computed, ref,onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useRouter,useRoute } from 'vue-router';
import { pathMap, localGet } from '@/utils';
import { useStore } from 'vuex';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { PieChart, Monitor, Operation, DataAnalysis } from '@element-plus/icons-vue';

if(!localGet("token")){
    // window.location.href="/#/login"
 }
export default {
    name: 'App',
    components: {
        Header,
        Footer,
        [ElConfigProvider.name]: ElConfigProvider //添加组件
    },
    setup() {
        const noMenu = ['/login'];
        const router = useRouter();
        const route = useRoute();
        // console.log('route.meta.breadcrumbsName',route.meta)
        const breadcrumbsName = computed(() => route.meta.breadcrumbsName);

        const store = useStore();
        const g_loading = computed(() => store.state.loading);

        const state = reactive({
            defaultOpen: ['1', '2'],
            showMenu: false,
            currentPath: '/',
            count: {
                number: 1
            },
            isAdmin:false
        });
        // 监听浏览器原生回退事件
        // if (window.history && window.history.pushState) {
        //     history.pushState(null, null, document.URL);
        //     window.addEventListener(
        //         'popstate',
        //         () => {
        //             // if (!localGet("token")) {
        //             //     state.showMenu = false;
        //             // }

        //         },
        //         false
        //     );
        // }
        const unwatch = router.beforeEach((to, from, next) => {
            // console.log('to.path ',to.path )
            if (to.path == '/login') {
                // 如果路径是 /login 则正常执行
                next();
            } else {
                // 如果不是 /login，判断是否有 token
                // console.log('localGet("token")',localGet("token"))
                if (!localGet("token")&&false) {
                    // 如果没有，则跳至登录页面
                    location.href="/#/login"
                    // next({ path: "/login" });
                } else {
                    // 否则继续执行
                    next();
                }
            }
            // console.log('to.path',to.path,'noMenu',noMenu,'noMenu.includes(to.path)',!noMenu.includes(to.path))
            // console.log('breadcrumbsName',breadcrumbsName)
            state.showMenu = !noMenu.includes(to.path);
            state.isAdmin=localGet('userName')=='admin'
            // console.log('state.isAdmin',state.isAdmin,localGet('userName'),' state.showMenu', state.showMenu)

            let path=to.path
            // console.log('path',path,path.indexOf('/assets'))
            if(path.indexOf('/assets')!=-1)
                path="/assets"
            state.currentPath = path;
            //document.title = pathMap[to.name];
        });

        onUnmounted(() => {
            unwatch();
        });
        
        onMounted(()=>{
        })
        const locale = ref(zhCn);

        const menuSelect=(index,indexPath)=>{
            // console.log('index',index,indexPath)
            // if(index!='/overview'){
            // }
            store.dispatch("setLoading",{show:true})
        }
        return {
            state,
            g_loading,
            locale,
            breadcrumbsName,
            menuSelect
        };
    }
};
</script>

<style>
.layout {
    min-height: 100vh;
    background-color: #ffffff;
}
.container {
    height: 100vh;
}
.aside {
    width: 200px !important;
    /* background-color: #222832; */
    overflow: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
    display: none;
}
.el-container>.head,.aside>.head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: rgb(22 119 255);
}
.head > div {
    display: flex;
    align-items: center;
}

.head img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.head > div > span {
    font-size: 18px;
    color: #ffffff;
    font-weight: bold;
}
.line {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
}
.main {
    overflow: auto;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #0a1428;
    min-height: 0;
}
.main > * {
    flex: 1;
    min-height: 0;
}
.main .div-breadcrumbs{
    padding: 4px 20px 14px 20px;
    border-bottom: 1px solid #dedede;
    box-sizing: border-box;
}
</style>
<style>
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.el-menu {
    /* border-right: none !important; */
    height: 100%;
}
.el-menu-item .el-icon{
    width: auto;
    height: auto;
    margin-right: 10px;
}
.el-menu-item .el-icon svg{
    font-size: 20px;
}

.el-sub-menu .el-icon{
    width: auto;
    height: auto;
    margin-right: 10px;
}
.el-sub-menu .el-icon svg{
    font-size: 20px;
}
.el-sub-menu {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
}
.el-sub-menu .el-menu-item{
    padding-left: 54px !important;
}
.el-sub-menu:first-child {
    border-top: none;
}
.el-sub-menu [class^='el-icon-'] {
    vertical-align: -1px !important;
}
a {
    color: #409eff;
    text-decoration: none;
}
.el-pagination {
    text-align: center;
    margin-top: 20px;
    color:gray;
}
/* .el-popper__arrow {
  display: none;
} */
</style>

<style lang="stylus" src="./assets/css/global.styl"></style>

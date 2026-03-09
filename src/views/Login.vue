<template>
    <div class="login-body" @keyup.enter="submitForm"  >
        <div class="login-container" v-loading="loading" 
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.4)"
                    element-loading-text="登录中请稍候...">
            <div class="head">
                <!-- <img
                    class="logo"
                    src="https://s.weituibao.com/1582958061265/mlogo.png"
                /> -->
                <div class="name">
                    <div class="title">数字收集器管理平台</div>
                    <!-- <div class="tips">Vue3.0 后台管理系统</div> -->
                </div>
            </div>
            <el-form
                label-position="top"
                :rules="rules"
                :model="ruleForm"
                ref="loginForm"
                class="login-form"
                size="large"
            >
                <el-form-item label="账号" prop="username">
                    <el-input
                        type="text"
                        v-model.trim="ruleForm.username"
                        autocomplete="off"
                        placeholder="请输入用户名称"
                        :prefix-icon="User"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        type="password"
                        v-model.trim="ruleForm.password"
                        autocomplete="off"
                        placeholder="请输入登录密码"
                       :prefix-icon="Lock"

                    ></el-input>
                </el-form-item>
                <div class="div-rememberMe">
                      <el-checkbox v-model="checked" @change="!checked"
                        >记住密码</el-checkbox >

                          <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="请联系管理员重置密码"
                          placement="top"
                        >
                          <span class="red"  >忘记密码？</span>
                        </el-tooltip>
                </div>
                <el-form-item>
                    <!-- <div style="color: #333">
                        登录表示您已同意<a>《服务条款》</a>
                    </div> -->
                    <el-button
                        style="width: 100%;"
                        type="primary"
                        @click="submitForm"
                        size="large"
                        >立即登录</el-button
                    >
                
                </el-form-item>
            </el-form>
        </div>
        <div id="particles-js"></div>
    </div>
</template>

<script>
import md5 from "js-md5";
import { reactive, ref, toRefs,getCurrentInstance,onMounted,computed } from "vue";
import { localSet,localRemove,localGet } from "@/utils";
import ajax from "@/utils/ajax";
import {  ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import { User, Lock } from '@element-plus/icons-vue'
export default {
    name: "Login",
    setup() {
        const loginForm = ref(null);
        // const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const g_loading = computed(() => store.state.loading);

        const state = reactive({
            ruleForm: {
                username:"",//"admin",
                password: ""
            },
            checked: false,
            loading:false,
            showPage:true,
            rules: {
                username: [
                    {
                        required: "true",
                        message: "账户不能为空",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: "true",
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                ],
            },
        });
        const submitForm = async () => {
            // window.location.href = "/";
            // return;
            loginForm.value.validate((valid) => {
              if (valid) {
                // console.log('valid222',valid,'ajax',ajax)
                const userName=state.ruleForm.username
                const pwd=state.ruleForm.password
                state.loading=true;
                ajax.post({url:'/api/user/login',data: {
                  username: userName || 'admin',
                  password:md5(pwd),
                  rememberMe:state.checked?'Y':'N',
                },showMsg:false,loading:false}).then(res => {
                  // console.log('res',res)
                  // store.dispatch('setLoading', { show: true })
                  state.showPage=false
                  state.loading=false;
                  // console.log('state.showPage',state.showPage)

                  if(res.code==200){
                    localSet('token', res.data.token)
                    localSet('userName',userName)
                    if(state.checked){
                        localSet('password',pwd)
                    }else{
                        localRemove("password")
                        // localRemove("userName")
                    }
                    window.location.href = "/";
                    // setTimeout(()=>{
                    //   router.push({ path: '/' })
                    // },0)
                  }else{
                    // proxy.$g_alert(res.msg);
                    ElMessage({
                        message:res.msg,
                        type: "error"
                    });
                  }
                }).catch(err=>{
                     console.log('err',err.message)
                     ElMessage.error(err.message)
                     state.loading=false;
                })
              } else {
                console.log('error submit!!')
                return false;
              }
            })
        };

        const resetForm = () => {
            loginForm.value.resetFields();
        };

        onMounted(()=>{
          if(localGet("password")){
            state.ruleForm.username=localGet("userName")
            state.ruleForm.password=localGet("password")
            state.checked=true
          }
         particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#44a2f7"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
        })
        return {
            ...toRefs(state),
            loginForm,
            g_loading,
            submitForm,
            resetForm,
            User,
            Lock
        };
    },
};
</script>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.div-rememberMe{
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.div-rememberMe .red{
  cursor: pointer;
  font-size: 14px;
}
.login-container {
    width: 370px;
    /* height: 500px; */
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding-bottom: 26px;
}
#particles-js{
    width: 100%;
    height: 100%;
    background: rgb(231, 236, 249);
}
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 30px 0;
    background-color: transparent;
}
.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}
.head .title {
    font-size: 24px;
    /* color: #1baeae; */
    color: var(--el-color-primary);
    font-weight: bold;
}
.head .tips {
    font-size: 12px;
    color: #999;
}
.login-form {
    width: 80%;
    margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
    padding: 0;
}
.login-form .el-form-item {
    /* margin-bottom: 12px; */
}
</style>

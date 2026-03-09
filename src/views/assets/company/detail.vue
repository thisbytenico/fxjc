<template>
    <div class="government-detail page-box">
        <div class="div-head">
            查看详情
        </div>
        <div class="div-nav">
            <div class="left">
                <div class="item-name">总部所在地：{{formData?.addr}}</div>
                <div class="score a">评分：{{formData?.score}}</div>
            </div>
            <el-button type="warning"  @click="back"  plain >
                   返回
             </el-button>
        </div>
        <div class="body" >
            <div class="row"> 1. 公司名称：{{formData?.name||'--'}}</div>
            <div class="row"> 2. 主营业务简介：{{formData?.intro||'--'}}</div>
            <div class="row"> 3. 简述企业的社会责任案例：{{formData?.dutyCase||'--'}}</div>
            <div class="row"> 4. 企业过去一年的整体财务状况怎么样？怎么确保资产的合理使用：{{formData?.financeCase||'--'}}</div>
            <div class="row"> 5. 企业过去一年有哪些数字化治理的创新举措：{{formData?.governSystemRegisterFlag||'--'}}</div>
            <div class="row"> 6. 企业怎么实现长期投资价值：{{formData?.investCase||'--'}}</div>
            <div class="row"> 7. 是否上市：{{formData?.listedCompanyFlag||'--'}}</div>
            <div class="row"> 8. 企业过去一年有哪些吸引人才和管理质量的举措：{{formData?.manageCase||'--'}}</div>
            <div class="row"> 9. 企业怎么提升全球化运营的有效性：{{formData?.operateCase||'--'}}</div>
            <div class="row"> 10. 上年度营业收入（万元）：{{formData?.revenueAmount||'--'}}</div>
            <div class="row"> 11. 企业过去一年有哪些提升产品或者服务质量的创新举措：{{formData?.serviceCase	||'--'}}</div>
            <div class="row"> 12. 公司官网：
                        <a v-if="/^http:\/\//.test(formData?.website)" :href="formData?.website" target="_blank" >
                            {{formData?.website}}
                       </a>
                       <span v-else>{{formData?.website||"--"}}</span></div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { localGet } from "@/utils";
export default {
    setup() {
        const router = useRouter();
        const state = reactive({
            formData:null,
        });
        onMounted(() => {
            let formData=localGet('row')
            if(formData)
                state.formData=formData
        });

        const back = async () => {
           router.push({ path: '/assets/company' })
        };

        return {
            ...toRefs(state),
            back
        };
    }
};
</script>

<style lang="stylus">
.government-detail
    font-size:14px
    .div-head
       height: 35px
       background-color: rgba(22, 119, 255, 1)
       color:#fff
       padding:0 12px
       display:flex
       align-items: center
    .div-nav
        display: flex
        font-weight: 650
        padding:18px 14px
        justify-content: space-between
        .left
            display: flex
        .icon
            margin: 0 16px 0 16px
        .a
         color:var(--el-color-primary);
        .score
            margin-left: 28px
    .body
        padding: 0 30px
        flex: 1;
        overflow: auto;
        .row
            margin-bottom: 18px
</style>

<template>
    <div class="government-detail page-box">
        <div class="div-head">
            查看详情
        </div>
        <div class="div-nav">
            <div class="left">
                <div class="item-name">{{formData?.province}}</div>
                <div class="icon">>></div>
                <div class="item-name">{{formData?.city}}</div>
                <div class="icon">>></div>
                <div class="area a">{{formData?.name}}</div>
                <div class="score a">评分：{{formData?.score}}</div>
            </div>
            <el-button type="warning" 
                @click="back"  plain >
                   返回
             </el-button>
        </div>
        <div class="body" >
            <div class="row"> 1. 政策文件数量、层级：{{formData?.governPolicyFileCase||'--'}}</div>
            <div class="row"> 2. 激励政策（园区、人才、基金等）：{{formData?.governPolicyStimulateCase||'--'}}</div>
            <div class="row"> 3. 是否出台数据条例/公共数据授权运营办法：{{formData?.governSystemOperateFlag||'--'}}</div>
            <div class="row"> 4. 是否形成数据开放共享办法：{{formData?.governSystemShareFlag||'--'}}</div>
            <div class="row"> 5. 是否出台数据产权登记管理办法：{{formData?.governSystemRegisterFlag||'--'}}</div>
            <div class="row"> 6. 是否出台数据安全管理/数据治理相关办法：{{formData?.governSystemSafeFlag||'--'}}</div>
            <div class="row"> 7. 是否形成公共数据分类分级指南：：{{formData?.governSystemClassifyFlag||'--'}}</div>
            <div class="row"> 8. 是否建立推行企业首席数据官制度：{{formData?.governSystemLeaderFlag||'--'}}</div>
            <div class="row"> 9. 国家绿色数据中心数量：{{formData?.governSystemDataCentorAmount||'--'}}</div>
            <div class="row"> 10. 数据要素产业发展试点示范项目数量：{{formData?.governSystemExperimentAmount||'--'}}</div>
            <div class="row"> 11. 成立数据要素相关联盟、协会数量：{{formData?.constructCommunityAssociationAmount||'--'}}</div>
            <div class="row"> 12. 是否建立公共政务数据开放平台：{{formData?.constructCommunityPlatformFlag||'--'}}</div>
            <div class="row"> 13. 城市数据中心机架总规模台：{{formData?.constructHardwareAccount||'--'}}</div>
            <div class="row"> 14. 数据相关专利和软著情况：{{formData?.constructSoftwareCase||'--'}}</div>
            <div class="row"> 15. 交易平台数据商数量：{{formData?.resourceMerchantAccount||'--'}}</div>
            <div class="row"> 16. 交易平台数据产品数量：{{formData?.resourceProductAccount||'--'}}</div>
            <div class="row"> 17. 数据交易金额情况：{{formData?.dealMoneyCase||'--'}}</div>
            <div class="row"> 18. 数据行业产值情况：{{formData?.dealScaleCase||'--'}}</div>
            <div class="row"> 19. 数据要素×场景情况：{{formData?.applyPhysicsCase||'--'}}</div>
            <div class="row"> 20. 数据融资情况：{{formData?.applyFinanceCase||'--'}}</div>
        </div>
    </div>
</template>

<script>
import listMixin from '@/mixin/list-mixin';
import { onMounted, reactive, toRefs, ref, getCurrentInstance } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { localGet } from "@/utils";

const listConfig = {
};

const columns = [
    { label: 'ID', prop: 'id', width: 70 },
    { label: '系列名称', prop: 'name' },
    { label: '详情', prop: 'detail' },
    { label: '合约地址', prop: 'contract', width: 360 },
    { label: '创建时间', prop: 'add_time', type: 'time', width: 160 },
    { slot: 'opt' }
];

const formItems = [
    { label: 'id', field: 'id', hide: true, required: false },
    { label: '系列名称', field: 'name', required: true },
    { label: '详情', field: 'detail', type: 'textarea', required: true },

    { label: '合约地址', field: 'contract' }
];

export default {
    setup() {
        const formRef = ref(null);
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();

        const optClick = (type, row) => {
            state.optAction = type;
            if (type != 'delete') state.modalShow = true;
            switch (type) {
                case 'edit':
                    setTimeout(() => {
                        let form = formRef.value.formData;
                        form.id = row.id;
                        for (let key in form) {
                            form[key] = row[key];
                        }
                    }, 0);
                    break;
            }
        };

        listConfig.optClick = optClick;
        listConfig.query = {
            brandid: route.query.brandID
        };
        const state = reactive({
            columns,
            formItems,
            optAction: '',
            modalShow: false,
            formData:null,
            ...listMixin(listConfig)
        });

        onMounted(() => {
            let formData=localGet('row')
            if(formData)
                state.formData=formData
        });

        const back = async () => {
           router.push({ path: '/assets/government' })
        };

        return {
            ...toRefs(state),
            optClick,
            formRef,
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

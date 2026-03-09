<template>
    <div
        class="weightManage page-box"
        id="weightManage"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.4)"
        element-loading-text="处理中请稍候..."
    >
        <CTable
            :columns="columns"
            :table="table"
            :optClick="c_optClick"
            :pageChange="c_pageChange"
        >
             <template #opt>
                <el-table-column label="操作" width="320" align="center" >
                    <template #default="scope">
                           <a @click="optClick('detail',scope.$index)">查看</a>
                    </template>
               </el-table-column>
             </template>
       </CTable>

        <Modal
            title="查看"
            v-model:pShow="modalShow"
            @confirm="modalShow=false"
            :showFooter="false"
            width="768px"
        >
            <img style="width:100%" :src="`/imgs/weightManage/${curOptIndex}.png`" />
        </Modal>
    </div>
</template>

<script>
import listMixin from '@/mixin/list-mixin';
import {
    onMounted,
    reactive,
    toRefs,
    ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {
    api
} from '@/y_api/assets';
import {  imgServerURL } from '@/config';

const listConfig = {
    tableList:api.personList
};

const columns = [
    { label: '评分模型', prop: 'model' },
    { label: '评分类型', prop: 'type' },
    { slot: 'opt' },
];

export default {
    setup() {
        const filterRef = ref(null);
        const store = useStore();

        const optClick = async (type, index) => {
            state.optAction = type;
            switch (type) {
                case 'detail':
                    state.curOptIndex=index
                    state.modalShow = true;
                    break;
            }
        };

        const formatListRes = ({ data }) => {
            data.list.forEach(item=>{
                item.smallPicturePath=imgServerURL+item.smallPicturePath;
                item.bigPicturePath=imgServerURL+item.bigPicturePath
            })
            return data;
        };

        listConfig.optClick = optClick;
        listConfig.formatListRes = formatListRes;
        listConfig.filterRef = filterRef;

        const state = reactive({
            columns,
            optAction: '',
            modalShow: false,
            loading: true,
            curOptIndex:0,
            ...listMixin(listConfig)
        });

        onMounted(async () => {
            store.dispatch("setLoading",{show:false})
            state.table.data=[
                {   
                    id:1,
                    model:"地方政府/国家级经济开发区数据经济发展程度评分-指标体系",
                    type:"政府",
                    imgUrl:""
                },
                {   
                    id:2,
                    model:"影响力企业评分模型维度及描述",
                    type:"上市企业",
                    imgUrl:""
                },
                {   
                    id:3,
                    model:"潜力企业评分模型维度及描述",
                    type:"未上市企业",
                    imgUrl:""
                }
            ],
            state.loading = false;
        });

        return {
            ...toRefs(state),
            optClick,
            filterRef,
        };
    }
};
</script>

<style lang="stylus">
    .weightManage
        .div-table
            margin-top: 20px
        .el-dialog__body
            padding: 0
        .el-dialog__footer
            display: none
</style>

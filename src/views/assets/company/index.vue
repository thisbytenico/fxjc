<template>
    <div
        class="company page-box"
        id="company"
    >
        <div class="head">
            <CFilter
                ref="filterRef"
                :querys="querys"
                @query="queryTable"
            >
            </CFilter>
             <div class="div-btns">
               <el-button type="warning" :loading="exportLoading"  
                @click="submitExport"  plain >
                   <el-icon><Download /></el-icon> 导出
                </el-button>
                <div class="head-total">已申报数量：{{total}}</div>
            </div>
        </div>
        <CTable
            :columns="columns"
            :table="table"
            :optClick="c_optClick"
            :pageChange="c_pageChange"
        >
             <template #website>
                <el-table-column label="公司官网" min-width="200" align="center" >
                    <template #default="scope">
                       <a v-if="/^http:\/\//.test(scope.row.website)" :href="scope.row.website" target="_blank" >
                            {{scope.row.website}}
                       </a>
                       <span v-else>{{scope.row.website}}</span>
                    </template>
               </el-table-column>
             </template>
             <template #intro>
                <el-table-column label="主营业务简介" width="350" align="center" >
                    <template #default="scope">
                        <div class="intro" :title="scope.row.intro" >{{scope.row.intro}}</div>
                    </template>
               </el-table-column>
             </template>
            <template #detail>
                <el-table-column label="详情" width="100" align="center" fixed="right">
                    <template #default="scope">
                        <a @click="queryDetail(scope.row)" >
                            查看
                        </a>
                    </template>
               </el-table-column>
             </template>
       </CTable>
    </div>
</template>

<script>
import listMixin from '@/mixin/list-mixin';
import {
    onMounted,
    reactive,
    toRefs,
    ref,
    getCurrentInstance,
    watch
} from 'vue';
import { useRouter } from 'vue-router';
import {
    exportCompany,
    api
} from '@/y_api/assets';
import {scores} from '@/constants/assets';
import { localSet } from "@/utils";

const listConfig = {
    tableList:api.companyList
};

const querys = [
      {
        label: '公司名称',
        field: 'name',
        type: 'text',
        placeholder: '请输入'
     },
     {
        label: '评分',
        field: 'score',
        type: 'sel',
        defaultValue: "",
        options: scores
    },
     {
        label: '上市企业',
        field: 'listedCompanyFlag',
        type: 'sel',
        defaultValue: "",
        options: [
            {
                label:"全部",
                value:""
            },
            {
                label: "是",
                value: "是"
            },
            {
                label: "否",
                value: "否"
            }
        ]
    },
    {
        label: '联系人姓名',
        field: 'contactName',
        type: 'text',
        placeholder: '请输入'
    },
    {
        label: '主营业务',
        field: 'intro',
        type: 'text',
        placeholder: '请输入'
    },

    {
        label: '上传时间',
        field: 'time',
        type: 'daterange',
        defaultValue: "",
    }
];

const columns = [
    { label: '公司名称', prop: 'name', minWidth: 230 },
    { label: '评分', prop: 'score', width: 120 },
    { label: '上市企业', prop: 'listedCompanyFlag', width: 100 },
    { slot: 'intro' },
    { label: '总部所在地', prop: 'addr', minWidth: 300 },
    { slot: 'website' },
    { label: '联系人姓名', prop: 'contactName', minWidth: 120 },
    { label: '联系人职务', prop: 'contactJob', minWidth: 120 },
    { label: '联系人邮箱', prop: 'contactEmail', minWidth: 160 },
    { label: '其它方式', prop: 'contactOther', minWidth: 160 },
    { label: '上传时间', prop: 'createTime', width: 180 },
    { slot: 'detail' }
];

const formItems = [];

export default {
    setup() {
        const { proxy } = getCurrentInstance();
        const router = useRouter();

        const formRef = ref(null);
        const filterRef = ref(null);


        const optClick = async (type, row) => {
            state.optAction = type;
            switch (type) {
                case 'add':
                    state.modalShow = true;
                    break;
                case 'edit':
                    proxy.$msg('编辑');
                    break;
            }
        };

        const formatListRes = ({ data }) => {
            state.total=data.totalCount;
            return data;
        };

        const queryTable=()=>{
        //    console.log('querys',filterRef.value.getQuery());
           const {time}=filterRef.value.getQuery()
           let customQuery={}
           if(time){
                const startTime=time[0].format('yyyy-MM-dd HH:mm:ss');
                const endTime=time[1].format('yyyy-MM-dd')+' 23:59:59';
                customQuery={startTime,endTime}
           }
           state.loadTableData(true, customQuery);
        }
        
        listConfig.optClick = optClick;
        listConfig.formatListRes = formatListRes;
        listConfig.filterRef = filterRef;

        const state = reactive({
            querys,
            selOptionCitys:[],
            columns,
            formItems,
            optAction: '',
            modalShow: false,
            loading: true,
            exportLoading:false,
            total:0,
            ...listMixin(listConfig)
        });

        onMounted(async () => {
            await state.loadTableData();
            state.loading = false;
        });


       const submitExport = async () => {
           if(!state.total){
                proxy.$msg('当前条件没有可导出数据','error');
                return
            }
            let params = JSON.parse(JSON.stringify(filterRef.value.query));
            for (let key in params) {
                if(params[key]){
                    params[key]=params[key].trim()  
                }
            }
            state.exportLoading=true;
            let data = await exportCompany(params);
            let blob = new Blob([data], {
                    type: "application/vnd.ms-excel;charset=utf-8"
             });
            if (blob.size > 0) {
                var objectUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', '企业.xlsx');
                a.click();
                proxy.$msg('导出成功');
            } else {
                proxy.$msg('导出失败','error');
            }
            state.exportLoading=false;
        };

        const queryDetail=(row)=>{
            localSet('row',row);
            router.push({ path: '/assets/company/detail' })
        }

        return {
            ...toRefs(state),
            queryTable,
            optClick,
            formRef,
            filterRef,
            submitExport,
            queryDetail
        };
    }
};
</script>

<style lang="stylus">
    #company
        .div-query
            max-width: 1340px
        .intro
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
</style>

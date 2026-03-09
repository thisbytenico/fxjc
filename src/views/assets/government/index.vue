<template>
    <div
        class="government page-box"
        id="government"
    >
        <div class="head">
            <CFilter
                ref="filterRef"
                :querys="querys"
                @query="queryTable"
            >
                <template #city="{ query }">
                     <el-select
                        filterable
                        reserve-keyword
                        v-model="query['city']"
                        :placeholder="'请选择'"
                        suffix-icon="ArrowUp"
                    >
                        <el-option
                            v-for="item in selOptionCitys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                        >
                        </el-option>
                    </el-select>
                </template>
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
            <template #detail>
                <el-table-column label="详情" width="100" align="center">
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
    exportGov,
    api
} from '@/y_api/assets';
import {  statusField, okCode } from '@/config';
import provinceData from '@/constants/province';
import cityData from '@/constants/city';
import {scores} from '@/constants/assets';
import { localSet } from "@/utils";

const listConfig = {
    ...api
};

provinceData.forEach(item=>{
    item.value=item.label
})
const querys = [
     {
        label: '省份',
        field: 'province',
        type: 'sel',
        defaultValue: "",
        options: [
            {
                label:"全部",
                value:""
            },
            ...provinceData
        ]
    },
    {
        label: '市区',
        field: 'city',
        type: 'slot'
    },
    {
        label: '园区/新区名称',
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
        label: '上传时间',
        field: 'time',
        type: 'daterange',
        defaultValue: "",
    }
    // {
    //     label: '标签',
    //     field: 'tag',
    //     type: 'sel',
    //     multiple: true,
    //     config: {
    //         req: {
    //             url: tagApi.tableList
    //         },
    //         labelField: 'name',
    //         valueField: 'id'
    //     }
    // }
];

const columns = [
    { label: '省份', prop: 'province', minWidth: 120 },
    { label: '市区', prop: 'city', minWidth: 120 },
    { label: '园区/新区名称', prop: 'name', minWidth: 120 },
    { label: '评分', prop: 'score', width: 120 },
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

        watch(
            () => {
                return filterRef.value && filterRef.value.query.province;
            },
            (province) => {
                 const cityIndex=provinceData.findIndex(item=>item.label==province)
                 state.selOptionCitys=cityData[cityIndex]
                if(!province){
                    filterRef.value.query.city='';
                }             
            },
            {
                deep: true
            }
        );

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
            // console.log('params', params);
            state.exportLoading=true;
            let data = await exportGov(params);
            let blob = new Blob([data], {
                    type: "application/vnd.ms-excel;charset=utf-8"
             });
            if (blob.size > 0) {
                var objectUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', '政府.xlsx');
                a.click();
                proxy.$msg('导出成功');
            } else {
                proxy.$msg('导出失败','error');
            }
            state.exportLoading=false;
        };

        const queryDetail=(row)=>{
            localSet('row',row);
            router.push({ path: '/assets/government/detail' })
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

</style>

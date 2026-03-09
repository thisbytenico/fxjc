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
              <template #smallPicturePath>
                <el-table-column label="候选人照片" width="120" align="center" >
                    <template #default="scope">
                         <el-image
                            style="width: 40px; height: 40px; position:relative;top:3px;"
                            :src="scope.row.smallPicturePath"
                            :zoom-rate="1.2"
                            :max-scale="7"
                            :min-scale="0.2"
                            :preview-src-list="imgSrcList"
                            :initial-index="scope.$index"
                            fit="cover"
                           	preview-teleported="true"
                            :hide-on-click-modal="true"
                            />
                    </template>
               </el-table-column>
             </template>
            <template #intro>
                <el-table-column label="简介" min-width="120" align="center">
                    <template #default="scope">
                        <el-popover
                            placement="bottom"
                            title=""
                            :width="300"
                            trigger="click"
                            :content="scope.row.intro"
                        >
                            <template #reference>
                             <a>简介</a>
                            </template>
                        </el-popover>
                    </template>
               </el-table-column>
             </template>
             <template #personalStatement>
                <el-table-column label="个人陈述" min-width="120" align="center" >
                    <template #default="scope">
                        <el-popover
                            placement="bottom"
                            title=""
                            :width="300"
                            trigger="click"
                            :content="scope.row.personalStatement"
                        >
                            <template #reference>
                             <a>查看</a>
                            </template>
                        </el-popover>
                    </template>
               </el-table-column>
             </template>
              <template #website>
                <el-table-column label="视频链接" min-width="200" align="center" >
                    <template #default="scope">
                       <a v-if="/^https?:\/\//.test(scope.row.website)" :href="scope.row.website" target="_blank" >
                            {{scope.row.website}}
                       </a>
                       <span v-else>{{scope.row.website}}</span>
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
    exportPerson,
    api
} from '@/y_api/assets';
import {  imgServerURL } from '@/config';
import { localSet } from "@/utils";

const listConfig = {
    tableList:api.personList
};

const querys = [
    // {
    //     label: '公司名称',
    //     field: 'name',
    //     type: 'text',
    //     placeholder: '请输入'
    // },
    {
        label: '联系人姓名',
        field: 'contactName',
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
    { label: '联系人姓名', prop: 'contactName', minWidth: 120 },
    { label: '联系人职务', prop: 'contactJob', minWidth: 120 },
    { label: '联系人邮箱', prop: 'contactEmail', minWidth: 160 },
    { label: '其它方式', prop: 'contactOther', minWidth: 160 },
    { slot: 'smallPicturePath' },
    { slot: 'intro' },
    { slot: 'personalStatement' },
    { slot: 'website' },
    { label: '上传时间', prop: 'createTime', width: 180 },
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
            data.list.forEach(item=>{
                item.smallPicturePath=imgServerURL+item.smallPicturePath;
                item.bigPicturePath=imgServerURL+item.bigPicturePath
            })
            state.imgSrcList=data.list.map(item=>item.bigPicturePath)
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
            imgSrcList:[],
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
            let data = await exportPerson(params);
            let blob = new Blob([data], {
                    type: "application/vnd.ms-excel;charset=utf-8"
             });
            if (blob.size > 0) {
                var objectUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                a.setAttribute('download', '影响力30人.xlsx');
                a.click();
            } else {
                jBox.tip("导出失败，没有数据！", "info")
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
</style>

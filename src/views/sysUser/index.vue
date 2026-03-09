<template>
    <div
        class="sysUser page-box"
    >
        <div class="head">
            <CFilter
                ref="filterRef"
                :querys="querys"
                @query="queryTable"
            >
            </CFilter>
             <div class="div-btns"> 
                <div class="div-left">
                    <el-button type="primary" :icon="Plus"  
                      @click="optClick('add')"  plain   >
                        新增
                    </el-button>
                     <el-button type="danger" :icon="Delete"  @click="deleteBatch"  plain >
                        删除
                    </el-button>
                </div>
                <div class="head-total"></div>
            </div>
        </div>
        <CTable
            :columns="columns"
            :table="table"
            :mutiSelectOptions="mutiSelectOptions"
            :optClick="c_optClick"
            :pageChange="c_pageChange"
            @handleSelectionChange="handleSelectionChange"
        >
              <template #status>
                <el-table-column label="状态" min-width="200" align="center" >
                    <template #default="scope">
                         <el-switch
                            :model-value="scope.row.status"
                            :inline-prompt="true"
                            active-text="启用"
                            inactive-text="禁用"
                            active-value="1"
                            inactive-value="0"
                            :disabled="scope.row.userName=='admin'"
                            @change="changeColumn('status', scope.row)"
                             size="large"
                          />
                     </template>
               </el-table-column>
             </template>
            <template #opt>
                <el-table-column label="操作" width="270" align="center" fixed="right">
                    <template #default="scope">
                        <a @click="optClick('edit',scope.row)" class="a-opt" v-if="scope.row.userName!='admin'" >
                          <el-icon><EditPen /></el-icon>编辑
                        </a>
                         <a @click="optClick('delete',scope.row)" class="a-opt red" v-if="scope.row.userName!='admin'" >
                           <el-icon><Delete /></el-icon>删除
                        </a>
                         <a @click="optClick('resetPwd',scope.row)" class="a-opt red">
                           <el-icon><Lock /></el-icon>重置密码
                        </a>
                    </template>
               </el-table-column>
           </template>
       </CTable>

       <Modal
            :title="optAction == 'edit' ? '编辑' : '新增'"
            v-model:pShow="modalShow"
            @confirm="save"
        >
            <CForm ref="formRef" :formItems="formItems" labelPosition="left" :action="optAction"> </CForm>
        </Modal>

         <Modal
            title="系统提示"
            v-model:pShow="resetPwdModalShow"
            @confirm="submitResetPwd"
        >
            <CForm ref="resetPwdFormRef" :formItems="resetPwdFormItems"> </CForm>
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
    getCurrentInstance,
    watch
} from 'vue';
import { useRouter } from 'vue-router';
import {
    tableRowAdd, tableRowUpdate,submitDeleteBatch,
    submitDelete,resetPassword,updateStatus,api
} from '@/y_api/sysUser';
import {  statusField, okCode } from '@/config';
import { localSet } from "@/utils";
import { validateMobile } from "@/utils/validate";

import {
 Plus,
 Delete
} from '@element-plus/icons-vue'
// import md5 from "js-md5";

const listConfig = {
    tableList:api.tableList
};

const querys = [
      {
        label: '用户名称',
        field: 'userName',
        type: 'text',
        placeholder: '请输入'
     },
     {
        label: '状态',
        field: 'status',
        type: 'sel',
        defaultValue: "",
        options: [
            {
                label:"全部",
                value:""
            },
            {
                label: "启用",
                value: "1"
            },
            {
                label: "禁用",
                value: "0"
            }
        ]
    },
    {
        label: '创建时间',
        field: 'time',
        type: 'daterange',
        defaultValue: "",
    }
];

const columns = [
    { label: '用户名称', prop: 'userName', minWidth: 160 },
    { label: '手机号码', prop: 'telephone', minWidth: 160 },
    { slot: 'status' },
    { label: '创建时间', prop: 'createTime', width: 180 },
    { slot: 'opt' }
];

const formItems = [
    { label: '用户名称', field: 'userName', required: true },
    { label: '手机号码', field: 'telephone', required: true,
        rules: [
            { required: true, message: "请输入手机号码", trigger: ["blur","change"] },
            { validator:validateMobile,trigger: ["blur","change"] },
        ]
    },
    { label: '用户密码', field: 'pwd', type:"password",required: true, editHide:true },
    { label: '用户状态', field: 'status', required: true,type:'switch',defaultValue:"0" },
];

const resetPwdFormItems=[
  { label: 'id', field: 'id', hide: true, required: false },
  { label: '请输入新密码', field: 'pwd',type:"password", required: true },
]


export default {
    setup() {
        const { proxy } = getCurrentInstance();
        const router = useRouter();

        const formRef = ref(null);
        const resetPwdFormRef = ref(null);

        const filterRef = ref(null);


        const optClick = async (type, row) => {
            state.optAction = type;
            if (type != 'delete'&&type!='resetPwd') state.modalShow = true;
            switch (type) {
                case 'add':
                    state.modalShow = true;
                    break;
                case 'resetPwd':
                    resetPwdFormItems[1].label=`请输入“${row.userName}”的新密码`
                    state.resetPwdModalShow = true;
                    setTimeout(()=>{
                            let form = resetPwdFormRef.value.formData;
                            form.id=row.id;
                    },0)                   
                    break;
                case 'edit':
                    setTimeout(() => {
                        let form = formRef.value.formData;
                        form.id = row.id;
                        for (let key in form) {
                            form[key] = row[key];
                        }
                    }, 0);
                    break;
                case 'delete':
                    await proxy.$confirm(`确定删除该用户吗`, '提示', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning'
                    });
                    await submitDelete({
                        id:row.id
                    });
                    proxy.$msg('删除成功');
                    state.loadTableData();
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
            resetPwdFormItems,
            optAction: '',
            modalShow: false,
            resetPwdModalShow:false,
            loading: true,
            exportLoading:false,
            total:0,
            checkRows: [],
            ...listMixin(listConfig)
        });

        onMounted(async () => {
            await state.loadTableData();
            state.loading = false;
        });


        const queryDetail=(row)=>{
            localSet('row',row);
            router.push({ path: '/assets/company/detail' })
        }
        const changeStatus=(status)=>{
             return new Promise((_, reject) => {
                    setTimeout(() => {
                        return reject(new Error('Error'))
                    }, 1000)
             })
            //   return status=='1'?'0':'1'
         }

         const changeColumn=async (field, row)=>{
            if(field=='status'){
                let newStatus=row.status=='1'?'0':'1'
                await updateStatus({
                    id:row.id,
                    status:newStatus
                });
                row.status=newStatus
            }
        }

        const save = async () => {
            formRef.value.validate().then(async (valid) => {
                let form = JSON.parse(JSON.stringify(formRef.value.formData));
                // if(state.optAction=='add')
                //         form.pwd=md5(form.pwd)
                let res = await (state.optAction == 'add'
                    ? tableRowAdd(form)
                    : tableRowUpdate(form));
                
                if (res[statusField] == okCode) {
                    state.modalShow = false;
                    state.loadTableData();
                }
            });
        };

         const handleSelectionChange = (checkRows) => {
            state.checkRows = checkRows;
        };

        const deleteBatch=async ()=>{
            const ids = state.checkRows.map((item) => item.id).join(',');
            if (ids) {
                 await proxy.$confirm(`确定删除所选用户吗`, '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await submitDeleteBatch({
                    ids
                });
                // proxy.$msg('删除成功');
               state.loadTableData();
            }else{
                 proxy.$msg('请选择要删除的用户',"error");
            }
        }

        const submitResetPwd = async () => {
            await resetPwdFormRef.value.validate();
            let form = JSON.parse(JSON.stringify(resetPwdFormRef.value.formData));
            let res = await resetPassword(form);
            if (res[statusField] == okCode) {
                state.resetPwdModalShow = false;
            }
        };
        return {
            ...toRefs(state),
            queryTable,
            optClick,
            formRef,
            resetPwdFormRef,
            filterRef,
            queryDetail,
            changeStatus,
            changeColumn,
            handleSelectionChange,
            deleteBatch,
            submitResetPwd,
            mutiSelectOptions: {
                mutiSelect: true,
                keyFiled: 'id',
                checkSelectable: row => {
                 return row['userName']!='admin';
                }
            },
            save,
            Plus,
            Delete
        };
    }
};
</script>

<style lang="stylus">
    .sysUser
        .a-opt
            font-size:16px
            // display: inline-flex
            // align-items: center
            margin: 0 8px
            &:last-child
                color:rgb(128, 128, 255);
            .el-icon
                font-size:14px
                position relative
                top:1px;
        .div-query
            max-width:1440px
        .div-btns
            padding-bottom:14px
            padding-top: 2px
        .div-left
            display: flex
            .el-button--primary.is-plain
                &:hover
                    span
                     color:#fff;
                span
                 color:var(--el-color-primary)
        .head-total
            color:#D9001B
            font-size: 14px
        .el-button
            display: flex
            align-items: center
      .el-switch__core
        background-color: rgba(204, 204, 204, 1)
        transform: scale(1.1)
</style>

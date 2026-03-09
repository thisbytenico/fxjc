import ajax from "@/utils/ajax";
import { reactive, toRefs, getCurrentInstance, watch } from 'vue'
import { pageField, totalField, statusField, okCode } from "@/config";
export default function ({ list_url, delete_url, tableList, tableDelete,
    query = {}, optClick, formatListRes, filterRef, list_req_method = "get",
    pageSize = 10 }) {
    const { proxy } = getCurrentInstance();

    watch(
        () => {
            return filterRef && filterRef.value && filterRef.value.query;
        },
        () => {
            if (state.table[pageField] != 1)
                state.table[pageField] = 1
            //console.log(' state.table', JSON.parse(JSON.stringify(state.table)))
        },
        {
            deep: true
        }
    );

    const state = reactive({
        tableData: [],
        queryParam: {},
        table: {
            [pageField]: 1,
            pageSize,
            data: [],
            total: 0
        },
        select_list_rows: [],
    })

    const loadTableData = async (resetPage = false, customQuery, noLoading = false) => {
        // if (query) {
        //     state.queryParam = query
        //     console.log('state.queryParam', state.queryParam)
        // }

        let params = {
            url: tableList || list_url,
            data: _getQueryParams(resetPage, customQuery),
            //loading:noLoading?false:true
        }

        // if (this.list_content_type) params.contentType = this.list_content_type;
        // console.log('params', params)
        const res = await ajax[list_req_method || 'get'](params);
        state.table.data = [];
        let table = res.data;
        //对于目前后端返回数据格式不规范不统一的问题进行数据统一处理
        if (table.list) {
            if (table[totalField] == undefined)
                table[totalField] = table.list.length
        } else if (Array.isArray(table)) {
            table = {
                list: table,
                [totalField]: table.length
            }
            _formatTabelData(table);
            return
        }
        // console.log('formatListRes',formatListRes)
        if (formatListRes) table = formatListRes(res);
        //console.log('table00000', table);
        _formatTabelData(table);
    }
    const _getQueryParams = (resetPage, customQuery) => {
        let param = Object.assign({}, filterRef && filterRef.value ? filterRef.value.getQuery() : query);
        // console.log('state.queryParam', state.queryParam, query)
        if (customQuery)
            param = Object.assign(param, customQuery)

        //  console.log('param', param,'customQuery',customQuery,'filterRef.value.getQuery()',filterRef.value.getQuery())
        for (let key in param) {
            if (Array.isArray(param[key])) {
                param[key] = param[key].toString()
            }
            if(param[key]){
                param[key]=param[key].trim()  
            }
        }
        
        param[pageField] = resetPage ? 1 : state.table[pageField]
        param[pageField]=(param[pageField]-1)*state.table.pageSize
        param.pageSize = state.table.pageSize
        delete param.time
        return param
    }
    const _formatTabelData = (data) => {
        const { list } = data;
        state.table.total = Number(data[totalField]) || 0;
        // if (!list.length) {
        //     return;
        // }
        state.table.data = list;
        // console.log('state.table', state.table)
    }

    const c_optClick = async (type, row) => {
        //&& delete_url
        if (type == 'delete') {
            await proxy.$confirm(
                `确定删除吗`,
                "提示",
                {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            );
            if (!delete_url && !tableDelete) {
                proxy.$g_alert('没有配置删除接口')
                return
            }
            let params = { id: row.id };

            ajax.post({
                url: tableDelete || delete_url,
                data: params
            }).then(res => {
                if (res[statusField] == okCode) {
                    proxy.$msg('删除成功');
                }
                loadTableData();
            })
        } else {
            optClick && optClick(type, row)
        }
    }

    const c_pageChange = (type, num) => {
        if (type == 'pageSize') {
            state.table.pageSize = num;
        } else {
            state.table[pageField] = num || 1;
        }
        loadTableData();
    }


    return {
        ...toRefs(state),
        loadTableData,
        c_optClick,
        c_pageChange
    };
};



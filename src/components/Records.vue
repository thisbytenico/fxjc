<template>
    <div>
        <!-- <CTable
            :columns="columnsInner"
            :table="table"
            :optClick="c_optClick"
            :pageChange="c_pageChange"
        >
            <template #headimgurl>
                <el-table-column label="头像" width="100" align="center">
                    <template #default="scope">
                        <img :src="scope.row.headimgurl" class="head-img" />
                    </template>
                </el-table-column>
            </template>
            <template #type>
                <el-table-column label="NFT类型" width="80" align="center">
                    <template #default="scope">
                        {{ scope.row.type === 1 ? "普通NFT" : "盲盒NFT" }}
                    </template>
                </el-table-column>
            </template>
        </CTable> -->
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import listMixin from "@/mixin/list-mixin";

const props = defineProps<{
    id: Number | String;
    type: Number | String;
}>();
const columnsInner = [
    { label: "微信ID", prop: "openid", width: 80 },
    { label: "昵称", prop: "nickname", width: 80 },
    { slot: "headimgurl" },
    { label: "动作", prop: "action", width: 80 },
    { label: "金额", prop: "amount", width: 80 },
    { label: "商品ID", prop: "item_id", width: 80 },
    { label: "商品名称", prop: "item_name" },
    { slot: "type" },
    { label: "金额", prop: "amount", width: 80 },
];

const formatListRes = ({ data }) => {
    // data.count = data.list.length;
    // return data;
    return { list: data, count: data.length };
};

const listConfig = {
    list_url: "/admin/nftHistory/list",
    delete_url: "",
    //formatListRes,
    query: {
        id: props.id,
        type: props.type,
    },
};
let state = reactive({
    columnsInner,
    optAction: "111",
    noResetQueryFields: { a: 1 },
    ...listMixin(listConfig),
});

onMounted(() => {
    // console.log("111111");
    state.loadTableData();
});
</script>

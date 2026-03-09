<template>
    <div class="div-query" @keyup.enter="queryData(false)">
        <el-form
            :inline="true"
            class="demo-form-inline"
            :label-width="lableWidth"
        >
            <el-form-item
                :label="item.label + ':'"
                v-for="item in querys"
                :key="item.field"
            >
                <slot
                    v-if="item.type == 'slot'"
                    :name="item.field"
                    :query="query"
                >
                </slot>
                <SelectSearch
                    v-else-if="item.type == 'selSearch'"
                    :params="item.config.req"
                    v-model="query[item.field]"
                    :searchField="item.config.searchField"
                    :valueField="item.config.valueField"
                    :labelField="item.config.labelField"
                />
                <el-input
                    v-else-if="item.type == 'text'"
                    v-model="query[item.field]"
                    :placeholder="item.placeholder"
                ></el-input>
                <el-select
                    v-else-if="item.type == 'sel'"
                    v-model="query[item.field]"
                    placeholder="请选择"
                    :multiple="!!item.multiple"
                    :filterable="true"
                >
                    <el-option
                        v-for="op in item.options"
                        :key="op.value"
                        :label="op.label"
                        :value="op.value"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-else-if="item.type == 'daterange'"
                    v-model="query[item.field]"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="queryData(false)"
                    :icon="Search"
                    >搜索</el-button
                >
                <el-button
                    @click="queryData(true)"
                    :icon="Refresh"
                    >重置</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import ajax from '@/utils/ajax';
import { pageField, statusField, okCode } from '@/config';
import {
  Search,
  Refresh
} from '@element-plus/icons-vue'
export default {
    props: {
        querys: {
            type: Array,
            default() {
                return [];
            }
        },
        hideDefaultParams: {
            type: Object,
            default() {
                return {};
            }
        },
        lableWidth: {
            type: String,
            default: ''
        }
    },

    setup(props, context) {
        const state = reactive({
            query: {}
        });
        onMounted(() => {
            initQueryValue();
        });
        const initQueryValue = (isReset = false) => {
            // console.log(
            //     'props.querys',
            //     JSON.parse(JSON.stringify(props.querys))
            // );
            props.querys.forEach((item) => {
                //!isReset
                state.query[item.field] =
                    item.defaultValue !== undefined ? item.defaultValue : '';

                const config = item.config;
                if (item.type == 'sel' && config && !item.options) {
                    const reqParams = config.req.data;
                    if (reqParams) {
                        reqParams[pageField] = 1;
                        reqParams['pageSize'] = 100;
                    } else {
                        config.req.data = {
                            [pageField]: 1,
                            pageSize: 100
                        };
                    }
                    ajax.get({
                        showMsg: false,
                        loading: false,
                        ...config.req
                    }).then((res) => {
                        if (res[statusField] == okCode) {
                            item.options = [{ label: '全部', value: '' }];
                            (res.data.list || res.data).forEach(
                                (optionItem) => {
                                    item.options.push({
                                        label: optionItem[config.labelField],
                                        value: optionItem[config.valueField]
                                    });
                                }
                            );
                        }
                    });
                }
            });
        };

        const queryData = (isReset = false) => {
            if (isReset) {
                initQueryValue(true);
            }
            context.emit('query');
        };

        const getQuery = () => {
            return Object.assign(state.query, props.hideDefaultParams);
        };

        const loadSelData = () => {};
        return {
            ...toRefs(state),
            queryData,
            getQuery,
            Search,
            Refresh
        };
    }
};
</script>
<style lang="stylus">
    .div-query
        .el-button:last-child
            transform: scale(1.05)
</style>
<template>
    <div>
        <slot v-if="isCustomTemplate" :options="options"> </slot>
        <el-select
            v-else
            :model-value="modelValue"
            filterable
            remote
            reserve-keyword
            :placeholder="placeholder"
            @change="handleSelect"
            :remote-method="remoteMethod"
            :loading="loading"
            :disabled="disabled"
            @visible-change="recoverLocalOptions"
            suffix-icon="ArrowUp"
            :class="{ showArrowUp: !isInputAutoSearch }"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
import ajax from '@/utils/ajax';
import { onMounted, reactive, toRefs } from 'vue';
import { pageField, statusField, okCode } from '@/config';
export default {
    // model: {
    //   prop: "value",
    //   event: "change",
    // },
    props: {
        params: {
            type: Object,
            default() {
                return {};
            }
        },
        // reqRequiredField
        searchField: {
            type: String,
            default: ''
        },
        valueField: {
            type: String,
            default: ''
        },
        labelField: {
            type: String,
            default: ''
        },
        otherField: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        modelValue: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isShowAllOption: {
            type: Boolean,
            default: false
        },
        showPlaceHolderOption: {
            type: Boolean,
            default: true
        },
        pOptions: {
            type: Array,
            default() {
                return [];
            }
        },
        isAutoLoadData: {
            type: Boolean,
            default: true
        },
        //是否显示下拉箭头
        // showArrowUp: {
        //   type: Boolean,
        //   default: false,
        // },
        isInputAutoSearch: {
            type: Boolean,
            default: true
        },
        showFirstOption: {
            type: Boolean,
            default: false
        },
        isCustomTemplate: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const getEmptyOptions = () => {
            if (props.showPlaceHolderOption) {
                return [];
            }
            return [
                {
                    value: '',
                    label: props.placeholder || '全部',
                    cmd: ''
                }
            ];
        };
        //之所以用getEmptyOptions避免引用赋值相互影响问题
        const localOptions = props.isInputAutoSearch ? [] : getEmptyOptions();
        const options = localOptions;
        const state = reactive({
            options,
            //value: [],
            loading: false,
            localOptions
        });
        onMounted(() => {
            if (props.isAutoLoadData) remoteMethod('');
            if (props.pOptions.length) {
                state.options = props.pOptions.map((item) => {
                    return {
                        value: item[props.valueField],
                        label: item[props.labelField],
                        ...item
                    };
                });
            }
        });
        const remoteMethod = (query, forceReq = false) => {
            //console.log("query111111111", query);
            //不自动搜索时从本地内存缓存中检索
            if (!props.isInputAutoSearch && !forceReq) {
                state.options = state.localOptions.filter(
                    (item) => item.label.indexOf(query) != -1 || !query
                );
                return;
            }

            //避免引用赋值相互影响props.params
            let params = JSON.parse(JSON.stringify(props.params));
            if (props.searchField) params.data[props.searchField] = query;
            state.loading = true;
            //console.log("params", params);
            if (params.data) {
                params.data[pageField] = 1;
                params.data.pageSize = 100;
            }

            ajax.get({
                showMsg: false,
                loading: false,
                ...params
            })
                .then((res) => {
                    state.loading = false;
                    if (res[statusField] == okCode) {
                        //重置下拉选项
                        clearOptions();

                        const data = res.data;

                        const { valueField, labelField, otherField } = props;
                        (data.list || data).forEach((item) => {
                            state.options.push({
                                value: item[valueField],
                                label:
                                    item[labelField] +
                                    (otherField ? `(${item[otherField]})` : ''),
                                ...item
                            });
                        });
                        // console.log(
                        //     'state.options',
                        //     JSON.parse(JSON.stringify(state.options))
                        // );
                        //避免相互引用
                        state.localOptions = JSON.parse(
                            JSON.stringify(state.options)
                        );
                    } else {
                        clearOptions();
                    }

                    if (
                        !state.options.find(
                            (item) => item.value.indexOf(props.modelValue) >= 0
                        )
                    ) {
                        context.emit('update:modelValue', '');
                    }

                    //props.modelValue&&
                    if (props.showFirstOption && state.options.length) {
                        context.emit(
                            'update:modelValue',
                            state.options[0].value
                        );
                    }
                })
                .catch((error) => {
                    state.loading = false;
                    clearOptions();
                });
        };

        const handleSelect = (value) => {
            context.emit('update:modelValue', value);
            context.emit(
                'selectItem',
                state.options.find((item) => item.value == value)
            );
        };

        const recoverLocalOptions = (showSel) => {
            // console.log("showSel", showSel, state.localOptions.length);
            //避免相互引用
            if (!showSel)
                state.options = JSON.parse(JSON.stringify(state.localOptions));
        };

        const clearOptions = () => {
            //当不自动搜索时赋值全部选项，props.isShowAllOption主要是为自动输入搜索服务
            state.localOptions =
                props.isShowAllOption || !props.isInputAutoSearch
                    ? getEmptyOptions()
                    : [];
            state.options =
                props.isShowAllOption || !props.isInputAutoSearch
                    ? getEmptyOptions()
                    : [];
        };
        return {
            ...toRefs(state),
            remoteMethod,
            handleSelect,
            recoverLocalOptions,
            clearOptions
        };
    }
};
</script>

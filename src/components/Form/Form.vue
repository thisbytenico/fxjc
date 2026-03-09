<template>
    <el-form
        :label-position="labelPosition"
        :model="formData"
        :label-width="labelWidth"
        ref="formRef"
        class="CForm"
    >
        <template v-for="item in formItems" :key="item.field">
            <el-form-item
                :label="item.label + ':'"
                :prop="item.field"
                :class="{ formItemHide: item.hide }"
                :rules="item.rules||[{
                    required: item.required != undefined ? item.required : true,
                    message:
                        item.placeHolder ||
                        `请${item.type ? '选择' : '输入'}${item.label}`,
                    trigger: 'change'
                }]"
                v-if="!(item.editHide&&action=='edit')"
            >
                <slot
                    v-if="item.type == 'slot'"
                    :name="item.field"
                    :formData="formData"
                ></slot>
                <el-select
                    v-else-if="item.type == 'sel'"
                    v-model="formData[item.field]"
                    :disabled="isDetail || !!item.disabled"
                    :multiple="!!item.multiple"
                    :filterable="true"
                    :allow-create="!!item.allowCreate"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="op in item.options"
                        :key="op.value"
                        :label="op.label"
                        :value="op.value"
                    ></el-option>
                </el-select>

                <el-radio-group
                    v-else-if="item.type == 'radio'"
                    v-model="formData[item.field]"
                >
                    <el-radio
                        v-for="ritem in item.radios"
                        :key="ritem"
                        :label="ritem"
                    ></el-radio>
                </el-radio-group>

                 <el-switch
                    v-else-if="item.type == 'switch'"
                    v-model="formData[item.field]"
                    :inline-prompt="true"
                    active-text="启用"
                    inactive-text="禁用"
                    active-value="1"
                    inactive-value="0"
                    size="large"
                    />

                <el-date-picker
                    v-else-if="item.type == 'datetime'"
                    v-model="formData[item.field]"
                    type="datetime"
                    :disabled="!!item.disabled"
                    :readonly="isDetail"
                    :placeholder="item.placeHolder || `请选择${item.label}`"
                >
                </el-date-picker>

                <img
                    class="form-item-img"
                    v-else-if="isDetail && item.isImg"
                    :src="formData[item.field]"
                    @click="openImg(formData[item.field])"
                />

                <el-input
                    v-else
                    v-model="formData[item.field]"
                    :disabled="!!item.disabled"
                    :readonly="isDetail"
                    placeholder=""
                    :type="item.type"
                    :rows="item.rows || 2"
                ></el-input>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
// import { mapGetters } from "vuex";
import { onMounted, reactive, toRefs, ref } from 'vue';
// const { expose } = useContext(); // 通过context获取expose方法
import ajax from '@/utils/ajax';
import { pageField, statusField, okCode } from '@/config';
export default {
    name: 'CForm',
    props: {
        formItems: {
            type: Array,
            default() {
                return [];
            }
        },
        isDetail: {
            type: Boolean,
            default: false
        },
        labelPosition: {
            type: String,
            default: 'top'
        },
        labelWidth: {
            type: String,
            default: '110px'
        },
        action: {
            type: String,
            default: 'add'
        }
    },

    setup(props) {
        const formRef = ref(null);

        const state = reactive({
            formData: {}
        });
        onMounted(() => {
            initFormData();
        });
        const initFormData = () => {
            props.formItems.forEach((item) => {
                state.formData[item.field] =
                    item.defaultValue != undefined ? item.defaultValue : '';

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
                            item.options = [{ label: '请选择', value: '' }];
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

        const validate = () => {
            return formRef.value.validate();
        };

        const resetFields = () => {
            formRef.value.resetFields();
            initFormData();
        };

        const openImg = (url) => {
            window.open(url);
        };

        return {
            ...toRefs(state),
            formRef,
            validate,
            resetFields,
            openImg
        };
    }
};
</script>
<style lang="stylus">
body .CForm {
    .el-form-item--mini .el-form-item__error {
        padding-top: 2px;
    }
    .formItemHide {
        display: none;
    }

    .form-item-img{
        width:128px;
        cursor:pointer
    }
}
</style>

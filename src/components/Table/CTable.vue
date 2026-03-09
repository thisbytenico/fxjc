<template>
    <div class="div-table-box flex_col">
        <div class="div-table">
            <el-table
                v-if="tableHeight"
                class="common-list-table hxTable"
                :class="{ hasBottomBorder: !tableHeight }"
                v-loading.iTable="options.loading"
                :data="table.data"
                :stripe="options.stripe"
                :border="options.border"
                :highlight-current-row="options.highlightCurrentRow"
                ref="mutipleTable"
                style="width: 100%"
                :height="tableHeight"
                @row-click="clickRow"
                @row-dblclick="dblclickRow"
                @row-contextmenu="contextmenu"
                @header-click="headClick"
                @header-contextmenu="headcontextmenu"
                @current-change="rowChange"
                @selection-change="handleSelectionChange"
                @select="selectRow"
            >
                <!--region 选择框-->
                <el-table-column
                    v-if="
                        mutiSelectOptions.mutiSelect ||
                        mutiSelectOptions.singleSeclect
                    "
                    type="selection"
                    width="55"
                    align="center"
                    :selectable="
                        mutiSelectOptions.checkSelectable || checkSelectable
                    "
                >
                </el-table-column>
                <el-table-column label="序号" width="60" align="center">
                    <template #default="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <template v-for="column in c_columns">
                    <!-- slot 添加自定义配置项 -->
                    <slot v-if="column.slot" :name="column.slot"></slot>
                    <el-table-column
                        v-else-if="column.type == 'opt'"
                        :label="column.label"
                        :width="column.width || '90'"
                        :min-width="column.minWidth || 'auto'"
                        :align="column.align || 'center'"
                        :key="column.type"
                        :resizable="
                            column.resizable == undefined
                                ? true
                                : column.resizable
                        "
                        :fixed="column.fixed ? 'right' : false"
                    >
                        <template #default="scope">
                            <el-dropdown
                                v-if="!scope.row.hiddenOpt"
                                @command="c_optClick($event, scope.$index)"
                            >
                                <span class="el-dropdown-link">
                                    操作<i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item
                                            v-for="item in column.opts"
                                            :command="
                                                item.action_name == '状态'
                                                    ? scope.row[
                                                          column.stateField
                                                      ] == 1
                                                        ? 'stop'
                                                        : 'start'
                                                    : item.action
                                            "
                                            :key="item.action"
                                        >
                                            <div
                                                v-if="
                                                    item.action_name == '状态'
                                                "
                                            >
                                                <i
                                                    :class="[
                                                        `el-icon-video-${
                                                            scope.row[
                                                                column
                                                                    .stateField
                                                            ] == 1
                                                                ? 'pause'
                                                                : 'play'
                                                        }`
                                                    ]"
                                                ></i>
                                                {{
                                                    scope.row[
                                                        column.stateField
                                                    ] == 1
                                                        ? '停用'
                                                        : '启用'
                                                }}
                                            </div>
                                            <div
                                                v-else-if="
                                                    item.icon_type == 'img'
                                                "
                                            >
                                                <img
                                                    class="no-check"
                                                    :src="`/static/img/opt/${item.action}.png`"
                                                />
                                                <img
                                                    class="check"
                                                    :src="`/static/img/opt/${item.action}_check.png`"
                                                />
                                                {{ item.action_name }}
                                            </div>
                                            <!-- <div v-else-if="item.icon_type == 'svg'">
                        <svg-icon :icon-class="item.action" class="no-check" />
                        <svg-icon
                          :icon-class="item.action + '-check'"
                          class="check"
                        />
                        {{ item.action_name }}
                      </div> -->
                                            <div
                                                v-else-if="
                                                    item.icon_type == 'font'
                                                "
                                            >
                                                <i :class="[item.i_class]"></i>
                                                {{ item.action_name }}
                                            </div>
                                            <div v-else>
                                                {{ item.action_name }}
                                            </div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                    </el-table-column>

                    <!-- 默认渲染列   :align="column.align"-->
                    <el-table-column
                        v-else
                        :prop="column.prop"
                        :key="column.label"
                        :label="column.label"
                        :width="column.width || 'auto'"
                        :min-width="column.minWidth || 'auto'"
                        :show-overflow-tooltip="
                            column.overflowTooltip == undefined
                                ? true
                                : column.overflowTooltip
                        "
                        :align="column.align || 'center'"
                    >
                        <template #default="scope">
                            <template v-if="!column.render">
                                <template
                                    v-if="scope.row[column.prop] !== undefined"
                                >
                                    <template v-if="column.formatter">
                                        <span
                                            v-html="
                                                column.formatter(
                                                    scope.row,
                                                    column,
                                                    scope.row[column.prop]
                                                )
                                            "
                                        ></span>
                                    </template>
                                    <template v-else-if="column.type == 'time'">
                                        <span>{{
                                            getTime(scope.row[column.prop]) ||
                                            '-'
                                        }}</span>
                                    </template>
                                    <template
                                        v-else-if="
                                            column.type == 'img' &&
                                            scope.row[column.prop]
                                        "
                                    >
                                        <img
                                            v-if="scope.row[column.prop]"
                                            :src="scope.row[column.prop]"
                                            class="img"
                                            alt=""
                                            @click="
                                                openImg(scope.row[column.prop])
                                            "
                                        />
                                    </template>
                                    <template v-else>
                                        <span>{{
                                             scope.row[column.prop]!==undefined?scope.row[column.prop]:'-'
                                        }}</span>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <template #empty>
                    <empty></empty>
                </template>
            </el-table>

            <el-table
                v-else
                class="common-list-table hxTable"
                :class="{ hasBottomBorder: !tableHeight }"
                v-loading.iTable="options.loading"
                :data="table.data"
                :stripe="options.stripe"
                :border="options.border"
                :highlight-current-row="options.highlightCurrentRow"
                style="width: 100%"
                @row-click="clickRow"
                ref="mutipleTable"
                @row-dblclick="dblclickRow"
                @row-contextmenu="contextmenu"
                @header-click="headClick"
                @header-contextmenu="headcontextmenu"
                @current-change="rowChange"
                @selection-change="handleSelectionChange"
            >
                <!--region 选择框-->
                <el-table-column
                    v-if="mutiSelectOptions.mutiSelect"
                    type="selection"
                    width="55"
                    align="center"
                    :selectable="
                        mutiSelectOptions.checkSelectable || checkSelectable
                    "
                >
                </el-table-column>
                <!--endregion-->
                <el-table-column label="序号" width="60" align="center">
                    <template #default="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <!--region 数据列-->
                <template v-for="(column, index) in c_columns">
                    <!-- slot 添加自定义配置项 -->
                    <slot v-if="column.slot" :name="column.slot"></slot>

                    <el-table-column
                        v-else-if="column.type == 'opt'"
                        :label="column.label"
                        :width="column.width || '90'"
                        :min-width="column.minWidth || 'auto'"
                        :show-overflow-tooltip="column.overflowTooltip"
                        :align="column.align || 'center'"
                        :key="column.type"
                        :fixed="column.fixed ? 'right' : false"
                    >
                        <template #default="scope">
                            <el-dropdown
                                v-if="!scope.row.hiddenOpt"
                                @command="c_optClick($event, scope.$index)"
                            >
                                <span class="el-dropdown-link">
                                    操作<i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item
                                            v-for="item in column.opts"
                                            :command="
                                                item.action_name == '状态'
                                                    ? scope.row[
                                                          column.stateField
                                                      ] == 1
                                                        ? 'stop'
                                                        : 'start'
                                                    : item.action
                                            "
                                            :key="item.action"
                                        >
                                            <div
                                                v-if="
                                                    item.action_name == '状态'
                                                "
                                            >
                                                <i
                                                    :class="[
                                                        `el-icon-video-${
                                                            scope.row[
                                                                column
                                                                    .stateField
                                                            ] == 1
                                                                ? 'pause'
                                                                : 'play'
                                                        }`
                                                    ]"
                                                ></i>
                                                {{
                                                    scope.row[
                                                        column.stateField
                                                    ] == 1
                                                        ? '停用'
                                                        : '启用'
                                                }}
                                            </div>
                                            <div
                                                v-else-if="
                                                    item.icon_type == 'img'
                                                "
                                            >
                                                <img
                                                    class="no-check"
                                                    :src="`/static/img/opt/${item.action}.png`"
                                                />
                                                <img
                                                    class="check"
                                                    :src="`/static/img/opt/${item.action}_check.png`"
                                                />
                                                {{ item.action_name }}
                                            </div>
                                            <div
                                                v-else-if="
                                                    item.icon_type == 'font'
                                                "
                                            >
                                                <i :class="[item.i_class]"></i>
                                                {{ item.action_name }}
                                            </div>
                                            <div v-else>
                                                {{ item.action_name }}
                                            </div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                    </el-table-column>

                    <!-- 默认渲染列   :align="column.align"-->
                    <el-table-column
                        v-else
                        :prop="column.prop"
                        :key="column.label"
                        :label="column.label"
                        :width="column.width || 'auto'"
                        :min-width="column.minWidth || 'auto'"
                        :show-overflow-tooltip="column.overflowTooltip"
                        :align="column.align || 'center'"
                    >
                        <template #default="scope">
                            <template v-if="!column.render">
                                <template
                                    v-if="scope.row[column.prop] !== undefined"
                                >
                                    <template v-if="column.formatter">
                                        <span
                                            v-html="
                                                column.formatter(
                                                    scope.row,
                                                    column
                                                )
                                            "
                                        ></span>
                                    </template>
                                    <template v-else-if="column.type == 'time'">
                                        <span>{{
                                            getTime(scope.row[column.prop]) ||
                                            '-'
                                        }}</span>
                                    </template>
                                    <template
                                        v-else-if="
                                            column.type == 'img' &&
                                            scope.row[column.prop]
                                        "
                                    >
                                        <img
                                            v-if="scope.row[column.prop]"
                                            :src="scope.row[column.prop]"
                                            class="img"
                                            @click="
                                                openImg(scope.row[column.prop])
                                            "
                                        />
                                    </template>
                                    <template v-else>
                                        <span>{{
                                            scope.row[column.prop]!==undefined?scope.row[column.prop]:'-'
                                        }}</span>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <template #empty>
                    <empty></empty>
                </template>
            </el-table>
        </div>

        <div class="div-footer" v-if="table.total && hasPagination">
            <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageNoChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="table.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table.total"
                background
                v-model:current-page="table.page"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, watch, ref } from 'vue'
import Empty from '@/components/Empty.vue'
import { pageField } from '@/config'
import { _optTypes } from './config'

export default {
    //组件
    components: {
        Empty
    },
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }, // 数据列表
        columns: {
            type: Array,
            default() {
                return []
            }
        }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
        optClick: {
            type: Function,
            required: false
        },
        pageChange: {
            type: Function,
            required: false
        },
        table: {
            type: Object,
            default() {
                return {
                    data: [],
                    total: 0,
                    [pageField]: 1
                }
            }
        },
        hasPagination: {
            type: Boolean,
            default: true
        },
        overflowTooltip: {
            type: Boolean,
            default: true
        },
        tableHeight: {
            type: String,
            default: '100%'
        },
        mutiSelectOptions: {
            type: Object,
            default() {
                return {
                    singleSeclect: false,
                    mutiSelect: false,
                    keyFiled: 'id'
                    // key:"id",
                    // checkSelectable:function(row){
                    //     return !!row[this.key];
                    // }
                }
            }
        },
        options: {
            type: Object,
            default() {
                return {
                    height: 300, //默认高度-为了表头固定
                    stripe: false, // 是否为斑马纹 table
                    highlightCurrentRow: false, // 是否要高亮当前行
                    border: false, //是否有纵向边框
                    lazy: false //是否需要懒加载
                }
            }
        }, // table 表格的控制参数
        tableClass: {
            type: String,
            default: 'hxTable'
        }
    },
    computed: {
        c_columns() {
            return this.columns
                .map((item) => {
                    if (item.type == 'opt') {
                        item.opts = item.opts.map((opt) => {
                            if (typeof opt != 'string') {
                                return opt
                            }
                            let action = opt
                            let icon_type = ''
                            if (_optTypes[opt]) {
                                action = _optTypes[opt].action
                                icon_type = _optTypes[opt].icon_type
                            }

                            return {
                                action_name: opt,
                                action,
                                icon_type
                            }
                        })
                    }
                    item.checked =
                        item.checked == undefined ? true : item.checked
                    // console.log('item', JSON.parse(JSON.stringify(item)))
                    return item
                })
                .filter((item) => !!item.checked)
        }
    },

    mounted() {
        this.$nextTick(() => {
            document.querySelector('.gutter') &&
                document.querySelector('.gutter').remove()
        })
    },

    setup(props, context) {
        watch(
            () => {
                return props.table && props.table[pageField]
            },
            (page) => {
                // console.log('page', page)
                // if (page !== undefined && page !== '')
                // props.pageChange('page', page);
            }
        )
        const state = reactive({
            pageIndex: 1,
            multipleSelection: [] // 多行选中
        })

        const pageSizeChange = (pageSize) => {
            props.pageChange('pageSize', pageSize)
        }

        const pageNoChange = (page) => {
            if (page) props.pageChange('page', page)
        }

        const c_optClick = (type, index) => {
            props.optClick(type, props.table.data[index])
        }

        const clickRow = (row, column, event) => {
            context.emit('clickRow', { row, column, event })
        }

        const dblclickRow = (row, column, event) => {
            context.emit('dblclickRow', { row, column, event })
        }

        const contextmenu = (row, column, event) => {
            context.emit('contextmenu', {
                row: row,
                column: column,
                event: event
            })
        }

        const headClick = (row, column, event) => {
            context.emit('headClick', {
                row: row,
                column: column,
                event: event
            })
        }

        const headcontextmenu = (row, column, event) => {
            context.emit('headcontextmenu', {
                row: row,
                column: column,
                event: event
            })
        }

        const rowChange = (currentRow, oldCurrentRow) => {
            context.emit('rowChange', {
                currentRow,
                oldCurrentRow
            })
        }

        const handleSelectionChange = (rows) => {
            const { singleSeclect } = props.mutiSelectOptions
            if (singleSeclect) {
                //console.log('handleSelectionChange rows',JSON.parse(JSON.stringify(rows)));
                props.table.data.forEach((row) => {
                    if (!row.checked) {
                        mutipleTable.value.toggleRowSelection(row, false)
                    }
                })
                if (rows.length > 1) {
                    return
                }
            }
            state.multipleSelection = rows
            context.emit('handleSelectionChange', rows)
        }

        const selectRow = (selection, item) => {
            const { singleSeclect, keyFiled } = props.mutiSelectOptions
            //console.log('selectRow selection', selection);
            if (singleSeclect) {
                const checked = !item.checked
                props.table.data.forEach((row) => {
                    if (row[keyFiled] == item[keyFiled] && checked) {
                        row.checked = true
                    } else {
                        row.checked = false
                    }
                })
            }
        }

        const checkSelectable = () => {
            return true
        }

        const getTime = (time) => {
            if (!time) return ''
            return new Date(time * 1000).format('yyyy/MM/dd HH:mm:ss')
        }

        const mutipleTable = ref(null)

        const openImg = (url) => {
            if (/http/.test(url)) window.open(url)
        }

        return {
            ...toRefs(state),
            c_optClick,
            getTime,
            pageNoChange,
            pageSizeChange,
            handleSelectionChange,
            clickRow,
            dblclickRow,
            contextmenu,
            headClick,
            headcontextmenu,
            rowChange,
            mutipleTable,
            selectRow,
            checkSelectable,
            openImg
        }
    }
}
</script>

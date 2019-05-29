<template>
    <!-- class="echartsHight"  -->
    <div>
        <slot name="searchTool">
        </slot>
        <el-table
                ref="baseTable"
                :data="data"
                :border="border"
                :max-height="maxHeight"
                :highlight-current-row="showRadio"
                @select="select"
                @select-all="selectAll"
                @row-click="rowClick"
                @row-dblclick="rowDblclick"
                @selection-change="selectionChange"
                style="width: 100%"
                @cell-dblclick="cellDblclick"
                @cell-click="cellClick"
        >

            <el-table-column v-if="showSelection" type="selection" header-align="center" align="center">
            </el-table-column>
            <el-table-column v-if="showIndex" type="index" label="序号" width="50" header-align="center" align="center">
            </el-table-column>
            <!-- :class-name="item.subStr === true?'sys_text_substr':''" -->
            <el-table-column v-for='item in colums' :label="item.label" :align="item.align? item.align:'center'"
                             header-align="center"
                             :key="item.prop" :prop="item.prop" :class-name="item.subStr === true?'sys_text_substr':item.className"
                             :min-width="item.width ? item.width:' '"
                             :sortable="item.sortable? item.sortable:false"
                             :show-overflow-tooltip="item.showOverflowTooltip ? item.showOverflowTooltip : false"
            >

                <template scope="scope">
                    <el-popover class="table_popover" trigger="hover" placement="top" v-if="item.popover">
                        <slot name="hover">
                            <p>{{ typeof item.popover === "boolean"?customDisplay(item,
                                scope):scope.row[item.popover]||item.popover }}</p>
                        </slot>
                        <div slot="reference" class="name-wrapper">
                            <!-- <el-tag class="sys_text_substr" v-if="item.subStr">{{ customDisplay(item, scope) }}</el-tag>
                                          <el-tag v-if="!item.subStr">{{ customDisplay(item, scope) }}</el-tag> -->
                            <el-tag>{{ customDisplay(item, scope) }}</el-tag>
                        </div>
                    </el-popover>
                    <!-- <div class="sys_text_substr" v-else-if="item.subStr">{{customDisplay(item, scope)}}</div>
                              <div v-else-if="!item.subStr">{{customDisplay(item, scope)}}</div> -->
                    <template v-if="!item.popover">{{customDisplay(item, scope)}}</template>
                </template>

            </el-table-column>
            <slot name="operation">
                <el-table-column label="操作" v-if="type === 'normal'" width="112" align="center">
                    <template scope="scope">
                        <el-button @click="edit(scope.row)" size="small" type="warning">编辑</el-button>
                        <el-button @click="deleteTable(scope.row)" size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </slot>

        </el-table>
        <v-page v-if="isPage" :page="page" @currentChange="currentChange" @pageSizeChange="pageSizeChange"
                :class="isClass?'cation':' ' "></v-page>
        <!-- :class=isClass?'cation':"" -->
    </div>
</template>

<script>
    /*需要时间格式化的东西需要在colums传入format 内容为格式的内容
     * cols属性为一个数组,数组由对象组成，
     * 每个对象由label,prop,align(对齐方式,默认居中),
     * width(表格宽度,默认平均分配),
     * sortable(是否排序),
     * displace(文本替换) {id1:"要替换的值1",id2:"要替换的值2",...}
     * format(时间格式化) "YYYY-MM-DD HH:mm:ss"
     * subStr(字符串长度截取，超过规定长度用英文...表示) true(自动截取) [number](超长截取固定字段)
     * popover(内容悬浮显示窗体) true(显示自身内容) [string](对应其他同行数据的其他内容)
     * customFn(自定义返回处理函数)
     *
     * 父组件传入showSelection(默认不显示),布尔类型,是否显示CheckBox
     * 父组件传入showIndex(默认显示),布尔类型,是否显示索引
     * 父组件传入showRadio(默认显示),布尔类型,是否高亮显示
     * 父组件传入border(默认显示),布尔类型,是否显示边框
     *
     * 子组件传出select事件(选择CheckBox),附带selection和row信息,以对象传出去
     * 子组件传出selectAll事件(全选事件),附带selection信息,以对象传出去
     * 子组件传出rowClick事件(行单击事件),附带row, event, column信息,以对象传出去
     * 子组件传出rowDblclick事件(行双击事件),附带row, event信息,以对象传出去
     *
     * 增加前端分页;传入frontPage为真值,setdata时的值为后台返回的数据
     *
     * */
    import vPage from "./page";
    import {
        varType
    } from "../../util/util.js";

    export default {
        props: {
            // propData: {
            //   type: Array,
            //   default: []
            // },
            frontPage: {
                default: false
            },
            colums: {
                type: Array,
                default() {
                }
            },
            searchData: {
                type: Object,
                default() {
                    return {
                        currentPage: 1,
                        pageSize: 5
                    };
                }
            },
            isClass: {
                default: false
            },
            //是否多选,默认不显示
            showSelection: {
                //                type: [Boolean,String,N],
                default: false
            },
            //是否显示操作行
            type: {
                type: String,
                default: "normal"
            },
            //是否显示索引,默认不显示
            showIndex: {
                //                type: Boolean,
                default: true
            },
            //是否高亮显示单行,默认显示
            showRadio: {
                //                type: Boolean,
                default: true
            },
            //是否显示边框 默认显示
            border: {
                type: Boolean,
                default: true
            },
            maxHeight: {
                default: 550
            },
            that: {
                default: null
            }
        },
        components: {
            vPage
        },
        data() {
            return {
                tableData: [],
                page: {
                    pageSizes: 0,
                    pageRange: 10,
                    thisPage: 1,
                    totalPage: 0
                },
                isPage: true,
                checkList: []
            };
        },
        methods: {
            //选择checkbox事件
            select(selection, row) {
                let val = {
                    selection,
                    row
                };
                this.$emit("select", val);
            },
            setData(data) {
                if (!this.frontPage) {
                    //后端分页
                    this.tableData = data.rows;
                    let pagination = data.pagination;
                    if (pagination.thisPage) {
                        this.page = {
                            pageSizes: pagination.dataSize,
                            pageRange: pagination.pageRange,
                            thisPage: pagination.thisPage,
                            totalPage: Math.ceil(pagination.dataSize / pagination.pageRange)
                        };
                    } else {
                        this.isPage = false;
                    }
                } else {
                    //前端分页
                    data = data ? data : [];
                    this.tableData = data;
                    this.page = {
                        pageSizes: data.length,
                        pageRange: this.page.pageRange,
                        thisPage: this.page.thisPage,
                        totalPage: Math.ceil(this.tableData.length / this.page.pageRange)
                    };
                }
            },
            currentChange(val) {
                if (!this.frontPage) {
                    //后台分页
                    this.searchData.currentPage = val;
                    this.$emit("callBack", this.searchData);
                } else {
                    //前台分页
                    this.page.thisPage = val;
                }
            },
            pageSizeChange(size) {
                if (!this.frontPage) {
                    //后台分页
                    this.searchData.pageSize = size;
                    this.$emit("callBack", this.searchData);
                } else {
                    //前台分页
                    this.page.pageRange = size;
                    this.page.totalPage = Math.ceil(this.tableData.length / size);
                }
            },
            //全选事件
            selectAll(selection) {
                let val = {
                    selection
                };
                this.$emit("selectAll", val);
            },
            //行单击事件
            rowClick(row, event, column) {
                if (
                    event.target.outerHTML.indexOf("span") == -1 ||
                    event.target.outerHTML.indexOf("el-checkbox") != -1
                ) {
                    this.$refs.baseTable.toggleRowSelection(row);
                }
                let val = {
                    row,
                    event,
                    column
                };
                this.$emit("rowClick", val);
            },
            //行双击事件
            rowDblclick(row, event) {
                let val = {
                    row: row,
                    event: event
                };
                this.$emit("rowDblclick", val);
            },
            cellClick(row, column, cell, event){
                let val = {
                    row,
                    column,
                    cell,
                    event
                };
                this.$emit("cellClick", val);
            },

            edit(val) {
                this.$emit("editTable", val);
            },
            deleteTable(val) {
                this.$emit("deleteTable", val);
            },
            format(value, format) {
                return this.$moment(value).format(format);
            },
            aaa(item, scope) {
            },
            customDisplay(item, scope) {
                var temp = "";
                if (item.displace) {
                    temp = item.displace[scope.row[item.prop]];
                } else {
                    temp = scope.row[item.prop];
                }

                //需要格式化的时间格式必须为时间戳（数字）或时间字符串格式
                if (
                    item.format &&
                    (typeof temp === "string" || typeof temp === "number")
                ) {
                    try {
                        temp = this.format(temp, item.format);
                    } catch (e) {
                        //console.warn(e);
                    }
                }

                //字符串截取长度
                if (
                    item.subStr &&
                    typeof item.subStr === "number" &&
                    temp.length > item.subStr
                ) {
                    temp = temp.substring(0, item.subStr) + "...";
                } else if (typeof item.subStr === "boolean") {
                }

                if (varType(item.customFn) === "function") {
                    temp = item.customFn(temp, scope.row);
                }
                return temp;
            },
            //选择项发生改变
            selectionChange(selection) {
                this.checkList = selection;
                this.$emit("selection-change", selection);
            },

            //获取选中的行
            getCheckedRows() {
                return this.checkList;
            },
            //单元格双击
            cellDblclick(row, column, cell, event){
                let obj= {row, column, cell, event};
                this.$emit("cell-dblclick", obj);
            }
        },
        computed: {
            data() {
                if (!this.frontPage) {
                    //后台分页
                    return this.tableData;
                } else {
                    //前台分页
                    let start = (this.page.thisPage - 1) * this.page.pageRange,
                        end =
                            (this.page.thisPage - 1) * this.page.pageRange +
                            this.page.pageRange;
                    return this.tableData.slice(start, end);
                }
            }
        },
        // watch: {
        //   propData: {
        //     handler(val) {
        //       this.setData(val);
        //     },
        //     deep: true
        //   }
        // }
    };

</script>

<style scoped>
    .cation {
        position: fixed;
        bottom: 25px;
        right: 0;
        width: 100%;
        padding-left: 206px;
    }

    .table_popover .name-wrapper {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: bottom;
        display: inline-block;
    }

    .table_popover .name-wrapper .el-tag {
        vertical-align: bottom;
    }

</style>

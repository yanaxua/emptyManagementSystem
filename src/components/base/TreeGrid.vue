<template>
    <el-table
            :data="data"
            border
            style="width: 100%"
            :row-style="showTr" :default-sort="defaultSort" :row-class-name="rowClassName"
            @select="selectCheck" @select-all="selectCheck" class="base-treeGrid" :height="treeGridHeight"
            :max-height="treeMaxHeight"
            @row-click="rowClick" ref="baseTreeGrid"
            @selection-change="selectionChange"
    >
        <el-table-column type="selection" v-if="showSelection" align="center"></el-table-column>
        <el-table-column type="index" width="70px" label="序号" align="center"></el-table-column>
        <el-table-column v-for="(column, index) in columns" :key="column.prop"
                         :label="column.label" :min-width="column.width" :align="index == 0? 'left':column.align"
                         header-align="center">
            <template scope="scope">
                <div v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level"
                      class="ms-tree-space"></div>
                <i :class="scope.row._expanded?'el-icon-caret-bottom':'el-icon-caret-right'"
                   v-if="toggleIconShow(index,scope.row,scope)" @click="toggle(scope.$index,scope.row)"></i>
                <div v-else-if="index===0" class="ms-tree-space"></div>
                {{customDisplay(column, scope)}}
            </template>
        </el-table-column>
        <slot name="operation">
            <el-table-column label="操作" v-if="treeType === 'normal'" width="160px" align="left" header-align="center">
                <template scope="scope">
                    <el-button type="warning" @click="editModule(scope.row,scope)" size="small">
                        编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="deleteModule(scope.row)"
                            v-show="!scope.row.state">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </slot>

    </el-table>
</template>
<script>
    import Utils from '@/util/dataTranslate'

    export default {
        name: 'tree-grid',
        props: {
            rowClassName:{
                type:[Function,String],
                default:''
            },
            //传过来设置最大高度
            treeMaxHeight: {

            },
            //排序字段
            sort: {
                default: 'displayOrder'
            },
            //是否需要懒加载
            load: {
                default: false
            },
            //当展示区只是一个树形表格时这么设置
            setTreeHeight: {
                default: false
            },
            //是否显示CheckBox
            showSelection: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
            treeStructure: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
// 这是相应的字段展示
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
// 这是数据源
            dataSource: {
                type: Array,
                default: function () {
                    return []
                }
            },

// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
            requestUrl: {
                type: String,
                default: function () {
                    return ''
                }
            },

// 这个是是否展示操作列
            treeType: {
                type: String,
                default: function () {
                    return 'normal'
                }
            },
// 是否默认展开所有树
            defaultExpandAll: {
                type: Boolean,
                default: function () {
                    return true
                }
            }
        },
        data() {
            return {
                treeGridHeight: '',//树形表格的高度
                dataTmp: [],
                defaultSort: {
                    prop: this.sort,
                }
            }
        },
        computed: {
            // 格式化数据源
            data: function () {
                let me = this;
                if (me.load) {//懒加载默认显示一二级
                    return this.dataTmp
                } else if (me.treeStructure) {//格式化数据
                    let data = Utils.MSDataTransfer.DataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
                    return data
                }
                return me.dataSource//不用格式化数据
            }
        },
        methods: {
            //懒加载树
            loadTree(arr, key, value) {
                arr.forEach((item, index) => {
                    if (item[key] === value) {
                        if (item.children && item.children.length > 0) {
                            for (let i = 0; i < item.children.length; i++) {
                                let val = item.children[i];
                                arr.splice(index + 1 + i, 0, val)
                            }
                        }
                    }
                })
            },
            // 显示行
            showTr: function (row, index) {
                let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
                row._show = show
                return show ? '' : 'display:none;'
            },
            // 展开下级
            toggle: function (trIndex, row) {
                let me = this, record = me.data[trIndex];
                record._expanded = !record._expanded
                if (row.index === undefined && me.load) {
                    me.loadTree(me.dataTmp, "id", row.id)
                    row.index = 1;
                }
            },
            // 显示层级关系的空格和图标
            spaceIconShow(index) {
                let me = this
                if (me.treeStructure && index === 0) {
                    return true
                }
                return false
            },
            // 点击展开和关闭的时候，图标的切换
            toggleIconShow(index, record) {
                let me = this;
                if ((me.treeStructure && index === 0 && record.children && record.children.length > 0)) {
                    return true
                }
                return false
            },
            rowClick(row,event) {
                if (!(event.target.outerHTML.indexOf("<span") == 0 || event.target.outerHTML.indexOf("<i") == 0||event.target.outerHTML.indexOf("<button")==0)) {
                    this.$refs.baseTreeGrid.toggleRowSelection(row);
                }
            },
            selectionChange(selection) {
                this.$emit('selectionChange', selection)
            },
            //点击删除
            deleteModule(val) {
                this.$emit('deleteModule', val)
            },
            //打开编辑
            editModule(val, va1) {
                let newV = {};
                for (var key in val) {
                    if (!(typeof val[key] == 'object' || typeof val[key] == 'function')) {
                        newV[key] = val[key]
                    }
                }
                this.$emit('editModule', newV)
            },
            //选择表格的复选框
            selectCheck(selection) {
            },
            //设置树形表格的最大高度
            setHeight() {
                if (this.setTreeHeight) {
                    let me = this, timer = null;
                    me.treeGridHeight = document.body.clientHeight - 200;
                    window.onresize = function () {
                        if (timer) {
                            clearTimeout(timer)
                        }
                        ;
                        timer = setTimeout(() => {
                            me.treeGridHeight = document.body.clientHeight - 200;
                        }, 200)
                    }
                }
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
                return temp;
            },
        },
        mounted() {
            this.setHeight();
        },
        watch: {
            dataSource(n, o) {
                if (n !== o && this.load) {
                    let me = this, dataSource;
                    me.dataTmp = [];
                    dataSource = me.dataSource ? me.dataSource : [];
                    if (me.treeStructure) {
                        let data = Utils.MSDataTransfer.DataTransfer.treeToArray(dataSource, null, null, me.defaultExpandAll);
                        data.forEach(item => {
                            if (item._level <= 1) {
                                item.index = item._level == 0 ? 1 : undefined;
                                me.dataTmp.push(item)
                            }
                        });
                    }
                }


            }
        }

    }
</script>
<style scoped>
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
    }
.base-treeGrid .el-icon-caret-right{
    width: 18px;
}
    .ms-tree-space::before {
        content: ""
    }

    .base-treeGrid table td {
        line-height: 26px;
    }

</style>

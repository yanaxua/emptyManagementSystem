<template>
    <div class="base-selectTree" :style="style" clearable>
            <i id="baseSelectTreeIcon" :class="classList" @click="clickI($event)"  @mouseenter="showClose=true"
               @mouseleave="showClose=false"></i>
            <!--['base-selectTree__icon','el-icon-caret-top',{'is-reverse':showTree}]-->
            <input readonly="readonly"
                   :disabled="disabled"
                   class="el-input__inner"
                   placeholder="请选择..."
                   v-model="text"
                   @click="clickInput($event)"
                   @mouseenter="showClose=true"
                   @mouseleave="showClose=false"
            >
        <!--@mouseout="showClose=false"-->

        <!--不需要懒加载-->
        <el-tree v-if="!load" :node-key="nodeKey" :current-node-key="currentNodeKey" class="base-selectTree-tree"
                 :indent="10" v-show="showTree" :data="data" :props="props" highlight-current
                 :default-expand-all="defaultExpandAll" @node-click="handleNodeClick" :expand-on-click-node="false"
                 ref="baseDivSelectTree">
        </el-tree>
        <!--懒加载-->
        <el-tree v-else :node-key="nodeKey" :current-node-key="currentNodeKey" class="base-selectTree-tree"
                 highlight-current :indent="10" v-show="showTree" :data="data" :props="props" lazy
                 @node-click="handleNodeClick" :load="loadNode" :expand-on-click-node="false" ref="baseDivSelectTree">
        </el-tree>
    </div>
</template>
<script>
    import {getListByTree} from '@/util/util.js'

    export default {
        props: {
            //下拉树唯一标示符
            nodeKey: {
                type: String,
                default: 'id'
            },
            //查找父节点，转换节点
            parentKey: {
                type: String,
                default: 'parentId'
            },
            //多选
            multiple: {
                default: false
            },
            //默认展开
            defaultExpandAll: {
                type: Boolean,
                default: true
            },
            //懒加载
            load: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            textP: {
                default: ""
            },
            width: {
                default: "100%"
            },
            //树的数据
            data: {
                type: Array,
                default: []
            },
            props: {
                type: Object,
                default() {
                    return {
                        children: "children",
                        label: "name",
                    };
                }
            },
            realVal: String,//显示框显示的值，适应组织机构管理
        },
        data() {
            return {
                text: this.textP,
                showTree: false,
                style: {
                    width: this.width
                    //                    margin: "0 auto",
                },
                currentNodeKey: '',//当前被选中的值
                realText: '',//下拉树内部保存text的值
                index: 0,
                showClose: false
            };
        },
        computed: {
            multipleData() {
                let textArr = this.text ? this.text.split(";") : [],
                    me = this,
                    multipleData = [];
                textArr.forEach(item => {
                    me.findNode(me.data, item, multipleData);
                });
                return multipleData;
            },
            //显示图标
            classList() {
                if (this.showClose && !(this.text === null || typeof this.text === 'undefined' || this.text === '')) {
                    return ['base-selectTree__icon', 'el-icon-circle-close']
                } else {
                    return ['base-selectTree__icon', 'el-icon-caret-top', {'is-reverse': this.showTree}]
                }
            }
        },
        methods: {
            clickI(e){
                if (e.currentTarget.classList.contains('el-icon-circle-close')) {
                    this.text = ''
                }else{
                    this.showTree = !this.showTree;
                }
            },
            clickInput(e) {
                this.showTree = !this.showTree;
                if (this.showTree) {
                    setTimeout(() => {
                        this.setScrollTop()
                    }, 100)
                }
                ;
                if (!this.index) {
                    let width = this.$el.clientWidth
                    this.$el.querySelector('.base-selectTree-tree').style.width = width + 'px';
                }
                this.index++;

            },
            handleNodeClick(data) {
                if (this.multiple) {
                    //多选且以前没有选中
                    //                    if (!this.text || (this.text && this.text.indexOf(data[this.props.label]) == -1)) {
                    if (typeof this.text == 'undefined') {
                        this.text = "";
                    }
                    if (this.text.indexOf(data[this.props.label]) == -1) {
                        this.text = this.text
                            ? this.text + ";" + data[this.props.label]
                            : this.text + data[this.props.label];
                    } else {
                        let index = this.text.indexOf(data[this.props.label]),
                            length = data[this.props.label].length;
                        if (index === 0) {
                            this.text =
                                this.text.slice(0, index) + this.text.slice(index + length + 1);
                        } else {
                            this.text =
                                this.text.slice(0, index - 1) + this.text.slice(index + length);
                        }
                    }
                    this.$emit("change", this.multipleData);
                    //                    }
                } else {
                    //单选
                    this.text = this.realVal ? data[this.realVal] : data[this.props.label];//传了realval，则输入框显示另外一个值，不传默认显示props对应的值
                    this.showTree = false;
                    this.$emit("change", data);
                }
            },
            loadNode(node, resolve) {
                //加载节点
                let tier = []; // 数组的排序代表当前节点的位置(逆序)
                if (node.level == 0) {
                    resolve(this.data); //渲染起始数组
                    return;
                }
                var findParent = function (obj) {
                    if (!obj.parent) {
                        //当无父节点时跳出
                        return obj;
                    }
                    for (var i = 0; i < obj.parent.childNodes.length; i++) {
                        var item = obj.parent.childNodes[i];
                        if (item.label == obj.label) {
                            tier.push(i);
                            break;
                        }
                    }
                    return findParent(obj.parent);
                };
                findParent(node); //获得节点层级
                var tempObj = this.data; //获取渲染节点所在children
                for (var i = tier.length; i > 0; i--) {
                    tempObj = tempObj[tier[i - 1]].children
                        ? tempObj[tier[i - 1]].children
                        : [];
                }
                resolve(tempObj); // 需要转圈效果加上计时器延迟

                //                resolve(this.readchildNode(tempObj))// 需要转圈效果加上计时器延迟
            },
            readchildNode(arr, callback) {
                //读取子节点数组
                let me = this;
                var tempData = [];
                if (arr) {
                    arr.forEach(function (item) {
                        let obj = {};
                        obj[me.props["label"]] = item[me.props["label"]];
                        obj.id = item.id;
                        tempData.push(obj);
                    });
                }
                return tempData;
            },
            setText(val, realVale) {//传递两个值，适应组织机构区域树的情况

                this.text = val;
                if (realVale) {
                    this.currentNodeKey = this.getCurrentNodeKey(realVale);
                } else {
                    this.currentNodeKey = this.getCurrentNodeKey(val);
                }
            },
            closeTree() {
                this.showTree = false;
            },
            findNode(arr = [], value, multipleData = []) {
                let me = this;
                arr.forEach(val => {
                    if (val[me.props.label] == value) {
                        multipleData.push(val);
                    }
                    if (val.children && val.children.length > 0) {
                        me.findNode(val.children, value, multipleData);
                    }
                });
            },
            //获取当前高亮的值
            getCurrentNodeKey(val, nodeKey) {
                let list = getListByTree(this.data, this.nodeKey, 'children', this.parentKey);
                //获取高亮值
                if (nodeKey) {
                    for (let i = 0, len = list.length; i < len; i++) {
                        if (list[i][this.props.label] == val) {
                            return list[i][this.nodeKey]
                        }
                    }
                } else if (nodeKey) {

                }

            },
            setScrollTop() {
                let selectTree = this.$el.querySelector('.base-selectTree-tree'),
                    curentKey = this.$el.querySelector('.is-current');
                selectTree.scrollTop = curentKey ? curentKey.offsetTop - 50 : 0;
            }

        },
        watch: {
            textP(val) {
                this.text = val;
            },
            text() {
                if (this.text === "") {
                    this.$emit("textNull");
                }
            },
            showTree(val) {

            }

        },
        mounted() {
            let me = this;
            document.addEventListener("click", function (e) {
                let flag = false;
                for (var i = 0; i < me.$el.childNodes.length; i++) {
                    var item = me.$el.childNodes[i];
                    if (item == e.target) {
                        flag = true;
                        return;
                    }
                }
                me.showTree = flag;
            });

        }
    };
</script>

<style>
    .base-selectTree {
        position: relative;
    }

    .base-selectTree .el-tree-node__expand-icon {
        /*border: 8px solid transparent;*/
        /*border-left-width: 9px;*/
        /*border-left-color: #97a8be;*/
    }

    .base-selectTree .el-tree-node__expand-icon.is-leaf {
        border-color: transparent;
    }

    .base-selectTree > input {
        width: 100%;
    }

    .base-selectTree > input[disabled] {
        background-color: #eef1f6;
        border-color: #d1dbe5;
        color: #bbb;
        cursor: not-allowed;
    }

    .base-selectTree-tree {
        min-height: 100px;
        max-height: 200px;
        overflow: auto;
        /*position: absolute;*/
        /*width: 100%;*/
        z-index: 3;
        position: fixed;
    }

    .base-selectTree__icon {
        color: #bfcbd9;
        font-size: 12px;
        transition: transform 0.3s;
        transform: translateY(-50%) rotate(180deg);
        line-height: 16px;
        top: 42%;
        cursor: pointer;
        position: absolute;
        right: 11px;
    }

    .base-selectTree__icon.is-reverse {
        transform: translateY(-50%);
        /*top: 50%;*/
    }
</style>

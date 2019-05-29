<template>
    <div class="base-tree" :style="{height:height+'px'}">
        <!--懒加载-->
        <el-tree :data="data" :props="props" :show-checkbox="showCheckbox" :default-expand-all="defaultExpand"
                 v-if="load" ref="loadTree" :node-key="defaultKeys.nodeKey" :check-strictly="checkStrictly"
                 :default-expanded-keys="defaultKeys.expandedKeys"
                 :default-checked-keys="defaultKeys.checkedKeys"
                 @node-click="handleNodeClick" @check-change="checkChange" @current-change="currentChange"
                 highlight-current :load="loadNode" :render-content="renderContent"
                 @node-expand="nodeExpand"
        >
        </el-tree>
        <!--非懒加载-->
        <el-tree :data="data" :props="props" :show-checkbox="showCheckbox" :default-expand-all="defaultExpand" v-else
                 ref="noLoadTree" :check-strictly="checkStrictly"
                 @node-click="handleNodeClick" @check-change="checkChange" @current-change="currentChange"
                 :node-key="defaultKeys.nodeKey" :default-expanded-keys="defaultKeys.expandedKeys"
                 :default-checked-keys="defaultKeys.checkedKeys"
                 highlight-current :render-content="renderContent"
                 @node-expand="nodeExpand"
        >
        </el-tree>
    </div>
</template>

<script>
    /*
    * rend：
     * rend(h, {node, data, store}) {//传来的自定义渲染函数
     *
     *          let renderChild = function () {
     *               if(data.children){
     *                   return  <el-tag>{data.children.length}</el-tag>
     *               }
     *               return
     *           }
     *           fn qiye(data)
     *           if(data.){
     *
     *           return <span style="float:right;margin-right:20px">
     *                           {renderChild()}
     *                       </span>
     *                       qiye
     *                       return ''
     *           )
     *           return (
     *                   <span>
     *                       <span>{node.label}</span>
     *                       {qiye(node)}
     *                   </span>);
     *       },
    * */
    export default {
        props: {
            //自定义节点内容,传过来一个函数，函数内部可以使用jsx语法返回一段dom节点
//            class:{
//
//            },
            rend: {
                type: Function
            },
            //懒加载
            load: {
                default: false
            },
            //设置树高度
            setTreeHeight: {
                type: Boolean,
                default: false
            },
            //整个窗口减去的高度
            minusH: {
                default: 200
            },
            //复选框默认不显示
            showCheckbox: {
                type: Boolean,
                default: false
            },
            //对应的key value
            props: {
                type: Object,
                default() {
                    return {
                        children: 'children',
                        label: 'name'
                    }
                }
            },
            //默认展开
            defaultExpand: {
                type: Boolean,
                default: false
            },
            //哪些选项默认展开或默认选中
            defaultKeys: {
                default: () => {
                    let obj = {nodeKey: 'id'};
                    obj.expandedKeys = [];
                    obj.checkedKeys = [];
                    return obj
                }

            },
//            //父子不关联做法
            checkStrictly:{
                type:Boolean,
                defalut:false
            }
        },
        data() {
            return {
                data: [],
                height: ''
            };
        },
        methods: {
            setData(val) {
                this.data = val ? val : [];
            },
            //点击节点事件
            handleNodeClick(obj, node, component) {
                //obj,node,component:该节点所对应的对象、节点对应的 Node、节点组件本身
                let msg = {obj, node, component}
                this.$emit('nodeClick', msg);
            },
            //节点选中状态发生变化时的回调
            checkChange(obj, nodeCheckd, childCheck) {
                //obj,nodeCheckd,childCheck  传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有没被选中的节点
                let msg = {obj, nodeCheckd, childCheck};
                this.$emit('checkChange', msg);
            },
            //当前选中节点变化时触发的事件,与点击节点事件类似
            currentChange(obj, node) {
                let msg = {obj, node};
                this.$emit('currentChange', msg);
            },
            //节点被展开时触发的事件
            nodeExpand(obj, node, component) {
                //obj,node,component:该节点所对应的对象、节点对应的 Node、节点组件本身
                let msg = {obj, node, component};
                this.$emit('nodeExpand', msg);
            },
            //自定义高度
            setHeight() {
                let me = this, timer = null;
                if (this.setTreeHeight) {
                    me.height = document.body.clientHeight - me.minusH;
                    window.onresize = function () {
                        if (timer) {
                            clearTimeout(timer)
                        }
                        ;
                        timer = setTimeout(() => {
                            me.height = document.body.clientHeight - me.minusH;
                            me.$emit('treeHeight', me.height)
                        }, 200)
                    }
                }
            },
            loadNode(node, resolve) { //加载节点
                let tier = []; // 数组的排序代表当前节点的位置(逆序)
                if (node.level == 0) {
                    resolve(this.data); //渲染起始数组
                    return
                }
                ;
                var findParent = function (obj) {
                    if (!obj.parent) {//当无父节点时跳出
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
                findParent(node);//获得节点层级
                var tempObj = this.data;//获取渲染节点所在children
                for (var i = tier.length; i > 0; i--) {
                    tempObj = tempObj[tier[i - 1]].children;
                }
                resolve(tempObj)// 需要转圈效果加上计时器延迟

//                resolve(this.readchildNode(tempObj))// 需要转圈效果加上计时器延迟
            },
            /*
            removeCurrent(arr = []) {
                arr = Array.from(arr)
                if (arr.indexOf('current') !== -1) {
                    arr.splice(arr.indexOf('current'), 1)
                }
                return arr.join(' ')
            }
            */
            renderContent(h, {node, data, store}) {
                if (this.rend) {
                    return this.rend(h, {node, data, store});
                }
                return (
                        <span>
                        <span>{node.label}</span>
                    </span>);
            }

        },
        mounted: function () {
            let me = this, timer;
            //默认选中第一个
            me.$nextTick(function () {
                timer = setTimeout(() => {
                    let treeNodes = me.$el.querySelectorAll('.el-tree-node'), firstNode, className, index = 0;
                    if (treeNodes.length > 0) {
                        firstNode = treeNodes[0];
                        className = firstNode.className
                        firstNode.className = className + ' ' + 'is-current';
                        for (var i = 0; i < treeNodes.length; i++) {
//                            treeNodes[i].className = me.removeCurrent(treeNodes[i].classList)
                            //点击取消选中
                            treeNodes[i].onclick = function (e) {
//                                this.className = this.className + ' current'
                                if (!index) {
                                    firstNode.className = className;
                                }
                                index++;
                                if (timer) clearTimeout(timer);
                            }
                        }

                    }
                }, 500)
            });
            this.setHeight();
        }


    };
</script>

<style scoped>
    .base-tree {
        overflow: auto;
        border: 1px solid #d1dbe5;
    }

    .base-tree .el-tree {
        border: none;
    }

    /*.base-tree .el-tree .el-tree-node.current > .el-tree-node__content {*/
    /*background-color: #c1e5fd;*/
    /*}*/

</style>

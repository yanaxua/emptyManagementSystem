<template>
    <el-transfer :class="'transfer_' + size" :data="chooseData" v-model="accreditedList" :filterable="filterable"
                 :render-content="renderContent"
                 :left-default-checked="leftDefaultChecked" :right-default-checked="rightDefaultChecked"
                 :titles="titles" :props="{
          key: myKey,
          label: myLabel,
          disabled: myDisabled
        }" :button-texts="buttonTexts" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
        }" @change="handleChange"
                 :footer-format="{ noChecked: '共 ${total} 项', hasChecked: '全选，已选 ${checked}项，共${total}项' }">
        <!--<el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>-->
        <!--<el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>-->
    </el-transfer>
</template>

<script>
    import {varType} from "../../util/util.js";

    export default {
        name: "myTransfer",
        components: {},
        props: {
            rend: {
                type: Function,
            },
            size: {
                // 控制主内容高度大小，只能设置xs,sm,md,lg
                type: String,
                default: "sm"
            },
            chooseList: {
                /*总数据*/
                type: Array,
                default: () => []
            },
            accredited: {
                /*默认授权出现在右边的选项,为索引数组,从1开始*/
                type: Array,
                default: () => []
            },
            filterable: {
                /*是否可搜索*/
                type: Boolean,
                default: true
            },
            leftDefaultChecked: {
                /*左右默认被勾选的选项,为索引数组,从1开始,支持选中数据的数组传入*/
                type: Array,
                default: () => []
            },
            rightDefaultChecked: {
                /*左右默认被勾选的选项,为索引数组,从1开始*/
                type: Array,
                default: () => []
            },
            titles: {
                /*数组,左右两边的标题,两个*/
                type: Array,
                default: () => ["未授权角色:", "已授权角色:"]
            },
            buttonTexts: {
                /*数组,中间按钮的文字,四个*/
                type: Array,
                default: () => ["删除", "授权", "保存", "返回"]
            },
            myKey: {
                /*自定义排序id*/
                type: String,
                default: "id"
            },
            myLabel: {
                /*自定义排序name*/
                type: String,
                default: "name"
            },
            myDisabled: {
                /*自定义禁用字段*/
                type: String,
                default: "disabled"
            },
            saveClick: {
                type: Function
            },
            backClick: {
                type: Function
            },
            filterList: {
                type: Object,
                default() {
                    return {};
                }
            },
            filterType: {
                type: String,
                default: "0"
            },
            emptyText: {
                default: '暂无数据'
            },
            footerFormat: {
                type: Object,
//                default: () => {
//                    noChecked: '${total}',
//                        hasChecked:'${checked}/${total}'
//                }
            }
        },
        data() {
            return {
                chooseData: [],
                accreditedList: [],
            };
        },
        computed: {},
        created() {
            this.chooseData = this.chooseList;
            this.accreditedList = this.accredited;
        },
        mounted() {
            /*添加保存和返回*/
            let btns = this.$el.getElementsByClassName("el-transfer__buttons")[0];
            let btnChild = btns.children[1].children[0];
            btnChild.insertBefore(
                btnChild.children[1],
                btnChild.children[0]
            );
            /*将i标签的位置调换*/
            /**遍历生成按钮 */
            for (let i = 2; i < this.buttonTexts.length; i++) {
                var item = this.buttonTexts[i];
                let tempBtn = document.createElement("button");
                tempBtn.innerHTML = `<span><i></i><span>${item}</span></span>`;
                tempBtn.classList.add(
                    "el-button",
                    "el-button--primary",
                    "el-button--small"
                );
                if (i == 2 && this.saveClick) {
                    tempBtn.addEventListener("click", () => {
                        this.saveClick();
                    });
                }
                if (i == 3 && this.backClick) {
                    tempBtn.addEventListener("click", () => {
                        this.backClick();
                    });
                }
                btns.appendChild(tempBtn);
            }
        },
        methods: {
            handleChange(value, direction, movedKeys) {
                let tempObj = [];
                movedKeys.forEach((item, index) => {
                    tempObj.push(this.chooseData[item - 1]);
                });
                this.$emit("transfer" /*当发生改变,父组件监听transfer事件,接受到一个对象,有下列四个属性*/, {
                    changed: tempObj /*改变的数据*/,
                    value /*依然被授权的索引*/,
                    direction /*方向,left和right*/,
                    movedKeys /*此次移动的索引*/
                });

            },
            renderContent(h, option) {
                if (this.rend) {
                    return this.rend(h, option);
                }
                return ( < span > {option[this.myLabel]} < / span >
            )
                ;

            }
        },
        watch: {
            chooseList(val) {
                this.chooseData = val;
                if (this.chooseData.length == 0) {
                    let nodes = this.$el.querySelectorAll('.el-transfer-panel__empty');
                    nodes[1].innerHTML = this.emptyText;
                    if (this.accreditedList.length == 0) {
                        nodes[3].innerHTML = this.emptyText;
                    }
//                    for(var i=0,len=nodes.length;i<len;i++){
//                        if(i%2 != 0){
//                            nodes[i].innerHTML = this.emptyText
//                        }
//                  }
                } else {
                    let nodes = this.$el.querySelectorAll('.el-transfer-panel__empty');
                    nodes[1].innerHTML = '暂无数据';
                }
            },
            accredited(val) {
                //传递值的类型判断
                if (
                    val.every(function (item) {
                        return typeof item === "string" || typeof item === "number";
                    })
                ) {
                    this.accreditedList = val;
                } else {
                    let key = this.myKey;
                    this.accreditedList = val.map(function (item) {
                        return item[key];
                    });
                }

                if (val.length == 0 && this.chooseList != 0) {
                    this.$el.querySelectorAll('.el-transfer-panel__empty')[3].innerHTML = '暂无数据';
                }
            },
            filterList: {
                handler(obj) {
                    var ids = [],
                        that = this;

                    //对所有数据进行过滤
                    that.chooseData = that.chooseList.filter(function (item) {
                        let condition = false,
                            isElement = -1;
                        for (var attr in obj) {
                            if (
                                obj[attr] === "" ||
                                varType(item[attr]) === "null" ||
                                varType(item[attr]) === "undefined"
                            ) {
                                continue;
                            } else if (varType(obj[attr]) === "array") {
                                isElement = obj[attr].indexOf(item[attr]);
                            } else if (
                                varType(obj[attr]) === "string" ||
                                varType(obj[attr]) === "number"
                            ) {
                                isElement = item[attr].indexOf(obj[attr]);
                            }

                            // 带三种值类型，0为都过滤，1为过滤左侧列表，2为过滤右侧列表
                            if (that.filterType === "0") {
                                condition = isElement === -1;
                            } else if (that.filterType === "1") {
                                condition =
                                    that.accreditedList.indexOf(item[that.myKey]) === -1 &&
                                    isElement === -1;
                            } else if (that.filterType === "2") {
                                condition =
                                    that.accreditedList.indexOf(item[that.myKey]) > -1 &&
                                    isElement === -1;
                            }
                            if (condition) {
                                return false;
                            }
                        }
                        return true;
                    });
                    //console.log(that.chooseData,' that.chooseData');
                }
                // deep: true
            },
        }
    };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only  -->
<style>
    .bg-purple-light {
        background: #eeeeee;
    }

    .el-transfer-panel {
        width: 300px;
        height: 100%;
        border: none;
        box-shadow: none;
        box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }

    .transfer_xs .el-transfer-panel__body {
        height: 200px;
    }

    .transfer_sm .el-transfer-panel__body {
        height: 350px;
    }

    .transfer_md .el-transfer-panel__body {
        height: 550px;
    }

    .transfer_lg .el-transfer-panel__body {
        height: 800px;
    }

    .el-transfer-panel__body {
        background-color: #fff;
        border-top: 1px solid #ddd;
    }

    .el-checkbox-group.el-transfer-panel__list.is-filterable {
        height: calc(100% - 32px);
    }

    .el-transfer-panel .el-transfer-panel__header {
        font-weight: 700;
        border: none;
        padding-left: 10px;
    }

    .el-transfer__buttons {
        margin: 0 10px;

    }

    .el-transfer .el-transfer__buttons .el-button {
        margin: 0 auto;
        margin-bottom: 15px;
        width: 60px;
        height: 30px;
        font-size: 14px;
        border: 1px solid #418CBD;
    }

    .el-transfer__buttons button:nth-child(1) {
        transform: translate(0, 156%);
        background-color: white;
        color: #418CBD;
    }

    .el-transfer__buttons button:nth-child(1):hover {
        background-color: #f26d6d;
        color: white;
        border-color: #f26d6d;
    }

    .el-transfer__buttons button:nth-child(1):active {
        background-color: #e06161;
        color: white;
        border-color: #e06161;
    }

    .el-transfer__buttons button:nth-child(2) {
        /*background-color: #f7ba2a;*/
        transform: translate(0, -156%);
        background-color: white;
        color: #418CBD;
    }

    .el-transfer__buttons button:nth-child(2) span {

    }

    .el-transfer__buttons button:nth-child(2):hover {
        background-color: #f7ad6b;
        color: white;
        border-color: #f7ad6b;
    }

    .el-transfer__buttons button:nth-child(2):active {
        background-color: #f49d62;
        color: white;
        border-color: #f49d62;
    }

    .el-transfer__buttons button:nth-child(3) {
        /*background-color: #20a0ff;*/
        width: 100%;

    }

    .el-transfer__buttons button:nth-child(4) {
        background-color: #fff;
        color: #20a0ff;
        width: 100%;
    }

    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }

    .el-transfer-panel__item {
        height: 30px;
        line-height: 30px;
    }

    .el-transfer-panel__item .el-checkbox__input {
        position: absolute;
        top: 8px;
    }

    .userRightsManage_span_icon {
        margin-left: 10px;
    }

    .userRightsManage_span_title {
        margin-left: 10px;
    }

    .el-icon-arrow-right {
        float: right;
    }

</style>

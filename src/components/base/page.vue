<!--
// XXX
当同时触发页码和分页改变时，会出现调用两次相同的请求，即当选择第n页后修改每页分页数为大于总数时。
-->
<template>
    <div class="base-div-page">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page.thisPage"
                :total="page.pageSizes"
                layout="slot,prev, pager, next,jumper"
                :page-size="pageRangeN">
            <slot>
                <div class="base-table-pageLeft">
                    <input type="text" v-model.lazy="pageRange" @change="pageSizeChange"  @click="showPageSizes"
                           ref="basePageInput" class="base-input-pageSizes">
                    <ul v-show="isShowPageSizes" class="base-ul-page">
                        <li v-for="item in pageSizes" :key="item" @click="selectPage(item)">{{item}}</li>
                    </ul>
                    条/页，共{{page.totalPage}}页,共{{page.pageSizes}}条
                </div>
            </slot>
        </el-pagination>
    </div>
</template>
<script>
    export default {
        props: {
            page: {
                type: Object,
                default() {
                    return {
                        thisPage: 1, //当前页
                        totalPage: 0, //总共多少页
                        pageSizes: "", //总共多少条
                        pageRange: "" //每页多少条
                    };
                }
            },
            pageSizes: {
                type: Array,
                default() {
                    return ["自定义",100,50,10]//[10, 50, 100, '自定义']
                }
            }
        },
        data() {
            return {
                pageRange: 10,
                isShowPageSizes: false,
            };
        },
        computed: {
            pageRangeN() {
                return Number(this.pageRange);
            }
        },
        methods: {
            //currentPage改变时会触发
            handleCurrentChange(val) {
                this.$emit("currentChange", val);
            },
            //input输入paegsizes触发
            pageSizeChange() {
                this.changeValue(this.pageRange)
                this.$emit("pageSizeChange", this.pageRange);
            },
            //点击input显示下拉列表
            showPageSizes() {
                this.isShowPageSizes = !this.isShowPageSizes;
            },
            //点击下拉列表
            selectPage(val) {
                if (val === "自定义") {
                    this.$refs["basePageInput"].focus()
                } else if(this.pageRange != val) {
                    this.pageRange = val;
                    this.$emit("pageSizeChange", this.pageRange);
                }
                this.isShowPageSizes = false;
            },
            //转换input的值
            changeValue(val){
                if(isNaN(parseInt(val)) || parseInt(val)<=0) {
                    this.pageRange = 10;
                }else{
                    this.pageRange = parseInt(val);
                }
            }
        },
        watch: {
            page: function (newV, oldV) {
                this.pageRange = newV.pageRange;
            },
        },
        mounted() {
            let me = this;
            document.addEventListener("click", function (e) {
                if (e.target == me.$el.getElementsByClassName("base-input-pageSizes")[0]) {
                    return
                } else {
                    me.isShowPageSizes = false
                }
            })
        }
    };
</script>
<style scoped>
    .base-div-page {
        text-align: right;
        margin-top: 8px;
    }

    .base-table-pageLeft {
        float: left;
        position: relative;
        margin-left: -5px;
    }

    .el-pagination__jump {
        margin-right: -5px;
    }

    .base-table-pageLeft input {
        box-sizing: border-box;
        text-align: center;
        height: 26px;
        width: 50px;
        border: 1px solid #d1dbe5;
        border-radius: 2px;
    }

    .base-table-pageLeft ul {
        background: #fff;
        border: 1px solid #d1dbe5;
        position: absolute;
        left: 0;
        top: -101px;
        /*top: 25px;*/
        width: 50px;
        z-index: 999;
    }

    .base-table-pageLeft li {
        list-style: none;
        line-height: 25px;
        height: 25px;
        text-align: center;
        cursor: pointer;
    }

    .base-table-pageLeft li:hover {
        background: #e4e8f1;
    }
</style>
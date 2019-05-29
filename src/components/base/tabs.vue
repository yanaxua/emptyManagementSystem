<template>
    <el-tabs class="dialog_tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in list" :key="index" :label="item" :name="index.toString()">
            <slot :name="'tab-'+index"></slot>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: []
        },
        activeTab: {
            type: String,
            default: "0"
        }
    },
    data() {
        return {
            activeName: "0",
        }
    },
    watch: {
        activeTab(val) {
            this.activeName = val.toString();
        }
    },
    methods: {
        handleClick(tab, event) {
            this.$emit("handleClick", tab, event);
        },
        selectTab(val) {
            this.activeName = val;
        }
    }
};
</script>
<style>
.dialog_tabs {
  margin-bottom: -15px;
}
.dialog_tabs .el-tabs__header {
  margin: -8px -30px 10px;
  padding: 2px 0px 7px;
  border-bottom: 1px dotted #ddd;
}
.dialog_tabs .el-tabs__content {
  overflow: visible;
}

.dialog_tabs .el-tabs__item {
  padding: 1px 7px;
  height: auto;
  line-height: normal;
}

.dialog_tabs .el-tabs__item.is-active {
  font-weight: bold;
}
.dialog_tabs .el-tabs__item + .el-tabs__item {
  border-left: 1px solid #ddd;
}
.dialog_tabs .el-form-item__label {
  padding: 8px 12px 8px 0;
}
.dialog_tabs .el-date-editor.el-input {
  width: 100%;
}
</style>


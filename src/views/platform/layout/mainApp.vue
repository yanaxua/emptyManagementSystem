<template>
    <!-- 此处的id作为后续子路由 可视化分析-模板管理-模板新增/编辑 ,以及相关页面获取内容区高度的标识,勿更改 -->
    <div id="plat-div-content" class="plat-div-content" :class="opened?'':'open'">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        components: {
        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            },
//            isLoading() {
//                return this.$store.state.app.isLoading
//            },
            //获取侧边栏打开或者是关闭
            opened() {
                return this.$store.state.sidebar.opened
            }
        }
    }
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .plat-div-content {
        height: 100%;
        margin-left: 200px;
        transition: margin-left .2s ease-in;
        position: relative;
        /*padding: 40px 10px 5px;*/
        /* margin-top: 40px; */
        padding: 0 10px 5px;
        overflow: auto;
        min-height: 300px;
    }

    .plat-div-content.open {
        margin-left: 64px;
    }

    .plat-div-content.open .plat-div-tabViews {
        left: 64px;
    }
</style>

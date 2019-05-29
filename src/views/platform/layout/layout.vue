<template>
<main class="main">
  <div class="main-top">
    <nav-bar></nav-bar>
  </div>
  <div class="main-bottom">
    <side-bar></side-bar>
    <main-app></main-app>
  </div>
  <div class="main-footer">
    <div class="fl">
      技术支持： <a href="http://www.dyiaw.com" target="_blank">广东迪奥技术有限公司</a> 版本号： <a href="javascript:void(0);">1.0.0</a>
    </div>
    <div class="fr" id="plat_dateTime" v-html="dateTime">
      <!--{{dateTime}}-->
    </div>
  </div>
</main>
<!--</div>-->
</template>

<script>
//    import personSetting from '@/components/base/houtai/personSetting.vue';
import navBar from './navBar.vue'
import mainApp from './mainApp.vue'
import sideBar from './sideBar.vue'

export default {
  components: {
    //            personSetting,
    navBar,
    mainApp,
    sideBar
  },
  data() {
    return {
      dateTime: ''
    }
  },
  methods: {
    getDateTime() {
      var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      var today = this.$moment();
      var week = weekArray[today.format("d")];
      this.dateTime = week + '&nbsp;&nbsp;&nbsp;&nbsp' + today.format("YYYY-MM-DD  HH:mm:ss")
    }
  },
  created() {
    setInterval(this.getDateTime, 1000);
    this.$router.push({
      path: '/'
    });
    window.sessionStorage.clear();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  -->

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
}

.main-bottom {
  height: calc(100% - 90px);
  ;
}

/*主内容区*/
/*.main-left > .el-menu > .el-menu-item {*/
/*border-bottom: 1px solid rgba(100, 100, 100, 0.3);*/
/*}*/

/*.main-right {*/
/*overflow: auto;*/
/*margin-left: 64px;*/
/*transition:  margin-left .2s ease-out;*/
/*}*/
/*.main-right.close{*/
/*margin-left: 200px;*/
/*}*/

.main-footer {
  position: relative;
  z-index: 99;
  height: 20px;
  background-color: #e5eaf4;
  border-top: #cccccc solid 1px;
  color: #393939;
  font-size: 12px;
  line-height: 18px;
  padding-left: 15px;
  padding-right: 15px;
}

.main-footer a {
  color: #045598;
}

</style>

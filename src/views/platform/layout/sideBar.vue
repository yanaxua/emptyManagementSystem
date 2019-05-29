<template>
<div class="main-left" :class="isCollapse?'close':''">
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened mode="vertical">
    <el-menu-item class="plat-menu-title" index="/">
      <i class="el-icon-setting" v-show="!isCollapse"></i>
      <span v-show="!isCollapse">系统功能</span>
      <i :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'" @click="toggleCollapse"></i>
    </el-menu-item>
    <template v-for="(item,index) in platRoute">
      <!--一级菜单-->
      <el-submenu v-if="item.children && item.children.length>0" :index="index+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-submenu :index="submenu.name" v-for="submenu in item.children" v-if="submenu.children && submenu.children.length>0" :key="submenu.name">
          <template slot="title">
            <i :class="submenu.icon"></i>
            <span slot="title">{{submenu.name}}</span>
          </template>
          <!--三级菜单-->
          <router-link v-for="menu in submenu.children" :key="menu.uri" :to="{path:menu.uri}">
            <el-menu-item :index="menu.uri">
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <!--二级菜单-->
        <router-link v-for="term in item.children" :key="term.uri" v-if="!(term.children && term.children.length>0)" :to="{path:term.uri,query:{id:term.id}}">
          <el-menu-item :index="term.uri">
            <span slot="title">{{term.name}}</span>
          </el-menu-item>
        </router-link>
      </el-submenu>
      <router-link :to="{path:item.uri,query:{id:item.id}}" v-if="item.uri && !item.children">
        <el-menu-item :index="item.uri">
          <i :class="item.icon" v-if="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {
      platRoute: [{
        "name": "一级菜单1",
        "icon": "el-icon-tickets",
        "state": true,
        "uri": "/operationService"
      }, {

        "name": "一级菜单2",
        "icon": "el-icon-tickets",
        "state": true,
        "children": [{
          "name": "二级菜单",
          "icon": "el-icon-my-emailS",
          "state": true,
          "uri": "/operationService"
        }],
      }]
    };
  },
  computed: {
    isCollapse() {
      return !this.$store.state.sidebar.opened;
    }
  },
  methods: {
    toggleCollapse() {
      this.$store.commit("TOGGLE_SIDEBAR");
    }
  },
  components: {},
  created() {},
  mounted() {
    var aa = {
      "success": true,
      "msg": "操作成功！",
      "data": [{
        "displayHeight": null,
        "image": "fa-suitcase",
        "code": "BA",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BAA",
          "displayWidth": null,
          "name": "业务类型定义",
          "icon": "",
          "pid": 129,
          "id": 130,
          "state": true,
          "uri": "/businessDefinition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BAB",
          "displayWidth": null,
          "name": "服务对象定义",
          "icon": "",
          "pid": 129,
          "id": 151,
          "state": true,
          "uri": "/equipmentTypeDefinition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BAC",
          "displayWidth": null,
          "name": "服务项定义",
          "icon": "",
          "pid": 129,
          "id": 131,
          "state": true,
          "uri": "/serviceItemDefinition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BAD",
          "displayWidth": null,
          "name": "服务定义",
          "icon": "",
          "pid": 129,
          "id": 132,
          "state": true,
          "uri": "/serviceDefinition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BAE",
          "displayWidth": null,
          "name": "用户数量价格定义",
          "icon": "",
          "pid": 129,
          "id": 161,
          "state": true,
          "uri": "/userPriceDefinition"
        }],
        "name": "服务价格体系管理",
        "icon": "el-icon-my-superM",
        "pid": 32,
        "id": 129,
        "state": true,
        "uri": ""
      }, {
        "displayHeight": null,
        "image": "",
        "code": "BF",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BFB",
          "displayWidth": null,
          "name": "企业信息修改审核",
          "icon": "",
          "pid": 176,
          "id": 127,
          "state": true,
          "uri": "/enterpriseInfoChangeAudit"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BFA",
          "displayWidth": null,
          "name": "企业审核管理",
          "icon": "",
          "pid": 176,
          "id": 113,
          "state": true,
          "uri": "/enterpriseAudit"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BFC",
          "displayWidth": null,
          "name": "运维合作审核 ",
          "icon": "",
          "pid": 176,
          "id": 178,
          "state": true,
          "uri": "/operationsCooperationAudit"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BFE",
          "displayWidth": null,
          "name": "用户审核管理",
          "icon": "",
          "pid": 176,
          "id": 8,
          "state": true,
          "uri": "/auditingUser"
        }],
        "name": "审核管理",
        "icon": "/auditManagement el-icon-my-sysAuthManage",
        "pid": 32,
        "id": 176,
        "state": true,
        "uri": "/auditManagement"
      }, {
        "displayHeight": null,
        "image": "",
        "code": "BD",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BDA",
          "displayWidth": null,
          "name": "专属企业配置",
          "icon": "",
          "pid": 166,
          "id": 167,
          "state": true,
          "uri": "/eationingEnterprise"
        }],
        "name": "运维专区",
        "icon": "el-icon-my-onlineData",
        "pid": 32,
        "id": 166,
        "state": true,
        "uri": ""
      }, {
        "displayHeight": null,
        "image": "",
        "code": "BC",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BCB",
          "displayWidth": null,
          "name": "集团版配置",
          "icon": "",
          "pid": 152,
          "id": 158,
          "state": true,
          "uri": "/groupEdition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BCA",
          "displayWidth": null,
          "name": "应用配置",
          "icon": "",
          "pid": 152,
          "id": 153,
          "state": true,
          "uri": "/specialApplication"
        }],
        "name": "专项应用配置",
        "icon": "el-icon-my-onlineData",
        "pid": 32,
        "id": 152,
        "state": true,
        "uri": "/"
      }, {
        "displayHeight": null,
        "image": "el-icon-my-msgM",
        "code": "BB",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BBA",
          "displayWidth": null,
          "name": "数据采集配置",
          "icon": "el-icon-my-msgM",
          "pid": 144,
          "id": 145,
          "state": true,
          "uri": "/collectionConfiguration"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BBB",
          "displayWidth": null,
          "name": "实时数据",
          "icon": "",
          "pid": 144,
          "id": 146,
          "state": true,
          "uri": "/realTimeData"
        }],
        "name": "数据采集",
        "icon": "el-icon-my-msgM",
        "pid": 32,
        "id": 144,
        "state": true,
        "uri": "/"
      }, {
        "displayHeight": null,
        "image": "xiaoxiguanli",
        "code": "BG",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BGA",
          "displayWidth": null,
          "name": "在线用户管理",
          "icon": "ce",
          "pid": 4,
          "id": 2,
          "state": true,
          "uri": "/onlineUser"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BGC",
          "displayWidth": null,
          "name": "异常账号管理",
          "icon": "",
          "pid": 4,
          "id": 27,
          "state": true,
          "uri": "/userLockState"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BGE",
          "displayWidth": null,
          "name": "异常操作日志",
          "icon": "",
          "pid": 4,
          "id": 29,
          "state": true,
          "uri": "/illegalLog"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BGF",
          "displayWidth": null,
          "name": "敏感操作日志",
          "icon": "",
          "pid": 4,
          "id": 42,
          "state": true,
          "uri": "/sensitiveLog"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BGG",
          "displayWidth": null,
          "name": "用户登录日志",
          "icon": "",
          "pid": 4,
          "id": 17,
          "state": true,
          "uri": "/userJournal"
        }],
        "name": "系统运行管理",
        "icon": "el-icon-my-msgM",
        "pid": 32,
        "id": 4,
        "state": true,
        "uri": "/"
      }, {
        "displayHeight": 1,
        "image": "xitongguanli",
        "code": "BH",
        "displayWidth": 1,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BHD",
          "displayWidth": null,
          "name": "CDAS业务数据模板",
          "icon": "",
          "pid": 44,
          "id": 128,
          "state": true,
          "uri": "/cdasBusDataTemplates"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BHB",
          "displayWidth": null,
          "name": "企业one-net注册管理",
          "icon": "",
          "pid": 44,
          "id": 126,
          "state": true,
          "uri": "/orgOneNetManage"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BHF",
          "displayWidth": null,
          "name": "用户管理",
          "icon": "",
          "pid": 44,
          "id": 19,
          "state": true,
          "uri": "/userOperation"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BHG",
          "displayWidth": null,
          "name": "组织机构管理",
          "icon": "",
          "pid": 44,
          "id": 21,
          "state": true,
          "uri": "/orgManagement"
        }],
        "name": "系统权限管理",
        "icon": "el-icon-my-sysAuthManage",
        "pid": 32,
        "id": 44,
        "state": true,
        "uri": ""
      }, {
        "displayHeight": null,
        "image": "jichuxinxiguanli",
        "code": "BI",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BIB",
          "displayWidth": null,
          "name": "企业设备-位置关联",
          "icon": "",
          "pid": 6,
          "id": 80,
          "state": true,
          "uri": "/equipmentPosition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BIA",
          "displayWidth": null,
          "name": "个人设置",
          "icon": "",
          "pid": 6,
          "id": 34,
          "state": true,
          "uri": "/personalMessage"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BIG",
          "displayWidth": null,
          "name": "能源信息管理",
          "icon": "",
          "pid": 6,
          "id": 43,
          "state": true,
          "uri": "/energyManagement"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BIH",
          "displayWidth": null,
          "name": "行业信息管理",
          "icon": "",
          "pid": 6,
          "id": 52,
          "state": true,
          "uri": "/industryManagement"
        }, {
          "displayHeight": null,
          "image": "a",
          "code": "BII",
          "displayWidth": null,
          "name": "行政区划管理",
          "icon": "a",
          "pid": 6,
          "id": 50,
          "state": true,
          "uri": "/areaManagement"
        }],
        "name": "基础信息管理",
        "icon": "el-icon-my-basicI",
        "pid": 32,
        "id": 6,
        "state": true,
        "uri": ""
      }, {
        "displayHeight": null,
        "image": "el-icon-my-msgM",
        "code": "BK",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BKA",
          "displayWidth": null,
          "name": "设备数据故障定义",
          "icon": "",
          "pid": 138,
          "id": 114,
          "state": true,
          "uri": "/thresholdDefinition"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BKE",
          "displayWidth": null,
          "name": "通讯链路",
          "icon": "",
          "pid": 138,
          "id": 142,
          "state": true,
          "uri": "/comLink"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BKD",
          "displayWidth": null,
          "name": "故障算法库",
          "icon": "",
          "pid": 138,
          "id": 141,
          "state": true,
          "uri": "/algorithmsLibrary"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BKC",
          "displayWidth": null,
          "name": "业务故障定义",
          "icon": "",
          "pid": 138,
          "id": 140,
          "state": true,
          "uri": "/busErr"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BKB",
          "displayWidth": null,
          "name": "设备通讯故障定义",
          "icon": "",
          "pid": 138,
          "id": 139,
          "state": true,
          "uri": "/comErr"
        }],
        "name": "故障分类编码及管理",
        "icon": "el-icon-my-msgM",
        "pid": 32,
        "id": 138,
        "state": true,
        "uri": "/errManage"
      }, {
        "displayHeight": null,
        "image": "",
        "code": "BL",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BLA",
          "displayWidth": null,
          "name": "新邮件",
          "icon": "",
          "pid": 37,
          "id": 28,
          "state": true,
          "uri": "/sendMailBox"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BLB",
          "displayWidth": null,
          "name": "草稿箱",
          "icon": "",
          "pid": 37,
          "id": 38,
          "state": true,
          "uri": "/draftBox"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BLC",
          "displayWidth": null,
          "name": "已发送邮件",
          "icon": "",
          "pid": 37,
          "id": 18,
          "state": true,
          "uri": "/mailBox"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BLD",
          "displayWidth": null,
          "name": "已删除邮件",
          "icon": "",
          "pid": 37,
          "id": 15,
          "state": true,
          "uri": "/deletedMail"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BLE",
          "displayWidth": null,
          "name": "已归档邮件",
          "icon": "",
          "pid": 37,
          "id": 41,
          "state": true,
          "uri": "/archivedMail"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BLF",
          "displayWidth": null,
          "name": "邮件模板管理",
          "icon": "",
          "pid": 37,
          "id": 11,
          "state": true,
          "uri": "/mailTemManagement"
        }],
        "name": "邮件发送管理",
        "icon": "el-icon-my-emailS",
        "pid": 32,
        "id": 37,
        "state": true,
        "uri": ""
      }, {
        "displayHeight": null,
        "image": "chaojiguanliyuanzhuanqu",
        "code": "BN",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BNA",
          "displayWidth": null,
          "name": "系统配置",
          "icon": "",
          "pid": 1,
          "id": 12,
          "state": true,
          "uri": "/systemSetting"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BNB",
          "displayWidth": null,
          "name": "角色管理",
          "icon": "",
          "pid": 1,
          "id": 13,
          "state": true,
          "uri": "/role"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BNC",
          "displayWidth": null,
          "name": "资源管理",
          "icon": "",
          "pid": 1,
          "id": 24,
          "state": true,
          "uri": "/sourceManage"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BND",
          "displayWidth": null,
          "name": "模块管理",
          "icon": "",
          "pid": 1,
          "id": 48,
          "state": true,
          "uri": "/module"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BNG",
          "displayWidth": null,
          "name": "数据字典配置",
          "icon": "",
          "pid": 1,
          "id": 20,
          "state": true,
          "uri": "/dataDictionary"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BNH",
          "displayWidth": null,
          "name": "计划任务管理",
          "icon": "",
          "pid": 1,
          "id": 40,
          "state": true,
          "uri": "/planTaskManage"
        }],
        "name": "超级管理员专区",
        "icon": "el-icon-my-superM",
        "pid": 32,
        "id": 1,
        "state": true,
        "uri": ""
      }, {
        "displayHeight": null,
        "image": "",
        "code": "BO",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "",
          "code": "BOA",
          "displayWidth": null,
          "name": "数据源配置",
          "icon": "",
          "pid": 148,
          "id": 154,
          "state": true,
          "uri": "/dataConfiguration"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BOB",
          "displayWidth": null,
          "name": "视图管理",
          "icon": "",
          "pid": 148,
          "id": 149,
          "state": true,
          "uri": "/viewConfiguration"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BOC",
          "displayWidth": null,
          "name": "模板管理",
          "icon": "",
          "pid": 148,
          "id": 150,
          "state": true,
          "uri": "/templateConfiguration"
        }, {
          "displayHeight": null,
          "image": "",
          "code": "BOD",
          "displayWidth": null,
          "name": "报告管理",
          "icon": "",
          "pid": 148,
          "id": 165,
          "state": true,
          "uri": "/reportConfiguration"
        }],
        "name": "可视化分析",
        "icon": "el-icon-my-msgM",
        "pid": 32,
        "id": 148,
        "state": true,
        "uri": "/visualConfiguration"
      }, {
        "displayHeight": null,
        "image": "",
        "code": "BQ",
        "displayWidth": null,
        "children": [{
          "displayHeight": null,
          "image": "el-icon-my-emailS",
          "code": "BQB",
          "displayWidth": null,
          "name": "运维服务",
          "icon": "el-icon-my-emailS",
          "pid": 123,
          "id": 124,
          "state": true,
          "uri": "/operationService"
        }],
        "name": "客服专区",
        "icon": "el-icon-my-onlineData",
        "pid": 32,
        "id": 123,
        "state": true,
        "uri": ""
      }]
    }
  }
};
</script>

<style>
.main-left {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 69px;
  z-index: 11;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 90px);
  width: 200px;
  background-color: #e5eaf4;
  transition: width 0.2s ease-in;
}

.main-left.close {
  overflow: visible;
  width: 64px;
  z-index: 11;
}

.main-left .el-menu.el-menu-vertical-demo>li.plat-menu-title {
  /*text-align: center;*/
  background-color: #017dd4;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  height: 45px;
  line-height: 45px;
  padding-left: 10px !important;
}

.plat-menu-title>img {
  margin-right: 7px;
}

.plat-menu-title>i {
  font-size: 25px;
  color: #fff;
}

.plat-menu-title>i:nth-of-type(2) {
  margin-left: 30px;
}

.main-left .el-submenu>.el-submenu__title>i {
  color: #017dd4;
}

.main-left .el-submenu>.el-submenu__title>i:first-of-type {
  font-size: 20px;
}

.main-left .el-menu-item:hover,
.main-left .el-submenu .el-menu-item:hover,
.main-left .el-submenu__title:hover {
  background-color: #43a7ed;
  color: #fff;
}

.main-left .el-menu-item:hover>i,
.main-left .el-submenu .el-menu-item:hover>i,
.main-left .el-submenu__title:hover>i {
  color: #fff;
}

body>.el-tooltip__popper.is-dark {
  display: none !important;
}
</style>

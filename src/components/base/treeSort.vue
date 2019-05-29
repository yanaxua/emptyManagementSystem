<template>
  <div id="selectTree">
    <el-tree :data="data" :props="props" :load="loadNode" :expand-on-click-node="false" :highlight-current="true" :render-content="renderContent"
      :node-key="mysortId" :parentId="parentId" :accordion="accordion" :show-checkbox="showCheckbox" :default-expanded-keys="defaultExpanded"
      @node-click="nodeClick" @current-change="currentChange" ref="selectTree" :check-strictly="true" @check-change="checkChange"
      class="el-tree-treeSort">
    </el-tree>

    <el-button-group id="el-btn-treeSort">
      <el-button type="primary" @click="moveUp">
        <i class="el-icon-arrow-up el-icon--up"></i>上移
      </el-button>
      <el-button type="primary" @click="moveDown">下移
        <i class="el-icon-arrow-down el-icon--down"></i>
      </el-button>
      <el-button type="primary" @click="send">保存
        <i class="el-icon-upload2"></i>
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
  import {
    sortRule
  } from "@/util/util.js"
  export default {
    name: 'treeSort',
    components: {},
    data() {
      return {
        defaultExpanded: [],
        /*不可与lazy属性连用,堆栈溢出*/
        localData: [],
        tempNode: [],
        /*被选中的节点*/
        isCtrl: false,
        /*多选*/
        isShift: false,
        /*连选*/
        isChanged: false,
        /*是否改变*/
        initSort: [],
        /*初始化时增加排序大小*/
        initSortKey: [] /*初始化时增加排序大小的key*/
      }
    },
    props: {
      clearLis: {
        /*切换时清除tempNode*/
        type: Boolean,
        default: true
      },
      showCheckbox: {
        /**显示勾选框*/
        type: Boolean,
        default: true
      },
      data: {
        /**原始数据*/
        type: Array,
        default: function () {
          return [];
        }
      },
      accordion: {
        /*点击时其他是否隐藏*/
        type: Boolean,
        default: false
      },
      mysortId: {
        /*排序以及保存时的id和name,默认为id和name*/
        type: String,
        default: "id"
      },
      mysortName: {
        /*排序以及保存时的id和name,默认为id和name*/
        type: String,
        default: "name"
      },
      sortStr: {
        /*排序依据的属性*/
        type: String,
        default: "displaySort"
      },
      sortCode: {
        /*sortCode*/
        type: String,
        default: "2"
      },
      urlType: {
        /*url类型*/
        type: String,
        default: "PUT"
      },
      urlLink: {
        /*请求链接*/
        type: String,
        default: "rest/encapsulation/sort"
      },
      parentId: {
        /**父元素id*/
        type: String,
        default: "parentId"
      },
      props: {
        /*内部tree组件的某些属性*/
        type: Object,
        default () {
          return {
            children: 'children',
            // disabled: (data, node) => {
            //     console.log(this);
            //     if (this.tempNode && this.tempNode.length > 0) {
            //         if (data.parentCode === this.tempNode[0].data.parentCode || ) {
            //             return false;
            //         } else {
            //             return true;
            //         }
            //     } else {
            //         return false;
            //     }
            // }
          }
        }
      }
    },
    methods: {
      renderContent(h, {
        node,
        data,
        store
      }) {
        return h("span", {}, [node.label]);
      },
      loadNode(node, resolve) { //加载子节点
        let tier = []; // 数组的排序代表当前节点的位置(逆序)
        if (node.level == 0) {
          resolve(this.data); //渲染起始数组
          //console.log("再找");
          return
        }
        var findParent = function (obj) {
          if (!obj.parent) { //当无父节点时跳出
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
          tempObj = tempObj[tier[i - 1]].children;
        }
        resolve(this.readchildNode(tempObj));
      },
      readchildNode(arr, callback) { //读取子节点层级数组
        var tempData = [];
        if (arr) {
          arr.forEach(function (item) {
            tempData.push(item);
          });
        }
        return tempData;
      },
      nodeClick(data, node, _vue) { /*只是决定节点是否被选中*/
        let me = this;
        let flag = me.isChoose(node);
        if (!me.isShift && !me.isCtrl) { /*单选模式*/
          me.tempNode = [];
          if (!flag) {
            me.tempNode.push(node);
          }
        } else {
          if (me.tempNode[0] && data[me.parentId] !== me.tempNode[0].data[me.parentId]) {
            me.$message('请选择同级部门');
            return;
          }
          if (!me.tempNode[0]) {
            me.tempNode.push(node);
          } else {
            if (me.isShift) { /*shift连选模式*/
              if (node.key == me.tempNode[0].key) {
                me.tempNode = [];
              } else {
                me.tempNode.splice(1, me.tempNode.length - 1);
                let count = 0;
                for (let i = 0; i < node.parent.childNodes.length; i++) {
                  let element = node.parent.childNodes[i];
                  if (element.key == node.key || element.key == me.tempNode[0].key) {
                    count++;
                  }
                  if (count > 0) {
                    me.tempNode.push(element);
                  }
                  if (count >= 2) {
                    me.tempNode.shift();
                    /*去掉重复的第一个node*/
                    break;
                  }
                }
              }
            } else if (me.isCtrl) { /*contrl多选模式*/
              if (flag) {
                me.tempNode.splice(flag, 1);
              } else {
                me.tempNode.push(node);
              }
            }
          }
        }
        if (me.showCheckbox) {
          /**展示选择框执行 */
          me.setChecked();
        } else { /*无展示选择框执行*/

        }
      },
      isChoose(node) {
        for (let i = 0; i < this.tempNode.length; i++) {
          if (node.key == this.tempNode[i].key) {
            return i;
          }
        }
        return false;
      },
      setChecked() {
        let arr = [];
        this.tempNode.forEach((item, index) => {
          arr.push(item.key);
        });
        this.$refs.selectTree.setCheckedKeys(arr, true, false);
        /**根据节点数组设置被选中的节点*/
      },
      currentChange(data, node) { /*当前节点选中变化触发*/
        // console.log(node);
      },
      checkChange(data, checked, indeterminate) { /*节点选中变化触发*/
        var _this = this;
        if (this.showCheckbox && checked) { /*显示选择框时,把勾选的数据替换到tempNode中*/

          //当且仅当选中节点且第n个节点不在同级时触发
          if (this.tempNode.length > 0 && this.tempNode[0].data[this.parentId] !== data[this.parentId]) {
            // if (this.isShift || this.isCtrl) {
            this.$message('请选择同级部门');
            // }
          } else {
            this.tempNode = [];
            this.$refs.selectTree.getCheckedNodes().forEach((element) => {
              if (data.parentCode === element.parentCode) {
                this.tempNode.push(this.findNode(element[this.mysortId]));
              }
            });
          }
          this.$nextTick(() => {
            _this.setChecked();
          });
        }
      },
      findNode(id) {
        let me = this;
        let allNode = [],
          node;
        me.$refs.selectTree.$children.forEach(function (element) {
          allNode.push(element.node);
        });
        let innerFind = function (arr) {
          for (let i = 0; i < arr.length; i++) {
            if (id == arr[i].data[me.mysortId]) {
              node = arr[i];
              //              return arr[i];
            }
            if (arr[i].childNodes) {
              innerFind(arr[i].childNodes);
            }
          }
        }
        innerFind(allNode);
        return node
      },
      bubbleSort() { /*冒泡排序*/
        for (let i = 0; i < this.tempNode.length; i++) {
          for (let j = i + 1; j < this.tempNode.length; j++) {
            if (this.tempNode[i].data[this.sortStr] >= this.tempNode[j].data[this.sortStr]) {
              var tempLi = this.tempNode[j];
              this.tempNode[j] = this.tempNode[i];
              this.tempNode[i] = tempLi;
            }
          }
        }
      },
      moveUp() { /*上移*/
        let func = this.moveData(true);
        this.move(func.first, func.second);
      },
      moveDown() { /*下移*/
        let func = this.moveData(false);
        this.move(func.first, func.second);
      },
      moveData(flag) { /*这是上下移动的操作合并*/
        let me = this;
        return {
          first: () => {
            let count = 0;
            /*计数*/
            let tempMark = 0;
            /*tempNode第一个的索引*/
            for (let i = 0; i < me.tempNode[0].parent.childNodes.length; i++) { /*将元素汇集到一起*/
              if (me.tempNode[0].parent.childNodes[i].key == me.tempNode[count].key) {
                me.tempNode[0].parent.childNodes.splice(i, 1);
                count == 0 ? tempMark = i : "";
                i--;
                count++;
                if (count == me.tempNode.length) {
                  flag ? "" : tempMark = i + 1;
                  me.tempNode[0].parent.childNodes.splice(tempMark, 0, ...me.tempNode);
                  break;
                }
              }
            }
          },
          second: () => {
            let tempFlag = flag ? (me.tempNode[0].parent.childNodes[0].key !== me.tempNode[0].key) : (me.tempNode[0].parent
              .childNodes[me.tempNode[0].parent.childNodes.length - 1].key !== me.tempNode[me.tempNode.length - 1].key
            );
            if (tempFlag) { /*判断是否为对应的首尾元素*/
              for (let i = 0; i < me.tempNode[0].parent.childNodes.length; i++) { /*向两边移动元素*/
                if (me.tempNode[0].parent.childNodes[i].key == me.tempNode[0].key) {
                  me.tempNode[0].parent.childNodes.splice(i, me.tempNode.length);
                  /*先删后加*/
                  flag ? "" : i = i + 2;
                  /*本为i+1,合并之后+2*/
                  me.tempNode[0].parent.childNodes.splice(i - 1, 0, ...me.tempNode);
                  break;
                }
              }
            } else {
              flag ? me.$message('已经是第一个') : me.$message('已经是最后一个');
            }
          }
        }
      },
      move(first, second) { /*这是。。。*/
        let me = this;
        if (me.tempNode.length <= 0) {
          me.$message('请先选择部门');
          return;
        }
        me.bubbleSort();
        me.tempNode[0].parent.childNodes = this.addSortNum(me.tempNode[0].parent.childNodes); //对该节点内相邻为null的节点设值
        /*先排序*/
        let distance = 0;
        let myPromise = new Promise(function (resolve, reject) {
          /*IE,不兼容findIndex方法*/
          /*let distance = me.tempNode[0].parent.childNodes.findIndex((item)=>item.key == me.tempNode[me.tempNode.length-1].key)-me.tempNode[0].parent.childNodes.findIndex((item)=>item.key == me.tempNode[0].key);*/
          for (var i = 0; i < me.tempNode[0].parent.childNodes.length; i++) {
            var element = me.tempNode[0].parent.childNodes[i];
            if (element.key == me.tempNode[0].key) {
              distance = -i;
              /**这里添加负号,如果distance任然为负数,证明只有一个数据*/
            } else if (element.key == me.tempNode[me.tempNode.length - 1].key) {
              distance = i + distance;
              break;
            }
          }
          /*有空隙,没有空隙*/
          distance > 0 && (distance + 1 > me.tempNode.length) ? resolve() : reject();
          return new Promise((resolve2, reject2) => {
            resolve2();
          });
        });
        myPromise
          .then(function () {
            first();
          }, function () {
            second();
          })
          .then(function () {
            me.reSortNode();
            /*改变结构中的[me.sortStr]*/
          })
          .then(function () {
            me.isChanged = true;
          })
      },
      reSortNode() {
        var borthers = this.tempNode[0].parent.childNodes,
          me = this,
          last = 0,
          next = 0;
        //移到第一位
        if (borthers[0].key === me.tempNode[0].key) {
          last = 0 < borthers[1] ? 0 : -borthers[1].data[me.sortStr];
        } else {
          for (let i = 0, len = borthers.length; i < len; i++) {
            if (borthers[i].key === me.tempNode[0].key) {
              last = borthers[i - 1].data[me.sortStr];
            }
          }
        }
        //移到最后一位
        if (borthers[borthers.length - 1].key === me.tempNode[me.tempNode.length - 1].key) {
          next = borthers[borthers.length - 2].data[me.sortStr] >= borthers.length * 10000 ?
            borthers[borthers.length - 2].data[me.sortStr] + 10000 : borthers.length * 10000;
        } else {
          for (let i = borthers.length - 1; i >= 0; i--) {
            if (borthers[i].key == me.tempNode[me.tempNode.length - 1].key) {
              next = borthers[i + 1].data[me.sortStr];
            }
          }
        }

        let gap = Math.floor((next - last) / (me.tempNode.length + 1));
        if (gap < 10 || borthers[borthers.length - 2].data[me.sortStr] > 1000000000) {
          for (let i = 0, len = borthers.length; i < len; i++) {
            borthers[i].data[me.sortStr] = (i + 1) * 10000;
            let initIndex = this.initSortKey.indexOf(borthers[i].data[this.mysortId]);
            if (initIndex > -1) {
              this.initSort[initIndex][this.sortStr] = borthers[i].data[this.sortStr];
            } else {
              this.initSort.push(borthers[i].data);
              this.initSortKey.push(borthers[i].data[this.mysortId]);
            }
          }
        } else {
          for (let i = 0; i < me.tempNode.length; i++) {
            me.tempNode[i].data[me.sortStr] = last + (i + 1) * gap;
          }
        }

        this.dealReSort(); //记录修改的值
      },
      send() {
        if (this.tempNode.length < 1) {
          this.$message('请先选择部门');
          return
        }
        if (!this.isChanged) {
          this.$message('没有改变');
          return
        }
        /**发送之前判断是否同级每一项都有sort
         * 没有的也将添加到tempNode中
         */

        // for (let i = 0; i < this.tempNode[0].parent.childNodes.length; i++) {
        //   let element = this.tempNode[0].parent.childNodes[i];
        //   // this.tempNode[0].parent.childNodes[i].data[this.sortStr] = (i + 1) * 10000;
        //   console.log(this.tempNode[0].parent.childNodes[i].data[this.mysortName]);
        //   console.log(this.tempNode[0].parent.childNodes[i].data[this.sortStr]);
        // }


        let sortDtoList = [];

        this.initSort.forEach((item, index) => {
          sortDtoList.push({
            sortCode: this.sortCode,
            sortId: item[this.mysortId],
            sortValue: item[this.sortStr]
          });
        });

        this.isChanged = false;
        this.$ajax
          .put(this.urlLink, sortDtoList)
          .then(res => {
              if (res.data.success) {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.$emit("sendBack", res.data.success);
            },
            () => {
              this.$message('网络错误,请检查网络');
            });
      },
      checkHeight() { /*当组件高度超过父容器高度,让按钮固定在父容器底部*/
        let parentDom = document.getElementById("selectTree").parentElement;
        let parantHeight = parentDom.offsetHeight - parentDom.style.paddingTop - parentDom.style.paddingBottom;


        parentDom.children[0].addEventListener("scroll", function () {
          //console.log(parentDom.children[0].scrollTop);
        })


        // if (parentDom.children[0].offsetHeight > parantHeight) {
        //   console.log(parentDom.children[0].offsetHeight);
        //   console.log(parentDom.children[0].scrollTop);
        //   console.log(parentDom.children[0]);
        // }else{
        //   // removeEventListener;
        // }


      },
      dealReSort() {
        this.tempNode.forEach((item, index) => {
          let initIndex = this.initSortKey.indexOf(item.data[this.mysortId]);
          if (initIndex > -1) {
            this.initSort[initIndex][this.sortStr] = item.data[this.sortStr];
          } else {
            this.initSort.push(item.data);
            this.initSortKey.push(item.data[this.mysortId]);
          }
        });
      },
      addSortNum(list) {
        let len = list.length,
          gap = 0;
        // list = sortRule(list);  //重排序

        // 查找有排序的顺序的第一位，计算间距，没有或间距小于10为0
        for (let j = 0; j < len; j++) {
          if (list[j][this.sortStr] !== null) {
            gap = Math.floor(list[j][this.sortStr] / (j + 1));
            gap = gap > 10 ? gap : 0;
            break;
          }
        }

        for (let i = 0; i < len; i++) {
          //判断是否及需要增加排序大小
          if (list[i][this.sortStr] === null) {
            list[i][this.sortStr] = (i + 1) * (gap || 10000);
            this.initSort.push(list[i]);
            this.initSortKey.push(list[i][this.mysortId]);
          } else if (gap === 0) {
            list[i][this.sortStr] = (i + 1) * 10000;
          } else {
            break;
          }

          //深度遍历子集
          // if (list[i][this.props.children] && list[i][this.props.children].length > 0) {
          //   list[i][this.props.children] = this.addSortNum(list[i][this.props.children]);
          // }
        }
        return list;
      }
    },
    created() {
      // this.data = this.addSortNum(this.data);
      // console.log(this.data);
      this.props.label = this.mysortName
      /*设置默认文本句柄*/
      this.defaultExpanded = [],
        this.data.forEach((item, index) => { /*设置默认展开所有一级*/
          this.defaultExpanded.push(item[this.mysortId]);
        });
    },
    mounted() {
      let me = this;
      document.addEventListener("keydown", function (e) {
        e = e || window.event;
        if (!me.isShift && !me.isCtrl && e.key == "Control") {
          me.isCtrl = true;
        }
        if (!me.isShift && e.key == "Shift") {
          me.isShift = true;
          me.isCtrl = false;
          /*连选覆盖多选*/
        }
      });
      document.addEventListener("keyup", function (e) {
        e = e || window.event;
        if (e.key == "Control") {
          me.isCtrl = false;
        }
        if (e.key == "Shift") {
          me.isShift = false;
          if (e.ctrlKey) {
            me.isCtrl = true;
          }
        }
        if (me.tempNode.length >= 1) {
          if (e.key == "ArrowUp") {
            me.moveUp();
          } else if (e.key == "ArrowDown") {
            me.moveDown();
          }
        }
      });
      /*当组件高度超过父容器高度,让按钮固定在父容器底部*/
      this.checkHeight();
    },
    watch: {
      clearLis(val) {
        if (val) {
          /*clearLis为true,显示窗口打开*/
          this.checkHeight();
        } else {
          this.tempNode = [];
          this.initSort = [];
          this.initSortKey = [];
          /**清空数组 */
          this.setChecked();
          /**重置选中状态 */
        }
      },
      data(val) {
        this.localData = val;
      },
      //      tempNode(n,o){
      //          console.log(n,'tempNode');
      //      }
    }
  }

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only  -->
<style>
  #selectTree {
    margin: 0 auto;
  }

  #selectTree .el-tree-node__label {
    user-select: none;
    color: #000;
  }

  #selectTree .el-tree-treeSort {
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    max-height: 480px;
    overflow: auto;
  }

  #el-btn-treeSort {
    margin-top: 10px;
  }

  #el-btn-treeSort button {
    margin-left: 2px;
  }

</style>

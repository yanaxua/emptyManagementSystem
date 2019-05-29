<template>
  <ul id="treeOrg" ref="treeOrg">
  </ul>
</template>

<script>
export default {
  name: 'treeOrg',
  data() {
    return {
      data: [
        {
          "id": 35,
          "treeCode": "A",
          "parentId": 0,
          "objectId": null,
          "name": "骅国电子",
          "tittle": null,
          "children": [
            {
              "id": 8,
              "treeCode": "AA",
              "parentId": 35,
              "objectId": null,
              "name": "行政管理處",
              "tittle": null,
              "children": [
                {
                  "id": 13,
                  "treeCode": "AAA",
                  "parentId": 8,
                  "objectId": null,
                  "name": "財務部",
                  "tittle": null,
                  "type": 8,
                  "displaySort": 1
                },
                {
                  "id": 38,
                  "treeCode": "AAB",
                  "parentId": 8,
                  "objectId": null,
                  "name": "管理部",
                  "tittle": null,
                  "type": 8,
                  "displaySort": 2
                }
              ],
              "type": 8,
              "displaySort": 1
            },
            {
              "id": 9,
              "treeCode": "AB",
              "parentId": 35,
              "objectId": null,
              "name": "行銷業務處",
              "tittle": null,
              "type": 8,
              "displaySort": 1
            },
            {
              "id": 10,
              "treeCode": "AC",
              "parentId": 35,
              "objectId": null,
              "name": "資材事業處",
              "tittle": null,
              "children": [
                {
                  "id": 41,
                  "treeCode": "ACA",
                  "parentId": 10,
                  "objectId": null,
                  "name": "成品（原料）倉庫",
                  "tittle": null,
                  "children": [
                    {
                      "id": 78,
                      "treeCode": "ACAA",
                      "parentId": 41,
                      "objectId": null,
                      "name": "成品仓库",
                      "tittle": null,
                      "children": [
                        {
                          "id": 79,
                          "treeCode": "ACAAA",
                          "parentId": 78,
                          "objectId": null,
                          "name": "半成品仓库",
                          "tittle": null,
                          "type": 3,
                          "displaySort": 1
                        }
                      ],
                      "type": 7,
                      "displaySort": 1
                    }
                  ],
                  "type": 10,
                  "displaySort": 1
                },
                {
                  "id": 42,
                  "treeCode": "ACB",
                  "parentId": 10,
                  "objectId": null,
                  "name": "資材辦公室",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 2
                }
              ],
              "type": 8,
              "displaySort": 1
            },
            {
              "id": 11,
              "treeCode": "AD",
              "parentId": 35,
              "objectId": null,
              "name": "研發部",
              "tittle": null,
              "type": 8,
              "displaySort": 1
            },
            {
              "id": 18,
              "treeCode": "AE",
              "parentId": 35,
              "objectId": null,
              "name": "無線事業處",
              "tittle": null,
              "type": 8,
              "displaySort": 1
            },
            {
              "id": 6,
              "treeCode": "AF",
              "parentId": 35,
              "objectId": null,
              "name": "線裝事業處",
              "tittle": null,
              "children": [
                {
                  "id": 24,
                  "treeCode": "AFA",
                  "parentId": 6,
                  "objectId": null,
                  "name": "線裝製造車間",
                  "tittle": null,
                  "type": 1,
                  "displaySort": 1
                },
                {
                  "id": 40,
                  "treeCode": "AFB",
                  "parentId": 6,
                  "objectId": null,
                  "name": "線裝辦公室",
                  "tittle": null,
                  "type": 8,
                  "displaySort": 2
                }
              ],
              "type": 8,
              "displaySort": 2
            },
            {
              "id": 14,
              "treeCode": "AG",
              "parentId": 35,
              "objectId": null,
              "name": "品保事業處",
              "tittle": null,
              "children": [
                {
                  "id": 16,
                  "treeCode": "AGA",
                  "parentId": 14,
                  "objectId": null,
                  "name": "品保實驗室",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 1
                },
                {
                  "id": 43,
                  "treeCode": "AGB",
                  "parentId": 14,
                  "objectId": null,
                  "name": "品保辦公室",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 2
                },
                {
                  "id": 44,
                  "treeCode": "AGC",
                  "parentId": 14,
                  "objectId": null,
                  "name": "進料檢驗課",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 3
                },
                {
                  "id": 45,
                  "treeCode": "AGD",
                  "parentId": 14,
                  "objectId": null,
                  "name": "制程檢驗課",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 4
                }
              ],
              "type": 8,
              "displaySort": 2
            },
            {
              "id": 7,
              "treeCode": "AH",
              "parentId": 35,
              "objectId": null,
              "name": "綠能事業處",
              "tittle": null,
              "children": [
                {
                  "id": 23,
                  "treeCode": "AHA",
                  "parentId": 7,
                  "objectId": null,
                  "name": "绿能製造車间",
                  "tittle": null,
                  "type": 1,
                  "displaySort": 1
                },
                {
                  "id": 17,
                  "treeCode": "AHB",
                  "parentId": 7,
                  "objectId": null,
                  "name": "綠能2F辦公室",
                  "tittle": null,
                  "type": 8,
                  "displaySort": 3
                },
                {
                  "id": 46,
                  "treeCode": "AHC",
                  "parentId": 7,
                  "objectId": null,
                  "name": "綠能3F辦公室",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 3
                },
                {
                  "id": 47,
                  "treeCode": "AHD",
                  "parentId": 7,
                  "objectId": null,
                  "name": "綠能品保實驗室",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 4
                },
                {
                  "id": 48,
                  "treeCode": "AHE",
                  "parentId": 7,
                  "objectId": null,
                  "name": "綠能LED展廳",
                  "tittle": null,
                  "type": 10,
                  "displaySort": 5
                }
              ],
              "type": 8,
              "displaySort": 3
            },
            {
              "id": 5,
              "treeCode": "AI",
              "parentId": 35,
              "objectId": null,
              "name": "精組件事業處",
              "tittle": null,
              "children": [
                {
                  "id": 25,
                  "treeCode": "AIA",
                  "parentId": 5,
                  "objectId": null,
                  "name": "精密制造车间",
                  "tittle": null,
                  "type": 1,
                  "displaySort": 1
                },
                {
                  "id": 19,
                  "treeCode": "AIB",
                  "parentId": 5,
                  "objectId": null,
                  "name": "精密注塑",
                  "tittle": null,
                  "children": [
                    {
                      "id": 26,
                      "treeCode": "AIBA",
                      "parentId": 19,
                      "objectId": null,
                      "name": "精密注塑",
                      "tittle": null,
                      "type": 3,
                      "displaySort": null
                    }
                  ],
                  "type": 1,
                  "displaySort": 2
                },
                {
                  "id": 20,
                  "treeCode": "AIC",
                  "parentId": 5,
                  "objectId": null,
                  "name": "精密沖壓",
                  "tittle": null,
                  "children": [
                    {
                      "id": 30,
                      "treeCode": "AICA",
                      "parentId": 20,
                      "objectId": null,
                      "name": "精密衝壓",
                      "tittle": null,
                      "type": 3,
                      "displaySort": 1
                    }
                  ],
                  "type": 1,
                  "displaySort": 3
                },
                {
                  "id": 21,
                  "treeCode": "AID",
                  "parentId": 5,
                  "objectId": null,
                  "name": "精密加工",
                  "tittle": null,
                  "children": [
                    {
                      "id": 34,
                      "treeCode": "AIDA",
                      "parentId": 21,
                      "objectId": null,
                      "name": "精加工模具",
                      "tittle": null,
                      "type": 3,
                      "displaySort": 1
                    }
                  ],
                  "type": 1,
                  "displaySort": 4
                }
              ],
              "type": 8,
              "displaySort": 5
            },
            {
              "id": 39,
              "treeCode": "AJ",
              "parentId": 35,
              "objectId": null,
              "name": "總經理室",
              "tittle": null,
              "children": [
                {
                  "id": 15,
                  "treeCode": "AJA",
                  "parentId": 39,
                  "objectId": null,
                  "name": "資訊中心",
                  "tittle": null,
                  "type": 8,
                  "displaySort": 1
                }
              ],
              "type": 8,
              "displaySort": 22
            },
            {
              "id": 3,
              "treeCode": "AK",
              "parentId": 35,
              "objectId": null,
              "name": "全廠區用能",
              "tittle": null,
              "children": [
                {
                  "id": 1,
                  "treeCode": "AKA",
                  "parentId": 3,
                  "objectId": null,
                  "name": "生产用能",
                  "tittle": null,
                  "type": 7,
                  "displaySort": 1
                },
                {
                  "id": 2,
                  "treeCode": "AKB",
                  "parentId": 3,
                  "objectId": null,
                  "name": "生活区用能",
                  "tittle": null,
                  "type": 7,
                  "displaySort": 2
                },
                {
                  "id": 4,
                  "treeCode": "AKC",
                  "parentId": 3,
                  "objectId": null,
                  "name": "辅助综合用能",
                  "tittle": null,
                  "type": 7,
                  "displaySort": 3
                }
              ],
              "type": 7,
              "displaySort": 23
            }
          ],
          "type": 0,
          "displaySort": null
        }
      ],
      timeGap: 0,
      maxId: 0,
      moveFrom: null,
      moveTo: null
    }
  },
  props: {
    level: {/*默认显示层级*/
      type: Number,
      default: 2
    },
    add: {/*可增加*/
      type: Boolean,
      default: true
    },
    delete: {/*可删除*/
      type: Boolean,
      default: true
    },
    edit: {/*可编辑*/
      type: Boolean,
      default: true
    },
    dragAndDrop: {/*可拖放改变结构*/
      type: Boolean,
      default: true
    },
    IdName: {/*排序以及保存时的id和name,默认即为id和name*/
      type: Object,
      default() {
        return {
          id: "id",
          name: "name"
        }
      }
    }
  },
  methods: {
    renderStructure(parent, arr) {
      var me = this;
      parent.innerHTML = "";
      let renderNode = function(topParent, innerArr) {
        for (let i = 0; i < innerArr.length; i++) {
          let tempChild = document.createElement("li");
          tempChild.classList.add("treeOrg-branch");
          /**每个li的结构是
           * li   .treeOrg-branch
           *    div  .treeOrg-content
           *      i  .treeOrg-tips 四个功能按钮
           *      h4  .treeOrg-name 分支名称
           *      p  .treeOrg-type  分支归类
           *    div  .treeOrg-topline  顶部横线
           *    ul  .treeOrg-parent 如果继续有子节点才添加下一步
           * */
          let tempHtml =
            `<div class="treeOrg-content">
                <i class="treeOrg-tips treeOrg-add">+</i>
                <i class="treeOrg-tips treeOrg-del">x</i>
                <i class="treeOrg-tips treeOrg-edit">*</i>
                <i class="treeOrg-tips treeOrg-drag">/</i>
                <i class="treeOrg-tips treeOrg-menu menu-active">=</i>
                <h4 class="treeOrg-name treeOrg-${innerArr[i].id}">${innerArr[i][me.IdName.name]}</h4>
                <p class="treeOrg-type">${me.setPart(innerArr[i].type)} ${innerArr[i].parentId} ${innerArr[i].treeCode}</p>
            </div>
            <div class="treeOrg-topline"></div>`;
          tempChild.innerHTML = tempHtml;
          me.setAttr(tempChild, innerArr[i]);/*设置属性*/
          {
            if (me.add) {/*绑定增加功能*/
              let tempAdd = tempChild.children[0].children[0];
              tempAdd.classList.add("tip-active");
              tempAdd.addEventListener("click", function(e) {
                /*读取当前节点属性,在其兄弟数据库下添加属性,发送请求,响应事件,渲染页面*/
                let tempNode = me.addNode(tempChild);
                let changeTree = me.readTreeCode(tempChild.treeCode);
                if (!me.findData(changeTree).children) {
                  me.findData(changeTree).children = [];
                }
                /*增加数据*/
                me.findData(changeTree).children.push(tempNode);
                /*增加元素修改数据,并重新渲染*/
                me.renderStructure(me.$refs.treeOrg, me.data);
              })
            }
            if (me.delete) {/*绑定删除功能*/
              let tempDel = tempChild.children[0].children[1];
              tempDel.classList.add("tip-active");
              let clickHandler =
                tempDel.addEventListener("click", function(e) {
                  if (tempChild.parentId == 0) {
                    confirm("一级目录,不可删除");
                    return;
                  }
                  if (confirm("确认删除?(删除后需要重新添加)")) {
                    /*发送请求,响应成功后:前端删除data中的数据,以及DOM节点*/
                    let delTreeNode = me.readTreeCode(tempChild.treeCode);
                    me.delData(delTreeNode);/**删除数据*/
                    /**删除节点结构*/
                    let tempParent = tempChild.parentNode
                    tempChild.parentNode.removeChild(tempChild);
                    /*改变后面兄弟元素以及子代的treeCode*/
                    me.reTreeCode(tempParent);
                    me.calcWidth(me.$refs.treeOrg);/*删除结构,不需要重新渲染,仅计算宽度*/
                  }
                })
            }
            if (me.edit) {/*绑定编辑功能*/
              let tempEdit = tempChild.children[0].children[2];
              tempEdit.classList.add("tip-active");
              tempEdit.addEventListener("click", function(e) {
                confirm("等会");
              })
            }
            if (me.dragAndDrop) {/*绑定拖拽功能*/
              let tempdrag = tempChild.children[0].children[3];
              tempdrag.classList.add("tip-active");
              tempdrag.addEventListener("click", function(e) {
                /*点击之后记录点击数据位置 */
                if (me.moveFrom && !me.moveTo) {
                  me.findNode(me.readTreeCode(me.moveFrom)).children[0].classList.remove("treeOrg-active");
                  me.moveFrom = me.moveTo = null;
                  return
                }
                if (tempChild.treeCode == "A") {
                  confirm("一级目录不可移动");
                  me.findNode(me.readTreeCode(me.moveFrom)).children[0].classList.remove("treeOrg-active");
                  me.moveFrom = me.moveTo = null;
                  return
                }
                me.moveFrom = tempChild.treeCode;
                tempChild.children[0].classList.add("treeOrg-active");
                e = e || window.event;
                e.stopPropagation();
              }, true)
              tempdrag.parentNode.addEventListener("click", function(e) {
                if (me.moveFrom) {
                  me.moveTo = tempChild.treeCode;
                  if (me.moveTo == me.moveFrom || me.moveTo == me.moveFrom.slice(0, -1)) {
                    confirm("目标节点与起始节点一致,移动取消");
                    me.findNode(me.readTreeCode(me.moveFrom)).children[0].classList.remove("treeOrg-active");
                    me.moveFrom = me.moveTo = null;
                    return;
                  }
                  if (confirm("是否移动到当前位置?")) {
                    /*moveFrom的父数据删除,删除之后需要修改数据*/
                    if (!me.findData(me.readTreeCode(me.moveTo)).children) {
                      me.findData(me.readTreeCode(me.moveTo)).children = [];
                    }
                    /*先加后删*/
                    me.findData(me.readTreeCode(me.moveTo)).children.push(me.findData(me.readTreeCode(me.moveFrom)));
                    me.reTreeData(me.readTreeCode(me.moveTo))
                    me.delData(me.readTreeCode(me.moveFrom));
                    me.reTreeData(me.readTreeCode(me.moveFrom));
                    me.renderStructure(me.$refs.treeOrg, me.data);
                  }
                  me.moveFrom = me.moveTo = null;
                  e = e || window.event;
                  e.stopPropagation();
                }
              }, true)
            }
          }
          if (!innerArr[i].children) {/*没有children属性渲染下一个*/
            topParent.appendChild(tempChild);
            continue;
          }
          /*如果有子元素,先插入一个ul包裹*/
          let lowParent = document.createElement("ul");
          lowParent.classList.add("treeOrg-parent");
          tempChild.appendChild(lowParent);
          topParent.appendChild(tempChild);
          renderNode(lowParent, innerArr[i].children);
        }
      }
      renderNode(this.$refs.treeOrg, this.data);/*渲染节点*/
      this.calcWidth(this.$refs.treeOrg);/*计算顶部线条宽度*/
    },
    setAttr(obj, attr) {
      for (var key in attr) {
        /*子元素children属性不需要赋值*/
        key !== "children" ? obj[key] = attr[key] : "";
      }
      this.maxId < attr[this.IdName.id] ? this.maxId = attr[this.IdName.id] : "";/*记录当前最大的ID值*/
    },
    setPart(partType) {/**设置部门类型 */
      let partName = "";
      switch (partType) {
        case 1: partName = "全厂"
          break;
        case 2: partName = "单位"
          break;
        case 3: partName = "车间"
          break;
        case 4: partName = "小组"
          break;
        default: partName = "部门"
          break;
      }
      return partName;
    },
    calcWidth(parentNode) {/**计算顶部宽度 */
      /**
       * 父元素的宽度以子元素计算,从下往上
       * 父元素的宽度等于所有子元素的宽度之和,减去首尾子元素宽度的各一半
       * 同时这里还起到计算位置的作用
      */
      let innerCalc = function(parentNode) {/*parentNode即为每个ul*/
        var tempWidth = 0;
        for (let i = 0; i < parentNode.children.length; i++) {
          var element = parentNode.children[i];/*element即为每个li*/
          if (element.children[2]) {
            /*如果element的第三个子元素存在,实际为ul,继续计算子元素*/
            /**topline的宽度计算方式等于父盒子的宽度减去首尾第一个可见兄弟的宽度和的一半 */
            let lWidth = 0;
            let rWidth = 0;
            let tHeight = element.children[0].children[5].offsetHeight;
            /*得到第一个可见元素*/
            for (let j = 0; j < element.children[2].children.length; j++) {
              if (element.children[2].children[j].style.display !== "none") {
                lWidth = element.children[2].children[j].offsetWidth;
                break;
              }
            }
            /*得到最后一个可见元素*/
            for (let k = element.children[2].children.length - 1; k >= 0; k--) {
              if (element.children[2].children[k].style.display !== "none") {
                rWidth = element.children[2].children[k].offsetWidth;
                break;
              }
            }
            if (!lWidth && !rWidth) {
              /*如果没有可见元素*/
              element.children[1].style.width = 0;
              element.children[1].style.left = "50%";
              continue;
            }
            element.children[1].style.width = Math.ceil(element.offsetWidth - 20 - (lWidth + rWidth) / 2) + "px";
            element.children[1].style.left = Math.floor(lWidth / 2 + 10) + "px";
            element.children[1].style.top = Math.floor(tHeight) + "px";
            innerCalc(element.children[2]);
          }
        }
      }
      innerCalc(parentNode);
    },
    readTreeCode(treeCode) {/**treeCode转层级数组 */
      let arr = [];
      for (let i = 0; i < treeCode.length; i++) {
        /*先全部转大写,A-Z 对应65-90*/
        arr.push(treeCode.toUpperCase().charCodeAt(i) - 65);
      }
      return arr;
    },
    returnTreeCode(node) {/**层级数组转treeCode */
      let tempNum = !node.children[2] ? 0 : node.children[2].children.length;
      return node.treeCode + String.fromCharCode(tempNum + 65);
    },
    reTreeCode(obj) {/*根据节点修改treeCode*/
      let me = this;
      let reName = function(element) {
        for (let i = 0; i < element.children.length; i++) {
          element.children[i].treeCode = element.parentNode.treeCode + String.fromCharCode(i + 65);
          element.children[i].displaySort = i + 1;
          element.children[i].parentId = element.parentNode[me.IdName.id];
          let changeTree = me.readTreeCode(element.children[i].treeCode);
          me.findData(changeTree).treeCode = element.children[i].treeCode;/*data中的treeCode也要更新*/
          me.findData(changeTree).displaySort = element.children[i].displaySort;
          element.children[i].children[2] ? reName(element.children[i].children[2]) : "";
        }
      }
      reName(obj);
    },
    reTreeData(arr) {/*根据层级修改treeCode*/
      let me = this;
      let reName = function(tempData) {
        for (let i = 0; i < tempData.children.length; i++) {
          let element = tempData.children[i];
          element.treeCode = tempData.treeCode + String.fromCharCode(i + 65);
          element.displaySort = i + 1;
          element.parentId = tempData[me.IdName.id];
          element.children ? reName(element) : "";
        }
      }
      reName(me.findData(arr.slice(0, -1)));
    },
    findData(arr) {/*根据层级返回数据*/
      let tempLength = 0;
      let innerFind = function(innerData) {
        tempLength++;
        if (tempLength == arr.length) {
          return innerData[arr[tempLength - 1]];
        }
        return innerFind(innerData[arr[tempLength - 1]].children);
      }
      return innerFind(this.data);
    },
    findNode(arr) {/*根据层级返回节点*/
      let tempLength = 0;
      let innerFind = function(innerObj) {
        tempLength++;
        if (tempLength == arr.length) {
          return innerObj.children[arr[tempLength - 1]];
        }
        return innerFind(innerObj.children[arr[tempLength - 1]].children[2]);
      }
      return innerFind(this.$refs.treeOrg);
    },
    addNode(node) {/**添加节点*/
      return {
        [this.IdName.id]: this.maxId + 1,
        "treeCode": this.returnTreeCode(node),
        "parentId": node[this.IdName.id],
        "objectId": null,
        [this.IdName.name]: "財務部" + (this.maxId + 1),
        "tittle": null,
        "type": Math.floor(Math.random() * 5),
        "displaySort": !node.children[2] ? 1 : node.children[2].children.length + 1
      };
    },
    delData(arr) {/*删除数据*/
      let tempNum = arr.slice(0, -1);
      return this.findData(tempNum).children.splice(arr.slice(-1), 1);
    }
  },
  computed: {

  },
  created() {
    /*在创建时请求数据赋值给this.data,这里用本地数据代替*/
    this.timeGap = new Date();
  },
  beforeMount() {
  },
  mounted() {
    /*挂载之后获取到容器以及渲染数据*/
    this.renderStructure(this.$refs.treeOrg, this.data);/*读取数据结构,解析默认层级*/
    //console.log((new Date() - this.timeGap) + "ms")
  },
  watch: {

  }
}
</script>

<style>
ul,
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul {
  display: flex;
}

#treeOrg {
  display: inline-block;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#treeOrg p,
#treeCode h4 {
  margin: 0;
  padding: 0;
}

.treeOrg-branch {
  margin: 20px auto 0;
  position: relative;
  padding: 0 10px;
}

.treeOrg-content {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
}

.treeOrg-content.treeOrg-active {
  box-shadow: 0 0 20px rgba(255, 0, 0, .9);
}

.treeOrg-content::before {
  content: "";
  width: 1px;
  height: 43px;
  background-color: #aaa;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -100%);
  z-index: -999;
}

.treeOrg-content>.treeOrg-tips {
  text-align: center;
  font: normal 900 20px/20px "微软雅黑";
  position: absolute;
  display: none;
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50%;
  border: 1px solid #aaa;
}

.treeOrg-content:hover>.tip-active {
  display: block;
}

.treeOrg-content:hover>.menu-active {
  display: block;
}

.treeOrg-content>.treeOrg-add {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.treeOrg-content>.treeOrg-del {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.treeOrg-content>.treeOrg-edit {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

.treeOrg-content>.treeOrg-drag {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.treeOrg-content>.treeOrg-menu {
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);
}

.treeOrg-content .treeOrg-name {
  display: inline-block;
  background-color: #185ba1;
  color: #fff;
  padding: 4px;
  text-align: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
}

.treeOrg-content .treeOrg-name {
  -webkit-line-clamp: 1;
  -moz-line-clamp: 1;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  white-space: nowrap;
}

.treeOrg-content .treeOrg-type {
  border: 1px solid #aaa;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
}

.treeOrg-topline {
  height: 1px;
  width: 0;
  background-color: #aaa;
  position: absolute;
  z-index: -999;
}

.treeOrg-branch>.treeOrg-parent {
  z-index: -999;
}
</style>
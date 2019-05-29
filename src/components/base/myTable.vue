<template>
  <div class="mytable">
    <div v-if="self" class="mytable_self">
      <slot></slot>
    </div>
    <div v-if="!self" class="mytable_content">
      <table class="mytable_container" border="1">
        <tr v-if="needTitle" class="mytable_header">
          <th class="mytable_label">序号</th>
          <th class="mytable_label" v-for="(item,index) in props" :key="item.prop" v-text="item.label"></th>
        </tr>
        <tr v-if="!data.length" class="mytable_header">
          <td :colspan="props.length+1" :style="{'textAlign':'center','backgroundColor':'#fff'}">无数据</td>
        </tr>
        <tr @click="rowClick(item)" class="mytable_row" v-for="(item,index) in data" :key="index">
          <td v-if="needTitle" class="mytable_label mytable_index" v-text="(index+1)"></td>
          <td class="mytable_label" v-for="(item1,index1) in props" :key="item1.prop">
            <span 
            v-if="item1.callback"
            :class="[item1.format?'':'callback']"
            @click="callback(item,item1.callback)">
            {{item1.format?item1.format(item[item1.prop]):item[item1.prop]}}
            </span>
            <span 
            v-else-if="item1.prop == statusProp"
            :class="[item1.format?'':'status_circle','status'+(item1.format?item1.format(item[item1.prop]):item[item1.prop])]"
            @click="openWindow(item,statusProp)">
            {{item1.format?item1.format(item[item1.prop]):''}}
            </span>
            <span 
            v-else-if="item1.prop == positionProp" 
            :class="{'underline':!!item[item1.prop]}"
            @click="openWindow(item,positionProp)" 
            v-text="item[item1.prop]||'--'">
            </span>
            <span 
            v-else 
            v-html="(item1.format?item1.format(item[item1.prop]):item[item1.prop])||'--'">
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
  
<script>
export default {
  components: {},
  data() {
    return {

    }
  },
  computed: {

  },
  props: {
    self: {/**自定义内容,只使用类名*/
      type: Boolean,
      default: false
    },
    needTitle: {/**是否需要表头*/
      type: Boolean,
      default: true
    },
    props: {/**属性数组*/
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    statusProp: {/**状态属性名*/
      type: String,
      default: "status"
    },
    positionProp: {/**位置属性名*/
      type: String,
      default: "installPosition"
    }
  },
  methods: {
    callback(item,type){
      this.$emit("callback", {"type":type,"item":item});
    },
    openWindow(item,type) {
      this.$emit("openWindow", {"type":type,"item":item});
    },
    rowClick(item){
      this.$emit("rowClick",item);
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {

  }
}
</script>
  
<!-- Add 'scoped' attribute to limit CSS to this component only  -->
<style>
.mytable_container {
  min-width: 100%;
  border-top: 1px solid rgb(210, 217, 230);
  border-left: 1px solid rgb(210, 217, 230);
  border-collapse: collapse;
  word-break: keep-all;
  white-space: nowrap;
}

.mytable_self {
  border-top: 1px solid rgb(210, 217, 230);
  border-left: 1px solid rgb(210, 217, 230);
}

.mytable th,
.mytable td {
  line-height: 25px;
  padding: 3px 5px;
  box-sizing: border-box;
}
.mytable td{
}
.energy .mytable_header {
  background-color: rgb(190, 237, 231);
}

.energy .mytable_container .mytable_row:nth-of-type(odd) {
  background-color: rgb(232, 244, 242);
}

.energy .mytable_self .mytable_row:nth-of-type(8n+1) {
  background-color: rgb(232, 244, 242);
}

.energy .mytable_self .mytable_row:nth-of-type(8n+2) {
  background-color: rgb(232, 244, 242);
}

.energy .mytable_self .mytable_row:nth-of-type(8n+3) {
  background-color: rgb(232, 244, 242);
}

.energy .mytable_self .mytable_row:nth-of-type(8n+4) {
  background-color: rgb(232, 244, 242);
}

.centralAirConditioning .mytable_header {
  background-color: rgb(199, 227, 252);
}

.centralAirConditioning .mytable_container .mytable_row:nth-of-type(odd) {
  background-color: rgb(223, 239, 253);
}

.centralAirConditioning .mytable_self .mytable_row:nth-of-type(8n+1) {
  background-color: rgb(223, 239, 253);
}

.centralAirConditioning .mytable_self .mytable_row:nth-of-type(8n+2) {
  background-color: rgb(223, 239, 253);
}

.centralAirConditioning .mytable_self .mytable_row:nth-of-type(8n+3) {
  background-color: rgb(223, 239, 253);
}

.centralAirConditioning .mytable_self .mytable_row:nth-of-type(8n+4) {
  background-color: rgb(223, 239, 253);
}

/*变色结束*/

.mytable_label {
  line-height: 25px;
  padding: 3px 5px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: #000;
  border-right: 1px solid rgb(210, 217, 230);
  border-bottom: 1px solid rgb(210, 217, 230);
}

.mytable_header {
  font-weight: 700;
}

.status_circle {
  display: block;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 4px auto -4px;
}
.callback{
  text-decoration: underline;
  cursor: pointer;
  color: #00c;
}
.underline{
  text-decoration: underline;
  cursor: pointer;
  color: #00c;
}
.status_circle.status0 {
  background-color: rgb(51, 175, 102);
}

.status_circle.status1 {
  background-color: rgb(235, 97, 84);
}

.status_circle.status2 {
  background-color: rgb(254, 165, 7);
}

.status_circle.status3 {
  background-color: rgb(235, 43, 16);
}
</style>
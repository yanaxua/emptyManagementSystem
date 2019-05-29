<template>
  <div class="myLegend">
    <span v-for="(item,index) in legendArr" :key="index">
      <span class="legend_circle">
        <i :style="'backgroundColor:'+item.color+';'"></i>
      </span>
      <span class="legend_text">  {{item.label}}</span>
    </span>
    <!--<span class="circle0"></span>
                <span class="legend_text"> - 正常</span>
                <span class="circle1"></span>
                <span class="legend_text"> - 警告</span>
                <span class="circle2"></span>
                <span class="legend_text"> - 故障</span>-->
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
    legendArr: {
      type: Array,
      default() {
        return [
          {
            label: "正常",
            color: "#33af66"
          },
          {
            label: "警告",
            color: "#fea507"
          },
          {
            label: "故障",
            color: "#eb6154"
          }
        ]
      }
    }
  },
  methods: {

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
.myLegend {
  display: inline-block;
}

.myLegend span {
  display: inline-block;
  vertical-align: middle;
}

.myLegend .legend_circle {
  position: relative;
  width: 20px;
  height: 50px;
}

.myLegend .legend_circle i {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.myLegend .legend_text {
  line-height: 50px;
  min-width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
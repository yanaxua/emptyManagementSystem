<template>
<div class="plat-div-nav">
  <div class="plat-div-navTop">
    <h1>{{projectName}}</h1>
  </div>
</div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      projectName:"项目名称"
    };
  },
  methods: {
  },
  filters: {
  },
  computed: {
  },
  created() {
  }
};
</script>

<style>
.plat-div-nav {
  height: 70px;
}

.plat-div-navTop {
  background: url("./images/header_local.png");
  position: relative;
  left: 0;
  top: 0;
  z-index: 999;
  height: 70px;
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  width: 100%;
  font-size: 20px;
  line-height: 70px;
}

.plat-div-navTop>h1 {
  font-size: 35px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 18px;
  font-family: SimSun;
}

</style>

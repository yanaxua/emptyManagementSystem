<template>
  <div class="el-editor">
    <div :id="id" class="components_div_ueditor" type="text/plain"></div>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      ueContent: ""
    };
  },
  props: {
    id: "",
    msg: {
      type: String,
      default: ""
    },
    config: {
      type: Object
    }
  },
  mounted() {
    const _this = this;
    this.editor = UE.getEditor(this.id, this.config); // 初始化UE

    this.editor.addListener("contentChange", function() {
      _this.$emit("actualSetContent", this.getContent());
    });
  },
  methods: {
    setUEContent(msg) {
      var _this = this;
      this.ueContent = msg;
      try {
        _this.editor.setContent(_this.escape2Html(this.ueContent));
      } catch (e) {
        //导致切换tabs会触发ready事件
        this.editor.removeListener("ready", function() {
          //console.log("remove");
        });
        this.editor.addListener("ready", function() {
          _this.editor.setContent(_this.escape2Html(_this.ueContent));
        });
        // setTimeout(function() {
        //   _this.setUEContent(msg);
        // }, 200);
      }
    },
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    },
    methodCall(options, data) {
      if (typeof options === "undefined") {
        return this.editor;
      }
      var method = this[options],
        _this = this;
      if (!method) {
        method = this.editor[options];
        _this = this.editor;
      }
      if (typeof data === "undefined") {
        return method();
      } else if (data instanceof Array) {
        return method.apply(_this, data);
      } else {
        return method(data);
      }
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>

<style>
.components_div_ueditor > .edui-editor {
  z-index: 500 !important;
}
.el-editor {
  width: 650px;
}

.edui-editor div {
  line-height: 1em;
}
</style>

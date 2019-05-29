<template>
    <!-- <el-upload action="/api/rest/mailService/upLoadFile/file" :headers="headersObj" :on-success="handleChange" :on-remove="handleRemove" :file-list="mailFileList"
      :accept="accept">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
    <el-upload :action="urlInit" :headers="headersObj" :on-success="handleChange" :on-remove="handleRemove"
               :file-list="mailFileList"
               :accept="accept" :auto-upload='autoUpload' ref="upload" :disabled="disabled">
        <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        <el-button size="small" type="primary" :disabled="disabled">{{btnName}}</el-button>
    </el-upload>
</template>
<script>
    /**
     * @author LJW 20171206
     * @description 文件上传操作框组件
     *
     */
    export default {
        props: {
            multiple: {
                type: Boolean,
                default: true
            },
            fileList1: {
                type: String,
                default() {
                    return "";
                }
            },
            accept: {
                type: String,
                default() {
                    return "*";
                }
            },
            btnName: {
                type: String,
                default() {
                    return "预览";
                }
            },
            url: {
                type: String,
                default: function (){
                    return this.$env == "development"?"/api/rest/mailService/upLoadFile/file":"rest/mailService/upLoadFile/file"
                }
            },
            autoUpload: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                filename: "",
                mailFileList: [],
                headersObj: {
                    mm: this.$route.query.id
                },
            };
        },
        computed: {
            urlInit(val) {
                var temp = this.url;
                if(this.$env == "development") {
                    if(!/^\/api/.test(temp)) {
                        temp = "/api" + temp;
                    }
                } else {
                    if(/^\/api/.test(temp)) {
                        temp.replace("/api", "/cloud");
                    } else {
                        temp = "/cloud" + (/^\//.test(temp) ? "" : "/") + temp;
                    }
                }
                console.log(temp);
                return temp;
            }
        },
        watch: {
            fileList1: function (newData, oldData) {
                this.filename = newData;//this.fileList1;
                this.mailFileList = this.fileList1 ? this.fileList1
                    .split(";")
                    .filter(function (item, index) {
                        if (item.trim() != "") {
                            return item;
                        }
                    })
                    .map(function (item, index) {
                        return {
                            name: item.substring(item.lastIndexOf("/") + 1),
                            url: item
                        };
                    }) : [];
            }
        },
        methods: {
            // 文件上传成功后返回后台传入的地址；失败提示错误信息，不进行操作
            handleChange(response, file, fileList) {
                if (response.success) {
                    // this.$message({
                    //   message: response.msg,
                    //   type: "success"
                    // });
                    this.filename += response.data + ";";
                    this.$emit("change", response.data);
                } else {
                    let len = this.fileList1.length;
                    if (response.msg == "" || response.msg == null) {
                        this.$message.error("上传文件失败");
                    } else {
                        this.$message.error(response.msg);
                    }

                    this.$emit("error", this.fileList1.slice("-" + len));
                }
            },
            // 删除附件信息返回删除的地址
            handleRemove(file, fileList) {
                this.filename = this.filename.replace(file.name + ";", "");
                this.$emit("remove", file);
            },
            getFileName() {
                return this.filename;
            },
            delFileName() {
                this.filename = "";
                this.$invokeSubMethod("clearFiles","upload")
            },
            submit() {
                this.$refs.upload.submit();
            }
        },
        mounted() {
            this.mailFileList = this.fileList1 ? this.fileList1
                .split(";")
                .filter(function (item, index) {
                    if (item.trim() != "") {
                        return item;
                    }
                })
                .map(function (item, index) {
                    return {
                        name: item.substring(item.lastIndexOf("/") + 1),
                        url: item
                    };
                }) : [];
        }
    };
</script>
<style>

</style>

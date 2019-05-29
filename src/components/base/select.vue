<template>
    <div>
        <el-button icon="arrow-left" @click='pre' plain></el-button>
        <el-select v-model="value" placeholder="请选择" @change='selectChange'>
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button icon="arrow-right" @click='next'></el-button>
    </div>
</template>

<script>
    /*组件说明:
        父组件传入options,形式为[{value:,label],具体参考elementUi中options的取值;
        父组件接收onChange事件,onChange事件传出选择项的value值,每次选择都会做改变;

    */
    export default {
        props: {
            options: {
                type: Array,
//       required:true
//      default(){
//        return[
//          {value:0,label:'部门1'}
//        ]
//      }
            }

        },
        data() {
            return {
                value: '',
                nowIndex: 0
            }
        },
        methods: {
            selectChange(val) {
                let msg = {val: val};
                this.options.forEach((value, index) => {
                    if (value['value'] == val) {
                        msg.label = value['label'];
                        msg.index = index;
                        this.nowIndex = index
                    }
                })
                this.$emit('change', msg)
            },
            pre() {
                this.nowIndex--;
                if (this.nowIndex < 0) {
                    this.nowIndex = this.options.length - 1
                }
                this.value = this.options[this.nowIndex].value
            },
            next() {
                this.nowIndex++;
                if (this.nowIndex >= this.options.length) {
                    this.nowIndex = 0
                }
                this.value = this.options[this.nowIndex].value
            }
        },
        mounted() {
            if (this.options) {
                this.value = this.options[this.nowIndex].value
            }
        }
    }
</script>

<style scoped>
    /*.el-button:focus.el-button:active{*/
    /*border: 1px solid #c4c4c4;
    color: #1f2d3d;*/
    /*}*/

</style>

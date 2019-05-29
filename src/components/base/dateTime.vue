<template>
    <div>
        <el-date-picker v-if="type==='datetimerange' || type==='daterange'" v-model="time" :type="type" placeholder="选择日期范围" :editable="false"></el-date-picker>
        <template v-else>
            <el-date-picker v-model="stime" :format="changeFormat(format[type])" :type="type" placeholder="选择日期范围" :editable="false">
            </el-date-picker>
            <span>到</span>
            <el-date-picker v-model="etime" :format="changeFormat(format[type])" :type="type" :picker-options="pickerOptionsEnd" placeholder="选择日期范围" :editable="false">
            </el-date-picker>
        </template>
    </div>
</template>

<script>
/**
 * 选择开始结束时间的组件
 * 可用作 日、月、年 时分秒
 * 
*/
export default {
    props: {
        type: {
            type: String,
            default: "date"  //year/month/date/week/datetime 、datetimerange/daterange
        },
        value: { // 必须要使用value
            default: '',
        },
    },
    data() {
        return {
            stime: "",
            etime: "",
            time: "",
            format: {
                "year": "YYYY",
                "month": "YYYY-MM",
                "week": "YYYY 第 WW 周",
                "date": "YYYY-MM-DD",
                "daterange": "YYYY-MM-DD",
                "datetime": "YYYY-MM-DD HH:mm:ss",
                "datetimerange": "YYYY-MM-DD HH:mm:ss"
            },
            pickerOptionsEnd: {
                disabledDate: (time) => {
                    return time.getTime() < (this.stime === "" ? new Date(1970) - 8.64e7 : this.stime.getTime());
                }
            }
        }
    },
    watch: {
        stime(val) {
            let time = [];
            if (this.stime > this.etime) {
                this.etime = "";
            }
            this.$emit("input", this.formatTime(this.stime, this.etime));
        },
        etime(val) {
            this.$emit("input", this.formatTime(this.stime, this.etime));
        },
        time(val) {
            this.$emit("input", this.formatTime(this.time[0], this.time[1]));
        }
    },
    methods: {
        changeFormat(format) {
            return format ? format.replace(/Y/g, "y").replace(/D/g, "d") : "";
        },
        formatTime(start, end) {
            return [
                start ? this.$moment(start).format(this.format[this.type]) : "",
                end ? this.$moment(end).format(this.format[this.type]) : "",
            ]
        }
    }
}
</script>
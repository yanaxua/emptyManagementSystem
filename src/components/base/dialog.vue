<template>

    <el-dialog :title="title" :visible.sync="visibleDialog" :size="size" :top="top" :modal="modal"
               :modal-append-to-body="modalAppendToBody" :lock-scroll="lockScroll" :custom-class="customClass"
               :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" :show-close="false"
               :before-close="handleClose" @close="handClose" @open="handOpen" v-show="visible" >
        <button type="button" class="el-dialog__headerbtn base-dialog-btn" aria-label="Close" v-if="showClose"
                @click="clickBtn">
            <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>

        <slot></slot>
        <div slot="footer" class="dialog-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>

    </el-dialog>

</template>

<script>
    export default {
        props: {
            title: String,
            size: String,
            top: String,
            modal: {
                type: Boolean,
                default: true
            },
            modalAppendToBody: {
                type: Boolean,
                default: true
            },
            lockScroll: Boolean,
            customClass: String,
            closeOnClickModal: {
                type: Boolean,
                default: false
            },
            closeOnPressEscape: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            beforeCloseFn: Function,
            visible: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                visibleDialog: false
            };
        },
        methods: {
            clickBtn() {
                this.$emit('update:visible', false);
            },
            handleClose(done) {
                if (this.beforeCloseFn) {
                    this.beforeCloseFn(done)
                }
            },
            handClose() {
                this.$emit('close');
            },
            handOpen() {
                var _this = this;
                this.$nextTick(() => {
                    _this.$emit('open');
                });
            }
        },
        watch: {
            visible(val) {
                this.visibleDialog = val
            }
        }
    };
</script>
<style>
    .base-dialog-btn {
        position: absolute;
        right: 0;
        top: 0;
    }
</style>

<template>
    <div class="dialog-wrap" v-show="isOpen">
        <div class="dialog" :style="{width: width + 'px'}">
            <!-- 头部 -->
            <div class="dialog-header">
                <p class="title">{{title}}</p>
                <i class="close-btn" @click="close"></i>
            </div>

            <!-- 内容区 -->
            <div class="dialog-content">
                <slot name="content">这是个弹窗组件</slot>
            </div>

            <!-- 底部 -->
            <div class="dialog-footer" v-if="btnNum !== 0">
                <button type="button" @click="confirm">{{btnOk}}</button>
                <button type="button" v-if="btnNum === 2" @click="close">{{btnNo}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: true
        },

        width: {
            type: Number,
            default: 360
        },

        title: {
            type: String,
            default: '提示'
        },

        btnOk: {
            type: String,
            default: '确认'
        },

        btnNo: {
            type: String,
            default: '取消'
        },

        btnNum: {
            type: Number,
            default: 2
        }
    },

    methods: {
        confirm() {
            this.$emit('confirm');
        },

        close() {
            this.$emit('update:isOpen', false);
        }
    }
}
</script>

<style lang="less" scoped>
    .dialog-wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2017;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);

        .dialog {
            position: absolute;
            left: 50%;
            top: 50%;
            overflow: hidden;
            background: #fff;
            border-radius: 5px;
            transform: translate(-50%, -50%);

            .dialog-header {
                height: 40px;
                padding: 0 20px;
                font-size: 14px;
                color: #1A1A1A;
                line-height: 40px;
                text-align: left;
                background: #F8F8F8;

                .close-btn {
                    position: absolute;
                    top: 14px;
                    right: 17px;
                    width: 12px;
                    height: 12px;
                    background-image: url("http://static-10006892.file.myqcloud.com/public/img/icon-common-161101.png");
                    background-position: -44px -61px;
                    cursor: pointer;
                }
            }
        }
    }
</style>



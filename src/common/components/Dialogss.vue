<template>
    <div class="dialog" v-if="show" transition="dialog">
        <div class="dialog-wrap" :class="dialogClass">
            <div class="dialog-container">
                <i class="close-dialog-btn" @click="close"></i>
                <p class="dialog-title" v-text="title"></p>
                <div class="dialog-content">
                    <slot name="dialog-content">弹窗内容区</slot>
                </div>
                <div class="btn-content" :class="{ 'btn-1':isOnlyOneBtn }" v-if="isShowBtns">
                    <button class="confirm" type="button" @click="okHandle" v-text="btnOk"></button>
                    <button class="cancel" type="button" @click="close" v-if="!isOnlyOneBtn" v-text="btnNo"></button>
                    <slot name="dialog-tips"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dialogs',

    data() {
        return {
            show: true,
            title: '弹窗标题',
            btnNum: 2, //弹窗按钮数量。0:无; 1:1个确认按钮; 2: 2个按钮
            btnOk: '确认', //确认按钮文字
            btnNo: '取消', //取消按钮文字
            dialogClass: null, //自定义弹窗类名
            callback: null //点击确定按钮回调函数
        }
    },

    computed: {
        isShowBtns() {
            let result;

            if (this.btnNum !== 0) {
                result = true;
            } else {
                result = false;
            }
            return result;
        },

        isOnlyOneBtn() {
            return this.btnNum === 1 ? true : false;
        }
    },

    methods: {
        open(options) {
            let _this = this;

            options.hasOwnProperty('title') ? this.title = options.title : false;
            options.hasOwnProperty('btnOk') ? this.btnOk = options.btnOk : false;
            options.hasOwnProperty('btnNo') ? this.btnNo = options.btnNo : false;
            options.hasOwnProperty('class') ? this.dialogClass = options.class : false;
            options.hasOwnProperty('btnNum') ? this.btnNum = options.btnNum : false;

            _this.show = true;

            if ((typeof options.okHandle).toLowerCase() === 'function') {
                this.callback = options.okHandle;
            }
        },

        close() {
            this.show = false;
        },

        okHandle() {
            if ((typeof this.callback).toLowerCase() === 'function') {
                this.callback();
            } else {
                this.show = false;
            }
        }
    }
}
</script>

<style lang="less" scoped>

    // /* 弹窗组件 S */
    // .dialog {
    //     display: table;
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     background-color: rgba(0, 0, 0, 0.5);
    //     z-index: 99;
    //     -webkit-transition: opacity .2s ease;
    //     transition: opacity .2s ease;
    // }

    // .dialog .dialog-wrap {
    //     display: table-cell;
    //     vertical-align: middle;
    //     -webkit-transition: all .2s ease;
    //     transition: all .2s ease;
    // }

    // .dialog .dialog-wrap .dialog-container {
    //     position: relative;
    //     width: 3.6rem;
    //     margin: 0 auto;
    //     background-color: #FFF;
    //     border-radius: 0.05rem;
    // }

    // .dialog .dialog-wrap .dialog-container i.close-dialog-btn {
    //     position: absolute;
    //     top: 0.14rem;
    //     right: 0.15rem;
    //     width: 0.12rem;
    //     height: 0.12rem;
    //     background-image: url("http://static-10006892.file.myqcloud.com/public/img/icon-common-161101.png");
    //     background-position: -44px -61px;
    //     cursor: pointer;
    // }

    // .dialog .dialog-wrap .dialog-container i.close-dialog-btn:hover {
    //     background-position: 0px -61px;
    // }

    // .dialog .dialog-wrap .dialog-container p.dialog-title {
    //     width: 100%;
    //     height: 0.4rem;
    //     padding: 0.1rem 0.2rem;
    //     color: #1A1A1A;
    //     border-bottom: 0.01rem solid #E6E6E6;
    //     background-color: #F8F8F8;
    //     border-top-left-radius: 0.05rem;
    //     border-top-right-radius: 0.05rem;
    // }

    // .dialog .dialog-wrap .dialog-container div.dialog-content {
    //     padding: 0.2rem;
    //     min-height: 1rem;
    // }

    // .dialog .dialog-wrap .dialog-container div.btn-content {
    //     padding: 0 0.2rem 0.2rem 0.2rem;
    //     text-align: right;
    // }

    // .dialog .dialog-wrap .dialog-container div.btn-content button {
    //     margin-left: 0.1rem;
    //     width: 0.8rem;
    //     height: 0.36rem;
    //     color: #FFF;
    //     border: 0.01rem solid #FF981A;
    //     background-color: #FF981A;
    //     -webkit-transition: all 0.2s;
    //     transition: all 0.2s;
    //     border-radius: 0.03rem;
    // }

    // .dialog .dialog-wrap .dialog-container div.btn-content button.cancel {
    //     color: #999;
    //     border: 0.01rem solid #CCC;
    //     background-color: #FFF;
    // }

    // .dialog .dialog-wrap .dialog-container div.btn-content button:hover {
    //     color: #FFF;
    //     border: 0.01rem solid #FF8800;
    //     background-color: #FF8800;
    //     -webkit-transition: all 0.3s;
    //     transition: all 0.3s;
    // }

    // .dialog .dialog-wrap .dialog-container div.btn-content.btn-1 {
    //     text-align: center;
    // }

    // .dialog .dialog-wrap .dialog-container div.btn-content.btn-1 button {
    //     width: 2rem;
    //     height: 0.4rem;
    //     margin: 0;
    // }

    // .dialog-enter {
    //     opacity: 0;
    // }

    // .dialog-enter .dialog-wrap {
    //     -webkit-transform: scale(1.2);
    //     transform: scale(1.2);
    // }

    // .dialog-leave {
    //     opacity: 0;
    // }

    // .dialog-leave .dialog-wrap {
    //     -webkit-transform: scale(1.2);
    //     transform: scale(1.2);
    // }
</style>


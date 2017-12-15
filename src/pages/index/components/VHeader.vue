<template>
    <header class="v-header">
        <!-- 导航位置 -->
        <nav>{{title}}</nav>

        <!-- 默认登录页面选择 -->
        <div class="select-login">
            <span class="txt">登录后默认页面</span>
            <el-dropdown trigger="click" @command="changeLogin">
                <span class="handler">
                    {{loginSelected}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="select-login-menu">
                    <el-dropdown-item command="首页">首页</el-dropdown-item>
                    <el-dropdown-item command="我的应用">我的应用</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <!-- 公告 -->
        <div class="announcement">
            <span class="title">公告：</span>
            <p class="txt-wrap" ref="txtWrap">
                <span class="txt" ref="txt1">{{announcement}}</span>
                <span class="txt" ref="txt2" v-if="announcementsShow">{{announcement}}</span>
            </p>
        </div>
    </header>
</template>

<script>
import http from '@/common/js/http.js'
export default {
    name: 'selectLogin',
    props: {
        title: String
    },

    data() {
        return {
            loginSelected: '', // 默认登录选择
            announcement: '', // 公告
            announcementsShow: false, // 公告2是否显示
        }
    },

    created() {
        let _this = this;

        // 获取公共数据
        http.getCommonData().then(msg => {
            _this.announcement = msg.announcement;
            _this.loginSelected = (msg.loginUrl === 0 ? '首页' : '我的应用');

            // 公告滚动函数
            _this.$nextTick(() => {
                _this.calculateNote();
            })
        });
    },

    mounted() {

    },

    methods: {
        /**
         * 修改默认登录页面
         * @param value {String} 选择的默认登录页面
         */
        changeLogin(value) {
            let _this = this;

            if (_this.loginSelected !== value) { // 如果选择的值有改变
                http.saveLoginSelected({
                    data: {
                        loginUrl: value === '首页' ? 0 : 1,
                    }
                }).then(() => {
                    _this.loginSelected = value;
                });
            }
        },

        // 公告文字滚动的计算
        calculateNote() {
            let _this = this,
                wrap = _this.$refs.txtWrap,
                wrapW = wrap.offsetWidth,
                noteW = _this.$refs.txt1.offsetWidth,
                paddW = _this.$refs.txt1.offsetWidth;

            let startTimer = setTimeout(() => {
                if (noteW - 100 > wrapW) { // 文字超出范围
                    _this.announcementsShow = true;

                    let timer = setInterval(() => {
                        if (wrap.scrollLeft < noteW) { // 如果滚动完则退出
                            wrap.scrollLeft = wrap.scrollLeft + 1;
                        } else {
                            wrap.scrollLeft = 0;
                            
                            // 清除计时 重新开始
                            clearInterval(timer);
                            _this.calculateNote();
                        }
                    }, 20);

                    wrap.onmouseover = function() {
                        clearInterval(timer);
                    }
                    wrap.onmouseout = function() {
                        _this.calculateNote();
                    }
                }

                // 清除暂停时间 重新开始
                clearTimeout(startTimer);
                

                
            }, 2000);

            
        }
    }


}
</script>

<style lang="less" scoped>
@import './../../../common/less/theme.less';
.v-header {
    position: relative;

    /* 导航位置 */
    nav {
        display: flex;
        align-items: center;
        line-height: 28px;
        color: #333;
        font-size: 20px;
        font-weight: bold;

        &:before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 24px;
            margin-right: 10px;
            background: @theme-color;
            box-shadow: 0 2px 4px 0 rgba(242, 135, 3, 0.10);
            border-radius: 2px;
        }
    }

    /* 选择默登录页面 */
    .select-login {
        position: absolute;
        top: 0;
        right: 0;

        .txt {
            line-height: 26px;
            color: #999;
            font-size: 16px;
        }

        .handler {
            display: inline-block;
            width: 96px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            color: rgba(0, 0, 0, 0.65);
            font-size: 12px;
            background: #fff;
            border: 1px solid #E8E8E8;
            border-radius: 4px;
            cursor: pointer;

            .el-icon--right:before {
                position: relative;
                top: 1px;
                font-size: 16px;
                color: #000;
            }
        }

        .item:hover {
            background: #F7F7F7;
        }
    }

    /* 公告 */
    .announcement {
        display: flex;
        align-items: center;
        margin-top: 20px;
        color: #4d4d4d;
        font-size: 0;

        &:before {
            content: "";
            flex-shrink: 0;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 5px;
            background: #228EF0;
            border-radius: 50%;
        }

        .title {
            flex-shrink: 0;
            display: inline-block;
            width: 52px;
            font-size: 16px;
        }

        .txt-wrap {
            display: inline-block;
            overflow: hidden;
            font-size: 0;
            white-space: nowrap;

            .txt {
                display: inline;
                font-size: 16px;

                &:after {
                    content: '';
                    display: inline-block;
                    width: 100px;
                }
            }
        }
    }
}
</style>



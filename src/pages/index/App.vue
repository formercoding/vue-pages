<template>
    <div id="app">
        <!-- 行业选择弹窗 -->
        <select-trade :isOpen.sync="isTradeOpen" :city.sync="city" :province.sync="province"></select-trade>
        <!-- 用户引导 -->
        <user-guide :isOpen.sync="isGuideOpen"></user-guide>

        <div class="content">
            <!-- 头部组件 -->
            <v-header :title="navTitle"></v-header>

            <!-- 顶部 -->
            <div class="panel panel-top">
                <!-- 问候语模块 -->
                <div class="greeting">
                    <img class="avatar" src="http://via.placeholder.com/60x60">
                    <p class="say-hi">Hi，早上好！</p>
                    <p class="greeting-txt">早上好早上好早上好哦</p>
                </div>

                <!-- 公众号模块 -->
                <div class="wx">
                    <div class="left">
                        <h4 class="name">{{official_data.official_name}}</h4>
                        <div class="wx-info">
                            <span class="type">订阅号</span>
                            <span class="status">未认证</span>
                        </div>
                        <div class="operate">
                            <span class="send-license">提交营业执照</span>
                            <a class="empower">重新授权</a>
                        </div>
                    </div>
                    <img class="qrcode" :src="official_data.qrcode">
                </div>

                <!-- 得分模块 -->
                <div class="score">
                    <div class="left">
                        <img class="gif" src="http://via.placeholder.com/100x100">
                        <p class="num-wrap">
                            <span class="num">80</span> 分</p>
                    </div>
                    <div class="right">
                        <p class="tips">目前公众号处于初级阶段，需要快速提升</p>
                        <button class="more-btn" type="button">查看详情</button>
                    </div>
                </div>

            </div>

            <!-- 流量银行 -->
            <div class="panel panel-bank">
                <h2 class="title">流量银行</h2>
                <button class="btn" type="button">使 用</button>

                <!-- 数据展示 -->
                <ul class="bank-data">
                    <li class="data">
                        <p class="name">可用流量</p>
                        <p class="num">22222</p>
                    </li>
                    <li class="data">
                        <p class="name">冻结流量</p>
                        <p class="num">22222</p>
                    </li>
                    <li class="data">
                        <p class="name">已用流量</p>
                        <p class="num">22222</p>
                    </li>
                    <li class="data">
                        <p class="name">免费流量</p>
                        <p class="num">22222</p>
                    </li>
                </ul>
            </div>

            <!-- 流量银行模块 -->
            <div class="panel">

            </div>

            <!-- 顶部模块 -->
            <div class="panel">

            </div>

        </div>
    </div>
</template>

<script>
import SelectTrade from '@/pages/index/components/SelectTrade.vue'
import UserGuide from '@/pages/index/components/UserGuide.vue'
import VHeader from '@/pages/index/components/VHeader.vue'
import http from '@/common/js/http.js'
export default {
    name: 'app',
    data() {
        return {
            isTradeOpen: false, // 行业选择弹窗
            isGuideOpen: false, // 用户引导
            navTitle: '首页', // 当前页面对应导航
            province: '', // 省份
            city: '', // 城市
            official_data: { // 公众号数据
                account_type: 1, // 公众号类型
                appid: "wx57b1371bda498a46", // 公众号ID
                binding_state: 1, // 绑定状态
                certification_status: 1, // 认证状态
                head_img: "", // 用户头像
                official_name: "爱豆子9", // 公众号名称
                qrcode: "http://weixinapi-10006892.image.myqcloud.com/wxapi_0e5a1a0043af6a30f5872ff64727d2c1", // 二维码
            }
        }
    },

    computed: {
        // 认证状态
        accountType() {
            return official_data.certification_status === 0 ? '已认证' : '未认证';
        },

        // 用户头像
        headImg() {
            return official_data.head_img === '' ? 'http://via.placeholder.com/60x60' : official_data.head_img;
        },

        // 公众号类型
        accountType() {
            return official_data.account_type === 0 ? '订阅号' : '服务号';
        }
    },

    created() {
        let _this = this;

        // 获取首页数据
        http.getIndexData({
            params: {
                id: 0
            }
        }).then(msg => {
            let address = msg.address;

            // 地址信息
            _this.city = address.city;
            _this.province = address.province;

            // 公众号数据
            _this.official_data = msg.basic_data.official_data;
        })
    },

    components: {
        SelectTrade,
        UserGuide,
        VHeader
    }
}
</script>

<style lang="less" scoped>
@import './../../common/less/theme.less';
#app {
    position: relative;
    width: 1000px;
    height: 100vh;
    margin: 50px auto;
    background: rgba(127, 223, 235, .1);

    .content {
        .panel {
            margin-top: 20px;
            background: #FFF;
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .1);
            border-radius: 4px;
        }

        /* 顶部 */
        .panel-top {
            display: flex;
            padding: 20px 0;

            /* 问候语模块 */
            .greeting {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 206px;
                height: 120px;
                padding: 0 40px;
                text-align: center;
                border-right: 1px solid #EAEAEA;

                .avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }

                .say-hi {
                    margin: 2px 0;
                    line-height: 22px;
                    font-size: 16px;
                    color: #4D4D4D;
                }

                .greeting-txt {
                    line-height: 17px;
                    font-size: 12px;
                    color: #666666;
                }
            }

            /* 公众号模块 */
            .wx {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 344px;
                height: 120px;
                border-right: 1px solid #EAEAEA;

                .left {
                    width: 130px;
                    margin-right: 45px;
                    text-align: center;

                    .name {
                        color: #333;
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .wx-info {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;

                        .type {
                            margin-right: 10px;
                            padding: 2px 8px;
                            line-height: 20px;
                            color: #fff;
                            font-size: 14px;
                            background: #77CC66;
                            border-radius: 3px;
                        }

                        .status {
                            padding: 2px 8px;
                            line-height: 20px;
                            color: #fff;
                            font-size: 14px;
                            background: #CCC;
                            border-radius: 3px;
                        }
                    }

                    .operate {
                        margin-top: 20px;

                        .send-license {
                            color: #228EF0;
                            font-size: 12px;
                            cursor: pointer;
                        }

                        .empower {
                            color: #CCC;
                            font-size: 12px;
                            cursor: pointer;
                        }
                    }
                }

                .qrcode {
                    width: 90px;
                    height: 90px;
                }
            }

            /* 得分模块 */
            .score {
                display: flex;
                width: 449px;
                height: 120px;
                align-items: center;
                justify-content: center;

                .left {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    width: 140px;
                    height: 100px;
                    background: url('http://via.placeholder.com/140x100/red');

                    .gif {
                        position: absolute;
                        top: 0;
                        left: 20px;
                        width: 100px;
                        height: 100px;
                    }

                    .num-wrap {
                        display: flex;
                        align-items: center;
                        position: relative;
                        text-align: center;
                        color: #FFF;
                        font-size: 18px;

                        .num {
                            font-size: 32px;
                        }
                    }
                }

                .right {
                    width: 168px;
                    text-align: center;

                    .tips {
                        text-align: center;
                        line-height: 20px;
                        color: #4D4D4D;
                        font-size: 14px;
                    }

                    .more-btn {
                        margin-top: 12px;
                        padding: 7px 16px;
                        line-height: 17px;
                        color: 228EF0;
                        font-size: 12px;
                        background: #FFFFFF;
                        border: 1px solid #228EF0;
                        border-radius: 3px;
                        outline: none;
                    }
                }
            }
        }

        /* 流量银行模块 */
        .panel-bank {
            position: relative;
            padding: 20px 24px 22px;

            &:before {
                content: "";
                position: absolute;
                top: 27px;
                left: 0;
                width: 4px;
                height: 16px;
                background: #77CC66;
                border-radius: 0 2px 2px 0;
            }

            .title {
                color: #333;
                font-size: 20px;
                font-weight: bold;
            }

            .btn {
                position: absolute;
                top: 20px;
                right: 32px;
                padding: 5px 18px;
                line-height: 18px;
                color: #FFF;
                font-size: 12px;
                background: @theme-color;
                border-radius: 4px;
                .btn
            }

            /* 数据展示 */
            .bank-data {
                display: flex;
                margin-top: 20px;

                .data {
                    flex-grow: 1;
                    flex-basis: 25%;
                    padding-left: 40px;
                    text-align: left;

                    .name {
                        color: #999;
                        font-size: 14px;
                    }
                    .num {
                        display: flex;
                        align-items: flex-end;
                        height: 50px;
                        line-height: 36px;
                        color: #30BF54;
                        font-size: 36px;
                        border-right: 1px solid #D9D9D9;
                    }

                    &:last-child {
                        .num {
                            border-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>

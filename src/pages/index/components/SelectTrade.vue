<template>
    <div class="select-trade" v-show="isOpen">
        <div class="content">
            <h4 class="title">· 欢迎使用爱豆子 ·</h4>
            <div class="info">
                <p class="tips">- 补充以下信息即可<span class="important-word"> 免费使用爱豆子所有功能</span> -</p>

                <!-- 行业选择 -->
                <p class="trade-in">您所在的行业</p>
                <ul class="trades">
                    <li class="trade" :class="{active: item === tradeSelected}" 
                                      v-for="item in tradeList"
                                      @click="tradeSelected = item"
                                      :key="item">
                                      {{item}}</li>
                </ul>

                <!-- 城市选择 -->
                <p class="city-in">您所在的城市</p>
                <div class="select-city">
                    <v-distpicker :province="province" 
                                    :city="city"
                                    @city="changeCity"
                                    @province="changeProvince"
                                    hide-area></v-distpicker>
                </div>
            </div>

            <!-- 提交按钮 -->
            <div class="footer">
                <button class="btn" 
                        type="button"
                        @click="submit"
                        :disabled="isSelected">开启免费之旅</button>
            </div>
        </div>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import http from '@/common/js/http.js'
export default {
    name: 'selectTrade',
    props: {
        province: { // 选择省份
            type: String,
        },

        city: { // 选择城市
            type: String,
        },

        isOpen: { // 选择行业
            type: Boolean,
        }
    },

    data() {
        return {
            tradeList: [ // 行业集合
                '电商', '餐饮', '旅游', '媒体资讯', 
                '教育培训', '汽车', '金融', '政府组织', 
                '医院', '健康管理', '地产', '家居建材', '其他'
            ], 
            tradeSelected: '', 
        }
    },

    computed: {
        // 是否选好提交的数据
        isSelected() {
            let _this = this;
            return (_this.tradeSelected && (_this.city !== '市' ||  _this.province === '台湾省') && _this.province !== '省') ? false : true;
        }
    },

    methods: {
        /** 
         * 切换选择的城市
         * @param city {Object} 城市对象
         */
        changeCity(city) {
            this.$emit('update:city', city.value);
        },

        /** 
         * 切换选择的省份
         * @param province {Object} 省份对象
         */
        changeProvince(province) {
            this.$emit('update:province', province.value);
        },

        // 提交行业数据
        submit() {
            let _this = this;
            http.saveIndustry({
                data: {
                    province: _this.province,
                    city: _this.city,
                    industry: _this.trade
                }
            }).then(()=> {
                _this.$emit('update:isOpen', false)
            });
        }
    },

    components: {
        VDistpicker
    }
}
</script>

<style lang="less" scoped>
    .select-trade {
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        opacity: 1;
        transition: opacity 10s linear;

        .content {
            position: relative;
            width: 540px;
            height: auto;
            background: #F73;
            border-radius: 10px;
            vertical-align: middle;

            &:before {
                content: "";
                position: absolute;
                top: 90px;
                left: 10px;
                width: 100px;
                height: 10px;
                background-color: #F8E71C;
                border-radius: 8px;
                transform: rotate(-45deg);
            }

            .title {
                position: relative;
                margin: 15px auto;
                text-align: center;
                color: #fff;
                font-size: 32px;
                font-weight: 400;

                &:before {
                    content: "";
                    position: absolute;
                    top: 6px;
                    right: 30px;
                    width: 20px;
                    height: 20px;
                    background-color: #FFF;
                    border-radius: 50%;
                }

                &:after {
                    position: absolute;
                    top: 7px;
                    left: 2px;
                    width: 2px;
                    height: 2px;
                    background: #FFF;
                }

                &:after {
                    content: "";
                    position: absolute;
                    top: 30px;
                    left: auto;
                    right: 10px;
                    width: 120px;
                    height: 120px;
                    background-color: #F8E71C;
                    border-radius: 50%;
                }
            }

            .info {
                position: relative;
                width: 460px;
                margin: 0 auto 30px;
                padding: 30px;
                color: #515151;
                background-color: #FFF;
                border-radius: 8px;
                z-index: 2;

                &:before {
                    content: "";
                    position: absolute;
                    left: -30px;
                    bottom: 30px;
                    width: 14px;
                    height: 14px;
                    background: #FFBCD9;
                    border-radius: 50%;
                }
                
                .tips {
                    text-align: center;
                    line-height: 18px;
                    font-size: 16px;

                    .important-word {
                        color: #F73;
                        font-size: 18px;
                    }
                }

                .trade-in {
                    position: relative;
                    margin-top: 20px;
                    padding: 0 0 4px 10px;
                    font-weight: 400;
                    border-bottom: 1px solid #F73;
                }

                .trades {
                    margin-top: 15px;
                    font-size: 0;

                    .trade {
                        display: inline-block;
                        margin: 5px 4px;
                        padding: 4px 15px;
                        color: #F73;
                        font-size: 14px;
                        border: 1px solid #F73;
                        border-radius: 16px;
                        cursor: pointer;
                        transition: all .3s;

                        &.active {
                            color: #fff;
                            background: #F73;
                        }

                        &:hover {
                            color: #fff;
                            background: #F73;
                            transition: all .3s;
                        }
                    }
                }

                .city-in {
                    position: relative;
                    margin-top: 20px;
                    padding: 0 0 4px 10px;
                    font-weight: 400;
                    border-bottom: 1px solid #F73;
                }

                .select-city {
                    margin-top: 15px;
                    padding-left: 10px;

                    &:after {
                        content: "";
                        position: absolute;
                        right: -25px;
                        bottom: 10px;
                        width: 10px;
                        height: 10px;
                        background: #F73;
                        border: 3px solid #F8E71C;
                        border-radius: 50%;
                    }
                }
            }
        }

        .footer {
            padding: 20px 0;
            text-align: center;
            background: #FFF;
            border-radius: 0 0 10px 10px;

            .btn {
                padding: 9px 42px;
                color: #fff;
                font-size: 16px;
                background: #F73;
                border-radius: 20px;
                border: none;
                outline: none;

                &:disabled {
                    background: #CCC;
                    cursor: not-allowed;
                    transition: all .3s;
                }
            }
        }
    }
</style>



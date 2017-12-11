<template>
    <div class="select-trade">
        <div class="content">
            <h4 class="title">欢迎使用爱豆子</h4>
            <div class="info">
                <p class="tips">-补充以下信息即可<span class="important-word">免费使用爱豆子所有功能</span>-</p>

                <!-- 行业选择 -->
                <p class="trade-in">您所在的行业</p>
                <ul class="trades">
                    <li class="trade">电商</li>
                    <li class="trade">餐饮</li>
                    <li class="trade">旅游</li>
                    <li class="trade">媒体资讯</li>
                    <li class="trade">教育培训</li>
                    <li class="trade">汽车</li>
                    <li class="trade">金融</li>
                    <li class="trade">政府组织</li>
                    <li class="trade">医院</li>
                    <li class="trade">健康管理</li>
                    <li class="trade">地产</li>
                    <li class="trade">家居建材</li>
                    <li class="trade">其他</li>
                </ul>

                <!-- 城市选择 -->
                <p class="city-in">您所在的城市</p>
                <div class="select">
                    <v-distpicker province="广东省" city="广州市" hide-area></v-distpicker>
                </div>
            </div>

            <!-- 提交按钮 -->
            <div class="footer">
                <button type="button">开启免费之旅</button>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    components: {
        VDistpicker
    }
}
</script>
<style lang="less" scoped>
    .select-trade {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        opacity: 1;
        transition: opacity 10s linear;

        .content {
            position: absolute;
            top: 0;
            left: 0;
            height: ;
            width: 540px;
            
        }
    }
</style>



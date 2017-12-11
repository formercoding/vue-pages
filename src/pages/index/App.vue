<template>
    <div id="app">
        <select-trade></select-trade>
    </div>
</template>

<script>
import SelectTrade from '@/pages/index/components/SelectTrade.vue'
export default {
    name: 'app',
    data() {
        return {
            isOpen: true
        }
    },

    created() {
      
    },

    methods: {
       
    },

    components: {
        SelectTrade
    }
}
</script>

<style lang="less" scoped>
@import './../../common/less/theme.less';

</style>

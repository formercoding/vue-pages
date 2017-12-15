<template>
    <div class="user-guide" v-show="isOpen">
        <div class="fix-content">
            <ul class="guides">
                <li v-for="(img, index) in imgs" 
                    :key="index"
                    v-show="index === showIndex"
                    :class="'guide-' + (index+1)">
                    <img :src="imgs[index]" :class="'img-' + (index+1)">
                    <img v-if="showIndex === 0" class="close" @click="close" src="close.png">
                    <button type="button" 
                            @click="changeGuide(index)"
                            :class="'btn-' + (index+1)"></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userGuide',
    props: {
        isOpen: true
    },

    data() {
        return {
            imgs: [
                'http://p4.gexing.com/G1/M00/3A/E3/rBABFFGpmDuhU-NSAAC_akAXq-0260.jpg',
                'http://p2.gexing.com/G1/M00/3A/E3/rBABFFGpmDvyWGxqAAFJ3x_2gtA047.jpg',
                'http://p3.gexing.com/G1/M00/3A/88/rBABE1GpmDvSaPXMAANto07Xmo0583.jpg',
                'http://p2.gexing.com/G1/M00/3A/E3/rBABFFGpmDvhYfvkAAEXID63hEc297.jpg',
            ],
            txts: ['下一步', '下一步', '下一步', '好的'],
            showIndex: 0
        }
    },

    methods: {
        /**
         * guide切换
         * @param index {Number} 当前guide索引
         */
        changeGuide(index) {
            let _this = this;
            
            if(index === 3) { // 已阅读所有向导
                _this.$emit('update:isOpen', false);
            } else {
                _this.showIndex++;
            }
        },

        // 关闭向导
        close() {
            _this.$emit('update:isOpen', false);
        }
    }
    
}
</script>

<style lang="less" scoped>
    .user-guide {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);

        .fix-content {
            position: relative;
            width: 1210px;
            height: 100vh;
            margin: 0 auto;
            background: #FFF;

            .guide-1 {
                position: absolute;
                top: 10px;
                left: 30px;

                .img-1 {
                    width: 200px;
                    height: 200px;
                }

                .btn-1 {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 30px;
                    background: #00FFE0;
                    outline: none;
                    cursor: pointer;
                }

                .close {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                }
            }

            .guide-2 {
                position: absolute;
                top: 100px;
                left: 100px;

                .img-2 {
                    width: 200px;
                    height: 200px;
                }

                .btn-2 {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 30px;
                    background: #00FFE0;
                    outline: none;
                    cursor: pointer;
                }
            }

            .guide-3 {
                position: absolute;
                top: 20px;
                left: 200px;

                .img-3 {
                    width: 200px;
                    height: 200px;
                }

                .btn-3 {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 30px;
                    background: #000;
                    outline: none;
                    cursor: pointer;
                }
            }

            .guide-4 {
                position: absolute;
                top: 20px;
                left: 200px;

                .img-4 {
                    width: 200px;
                    height: 200px;
                }

                .btn-4 {
                    position: absolute;
                    top: 20px;
                    left: 100px;
                    width: 50px;
                    height: 30px;
                    background: #00FFE0;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
    }
</style>



<template>
    <div class='right-chart-public-table'>
        <div class='chart-head'>
            <div class='chart-title'>
                <slot name='chart-title'></slot>
            </div>
        </div>
        <div class='chart-main-contain'>
            <div class='main-bar'></div>
        </div>
    </div>
</template>

<script>
import {initBar} from '@/components/common/echart/echart';

export default {
    name: 'RightCartPublicTable',
    props: {
        bar_X: {
            type: Array,
            default() {
                return []
            }
        },
        bar_Y: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        initBar0() {
            initBar(this.$el.getElementsByClassName("main-bar")[0],this.bar_X,this.bar_Y)
        }
    }
};
</script>

<style scoped>
.chart-head {
    padding-top: 24px;
    padding-bottom: 16px;
    font-size: 12px;
}

.chart-title {
    float: left;
}
</style>

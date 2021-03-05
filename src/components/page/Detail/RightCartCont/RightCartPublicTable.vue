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
import { initBar } from '@/components/common/echart/echart';
import bus from '@/components/common/bus';

export default {
    name: 'RightCartPublicTable',
    props: {
        barWrapper: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        initBar0() {
            initBar(this.$el.getElementsByClassName('main-bar')[0], this.barWrapper.bar_X, this.barWrapper.bar_Y);
        }
    },
    mounted() {
        this.initBar0();
        bus.$on('reloadBar', () => {
            this.initBar0();
        });
    },
    destroyed() {
        bus.$off('reloadBar');
    }
};
</script>

<style scoped>
.chart-main-contain {
    margin-top: 20px;
}

.main-bar {
    width: 800px !important;
    height: 200px !important;
}

.chart-head {
    padding-bottom: 16px;
    font-size: 12px;
}

.chart-title {
    float: left;
}
</style>

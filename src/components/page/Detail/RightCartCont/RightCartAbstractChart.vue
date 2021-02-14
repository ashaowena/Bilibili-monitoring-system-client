<template>
    <div class='right-cart-abstract-chart'>
        <div class='chart-head'>
            <div class='chart-title'>
                <slot name='chart-title'></slot>
            </div>
            <div class='chart-inc-or-total'>
                <span :class='{"type-active":isTypeActive(0)}'
                      @click='initChart0(currentIndex,0)'>总量</span><span>|</span><span
                :class='{"type-active":isTypeActive(1)}' @click='initChart0(currentIndex,1)'>增量</span>
            </div>
        </div>
        <div class='chart-main-contain'>
            <div class='chart-type'>
                <div :class='{"index-active":isIndexActive(index0)}' v-for='(item,index0) in chartData' :key='index0'
                     @click='initChart0(index0,currentType)'>{{ item.type | transferIndex }}
                </div>
            </div>
            <div class='main-chart' ref='chart'></div>
        </div>
    </div>
</template>

<script>
import { initChart } from '@/components/common/echart/echart';
import bus from '@/components/common/bus';

export default {
    name: 'RightCartAbstractChart',
    props: {
        chartData: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            currentType: -1,
            currentIndex: -1
        };
    },
    methods: {
        isTypeActive(type) {
            return this.currentType === type;
        },
        isIndexActive(index) {
            return this.currentIndex === index;
        },
        initChart0(index, type) {
            this.currentIndex = index;
            this.currentType = type;
            if (type === 1) {
                initChart(this.$el.getElementsByClassName('main-chart')[0], this.chartData[index].chart_X, this.chartData[index]['d' + this.chartData[index].type]);
            } else {
                initChart(this.$el.getElementsByClassName('main-chart')[0], this.chartData[index].chart_X, this.chartData[index][this.chartData[index].type]);
            }
        }
    },
    filters: {
        transferIndex(strIndex) {
            switch (strIndex) {
                case 'fans':
                    return '粉丝';
                case 'productions':
                    return '作品';
                case 'view':
                    return '观看';
                case 'danmaku':
                    return '弹幕';
                case 'reply':
                    return '评论';
                case 'favorite':
                    return '收藏';
                case 'coin':
                    return '投币';
                case 'share':
                    return '分享';
                case 'like':
                    return '点赞';
            }
        }
    },
    mounted() {
        this.initChart0(0, 1);
        bus.$on("reloadChart",() => {
            this.initChart0(0,1)
        })
    },
    destroyed() {
        bus.$off("reloadChart")
    }

};
</script>

<style scoped lang='less'>
.chart-main-contain {
    background-color: #fdfdfd;
    display: flex;
}

.chart-type {
    font-size: 12px;
    float: left;
    width: 40px;

    div {
        padding: 10px 0 5px;
        cursor: pointer;
        border-right: 4px solid #e4e7ed;
    }
}


.main-chart {
    flex: 1;
    width: 800px;
    height: 200px;
}

.chart-head {
    padding-top: 24px;
    padding-bottom: 16px;
    font-size: 12px;
}

.chart-title {
    float: left;
}

.chart-inc-or-total {
    float: right;

    //span {
    //    padding: 0 2px;
    //    cursor: pointer
    //}
}

.type-active {
    color: #fb7399;
}

.index-active {
    color: #fb7399;
    border-right: 4px solid #fb7399 !important;
}


</style>

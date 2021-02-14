<template>
    <div class='right-cart-abstract'>
        <div class='up-period-choose'>
            <ul>
                <li @click='getDetail0(7)' :class='{active: isActive(7)}'>近7天</li>
                <li @click='getDetail0(30)' :class='{active: isActive(30)}'>近30天</li>
                <li @click='getDetail0(60)' :class='{active: isActive(60)}'>近60天</li>
                <li @click='getDetail0(90)' :class='{active: isActive(90)}'>近90天</li>
            </ul>
        </div>
        <right-cart-abstract-table :periodTabDetail='periodTabDetail'></right-cart-abstract-table>
        <right-cart-abstract-chart :chart-data='fansChart' v-if='!loading'>
            <template v-slot:chart-title >
                粉丝变化趋势图
            </template>
        </right-cart-abstract-chart>
        <right-cart-abstract-chart :chart-data='publicChart' v-if='!loading'>
            <template v-slot:chart-title>
                互动与传播变化趋势图
            </template>
        </right-cart-abstract-chart>
        <right-cart-abstract-chart :chart-data='tripletChart' v-if='!loading'>
            <template v-slot:chart-title>
                三连变化趋势图
            </template>
        </right-cart-abstract-chart>
    </div>
</template>

<script>
import { getTabDetail } from '@/utils/DetailMain';
import { periodDetail,dataChart } from '@/utils/rightchartabstractchart';
import RightCartAbstractTable from '@/components/page/Detail/RightCartCont/RightCartAbstractTable';
import RightCartAbstractChart from '@/components/page/Detail/RightCartCont/RightCartAbstractChart';
import bus from '@/components/common/bus';

export default {
    name: 'RightCartAbstract',
    props: {
        uid: {
            type: String,
            default: 0
        }
    },
    components: {
        RightCartAbstractTable,
        RightCartAbstractChart
    },
    data() {
        return {
            currentIndexDate: 7,
            periodTabDetail: [],
            loading: true,
            fansChart: [],
            publicChart: [],
            tripletChart: []
        };
    },
    methods: {
        isActive(index) {
            return index === this.currentIndexDate;
        },
        getDetail0(index) {
            this.currentIndexDate = index;
            // 获取概览数据
            getTabDetail(this.uid, this.currentIndexDate).then(res => {
                if (res.code === 200) {
                    this.periodTabDetail = res.data;
                } else if (res.code === 403) {
                    this.$message.error('请先登录');
                } else {
                    this.$message.error('服务器异常');
                }
            });
            // 获取表格数据
            periodDetail(this.uid, this.currentIndexDate).then(res => {
                if (res.code === 200) {
                    this.transfer(res.data)
                    bus.$emit("reloadChart")
                    this.loading = false
                } else if (res.code === 403) {
                    this.$message.error('请先登录');
                } else {
                    this.$message.error('服务器异常');
                }
            })
        },
        transfer(data) {
            data.dailyUpStatuses.chart_X.reverse()
            this.fansChart[0] = new dataChart(data,'fans')
            this.publicChart[0] = new dataChart(data,'view')
            this.publicChart[1] = new dataChart(data,'reply')
            this.publicChart[2] = new dataChart(data,'danmaku')
            this.publicChart[3] = new dataChart(data,'share')
            this.tripletChart[0] = new dataChart(data,'like')
            this.tripletChart[1] = new dataChart(data,'favorite')
            this.tripletChart[2] = new dataChart(data,'coin')
        }

    },
    created() {
        this.getDetail0(7);
    },
    watch: {
        uid() {
            this.getDetail0(7);
        }
    }

};
</script>

<style scoped lang='less'>
.up-period-choose {
    height: 30px;
    width: 280px;
    margin-top: 5px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #999999;
    border-radius: 4px;
    cursor: default;
    margin-bottom: 20px;

    ul {
        display: flex;

        li {
            flex: 1;
            border-left: 1px solid #999999;
            margin-left: -1px;
            font-size: 12px;

        }

    }

}

.up-period-choose ul li:hover {
    color: #999999;
}

.active {
    color: #999999;
}


</style>

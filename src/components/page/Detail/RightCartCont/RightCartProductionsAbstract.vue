<template>
    <div class='right-cart-productions-abstract'>
        <div class='productions-head'>
            <span class='productions-abstract-title'>数据概览</span>
            <div class='productions-choose'>
                <div class='data-type'>
<!--                    <ul>-->
<!--                        <li :class='{"is-type": isTypeActive(0)}' @click='getAbstractData(currentPeriod,0)'>平均数</li>-->
<!--                        <li :class='{"is-type": isTypeActive(1)}' @click='getAbstractData(currentPeriod,1)'>中位数</li>-->
<!--                    </ul>-->
                    <el-button-group>
                        <el-button :class='{"is-type": isTypeActive(0)}' @click='getAbstractData(currentPeriod,0)'>平均数</el-button>
                        <el-button :class='{"is-type": isTypeActive(1)}' @click='getAbstractData(currentPeriod,1)'>中位数</el-button>
                    </el-button-group>
                </div>
                <div class='split'></div>
                <div class='data-period'>
<!--                    <ul>-->
<!--                        <li :class='{"is-period": isPeriodActive(7)}' @click='getAbstractData(7,currentType)'>近7天</li>-->
<!--                        <li :class='{"is-period": isPeriodActive(30)}' @click='getAbstractData(30,currentType)'>近30天-->
<!--                        </li>-->
<!--                        <li :class='{"is-period": isPeriodActive(60)}' @click='getAbstractData(60,currentType)'>近60天-->
<!--                        </li>-->
<!--                        <li :class='{"is-period": isPeriodActive(90)}' @click='getAbstractData(90,currentType)'>近90天-->
<!--                        </li>-->
<!--                    </ul>-->
                    <el-button-group>
                        <el-button :class='{"is-period": isPeriodActive(7)}' @click='getAbstractData(7,currentType)'>近7天</el-button>
                        <el-button :class='{"is-period": isPeriodActive(30)}' @click='getAbstractData(30,currentType)'>近30天</el-button>
                        <el-button :class='{"is-period": isPeriodActive(60)}' @click='getAbstractData(60,currentType)'>近60天</el-button>
                        <el-button :class='{"is-period": isPeriodActive(90)}' @click='getAbstractData(90,currentType)'>近90天</el-button>
                    </el-button-group>

                </div>
            </div>
        </div>
        <div class='productions-table' v-if='!isLoading'>
            <div class='productions-table-item'>
                <div class='title'>作品数</div>
                <div class='n-box'>{{abstractData.productions}}</div>
            </div>
            <div class='productions-table-item'>
                <div class='title'>平均播放</div>
                <div class='n-box'>{{abstractData.view}}</div>
            </div>
            <div class='productions-table-item'>
                <div class='title'>平均点赞</div>
                <div class='n-box'>{{abstractData.like}}</div>
            </div>
            <div class='productions-table-item'>
                <div class='title'>平均收藏</div>
                <div class='n-box'>{{abstractData.favorite}}</div>
            </div>
            <div class='line'></div>
            <div class='productions-table-item'>
                <div class='title'>平均评论</div>
                <div class='n-box'>{{abstractData.reply}}</div>
            </div>
            <div class='productions-table-item'>
                <div class='title'>平均弹幕</div>
                <div class='n-box'>{{abstractData.danmaku}}</div>
            </div>
            <div class='productions-table-item'>
                <div class='title'>平均投币</div>
                <div class='n-box'>{{abstractData.coin}}</div>
            </div>
            <div class='productions-table-item'>
                <div class='title'>平均转发</div>
                <div class='n-box'>{{abstractData.share}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {productionsAbstract} from '@/utils/productions';

export default {
    name: 'RightCartProductionsAbstract',
    props: {
        uid: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            currentPeriod: 7,
            currentType: 0,
            abstractData: {},
            isLoading: true
        };
    },
    methods: {
        getAbstractData(Period, type) {
            this.currentPeriod = Period;
            this.currentType = type;
            this.productionsAbstract0()
        },
        isPeriodActive(Period) {
            return this.currentPeriod === Period;
        },
        isTypeActive(type) {
            return this.currentType === type;
        },
        productionsAbstract0() {
            productionsAbstract(this.uid,this.currentType, this.currentPeriod).then(res => {
                if(res.code === 200) {
                    this.abstractData = res.data
                    this.isLoading = false
                } else {
                    this.$message.error("服务异常")
                }
            }).catch(e => {
                this.$message.error("网络异常")
            })
        }
    },
    created() {
        this.productionsAbstract0()
    },
    watch: {
        uid() {
            this.productionsAbstract0()
        }
    }
};
</script>

<style scoped lang='less'>

.productions-table {
    border: 1px solid #eee;
    display: flex;
    height: 150px;
    padding: 24px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 24px;

    line-height: 100%;
    text-align: center;

    .productions-table-item {
        flex: 1;
        display: block;
        max-width: 25%;
        min-width: 25%;

        .title {
            font-size: 13px;
            color: #909399;
            padding-bottom: 12px;
        }

        .n-box {
            color: #303133;
            font-size: 16px;
            font-weight: 400;
        }

    }

    .line {
        height: 0.5px;
        background-color: #eee;
        display: inline-block;
        width: 100%;
        margin: 24px 0;
    }
}


.productions-abstract-title {
    margin-top: 10px;
    display: inline-block;
    font-size: 12px;
    color: #333;

}

.productions-choose {
    float: right;
}

.split {
    margin: 7px 20px;
    float: right;
    display: block;
    font-size: 20px;
    background-color: #dcdfe6;
    width: 1px;
    height: 24px;
}

.data-type, .data-period {
    height: 30px;
    width: 140px;
    margin-top: 5px;
    line-height: 30px;
    text-align: center;
    //border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    float: right;

    ul {
        display: flex;

        li {
            flex: 1;
            border-left: 1px solid #dcdfe6;
            margin-left: -1px;
            font-size: 12px;

        }

    }

}

.productions-head::after {
    content: "";
    display: block;
    height: 40px
}

.data-period {
    width: 280px;
}

//.is-period {
//    color: #fb7399;
//    border: 1px solid #fb7399;
//}
//
//.is-type {
//    color: #fb7399;
//    border: 1px solid #fb7399;
//}
//
//.active {
//    color: #fb7399;
//}

.is-period {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.is-type {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.active {}



</style>

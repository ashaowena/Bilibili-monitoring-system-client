<template>
    <div class='right-cart-abstract-table'>
        <div class='flex flex-top'>
            <div class='table-title'>
                <span>当前周期</span>
                上一周期
            </div>
            <div class='table-data'>新增作品
                <div class='tab-util'>
                    <span>{{ getData(0, 'dproductions') }}&nbsp;</span><span :class='getColor("dproductions")'>{{ getPercentage('dproductions') }}%
                    <li :class='getIcon("dproductions")'></li></span>
                </div>
                {{ getData(1, 'dproductions') }}
            </div>
            <div class='table-data'>新增粉丝
                <div class='tab-util'><span>{{ getData(0, 'dfans') }}&nbsp;</span><span :class='getColor("dfans")'>{{ getPercentage('dfans') }}%
                    <li :class='getIcon("dfans")'></li></span>
                </div>
                {{ getData(1, 'dfans') }}
            </div>
            <div class='table-data'>新增播放
                <div class='tab-util'><span>{{ getData(0, 'dview') }}&nbsp;</span><span :class='getColor("dview")'>{{ getPercentage('dview') }}%
                    <li :class='getIcon("dview")'></li></span>
                </div>
                {{ getData(1, 'dview') }}
            </div>
            <div class='table-data'>新增点赞
                <div class='tab-util'><span>{{ getData(0, 'dlike') }}&nbsp;</span><span :class='getColor("dlike")'>{{ getPercentage('dlike') }}%
                    <li :class='getIcon("dlike")'></li></span>
                </div>
                {{ getData(1, 'dlike') }}
            </div>
        </div>
        <div class='flex flex-bottom'>
            <div class='table-title '>
                <span>当前周期</span>
                上一周期
            </div>
            <div class='table-data'>新增收藏
                <div class='tab-util'><span>{{ getData(0, 'dfavorite') }}&nbsp;</span><span :class='getColor("dfavorite")'>{{ getPercentage('dfavorite') }}%
                    <li :class='getIcon("dfavorite")'></li></span>
                </div>
                {{ getData(1, 'dfavorite') }}
            </div>
            <div class='table-data'>新增弹幕
                <div class='tab-util'><span>{{ getData(0, 'ddanmaku') }}&nbsp;</span><span :class='getColor("ddanmaku")'>{{ getPercentage('ddanmaku') }}%
                    <li :class='getIcon("ddanmaku")'></li></span>
                </div>
                {{ getData(1, 'ddanmaku') }}
            </div>
            <div class='table-data'>新增分享
                <div class='tab-util'><span>{{ getData(0, 'dshare') }}&nbsp;</span><span :class='getColor("dshare")'>{{ getPercentage('dshare') }}%
                    <li :class='getIcon("dshare")'></li></span>
                </div>
                {{ getData(1, 'dshare') }}
            </div>
            <div class='table-data'>新增投币
                <div class='tab-util'><span>{{ getData(0, 'dcoin') }}&nbsp;</span><span :class='getColor("dcoin")'>{{ getPercentage('dcoin') }}%
                    <li :class='getIcon("dcoin")'></li></span>
                </div>
                {{ getData(1, 'dcoin') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RightCartAbstractTable',
    props: {
        periodTabDetail: {
            type: Array
        }
    },
    data() {
        return {
            up: []
        };
    },
    methods: {
        getData(index, item) {
            if (!this.periodTabDetail || !this.periodTabDetail[index]) {
                return '-';
            }
            return this.periodTabDetail[index][item];
        },
        getPercentage(item) {
            let now = this.getData(0, item);
            let before = this.getData(1, item);
            if (now === '-' || before === '-') {
                return 0;
            }
            if (before === 0 && now > 0) {
                return (100).toFixed(2)
            }
            if (before ===0 && now ===0) {
                return 0
            }
            let per = (((now - before) / Math.abs(before)) * 100).toFixed(2);
            return per;
        },
        getIcon(item) {
            let obj = {}
            if (this.getPercentage(item) > 0) {
                obj['el-icon-caret-top'] = true
            } else {
                obj['el-icon-caret-bottom'] = true
            }
            return obj
        },
        getColor(item) {
            let obj = {}
            if (this.getPercentage(item) > 0) {
                obj['up'] = true
            } else {
                obj['down'] = true
            }
            return obj
        }

    }
};
</script>

<style scoped lang='less'>
.flex {
    display: flex;

}


.right-cart-abstract-table {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 24px;
}

.flex-top .table-data {
    flex: 1;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    margin-right: 20px;
    padding-bottom: 10px;

    span {
        //color: #303133;
    }
}

.up {
    color: #fb7399;
}

.down {
    color: #00a854;
}

.flex-bottom .table-data {
    padding-top: 10px;

    .tab-util {
        padding-top: 20px;
    }

    span {
        //color: #303133;
    }
}

.tab-util {
    padding-top: 30px;
    padding-bottom: 10px;


    li {
        margin-left: -4px;
    }

}

.table-data {
    flex: 1;
    font-size: 12px;
    margin-right: 20px;

}


.table-title {
    font-size: 12px;
    padding-top: 48px;
    padding-right: 20px;

    span {
        display: block;
        margin-bottom: 8px;
    }
}
</style>

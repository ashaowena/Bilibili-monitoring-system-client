<template>
    <div class='rigth-cart-public-select'>
        <div class='select-head'>
            <div class='select-title'>
                热门评论
            </div>
        </div>
        <div class='selector'>
            <el-button-group class='button-group'>
                <el-button :class='{"is-period": isPeriodActive(0)}' @click='selectPeriod(0)'>全部</el-button>
                <el-button :class='{"is-period": isPeriodActive(7)}' @click='selectPeriod(7)'>近7天</el-button>
                <el-button :class='{"is-period": isPeriodActive(30)}' @click='selectPeriod(30)'>近30天</el-button>
                <el-button :class='{"is-period": isPeriodActive(90)}' @click='selectPeriod(90)'>近90天</el-button>
            </el-button-group>
            <div class='input'>
                <el-input placeholder="请输入内容" v-model="keyword" class="input-with-selec">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <div class='comment-list'>
            <div class='comment-item'>
                <div class='img'>
                    <el-image src=''></el-image>
                </div>
                <div class='comment-content'>
                    <div class='comment-name'>aaa</div>
                    <div class='comment-time'>bbb</div>
                    <div class='comment-text'>ccc</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RightCartPublicSelect',
    data() {
        return {
            keyword: '',
            period: 0
        }
    },
    methods: {
        isPeriodActive(period) {
            return this.period === period;
        },
        selectPeriod(period) {
            this.period = period
        }
    }
};
</script>

<style scoped lang='less'>

.comment-content {
    flex: 1;
}

.comment-list {
    padding: 0 16px;
    background-color: #fdfdfd;
    border: 1px solid #eee;
}

.comment-item {
    display: flex;
    border-bottom: 1px solid #ebeef5;
    padding: 16px 0;
    .img {
        width: 58px;
        height: 48px;
        margin-right: 6px;
    }

}


.button-group {
    float: left;
}

.input {
    float: right;
}

.select-head {
    padding-bottom: 16px;
    font-size: 12px;
}

.selector::after {
    content: "";
    height: 50px;
    display: block;
}

.select-head::after {
    content: "";
    height: 12px;
    display: block;
}

.select-title {
    float: left;
}

.is-period {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
</style>

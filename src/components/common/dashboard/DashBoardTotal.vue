<template>
    <div class='dash-board-total'>
        <div class='up-title'>
            <span>合计</span>
        </div>
        <div class='up-data'>
            <div class='up-head'>
                <div style='margin-top: 12px'>今日</div>
                <div>昨日</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{ total('today_increment', 'dproductions') }}</div>
                <div>{{ total('before_increment', 'dproductions') }}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{ total('today_increment', 'dfans') }}</div>
                <div>{{ total('before_increment', 'dfans') }}</div>
            </div>
            <div class='item '>
                <div style='margin-top: 12px'>{{ total('today_increment', 'dlike') }}</div>
                <div>{{ total('before_increment', 'dlike') }}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{ total('today_increment', 'dfavorite') }}</div>
                <div>{{ total('before_increment', 'dfavorite') }}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{ total('today_increment', 'dcoin') }}</div>
                <div>{{ total('before_increment', 'dcoin') }}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{ total('today_increment', 'dreply') }}</div>
                <div>{{ total('before_increment', 'dreply') }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashBoardTotal',
    props: {
        ups: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        total(type, deepType) {
            return this.ups.reduce((p, n) => {
                return p + n[type][deepType];
            }, 0);
        }
    },
    created() {
        // console.log(this.total('today_increment','dproductions'));
    }
};
</script>

<style scoped lang='less'>

.item {
    width: 86px;
    float: left;
    text-align: center;
    height: 100%;
}

.up-head {

    float: left;
    width: 55px;
    height: 44px;
}

.up-data {
    float: right;
    height: 60px;
    width: 580px;
}

.body-item {
    height: 60px;
    font-size: 12px;
}

.up-title {
    width: 55px;
    float: left;
}


.upInfo {
    float: left;
    //border: 1px solid black;
    width: 200px;
    height: 100%;
    margin: -1px 0;

    span {
        display: block;
        float: left;
        line-height: 50px;
    }
}

//.up-data {
//    float: right;
//    //border: 1px solid black;
//    width: 580px;
//    height: 100%;
//    margin: -1px 0;
//
//}
</style>

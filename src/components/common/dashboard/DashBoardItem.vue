<template>
    <div class='body-item'>
        <div class='upInfo'>
            <el-image fit="cover" class='img' :src='"http://127.0.0.1/proxyImg?path=" + this.Up.face'></el-image>
            <span>{{Up.name}}</span>
        </div>
        <div class='up-data'>
            <div class='up-title'>
                <div style='margin-top: 12px'>今日</div>
                <div>昨日</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{Up.today_increment.dproductions}}</div>
                <div>{{Up.before_increment.dproductions}}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{Up.today_increment.dfans}}</div>
                <div>{{Up.before_increment.dfans}}</div>
            </div>
            <div class='item '>
                <div style='margin-top: 12px'>{{Up.today_increment.dlike}}</div>
                <div>{{Up.before_increment.dlike}}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{Up.today_increment.dfavorite}}</div>
                <div>{{Up.before_increment.dfavorite}}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{Up.today_increment.dcoin}}</div>
                <div>{{Up.before_increment.dcoin}}</div>
            </div>
            <div class='item'>
                <div style='margin-top: 12px'>{{Up.today_increment.dreply}}</div>
                <div>{{Up.before_increment.dreply}}</div>
            </div>

        </div>
    </div>
</template>

<script>


export default {
    name: 'DashBoardItem',
    props: {
        Up: {
            type: Object,
            default: {}
        }
    }

};
</script>

<style scoped lang='less'>

.img {
    float: left;
    height: 40px;
    width: 40px;
    padding-right: 10px;
    padding-top: 5px;
    border-radius: 50%;

}

.body-item {
    height: 60px;
    font-size: 12px;

    .up-title {
        width: 55px;
        float: left;
    }

    .item {
        width: 86px;
        float: left;
        text-align: center;
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

    .up-data {
        float: right;
        //border: 1px solid black;
        width: 580px;
        height: 100%;
        margin: -1px 0;

    }
}
</style>

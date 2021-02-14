<template>
    <div>
        <el-row :gutter='20'>
            <el-col :span='24'>
                <el-card shadow='hover' class='mgb20' style='height:604px;'>
                    <div class='handle-box'>
                        <select-wrapper @selectItem='getUpsByGroup0'>
                            <template slot='default'>按分组查看</template>
                        </select-wrapper>
                    </div>
                    <div class='main-data'>
                        <div class='main-data-head'>
                            <span>up主信息</span>
                            <ul>
                                <li>新增作品
                                    <div class='down'></div>
                                </li>
                                <li>新增粉丝
                                    <div class='down'></div>
                                </li>
                                <li>新增点赞
                                    <div class='down'></div>
                                </li>
                                <li>新增收藏
                                    <div class='down'></div>
                                </li>
                                <li>新增投币
                                    <div class='down'></div>
                                </li>
                                <li>新增评论
                                    <div class='down'></div>
                                </li>
                            </ul>
                        </div>
                        <div class='main-data-body'>
                            <dash-board-item v-for='(item,index) in Ups' :Up='item' :key='index'></dash-board-item>
                            <div v-if='this.loading' class='loading'>加载中，请稍后。。。</div>
                        </div>
                        <div class='main-data-bottom'>
                            <span>合计</span>
                            <div class='up-data'>
                                <div style='margin-top: 15px'>今日</div>
                                <div>昨日</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import DashBoardItem from '@/components/common/dashboard/DashBoardItem';
import SelectWrapper from '@/components/common/content/SelectWrapper';
import {refreshData} from '@/mixin/mixin';


export default {
    name: 'dashboard',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
        };
    },
    components: {
        DashBoardItem,
        SelectWrapper
    },
    mixins: [refreshData],
    methods: {
        convertDefault(vaule) {
            return vaule.startsWith('default:') ? '无分组' : vaule;
        },
        getUpsByGroup0(group) {
            let ups = this.getUpsByGroup(group);
            this.Ups = ups
        }

    },
    activated() {
        // this.refresh()
    },
    created() {
        this.refresh()
    }

};
</script>


<style scoped lang='less'>
.select-title {
    float: left;
    line-height: 32px;
}

.loading {
    height: 60px;
}

.main-data-body {
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
}

.main-data-bottom {
    font-size: 12px;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #999999;

    .up-data {
        float: right;
        //border: 1px solid black;
        width: 580px;
        height: 100%;
        margin: -1px 0;
        line-height: 100%;

    }
}

.main-data-head {
    font-size: 12px;
    border-top: 1px solid #999999;
    height: 35px;

    span {
        color: #999999;
        line-height: 35px;
    }

    ul {
        margin: 8px 0;
        float: right;

        li {
            float: left;
            margin: 0 10px;
        }

        .up {
            border-top: 4px solid black;
            border-left: 4px solid white;
            border-right: 4px solid white;
            float: right;
            margin: 6px 5px;
        }

        .down {
            border-bottom: 4px solid black;
            border-left: 4px solid white;
            border-right: 4px solid white;
            float: right;
            margin: 6px 5px;
        }

    }
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.mr10 {
    margin-right: 10px;
}


.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}


.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}


.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}


</style>

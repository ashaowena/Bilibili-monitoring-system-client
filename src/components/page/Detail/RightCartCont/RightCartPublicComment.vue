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
                <el-input placeholder='请输入内容' v-model='keyword' class='input-with-select' @click.native='search'>
                    <el-button slot='append' icon='el-icon-search'></el-button>
                </el-input>
            </div>
        </div>
        <div class='comment-list' v-if='!isLoading'>
            <div class='comment-item' v-if='replies.length !== 0' v-for='(item,key) in replies' :key='key'>
                <div class='img'>
                    <el-image class='real-img' :src='"http://127.0.0.1/proxyImg?path=" + item.face'></el-image>
                </div>
                <div class='comment-content'>
                    <div class='comment-name'><a class='comment-user-page'
                                                 :src='"https://space.bilibili.com/" + item.mid'
                                                 target='_blank'>{{ item.name }}</a><span class='source'>来自：</span>
                        <el-link :src='"https://www.bilibili.com/video/" + item.bvid' type='danger' :underline='false'
                                 class='source-video'>{{ item.title }}
                        </el-link>
                        <div class='comment-like '>{{item.like}}</div>
                    </div>
                    <div class='comment-time'>{{ item.ctime | formatDate0 }}</div>
                    <div class='comment-text'>{{ item.message }}</div>
                </div>
            </div>
            <div class='no-comment' v-if='replies.length === 0'>暂无评论！</div>
        </div>
    </div>
</template>

<script>
import { getPublicReplies } from '@/utils/public';
import { formatDate } from '@/utils/utils';



export default {
    name: 'RightCartPublicSelect',
    data() {
        return {
            keyword: '',
            period: 0,
            replies: [],
            isLoading: true
        };
    },
    props: {
        uid: {
            type: String,
            default() {
                return '';
            }
        }
    },
    methods: {
        search() {
            this.getPublicReplies0()
        },
        isPeriodActive(period) {
            return this.period === period;
        },
        selectPeriod(period) {
            this.period = period;
            this.getPublicReplies0()
        },
        getPublicReplies0() {
            getPublicReplies(this.uid, this.keyword, this.period).then(res => {
                if (res.code === 200) {
                    this.replies = res.data;
                    this.isLoading = false;
                } else {
                    this.$message.error('服务异常');
                }
            }).catch(e => {
                this.$message.error('网络异常');
            });
        }
    },
    filters: {
        formatDate0(date) {
            let localDate = new Date();
            localDate.setTime(date * 1000);
            return formatDate(localDate, 'yyyy-MM-dd hh:mm:ss');
        }
    },
    created() {
        this.getPublicReplies0();
    }
};
</script>

<style scoped lang='less'>

.no-comment {
    text-align: center;
    color: #999999;
    height: 48px;
}

.comment-like {
    float: right;
}

.comment-like::before {
    background: url("~@/assets/img/like.svg")  no-repeat center;
    background-size: cover;
    content: "";
    width: 13px;
    height: 13px;
    display: inline-block;
    margin-right: 6px;
}

.comment-text {
    color: #303133;
    font-size: 10px;
    padding-top: 8px;
}

.comment-time {
    color: #c0c4cc;
    font-size: 8px;
}


.comment-user-page {
    cursor: pointer;


}

.comment-user-page:hover {
    color: #7d7d80;
}


.source {
    margin-left: 16px;
    color: #c0c4cc;
}

.source-video {
    cursor: pointer;
    font-size: 10px;
}

.comment-name {
    color: #606266;
    font-size: 10px;

}

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

        .real-img {
            border-radius: 50%;
            width: 48px;
            height: 45px;
        }

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

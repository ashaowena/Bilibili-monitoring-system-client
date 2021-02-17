<template>
    <div class='right-cart-productions-item'>
        <div class='video-info'>
            <div class='up-info0'>
                <el-image :src='"http://127.0.0.1/proxyImg?path=https:" + videoItem.pic' fit="cover" class='video-img'></el-image>
            </div>
            <div class='up-info'>
                <div class='up-info-name'>
                    <a class='info-name'>{{ videoItem.title }}</a>
                    <el-tag class='info-type' size='mini' v-if='videoItem.copyright === 1'>自制</el-tag>
                    <el-tag type='warning' class='info-type' size='mini' v-if='videoItem.is_union_video === 1'>团队
                    </el-tag>
                </div>
                <div class='up-info-description'>
                    <div v-if='videoItem.description !== "-" ' class='info-description'><span>简介：</span>
                        <a>{{ videoItem.description }}</a></div>
                    <div v-else class='info-description'>
                        <span>暂无简介</span>
                    </div>
                    <div class='up-info-ctime'>{{ videoItem.ctime | formatDate0 }}&nbsp;发布</div>
                    <div class='up-info-tags'>
                        <el-tag class='up-info-tag' type='info' size='mini' v-for='(item,index) in videoItem.tag'
                                :key='index'>{{ item }}
                        </el-tag>
                    </div>
                </div>
                <div class='buttons'>
                    <el-button class='button' @click='openVideo'>播放视频</el-button>
                    <el-button class='button'>分析视频</el-button>
                </div>
            </div>
        </div>
        <ul class='video-data'>
            <li v-if='videoItem.hot' ><span>热度</span><strong></strong></li>
            <li><span>播放数</span><strong>{{videoItem.view}}</strong></li>
            <li><span>点赞数</span><strong>{{videoItem.like}}</strong></li>
            <li><span>搜藏数</span><strong>{{videoItem.favorite}}</strong></li>
            <li><span>评论数</span><strong>{{videoItem.reply}}</strong></li>
            <li><span>弹幕数</span><strong>{{videoItem.danmaku}}</strong></li>
            <li><span>投币数</span><strong>{{videoItem.coin}}</strong></li>
            <li><span>分享数</span><strong>{{videoItem.share}}</strong></li>
        </ul>
    </div>
</template>

<script>
import { formatDate } from '@/utils/utils';

export default {
    name: 'RightCartProductionsItem',
    props: {
        videoItem: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        openVideo() {
            window.open('https://www.bilibili.com/video/' + this.videoItem.bvid ,'_blank')
        }
    },
    filters: {
        formatDate0(ctime) {
            let date = new Date();
            date.setTime(ctime * 1000);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    }
};
</script>

<style scoped lang='less'>

.buttons {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    vertical-align: middle;
    .button {
        margin-left: 0;
        margin-bottom: 5px;
    }

}

.info-description {
    font-size: 12px;
}

.up-info-tag {
    margin: 0 4px 4px 0;
    text-overflow: ellipsis;
}

.up-info-description {
    color: #606266;
    span {
        color: #c0c4cc;
    }
}

.up-info-name {
    margin-bottom: 12px;

    .info-name {
        font-size: 15px;
        overflow: hidden;

    }

    .info-type {
        margin-left: 6px;
    }
}

.up-info-ctime {
    padding: 8px 0;
    font-size: 12px;
    color: #333;
}


a {
    cursor: pointer;
}

.up-info-tags {
    display: flex;
    flex-wrap: wrap;
}

.video-info {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    position: relative;
    display: flex;
}

.video-img {
    width: 184px;
    height: 100%;
    border-radius: 2px;
    padding-right: 16px;
}

.video-data {
    display: flex;
    padding-top: 20px;

    li {
        flex: 1;
        text-align: center;

        strong {
            display: block;
        }

        span {
            font-size: 12px;
            color: #909399;
            padding-bottom: 10px;

            display: block;
        }
    }

}

.right-cart-productions-item {
    border: 1px solid #dcdfe6;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 15px;
}
</style>

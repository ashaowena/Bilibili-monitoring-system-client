<template>
    <div class='detail-left-col'>
        <el-card shadow='hover' class='mgb20' style='height: 500px'>
            <div class='user-info'  v-if='UpDetail != null && UpDetail.info != null'>
                <div class='user-info-cont0'>
                    <el-image
                        class='table-td-thumb'
                        :src='"http://127.0.0.1/proxyImg?path=" + UpDetail.info.face'
                    ></el-image>
                    <div class='user-info-head'>
                        <el-link :underline='false' target='_blank'
                                 :href='"https://space.bilibili.com/" + UpDetail.info.mid'>
                            <div class='user-name'>{{ UpDetail.info.name }}</div>
                        </el-link>
                        <div class='user-uid'>uid:{{ UpDetail.info.mid }}</div>
                    </div>
                </div>
                <div class='user-info-cont1'>
                    <span>分类：<em></em></span><span>性别：<em>{{ UpDetail.info.sex }}</em></span>
                    <span>等级：<em>{{ UpDetail.info.level }}</em></span><span>会员：<em>{{UpDetail.vip}}</em></span>
                </div>
                <div class='user-info-cont2' :class='{"open": isOpen}'>
                    <p><span>官方认证类型：</span>{{ UpDetail.info.offical }}</p>
                    <p><span>个性签名：</span>{{ UpDetail.info.sign }}</p>
                    <div class='video-label'>
                        label
                    </div>
                </div>
                <div class='more-button' @click='isOpen = !isOpen'>
                    <i :class='{"el-icon-bottom": !isOpen,"el-icon-top": isOpen}'></i>
                    更多资料
                </div>
                <el-button type='primary' class='el-icon-refresh'> 立即刷新</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>


export default {
    name: 'DetailLeftCol',
    props: {
        UpDetails: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isOpen: false,
        };
    },
    computed: {
        UpDetail() {
            return this.UpDetails.find(item => item.upStatus.uid === this.$route.params.uid);
        }
    },
    created() {
        console.log(this.UpDetails);
    }
};
</script>

<style scoped lang='less'>

el-button {
    background-color: #FFFFFF;
}

.user-info-cont2 {
    overflow: hidden;
    height: 0;
    transition: height 300ms ease 0ms;
}

.open {
    height: 60px;
    transition: height 300ms ease 0ms;
}


.more-button {
    text-align: center;
    line-height: 1;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 15px;
    cursor: default
}

.more-button:hover {
    color: #999999;
}

.user-info-cont0 {
    height: 60px;
    margin-bottom: 15px;
}

.table-td-thumb {
    float: left;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: 12px;

}

.user-info-cont1 {
    height: 60px;

    span {
        display: block;
        float: left;
        height: 50%;
        width: 50%;
        font-size: 12px;
        color: #999999;

        em {
            color: #000000;
            font-style: normal;
        }
    }
}

.user-info-cont2 {
    font-size: 12px;

    span {
        height: 50%;
        width: 50%;
        font-size: 12px;
        color: #999999;
    }
}

.user-info-head {
    float: left;
    height: 60px;
    padding-top: 8px;

    .user-name {
        font-size: 13px;
        font-weight: 500;


    }

    .user-uid {
        font-size: 6px;
        color: #999999;
        flex: 1;
        margin: 5px 0;
    }


}
</style>

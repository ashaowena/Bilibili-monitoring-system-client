<template>
    <div class='right-cart-public'>
        <right-cart-public-table :barWrapper='replyBar' v-if='!isLoading'>
            <template slot='chart-title'>
                评论热词TOP10
            </template>
        </right-cart-public-table>
        <right-cart-public-table :barWrapper='danmakuBar' v-if='!isLoading'>
            <template slot='chart-title'>
                弹幕热词TOP10
            </template>
        </right-cart-public-table>
        <right-cart-public-comment :uid='uid'></right-cart-public-comment>
    </div>
</template>

<script>
import RightCartPublicTable from '@/components/page/Detail/RightCartCont/RightCartPublicTable';
import RightCartPublicComment from '@/components/page/Detail/RightCartCont/RightCartPublicComment';
import {getPublicBarData} from '@/utils/public';
import bus from '@/components/common/bus';

export default {
    name: 'RightCartPublic',
    components: {
        RightCartPublicTable,
        RightCartPublicComment
    },
    props: {
        uid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            replyBar: {},
            danmakuBar: {},
            isLoading: true
        }
    },
    methods: {
        getPublicBarData0() {
            getPublicBarData(this.uid).then(res => {
                if (res.code === 200) {
                    this.replyBar = res.data.replyBar
                    this.danmakuBar = res.data.danmakuBar
                    this.isLoading = false
                    bus.$emit("reloadBar")
                } else {
                    this.$message.error("服务异常")
                }
            }).catch(e => {
                this.$message.error("网络异常")
            })
        }
    },
    created() {
        this.getPublicBarData0()
    },
    watch: {
        uid() {
             this.getPublicBarData0()
        }
    }
};
</script>

<style scoped>

</style>

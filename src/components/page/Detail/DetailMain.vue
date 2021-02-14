<template>
    <div class='detail-main'>
        <el-row :gutter='24' style='height: 500px'>
            <el-col :span='5'>
                <div class='detail-left-card'>
                    <detail-left-card :UpDetails='UpDetails'></detail-left-card>
                </div>
            </el-col>
            <el-col :span='19'>
                <div class='detail-right-card'>
                    <detail-right-card :upDetails='UpDetails'></detail-right-card>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import DetailLeftCard from '@/components/page/Detail/DetailLeftCard';
import DetailRightCard from '@/components/page/Detail/DetailRightCard';
import { getDetail } from '@/utils/DetailMain';


export default {
    name: 'DetailMain',
    components: {
        DetailLeftCard,
        DetailRightCard
    },
    data() {
        return {
            UpDetails: []
        };
    },
    created() {
        getDetail().then(res => {
            if (res.code === 200) {
                this.UpDetails = res.data;
            } else {
                this.$message.error('请先登录');
            }
        }).catch(err => {
            this.$message.error('服务器异常');
        });
    }

};
</script>

<style scoped>
/*.detail-left-card {*/
/*    float: left;*/
/*}*/
/*.detail-right-card {*/
/*    float: left;*/
/*}*/


</style>

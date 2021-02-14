<template>
    <div class='info-table'>
        <div class='table'>
            <div class='up-face'>
                <el-image
                    class='img'
                    :src='tableData.face'
                    fit='cover'></el-image>
            </div>
            <div class='up-info'>
                <div class='row-first'>
                    <span>昵称：</span><span>{{ tableData.name }}</span>
                </div>
                <div class='row-second'>
                    <div>
                        <span>等级：</span><span>{{ tableData.level }}</span>
                    </div>
                    <div>
                        <span>性别：</span><span>{{ tableData.sex }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoTable',
    props: {
        tableData: {
            type: Object,
            default: {}
        }
    }

};
</script>

<style scoped lang='less'>
.table {
    margin-bottom: 18px;

}

.info-table {
    position: relative;

    .table {
        position: absolute;
        left: 10px;

        .up-face {
            float: left;
            margin-right: 15px;
        }

        .img {
            border-radius: 50%;
            width: 65px;
            height: 65px;
        }

        .up-info {
            float: left;
        }


    }

}

.info-table::after {
    content: "";
    display: block;
    height: 65px;
}


</style>

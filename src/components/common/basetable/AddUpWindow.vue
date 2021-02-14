<template>
    <div class='add-up-window'>
        <el-button
            @click='dialogVisible = true'
            type="primary"
            icon="el-icon-plus"
            class="handle-add mr10">添加账户</el-button>
        <el-dialog
            title='添加账户'
            :visible.sync='dialogVisible'
            width='30%'
            :before-close='handleClose'>
            <el-form :model="form">
                <el-form-item label="UID" :label-width="formLabelWidth">
                    <el-input v-model="form.uid" autocomplete="off" style='width: 200px' @blur='searchUp'></el-input>
                    <el-alert
                        class='alert'
                        v-if='warn !== "" && !upInfo'
                        :title="this.warn"
                        type="error"
                        :closable='false'
                    >
                    </el-alert>
                </el-form-item>
                <info-table v-if='upInfo' :tableData='upInfo'></info-table>
                <el-form-item label="分组" :label-width="formLabelWidth">
                    <select-wrapper @selectItem='addUpByGroup'></select-wrapper>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
            <el-button @click='dialogVisible = false'>取 消</el-button>
            <el-button type='primary' @click='submitForm'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import SelectWrapper from '@/components/common/content/SelectWrapper';
import InfoTable from '@/components/common/basetable/InfoTable';
import {searchUp, addUp, UpInfo} from '@/utils/BaseTab';

export default {
    name: 'AddUpWindow',
    components: { SelectWrapper,
        InfoTable
    },
    data() {
        return {
            dialogVisible: false,
            form: {
                uid: '',
                groupId: 0
            },
            upInfo: null,
            warn: '',
            formLabelWidth: '120px'
        };
    },
    methods: {
        handleClose(done) {
            done()
        },
        addUpByGroup(group) {
            this.form.groupId = group.id
        },
        submitForm() {
            this.dialogVisible = false
            addUp(this.form).then(res => {
                if (res.code ===200) {
                    this.$emit("submitSuccess")
                } else {
                    this.$message.error("服务异常")
                }
            }).catch(err => {
                this.$message.error("网络请求失败")
            })
        },
        searchUp() {
            searchUp(this.form.uid).then(res => {
                if(res.code === 200){
                    this.warn = ''
                    this.upInfo = new UpInfo(res.data);
                } else {
                    this.warn = res.msg
                }
            }).catch(err => {
                this.$message.error("网络请求失败")
            })
        }
    }
};
</script>

<style scoped>
.handle-add {
    float: left;
    height: 32px;
}

.mr10 {
    margin-right: 10px;
}

.alert {
    width: 183px;
    height: 32px;
    padding: 0;
    margin-top: 5px;
}

</style>

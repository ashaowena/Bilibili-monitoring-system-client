<template>
    <div class='change-up-group-window'>
        <el-button
            type="text"
            icon="el-icon-edit"
            @click='dialogVisible = true'
        >修改分组</el-button>
        <el-dialog
            title='修改分组'
            :visible.sync='dialogVisible'
            width='30%'
            :before-close='handleClose'>
            <el-form>
                <el-form-item label="Up主" :label-width="formLabelWidth">
                    <el-input v-model="Up.name" autocomplete="off" disabled style='width: 200px'></el-input>
                </el-form-item>
                <el-form-item label="UID" :label-width="formLabelWidth">
                    <el-input v-model="Up.uid" autocomplete="off" disabled style='width: 200px'></el-input>
                </el-form-item>
                <el-form-item label="分组" :label-width="formLabelWidth">
                    <select-wrapper class='select' @selectItem='changeGroup' :now-item='Up.group'></select-wrapper>
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
import { changeUpGroup } from '@/utils/BaseTab';
import SelectWrapper from '@/components/common/content/SelectWrapper';
import { refreshData } from '@/mixin/mixin'

export default {
    name: 'ChangeGroupWindow',
    components: {
      SelectWrapper
    },
    props: {
      Up: {
          type: Object,
          default: {}
      }
    },
    mixins: [refreshData],
    data() {
        return {
            dialogVisible: false,
            form: {
                uid: '',
                groupId: 0
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        handleClose(done) {
            done()
        },
        submitForm() {
            this.form.uid = this.Up.uid
            this.dialogVisible = false
            changeUpGroup(this.form).then(res => {
                if (res.code ===200) {
                    this.refresh()
                    this.$emit("submitSuccess")
                } else {
                    this.$message.error("请先登录")
                }
            }).catch(err => {
                this.$message.error("网络请求失败")
            })
        },
        changeGroup(group) {
            this.form.groupId = group.id
        }
    }
};
</script>

<style scoped>
.change-up-group-window {
    display: inline-block;
    margin-right: 10px;
    padding: 9px 0;
}

.select {
    padding-right: 69px;
}
</style>

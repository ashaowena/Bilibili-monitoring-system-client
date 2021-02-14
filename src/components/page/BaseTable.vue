<template>
    <div>
        <div class='container'>
            <div class='handle-box'>
                <select-wrapper class='group-select' @selectItem='getUpsByGroup0'>
                    <template slot='default'>按分组查看</template>
                </select-wrapper>
                <add-up-window @submitSuccess='addUpRefresh'></add-up-window>
            </div>
            <el-table
                :data='Ups'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
                @selection-change=''
            >
                <el-table-column type='selection' width='55' align='center'></el-table-column>
                <el-table-column prop='id' label='UID' width='100' align='center'>
                    <template slot-scope='scope'>{{ scope.row.uid }}</template>
                </el-table-column>
                <el-table-column prop='name' label='用户名'>
                    <template slot-scope='scope'>{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label='所属分组'>
                    <template slot-scope='scope'>{{ convertDefault(scope.row.group.groupName) }}</template>
                </el-table-column>
                <el-table-column label='头像(查看大图)' align='center'>
                    <template slot-scope='scope'>
                        <el-image
                            class='table-td-thumb'
                            :src='scope.row.face'
                            :preview-src-list='[scope.row.face]'
                        ></el-image>
                    </template>
                </el-table-column>
                <!--                <el-table-column prop="address" label="地址"></el-table-column>-->
                <el-table-column label='是否大会员' align='center'>
                    <template slot-scope='scope'>
                        <el-tag
                            :type="scope.row.text && scope.row.text !== ''?'success':'danger'"
                        >{{ scope.row.text && scope.row.text !== '' ? '是' : '否' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop='date' label='添加时间'></el-table-column>
                <el-table-column prop='date' label='查看'>
                    <template slot-scope='scope'>
                        <el-link type='warning' :underline='false' @click='showDetail(scope)'>查看详情</el-link>
                    </template>
                </el-table-column>
                <el-table-column label='操作' width='180' align='center'>
                    <template slot-scope='scope'>
                        <change-up-group-window :Up='scope.row' @submitSuccess='saveEdit'></change-up-group-window>
                        <el-button
                            type='text'
                            icon='el-icon-delete'
                            class='red'
                            @click='handleDelete(scope.$index, scope.row)'
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class='pagination'>
                <el-pagination
                    background
                    layout='total, prev, pager, next'
                    :current-page='query.pageIndex'
                    :page-size='query.pageSize'
                    :total='pageTotal'
                    @current-change=''
                ></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>

import { deleteUp } from '@/utils/BaseTab';
import { refreshData } from '@/mixin/mixin';
import SelectWrapper from '@/components/common/content/SelectWrapper';
import AddUpWindow from '@/components/common/basetable/AddUpWindow';
import ChangeUpGroupWindow from '@/components/common/basetable/ChangeUpGroupWindow';


export default {
    name: 'basetable',
    components: {
        AddUpWindow,
        SelectWrapper,
        ChangeUpGroupWindow
    },
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
        };
    },
    mixins: [refreshData],
    created() {
        this.refresh()
    },

    methods: {
        getUpsByGroup0(group) {
            let ups = this.getUpsByGroup(group);
            this.Ups = ups
        },
        showDetail(scope) {
            this.$router.push('/' + scope.row.uid);
        },
        convertDefault(vaule) {
            return vaule.startsWith('default:') ? '无' : vaule;
        },
        addUpRefresh() {
            this.refresh();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteUp(row.uid).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        } else {
                            this.$message.error('服务异常');
                        }
                    }).catch(err => {
                        this.$message.error('网络异常');
                    });
                    this.refresh();

                })
                .catch(() => {
                });
        },
        // 多选操作
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;

        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
            console.log('success!');
            this.refresh()
        },
        // // 分页导航
        // handlePageChange(val) {
        //     this.$set(this.query, 'pageIndex', val);
        //     this.getData();
        // }
    }
};
</script>

<style scoped lang='less'>


.handle-box {
    margin-bottom: 20px;
    height: 32px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.group-select {
    float: left;
}

.handle-add {
    float: left;
    height: 32px;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.change {
    display: inline-block;
}
</style>

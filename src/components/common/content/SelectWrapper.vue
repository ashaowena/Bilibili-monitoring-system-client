<template>
    <div>
        <div class='select-title handle-del mr10'>按分组查看</div>
        <el-select placeholder='分组' class='handle-select mr10' v-model='item'>
            <el-option v-for='(group,index) in this.Groups'
                       :key='index'
                       :label='convertDefault(group.groupName)'
                       :value='convertDefault(group.groupName)'
                       @click.native='getUpsByGroup(group)'
            ></el-option>
        </el-select>
    </div>
</template>

<script>


import { upVo } from '@/utils/dashboard';

export default {
    name: 'SelectWrapper',
    data() {
        return {
            Groups: [],
            item: {}
        }
    },
    methods: {
        convertDefault(vaule) {
            return vaule.startsWith('default:') ? '全部' : vaule;
        },
        getUpsByGroup(group) {
            this.$emit('selectItem',group)
        }
    },
    created() {
        let item = localStorage.getItem('groups');
        this.Groups = JSON.parse(item)
    }
};
</script>

<style scoped>
.select-title {
    float: left;
    line-height: 32px;
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
</style>

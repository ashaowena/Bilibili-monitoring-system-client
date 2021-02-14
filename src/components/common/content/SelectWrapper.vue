<template>
    <div>
        <div class='select-title handle-del mr10'>
            <slot></slot>
        </div>
        <el-select placeholder='分组' class='handle-select mr10' :value='convertDefault(groupName)'>
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
import {mapGetters} from 'vuex'

export default {
    name: 'SelectWrapper',
    props: {
        nowItem: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            Groups: [],
            groupName: ''
        };
    },
    computed: {
        ...mapGetters(['getGroups'])
    },
    methods: {
        convertDefault(vaule) {
            return vaule.startsWith('default:') ? '无分组' : vaule;
        },
        getUpsByGroup(group) {
            this.groupName = this.convertDefault(group.groupName)
            this.$emit('selectItem', group);
        }
    },
    created() {
        // let item = localStorage.getItem('groups');
        // this.Groups = JSON.parse(item);
        this.Groups = this.getGroups
        if (this.nowItem !== null) {
            this.groupName = this.nowItem.groupName;
            this.$emit('selectItem', this.nowItem);
        } else {
            this.groupName = '无分组'
            let defaultGroup = this.Groups.find(group =>  group.groupName.startsWith('default:'));
            this.$emit('selectItem', defaultGroup);
        }




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

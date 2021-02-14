import { upVo } from '@/utils/dashboard';
import { getData } from '@/utils/dashboard';
import { mapGetters } from 'vuex';

export const refreshData = {
    data() {
        return {
            loading: false,
            Groups: [],
            Ups: []
        };
    },
    computed: {
        ...mapGetters(['getGroups', 'getUps'])
    },
    methods: {
        refresh() {
            getData().then((res) => {
                console.log('refresh!');
                if (res.code === 200) {
                    this.$store.dispatch('updateGroupFuture', res.data).then(() => {
                        this.Ups = this.getUps
                    });
                } else if (res.code === 403) {
                    this.$message.error('请先登录！');
                    this.$router.replace('/login');
                } else {
                    this.$message.error('服务器异常！');
                }
            });
        },
        getUpsByGroup(group) {
            let Ups = [];
            this.getGroups.find(g => g.id === group.id).upVos.forEach(up => {
                Ups.push(new upVo(up, group));
            });
            return Ups
        }
    },
    activated() {
        this.Groups = this.$store.state.getGroups;
    },
    created() {
        this.Groups = this.$store.state.getGroups;
    }
}






<template>
    <div class='detail-left-card'>
        <el-card shadow='hover' class='mgb20 card' style='height: 500px'>
            <div class='select-bar'>
                <div class='float abstract' @click='skipTo(0)' :class='{"active": isActive(0)}'>核心一览</div>
                <div class='float production' @click='skipTo(1)' :class='{"active": isActive(1)}'>作品列表</div>
                <div class='float public' @click='skipTo(2)' :class='{"active": isActive(2)}'>舆情分析</div>
            </div>
            <div>
                <hr />
            </div>
            <right-cart-abstract v-show='isActive(0)' :uid='uid'></right-cart-abstract>
            <right-cart-productions v-show='isActive(1)' :uid='uid'></right-cart-productions>
            <right-cart-public v-show='isActive(2)' :uid='uid'></right-cart-public>
        </el-card>
    </div>
</template>

<script>
import RightCartAbstract from '@/components/page/Detail/RightCartCont/RightCartAbstract';
import RightCartProductions from '@/components/page/Detail/RightCartCont/RightCartProductions';
import RightCartPublic from '@/components/page/Detail/RightCartCont/RightCartPublic';

export default {
    name: 'DetailRightCard',
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
            currentIndex: 0,
        };
    },
    components: {
        RightCartAbstract,
        RightCartProductions,
        RightCartPublic
    },

    computed: {
        uid() {
            return this.$route.params.uid
        }
    },
    methods: {
        isActive(index) {
            return this.currentIndex === index;
        },
        transferIndex(index) {
            switch (index) {
                case 0: {
                    return 'abstract';
                }
                case 1: {
                    return 'productions';
                }
                case 2: {
                    return 'public';
                }
            }
        },
        skipTo(index) {
            this.currentIndex = index;
            // this.$router.replace(this.transferIndex(index));
        }
    }



};
</script>

<style scoped lang='less'>
.card {
    overflow: scroll;
}

.select-bar::after {
    content: "";
    display: block;
    height: 23px;
}

hr {
    margin-bottom: 18px;
}

.float {
    float: left;
    margin-right: 40px;
    font-size: 12px;
    cursor: default
}

.float:hover, .active {
    color: #999999;
    padding-bottom: 5px;
    border-bottom: 2px solid #999999;
}


</style>

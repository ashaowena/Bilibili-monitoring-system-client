<template>
    <div class='right-cart-productions-list'>
        <div class='productions-list-title'>
            视频列表
        </div>
        <div class='productions-t-name'>
            <div class='label'>视频分类：</div>
            <a class='label-item' v-for='(item,index) in tNames' :key='index' @click='chooseTName(item)'>{{ item }}</a>
        </div>
        <div class='spit0'></div>
        <div class='list-filter'>
            <el-date-picker
                class='el-date-picker'
                prefix-icon='el-icon-time'
                v-model='date'
                type='daterange'
                range-separator='至'
                start-placeholder='开始日期'
                end-placeholder='结束日期'
                @change='chooseDate'
            >
            </el-date-picker>
            <el-checkbox class='check-item' v-model='copyRight' @change='productionsList0'>自制视频</el-checkbox>
            <el-checkbox class='check-item' v-model='isUnion' @change='productionsList0'>团队视频</el-checkbox>
            <div class='spit0'></div>
            <div class='list-filter-search'>
                <div class='filter-form'>
                    <el-input placeholder='请输入内容' v-model='keyword' class='input-with-select'
                              style='width: 500px'>
                        <el-select class='el-select' v-model='searchType' slot='prepend' style='width: 100px'
                                   @change='searchSelect'>
                            <el-option label='全部' value='1'></el-option>
                            <el-option label='标题+简介' value='2'></el-option>
                            <el-option label='标签' value='3'></el-option>
                            <el-option label='评论' value='4'></el-option>
                            <el-option label='弹幕' value='5'></el-option>
                        </el-select>
                        <el-button slot='append' @click='productionsList0'>搜索</el-button>
                    </el-input>
                </div>
                <el-button-group class='choose-type'>
                    <el-button :class='{"is-order":isOrder(0)}' @click='orderList(0)'>最新</el-button>
                    <el-button :class='{"is-order":isOrder(2)}' @click='orderList(2)'>最热</el-button>
                </el-button-group>
            </div>
        </div>
        <div class='spit0'></div>
        <div class='video-list'>
            <right-cart-productions-item v-for='(item,index) in videoList' :key='index' :videoItem='item'></right-cart-productions-item>
            <p v-if="listLoading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>

<script>
import { productionsTag, productionsList } from '@/utils/productions';
import RightCartProductionsItem from '@/components/page/Detail/RightCartCont/RightCartProductionsItem';

export default {
    name: 'RightCartProductionsList',
    components: {
        RightCartProductionsItem
    },
    props: {
        uid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            pickerOptions: {},
            date: [new Date().setTime(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), new Date()],
            realDate: [],
            keyword: '',
            searchType: "1",
            copyRight: false,
            isUnion: false,
            tName: '',
            orderType: 0,
            tNames: [],
            page: 0,
            size: 5,
            videoList: [],
            isLoading: true,
            listLoading: true,
            noMore: false
        };
    },
    methods: {
        chooseDate() {
            this.realDate = this.date
        },
        orderList(order) {
            this.orderType = order;
        },
        searchSelect(value) {
            this.searchType = value;
        },
        chooseTName(tName) {
            this.tName = tName
            this.productionsList0()
        },
        isOrder(order) {
          return this.orderType === order
        },
        productionsTag0() {
            productionsTag(this.uid).then(res => {
                if (res.code === 200) {
                    this.tNames = res.data;
                } else {
                    this.$message.error('服务异常');
                }
            }).catch(e => {
                this.$message.error('网络异常');
            });
        },
        productionsList0() {
            this.listLoading = true
            this.videoList = []
            productionsList(this.wrapperQuery).then(res => {
                if (res.code === 200) {
                    this.videoList.push(...res.data)
                    // this.page += this.size
                    this.listLoading = false
                } else {
                    this.$message.error('服务异常');
                }
            }).catch(e => {
                this.$message.error('网络异常');
            });
        }
    },
    computed: {
        convertType() {
            switch (this.searchType) {
                case '全部':
                    return 'TOTAL';
                case '标题+简介':
                    return 'TITLE_AND_DESCRIPTION';
                case '标签':
                    return 'TAG';
                case '评论':
                    return 'REPLY';
                case '弹幕':
                    return 'DANMAKU';
            }
        },
        wrapperQuery() {
            return {
                page: {
                    currPage: this.page,
                    pageSize: this.size
                },
                uid: this.uid,
                tName: this.tName,
                is_union_video: this.isUnion? 1:0,
                copyright: this.copyRight? 1:0,
                begin: this.realDate[0],
                end: this.realDate[1],
                order: this.orderType,
                keywordWrapper: {
                    searchType: this.searchType,
                    keyword: this.keyword
                }
            };
        }
    },
    created() {
        this.productionsTag0();
        this.productionsList0()

    }

};
</script>

<style scoped lang='less'>

.el-checkbox {
    margin: 0 15px;
}

.choose-type {
    float: right;

}

.filter-form {
    display: inline-block;
}


.label-item {
    margin-right: 5px;
    margin-bottom: 5px;
    color: #909399;
    display: inline-block;
    font-size: 10px;
    line-height: 17px;
}

.spit0 {
    border: 0.5px dashed #eee !important;
    margin-bottom: 16px !important;
    margin-top: 14px !important;
    display: block !important;
}


.el-select .el-input {
    width: 100px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}


.el-date-picker {
    width: 224px;
}

.productions-list-title {
    display: inline-block;
    margin-top: 10px;
    font-size: 10px;
    color: #333;
    padding-bottom: 16px;
}

.productions-t-name {
    display: flex;

    .label-item {
        display: inline-block;
    }

    .label {
        display: block;
        width: 75px;
        font-size: 10px;
    }
}

.is-order {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}


</style>

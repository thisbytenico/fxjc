<template>
    <div class="overview-box" :style="{padding:true?0:'20px'}"  >
        <!-- 正在开发中... -->
       <div class="overview" >
            <div class="update-box">
                <div>数据更新时间：{{time}}</div>
                <el-button
                    type="primary"
                    @click="refreshPage"
                    >刷新</el-button
                >
            </div>
            <div class="title">
                    <i>Innovatech Global Leaders</i>
                    创新科技全球领航者榜单
            </div>
            <div class="body">
                    <div class="left">
                        <div class="card">
                            <div class="card-title">
                                三端申报占比
                            </div>
                            <div class="content DeclareStatistic">
                                <DeclareStatistic v-if="visibleChart" />
                            </div>
                        </div>
                        <Person v-if="visibleChart" />
                    </div>
                    <div class="center">
                        <div class="info">
                              <div class="title">距离提交截止日期还有</div>
                                <CounRolldown type="1" :endTime="endTime"  />
                              <div class="end-time">
                                <div class="item">
                                    <a class="name">提交截止日期</a>
                                    2024 年 5 月 23 日 00:00   
                                 </div>  
                                 <div class="item">
                                    <a class="name">榜单公布时间</a>
                                    2024 年 5 月 下旬 
                                 </div> 
                              </div>    
                        </div>
                        <div class="card line-chart-box">
                            <div class="card-title">
                                <span>申报总数趋势</span>
                                <el-radio-group v-model="trendStatisticType"  >
                                    <el-radio-button  label="日" value="day" />
                                    <el-radio-button  label="周" value="week" />
                                 </el-radio-group>
                            </div>
                            <div class="content">
                                <SubmitTotal ref="SubmitTotalRef" :type="trendStatisticType" />
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <HorizontalBar ref="HorizontalBaref" />
                        <div class="card gov-submit-num">
                            <div class="card-title">
                                政府区域申报数量
                            </div>
                            <div class="content">
                                <GovBar v-if="visibleChart" />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <!-- <div v-else>
             正在开发中
        </div> -->
    </div>
</template>

<script>
import listMixin from '@/mixin/list-mixin';
import {
    onMounted,
    reactive,
    toRefs,
    ref,
    nextTick
} from 'vue';
import { useStore } from "vuex";
import {
    api
} from '@/y_api/assets';
import {  imgServerURL } from '@/config';
import DeclareStatistic from './components/DeclareStatistic.vue';
import CounRolldown from './components/CounRolldown.vue';
import HorizontalBar from './components/HorizontalBar.vue';
import GovBar from './components/GovBar.vue';
import Person from './components/Person.vue';
import SubmitTotal from './components/SubmitTotal.vue';
import { localGet } from '@/utils';


const listConfig = {
    tableList:api.personList
};

const columns = [
    { label: '评分模型', prop: 'model' },
    { label: '评分类型', prop: 'type' },
    { slot: 'opt' },
];

export default {
    components:{
        DeclareStatistic,
        CounRolldown,
        HorizontalBar,
        GovBar,
        Person,
        SubmitTotal
    },
    setup() {
        const SubmitTotalRef = ref(null);
        const HorizontalBaref = ref(null);

        const store = useStore();

        const optClick = async (type, index) => {
            state.optAction = type;
            switch (type) {
                case 'detail':
                    state.curOptIndex=index
                    state.modalShow = true;
                    break;
            }
        };

        const formatListRes = ({ data }) => {
            data.list.forEach(item=>{
                item.smallPicturePath=imgServerURL+item.smallPicturePath;
                item.bigPicturePath=imgServerURL+item.bigPicturePath
            })
            return data;
        };

        listConfig.optClick = optClick;
        listConfig.formatListRes = formatListRes;

        const state = reactive({
            columns,
            optAction: '',
            modalShow: false,
            loading: true,
            curOptIndex:0,
            trendStatisticType:'day',
            visibleChart:true,
            time:new Date().format('yyyy.MM.dd HH:mm'),
            userName:'',
            ...listMixin(listConfig)
        });

        onMounted(async () => {
            store.dispatch("setLoading",{show:false})
            state.loading = false;
            store.dispatch("setLoading", {
                show: false
            });
            state.userName=localGet('userName')
        });

        const refreshPage=()=>{
            state.time=new Date().format('yyyy.dd.MM HH:mm')
            state.visibleChart=false
            nextTick(()=>{
               state.visibleChart=true
            })
            SubmitTotalRef.value.loadData(true)
            HorizontalBaref.value.loadData()
        }
        return {
            ...toRefs(state),
            optClick,
            SubmitTotalRef,
            HorizontalBaref,
            refreshPage,
            endTime:new Date("2024/05/23 00:00:00").getTime()
        };
    }
};
</script>


<style lang="stylus">
    // .main
    //     min-width:1720px
    .overview-box
        width 100%
        //height: calc(100% - 40px)
        flex:1
        overflow auto
        *
         box-sizing: border-box
    .overview
        padding: 20px
        height: 100%
        //width:1380px
        margin: 0 auto
        box-sizing: border-box
        position: relative
        .update-box
            position: absolute
            right: 20px
            top:8px
            font-size:14px
            color:#7F7F7F
            text-align: right 
            >div
                margin-bottom: 10px
        &>.title
            color:var(--el-color-primary)
            font-size: 40px
            text-align: center
            margin-bottom: 30px
            i
             font-size: 45px
        .body
            height: calc(100% - 92px)
            display: flex
            margin-left: 12px
            .left
                width 25.6%
                height: 100%
                padding-top: 10px
                position relative
                div.DeclareStatistic
                    width: 344px;
                    position: absolute;
                    top:20px;
                    left: -20px
                    height: 300px
                .total
                    position: absolute
                    left: 46%
                    top 34%
                    text-align: center
                    font-size: 14px
            .center
                width:50%
                .line-chart-box
                    margin-top: 42px
                    padding:0 30px 0 20px
                    padding: 0 36px 0 6px
                    .card-title
                        display: flex
                        justify-content: space-between
                        align-items: center
                        border-left:0
                        .el-radio-button__inner
                            border:1px solid var(--el-color-primary)
                            color:var(--el-color-primary)
                            border-radius: 0;
                        .is-active
                            .el-radio-button__inner
                                color:#fff;
                        >span
                            border-left: 3px solid var(--el-color-primary)
                            font-weight: 650
                            padding-left: 8px

                .info
                    >.title
                        font-size: 25px
                        color:var(--el-color-primary)    
                        text-align: center
                        margin-bottom: 22px
                        margin-bottom: 12px
                        position:relative
                        top:-10px
                    .end-time
                        width: 594px
                        width: 606px;
                        margin: 20px auto 0 14px
                        display: flex
                        justify-content: space-between
                        .name
                            margin-right: 20px
            >.right
                // width 344px
                // width 310px
                // width:25.6%
                width:24.2%
                margin-left: 20px
                padding-top: 10px
                .gov-submit-num
                    margin-top: 20px
            .card
                // height: 50%
                .content
                    width:100%
                    height: 100%
                    position relative
            .card-title
                border-left: 3px solid var(--el-color-primary)
                font-size: 16px
                font-weight: 650
                padding-left: 8px
</style>

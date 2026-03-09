<template>
    <!-- echarts容器默认宽高为0,所以需要id,在下面样式style中对对容器进行设置-->
    <div ref="myChart" id="mychart" v-loading="loading"></div>
</template>

<script>
// 引用 echarts
// import * as echarts from 'echarts'
import { onMounted,toRefs, ref,reactive,watch  } from 'vue';
import { getTrendStatistic } from '@/y_api/overview';
import {  statusField, okCode } from '@/config';

export default{
    props: {
        type: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        let state = reactive({
            myChart: ref(),
            loading:true
        })
        
         let _myEcharts
         const echartInit = (data) =>{
             // 1.echarts的init方法
            let myEcharts =_myEcharts||echarts.init(state.myChart)
            _myEcharts=myEcharts
            // 2.设置数据
            let xdata = JSON.parse(JSON.stringify(data.companyList.map(item=>{
                    return item.typeName.replace(/2024-/,'');
            })))
            let data1=JSON.parse(JSON.stringify(data.governmentList.map(item=>item.total)))
            let data2=JSON.parse(JSON.stringify(data.personList.map(item=>item.total)))
            let data3=JSON.parse(JSON.stringify(data.companyList.map(item=>item.total)))
            // 3.配置项,从echarts网站复制，
            let option = {
                title: {
                    text: '',
                    show:false
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    icon:'react',
                    itemHeight:10,
                    itemWidth:10,
                    right:0,  
                    top:16,              
                    data: ['政府', '影响力30人', '企业']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    minInterval:props.type=='day'?3:0,
                    axisLabel:{
                        color:"#000",
                        interval:props.type=='day'?3:0,
                    },
                    axisLine:{
                        lineStyle: {
                        color: "#d7d7d7",//X轴Y轴的颜色
                      },
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false, //隐藏x轴刻度
                    },
                    data: xdata
                },
                yAxis: {
                    type: 'value',
                    minInterval:1,
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false
                    },
                },
                series: [
                    {
                        name: '政府',
                        type: 'line',
                        stack: 'Total1',
                        symbol:"none",
                        color:"#dd1b33",
                        smooth: true,
                        lineStyle: {
                            width: 3,
                            // color: echartsData.value.color[0],
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0.25,
                                color: 'rgba(218,8,34,1)',
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(231,121,135,1)',
                            },
                            {
                                offset: 0.75,
                                color: 'rgba(218,8,34,1)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(231,121,135,1)',
                            },
                           ]), //x轴颜色
                        },
                        data:data1
                    },
                    {
                        name: '影响力30人',
                        type: 'line',
                        stack: 'Total2',
                        symbol:"none",
                        color:"#009333",
                        smooth: true,
                        lineStyle: {
                            width: 3,
                            // color: echartsData.value.color[0],
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0.25,
                                color: 'rgba(0,119,51,1)',
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(27,241,111,1)',
                            },
                            {
                                offset: 0.75,
                                color: 'rgba(0,119,51,1)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(27,241,111,1)',
                            },
                           ]), //x轴颜色
                        },
                        data:data2
                    },
                    {
                        name: '企业',
                        type: 'line',
                        stack: 'Total3',
                        symbol:"none",
                        color:"#0085ff",
                        smooth: true,
                        lineStyle: {
                            width: 3,
                            // color: echartsData.value.color[0],
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0.25,
                                color: 'rgba(0,119,255,1)',
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(0,238,255,1)',
                            },
                            {
                                offset: 0.75,
                                color: 'rgba(51,117,212,1)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(55,201,252,1)',
                            },
                           ]), //x轴颜色
                        },
                        data:data3
                    },
                ]
              };
   

            myEcharts.setOption(option)

         }
       
        onMounted(()=>{
            loadData()
        })
    
        const loadData=(rebuild)=>{
            state.loading=true;
             getTrendStatistic({type:props.type}).then(res=>{
                  state.loading=false;
                if (res[statusField] == okCode) {
                    if(rebuild){
                        _myEcharts.dispose();
                        _myEcharts=null
                    }
                    echartInit(res.data)
                }
            })
        }

         watch(
            () => {
                return props.type
            },
            () => {
                loadData(true)
            }
        )
        return {
            ...toRefs(state),
            echartInit,
            loadData
        };
    }
}
</script>

<style>
#mychart{
    width: 100%;
    height: 324px;
}
</style>

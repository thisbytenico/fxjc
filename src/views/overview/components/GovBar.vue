<template>
  <div class="echartDiv">
      <div v-if="yAxisData.length" ref="echart"  v-loading="loading"></div>
      <Empty v-else/>
  </div>
</template>
 
<script>
// import * as echarts from 'echarts';
import { onMounted,toRefs, ref,reactive,onUnmounted  } from 'vue';
import { getGovernmentStatistic } from '@/y_api/overview';
import {  statusField, okCode } from '@/config';

export default {
  setup(){
    let state = reactive({
      xAxisData:[],
      yAxisData:[],
      yAxisData1:[],
      echart: ref(),
      loading:true
    })
    
     let chartData={
        curIndex:0,
        allXData:[],
        allYData:[],
        myChart:null,
        timer:0,
        maxTotal:0
     } 
    const echartInit = () =>{
      var myChart =chartData.myChart||echarts.init(state.echart);
      chartData.myChart=myChart
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(parms) {
            var str =
              parms[0].axisValue +
              "</br>" +
              parms[0].marker +
              "申报数量：" +
              parms[0].value + ''
            return str;
          },
 
        },
        textStyle: {
          color: "#333",
        },
        color: ["#7BA9FA", "#4690FA"],
        grid: {
          containLabel: true,
          left: "1%",
          top: "10%",
          bottom: 0,
          right: "0%",
        },
        xAxis: {
          type: "category",
          data: state.xAxisData,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 20, //刻度标签与轴线之间的距离。
            textStyle: {
              color: "#000",
            },
          },
        },
        yAxis: {
          type: "value",
          minInterval:1,
          max: chartData.maxTotal+1,
          axisLine: {
            show: true,
            show: false,
            lineStyle: {
              color: "#B5B5B5",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#B5B5B5"],
              type: "dashed",
              opacity: 0.5,
            },
          },
          axisLabel: {},
        },
        series: [{
          data: state.yAxisData,
          stack: "zs",
          type: "bar",
          barMaxWidth: "auto",
          barWidth: 24,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: "linear",
              global: false,
              colorStops: [{
                offset: 0,
                color: "#5EA1FF",
              },
                {
                  offset: 1,
                  color: "#90BEFF",
                },
              ],
            },
          },
        },
 
          //下面的立体,控制颜色是color第一个
          {
            data: state.yAxisData1,
            type: "pictorialBar",
            barMaxWidth: "20",
            symbol: "diamond",
            symbolOffset: [0, "50%"],
            symbolSize: [24, 15],
            zlevel: 2,
          },
          //上面的立体,控制颜色是color第二个
          {
            data: state.yAxisData,
            type: "pictorialBar",
            barMaxWidth: "20",
            symbolPosition: "end",
            symbol: "diamond",
            symbolOffset: [0, "-50%"],
            symbolSize: [24, 12],
            zlevel: 2,
          }
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
 
    //挂载
    onMounted(()=>{
      state.loading=true
      getGovernmentStatistic({}).then(res=>{
         state.loading=false
        if (res[statusField] == okCode) {
            let data=res.data
            if(data.length){
                data.forEach(item=>{
                    chartData.allXData.push(item.typeName)
                    chartData.allYData.push(item.total)
                })
                const sortData=JSON.parse(JSON.stringify(data.sort((a,b)=>{
                    return b.total-a.total
                })))
                chartData.maxTotal=sortData[0].total;
                build()
            }
        }
      })
    //   echartInit()
    })
    
    const build=()=>{
        const {curIndex,allXData,allYData}=chartData
        const dataLen=allXData.length
        let xAxisData=allXData.slice(curIndex%dataLen,4+curIndex%dataLen) 
        let yAxisData=allYData.slice(curIndex%dataLen,4+curIndex%dataLen) 

        if(xAxisData.length<4){
            xAxisData=xAxisData.concat(allXData.slice(0,4-xAxisData.length))
            yAxisData=yAxisData.concat(allYData.slice(0,4-yAxisData.length))
        }
        chartData.curIndex++
        state.xAxisData=xAxisData;
        state.yAxisData=yAxisData;
        echartInit()
        if(dataLen>4)
            chartData.timer=setTimeout(()=>{
              build()
            },4000)
    }

    onUnmounted(() => {
       if(chartData.timer)
        clearTimeout(chartData.timer)
    });
    return {
      ...toRefs(state),
      echartInit
    };
  }
}
</script>
 
<style lang='stylus' scoped>
  .echartDiv
    width: 100%;
    height: 274px
</style>
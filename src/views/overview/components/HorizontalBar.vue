<template>
    <div class="card HorizontalBar" id="HorizontalBar">
        <div class="card-title" >
            <span>各端评分</span>
            <el-radio-group v-model="type"  >
                <el-radio-button  label="政府" value="0" />
                <el-radio-button  label="企业" value="1" />
            </el-radio-group>
        </div>
        <div class="content" v-loading="loading">
            <div class="row-box" v-for="(item,index) in list" :key="item.typeName" >
                 <div class="row" 
                     :style="{width:'100%'}">
                     <div class="inner">
                           <span class="name" :title="item.typeName" >0{{index+1}}. {{item.typeName}}</span>
                           <span class="value">{{item.total}}</span>
                     </div>
                </div>
            </div>
            <Empty v-if="!list.length"/>
        </div>
    </div>
</template>

<script  setup>
import { ref,onMounted,watch } from 'vue'
import { getScoreRanking } from '@/y_api/overview';
import {  statusField, okCode } from '@/config';

const type = ref('0')
const list = ref([])
const loading = ref(true)

watch(
  () => type.value,
  () => {
      // console.log('mapClickParams111111',mapClickParams.value)
      loadData()
  }
);

const loadData=()=>{
    loading.value=true;
    getScoreRanking({type:type.value}).then(res=>{
         loading.value=false;
        // console.log('res',res)
        if (res[statusField] == okCode) {
            const data=res.data.list;
            const maxScore=data[0].total
            data.forEach(item => {
                item.width=((item.total/maxScore)*100).toFixed(1)+'%'
            });
            list.value=data
        }
    })
}
onMounted(() => {
    // console.log("111111");
     loadData()
});

defineExpose({
  loadData
});
</script>
<style lang="stylus">
    #HorizontalBar
       .card-title
            display: flex
            justify-content: space-between
            align-items: center
            align-items: flex-start
            border-left:0
            padding-left: 0
            >span
                padding-left:8px
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
        .content
            width: 100%
            min-height: 188px
            margin: 0 auto 0
            font-size:14px
            .row-box
                width: 100%
                height: 40px
                border-radius: 161px;
                display: flex
                justify-content: space-between
                align-items: center
                color:#fff;
                margin-top: 22px
                overflow hidden
                &:nth-child(1)
                    background: linear-gradient(90deg, rgba(243, 90, 76,1) 0%, rgba(243, 90, 76,1) 0%, rgba(241, 135, 87,1) 100%, rgba(241, 135, 87,1) 100%)
                    .row
                       background: linear-gradient(90deg, rgb(243, 90, 76) 0%, rgb(243, 90, 76) 0%, rgb(241, 135, 87) 100%, rgb(241, 135, 87) 100%);

                &:nth-child(2)
                    background: linear-gradient(90deg, rgba(234, 156, 71,1) 0%, rgba(234, 156, 71,1) 0%, rgba(233, 196, 89,1) 100%, rgba(233, 196, 89,1) 100%)
                    .row
                       background: linear-gradient(90deg, rgb(234, 156, 71) 0%, rgb(234, 156, 71) 0%, rgb(233, 196, 89) 100%, rgb(233, 196, 89) 100%) 
                &:nth-child(3)
                    background: linear-gradient(90deg, rgba(62, 205, 126,1) 0%, rgba(62, 205, 126,1) 0%, rgba(110, 205, 165,1) 100%, rgba(110, 205, 165,1) 100%)
                    .row
                       background: linear-gradient(90deg, rgb(62, 205, 126) 0%, rgb(62, 205, 126) 0%, rgb(110, 205, 165) 100%, rgb(110, 205, 165) 100%)
                .row
                    height: 44px
                    // padding: 0 20px
                    // border-radius: 161px;
                    display: flex
                    justify-content: space-between
                    align-items: center
                    position relative
                    .inner
                        // position: absolute
                        left: 20px
                        width 100%
                        display: flex
                        justify-content: space-between
                        padding:0 20px
                        .name
                            max-width:200px
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                    // &:nth-child(1)
                    //  background: linear-gradient(90deg, rgb(243, 90, 76) 0%, rgb(243, 90, 76) 0%, rgb(241, 135, 87) 100%, rgb(241, 135, 87) 100%);
                    // &:nth-child(2)
                    //     background: linear-gradient(90deg, rgb(234, 156, 71) 0%, rgb(234, 156, 71) 0%, rgb(233, 196, 89) 100%, rgb(233, 196, 89) 100%)
                    // &:nth-child(3)
                    //     background: linear-gradient(90deg, rgb(62, 205, 126) 0%, rgb(62, 205, 126) 0%, rgb(110, 205, 165) 100%, rgb(110, 205, 165) 100%)
</style>
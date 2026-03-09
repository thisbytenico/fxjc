<template>
    <div class="card Person" id="Person">
        <div class="card-title">
            影响力30人候选人
        </div>
        <div class="content" v-loading="state.loading">
            <swiper
                :pagination="{ clickable: true }"
                :slides-per-view="3"
                :slidesPerGroup="3"
                :space-between="14"
                :modules="[Autoplay]"
                :speed="2000"
                direction="vertical"
                :autoplay="{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }"
                :loop=" state.list?.length > 3"
                v-if="state.list.length"
            >
                <swiper-slide v-for="(item,index) in state.list" :key="item.id">
                       <div class="row" >
                            <div class="div-img">
                                <el-image
                                    style="width: 64px; height: 64px"
                                    :src="item.smallPicturePath"
                                    :zoom-rate="1.2"
                                    :max-scale="7"
                                    :min-scale="0.2"
                                    :preview-src-list="state.imgSrcList"
                                    :initial-index="index"
                                    fit="cover"
                                    preview-teleported="true"
                                    :hide-on-click-modal="true"
                                    />
                            </div>
                            <div class="right" :title="item.personalStatement">
                                <div class="name">个人陈述</div>
                                <div class="intro" >{{item.personalStatement}}
                                </div>
                            </div>
                        </div>
                </swiper-slide>
            </swiper>
            <Empty v-if="!state.list.length"/>
        </div>
    </div>
</template>

<script  setup>
import { onMounted, reactive } from "vue";
import {  statusField, okCode } from '@/config';
import { getPersonListForPage } from '@/y_api/overview';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import "swiper/css";

let state = reactive({
    list:[],
    imgSrcList:[],
    loading:true
});
onMounted(() => {
    state.loading=true;
     getPersonListForPage({}).then(res=>{
         state.loading=false;
        if (res[statusField] == okCode) {
            const {list}=res.data
            state.list=list
            state.imgSrcList=list.map(item=>item.bigPicturePath)
        }
      })
});
</script>
<style lang="stylus">
    #Person
        width 340px
        position: absolute;
        top:270px
        .content
            // margin: 0 auto 0
            font-size:13px
            height: 250px
            padding-top: 16px
            width:296px
            > .swiper {
                width: 100%;
                height: 100%
            }
            .row
                width: 100%
                padding-left: 12px
                padding-left:11px
                padding-left:0px
                display: flex
                margin-top: 0
                align-items: center;
                .div-img{
                    display: flex;
                }
                .right
                    margin-left: 24px
                    display: flex
                    flex-direction: column
                    align-self:flex-start
                    // position relative
                    // top:-2px
                    .intro
                        word-break: break-all;
                        flex: 1;
                        font-size: 13px
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
</style>
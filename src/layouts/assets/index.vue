<template>
  <div class="assets-wrapper">
    <div style="margin-top: 12px;border-bottom: 1px solid #dcdfe6;">
        <el-radio-group v-model="radio2"  >
          <el-radio-button @click="openPage('/assets/government')" label="政府" value="政府" />
          <el-radio-button @click="openPage('/assets/company')" label="企业" value="企业" />
          <el-radio-button @click="openPage('/assets/person')"  label="影响力30人" value="影响力30人" />
        </el-radio-group>
    </div>
     <RouterView class="router-view"  />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import { pathMap} from '@/utils';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const route = useRoute();

const radio2 = ref(pathMap[route.name])
const openPage = (path) => {
    store.dispatch("setLoading",{show:true})
    router.push({path})
};
</script>

<style lang="stylus" >
.assets-wrapper
  height: calc(100% - 50px)
  padding: 0 20px
  .page-box
    padding:0;
    .div-query
       max-width:1440px
       padding: 12px 10px 4px 4px;
    .div-btns
       padding 0 4px 10px 4px;
       .head-total
            color:#D9001B
            font-size: 14px
        .el-button
            display: flex
            align-items: center
    .div-table
        padding: 0 4px
  .el-radio-group
        border:1px solid var(--el-color-primary)
        border-radius:var(--el-border-radius-base) 
    .el-radio-button
        // border:1px solid var(--el-color-primary)
        border-right: 1px solid var(--el-color-primary)
        min-width: 80px
        &:last-child
          border-right: 0
         .el-radio-button__inner
            --el-border-radius-base: 3px
            border-bottom:0
            color:var(--el-color-primary)
            width:100%
        &.is-active
            .el-radio-button__inner
              color:#fff
</style>

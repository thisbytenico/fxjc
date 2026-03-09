<template>
    <el-button :type="type" :disabled="disabled" size="large">{{ text }}</el-button>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // ...mapGetters({
        //   modalFooterBtnSize: "global/modalFooterBtnSize",
        // }),
    }
};
</script>

<style lang="stylus"></style>

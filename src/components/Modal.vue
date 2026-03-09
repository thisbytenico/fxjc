<template>
    <el-dialog
        modal-class="common-dialog"
        :title="title"
        :width="width"
        :model-value="pShow"
        @close="closeModalEvent"
    >
        <transition name="scfade-right">
            <div v-loading="g_loading && g_loading.show" v-if="pShow">
                <slot></slot>
            </div>
        </transition>
        <template #footer>
            <div class="dialog-footer" v-if="!(g_loading && g_loading.show)&&showFooter">
                <ModalBtn text="取消" @click="closeModal" />
                <ModalBtn
                    text="确定"
                    v-if="showCofirm"
                    type="primary"
                    @click="submit"
                />
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    emits: ['update:pShow', 'close', 'confirm'],
    props: {
        pShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '512px'
        },
        showCofirm: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {
        const store = useStore();
        const g_loading = computed(() => store.state.loading);

        // const state = reactive({
        // });

        const closeModal = () => {
            context.emit('update:pShow', false);
        };
        const closeModalEvent = () => {
            context.emit('close');
            context.emit('update:pShow', false);
        };
        const submit = () => {
            context.emit('confirm');
            // closeModal();
        };

        return {
            // ...toRefs(state),
            closeModal,
            closeModalEvent,
            submit,
            g_loading
        };
    }
};
</script>

<style lang="stylus">
    .common-dialog
        .dialog-footer
            display: flex
            justify-content: flex-end
</style>

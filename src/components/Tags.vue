<template>
    <div class="Tags">
        <div v-if="tags && tags.length">
            <span v-for="(tag, index) in tags" :key="tag.id">
                {{ tag.name }}<span v-if="index != tags.length - 1"> / </span>
            </span>
        </div>
        <span v-else>-</span>
    </div>
</template>

<script>
export default {
    props: {
        tags: Array
    }
};
</script>

<style lang="stylus"></style>

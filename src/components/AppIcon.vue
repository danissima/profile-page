<template>
    <div class="app-icon">
        <svg :width="width" :height="height">
            <use :xlink:href="`#${name}`" />
        </svg>
    </div>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },

    width: {
        type: Number,
        default: 24,
    },

    height: {
        type: Number,
        default: 24,
    },
})
</script>

<style lang="sass">
.app-icon
    display: flex
</style>
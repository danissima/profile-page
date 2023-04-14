<template>
    <form
        class="image-uploader"
        novalidate
        @submit.prevent="handleSubmit"
    >
        <div class="image-uploader__preview">
            <img :src="imagePreviewSrc" alt="Превью картинки">
            <div class="image-uploader__change">
                <AppButton
                    has-icon
                    @click="triggerInputFile"
                >
                    <AppIcon name="pencil"/>
                    <input
                        ref="input"
                        type="file"
                        accept="image/*"
                        @change="handleFileUpload"
                    />
                </AppButton>
            </div>
        </div>
        <span
            :class="hintClasses"
        >
            Допустимый размер: 2МБ
        </span>
        <div class="image-uploader__controls">
            <AppButton
                has-icon
                type="submit"
            >
                <AppIcon name="diskette" />
            </AppButton>
            <AppButton
                has-icon
                @click="deleteImage"
            >
                <AppIcon name="trash-can" />
            </AppButton>
            <AppButton
                has-icon
                @click="returnToView"
            >
                <AppIcon name="arrow-flip-left" />
            </AppButton>
        </div>
    </form>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
    imageSrc: {
        type: String,
        required: true,
    }
})

const emits = defineEmits(['image-change', 'return'])

const MAX_FILE_SIZE = 2000000
const IMAGE_PLACEHOLDER_SRC = require( '@/assets/images/placeholder.jpg')

const imagePreviewSrc = ref('')
const isError = ref(false)

const input = ref(null)
const hintClasses = computed(() => {
    return {
        'image-uploader__hint': true,
        'image-uploader__hint_error': isError.value,
    }
})

onMounted(() => {
    imagePreviewSrc.value = props.imageSrc
})

function triggerInputFile() {
   input.value.click() 
}

function handleFileUpload(event) {
    isError.value = false
    const file = event.target.files[0]

    if (file.size > MAX_FILE_SIZE) {
        isError.value = true
        return
    }

    const newSrc = URL.createObjectURL(file)
    imagePreviewSrc.value = newSrc
}

function handleSubmit() {
    emits('image-change', imagePreviewSrc.value)
}

function deleteImage() {
    isError.value = false
    imagePreviewSrc.value = IMAGE_PLACEHOLDER_SRC
}

function returnToView() {
    emits('return')
}
</script>

<style lang="sass">
.image-uploader
    position: relative
    flex-direction: column
    align-items: center
    display: flex
    width: 100%
    
    &__preview
        position: relative
        overflow: hidden
        border-radius: 16px
        width: 100%

        &::after
            content: ''
            display: block
            padding-bottom: 100%

        img
            position: absolute
            width: 100%
            height: 100%
            object-fit: cover

    &__change
        position: absolute
        top: 16px
        right: 16px
        z-index: 1

        input
            display: none

    &__hint
        transition: color $transition-default
        margin-top: 8px
        text-align: center
        color: $secondary
        font-size: 14px

        &_error
            color: $error

    &__controls
        gap: 10px
        justify-content: center
        display: flex
        margin-top: 20px
</style>
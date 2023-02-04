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

<script>
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'

const MAX_FILE_SIZE = 2000000
const IMAGE_PLACEHOLDER_SRC = require( '@/assets/images/placeholder.jpg')

export default {
    name: 'ImageUploader',
    components: {
        AppButton,
        AppIcon,
    },

    props: {
        imageSrc: {
            type: String,
            required: true,
        }
    },

    data() {
        return {
            imagePreviewSrc: '',
            imagePlaceholderSrc: IMAGE_PLACEHOLDER_SRC,
            isError: false,
        }
    },

    methods: {
        triggerInputFile() {
            this.$refs.input.click()
        },

        handleFileUpload(event) {
            this.isError = false
            const file = event.target.files[0]

            if (file.size > MAX_FILE_SIZE) {
                this.isError = true
                return
            }

            const newSrc= URL.createObjectURL(file)
            this.imagePreviewSrc = newSrc
        },

        handleSubmit() {
            this.$emit('image-change', this.imagePreviewSrc)
        },

        deleteImage() {
            this.isError = false
            this.imagePreviewSrc = this.imagePlaceholderSrc
        },

        returnToView() {
            this.$emit('return')
        },
    },

    computed: {
        hintClasses() {
            return {
                'image-uploader__hint': true,
                'image-uploader__hint_error': this.isError,
            }
        },
    },

    created() {
        this.imagePreviewSrc = this.imageSrc
    }
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
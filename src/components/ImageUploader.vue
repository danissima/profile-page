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
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.4487 6.95143L17.0487 10.5514M4.44873 19.5514L8.81472 18.6717C9.04649 18.625 9.25931 18.5109 9.42645 18.3437L19.2001 8.56461C19.6687 8.09576 19.6684 7.33577 19.1994 6.86731L17.129 4.79923C16.6602 4.33097 15.9006 4.33129 15.4322 4.79995L5.65749 14.58C5.49068 14.7469 5.37678 14.9593 5.33003 15.1906L4.44873 19.5514Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
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
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.60002 20.3999V14.9999C6.60002 14.3372 7.13728 13.7999 7.80002 13.7999H16.2C16.8628 13.7999 17.4 14.3372 17.4 14.9999V20.9999M15 7.1999L7.80002 7.1999C7.13728 7.1999 6.60002 6.66264 6.60002 5.9999L6.60002 2.3999M20.9975 6.59737L17.4026 3.00243C17.0168 2.61664 16.4935 2.39991 15.9479 2.3999H4.45717C3.32102 2.3999 2.40002 3.3209 2.40002 4.45705V19.5428C2.40002 20.6789 3.32102 21.5999 4.45717 21.5999H19.5429C20.679 21.5999 21.6 20.6789 21.6 19.5428V8.05199C21.6 7.5064 21.3833 6.98316 20.9975 6.59737Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </AppButton>
            <AppButton
                has-icon
                @click="deleteImage"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.39999 5.3998H21.6M8.39999 1.7998H15.6M9.59999 17.3998V10.1998M14.4 17.3998V10.1998M16.2 22.1998H7.79999C6.47451 22.1998 5.39999 21.1253 5.39999 19.7998L4.85208 6.64976C4.82367 5.96801 5.36869 5.3998 6.05103 5.3998H17.949C18.6313 5.3998 19.1763 5.96801 19.1479 6.64976L18.6 19.7998C18.6 21.1253 17.5255 22.1998 16.2 22.1998Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </AppButton>
            <AppButton
                has-icon
                @click="returnToView"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.95386 4.80019L2.39999 9.41569M2.39999 9.41569L6.95386 14.0312M2.39999 9.41569L17.6 9.41569C19.8091 9.41569 21.6 11.2065 21.6 13.4157L21.6 15.2002C21.6 17.4093 19.8091 19.2002 17.6 19.2002L12 19.2002" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </AppButton>
        </div>
    </form>
</template>

<script>
import AppButton from '@/components/AppButton.vue'

const MAX_FILE_SIZE = 2000000
const IMAGE_PLACEHOLDER_SRC = require( '@/assets/images/placeholder.jpg')

export default {
    name: 'ImageUploader',
    components: {
        AppButton,
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
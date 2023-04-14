<template>
    <div class="profile-picture">
        <div class="profile-picture__container">
            <Transition name="fade">
                <div v-if="!isChangingMode" class="profile-picture__content">
                    <div class="profile-picture__image">
                        <img :src="imageSrc" alt="Картинка профиля">
                    </div>
                    <div class="profile-picture__controls">
                        <AppButton @click="setChangingMode(true)">Изменить</AppButton>
                    </div>
                </div>
                <ImageUploader
                    v-else
                    :image-src="imageSrc"
                    @image-change="updateImage"
                    @return="setChangingMode(false)"
                />
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import AppButton from '@/components/AppButton.vue'
import ImageUploader from '@/components/ImageUploader.vue'

const isChangingMode = ref(false)

const DEFAULT_IMAGE_SOURCE = 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/c91144d3442da3b6b4319748e8bd966b~c5_720x720.jpeg?x-expires=1681516800&x-signature=xmDuFiiCvYpvtyEFupFTx32sHbo%3D'
const imageSrc = ref(DEFAULT_IMAGE_SOURCE)

function setChangingMode(isChanging) {
    isChangingMode.value = isChanging
}

function updateImage(newSrc) {
    imageSrc.value = newSrc
    setChangingMode(false)
}
</script>

<style lang="sass">
.profile-picture
    @include break($md)
        width: 260px

    &__container
        position: sticky
        top: 40px
        width: 100%

    &__content
        width: 100%

    &__image
        position: relative
        overflow: hidden
        border-radius: 16px

        &::after
            content: ''
            display: block
            padding-bottom: 100%

        img
            position: absolute
            width: 100%
            height: 100%
            object-fit: cover

    &__controls
        gap: 10px
        justify-content: center
        display: flex
        margin-top: 20px
</style>
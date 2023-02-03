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

<script>
import AppButton from '@/components/AppButton.vue'
import ImageUploader from '@/components/ImageUploader.vue'

export default {
    name: 'ProfilePicture',
    components: {
        AppButton,
        ImageUploader,
    },

    data() {
        return {
            isChangingMode: false,
            imageSrc: 'https://m.media-amazon.com/images/M/MV5BMjUxMjE4MTQxMF5BMl5BanBnXkFtZTcwNzc2MDM1NA@@._V1_.jpg',
        }
    },

    methods: {
        setChangingMode(isChanging) {
            this.isChangingMode = isChanging
        },

        updateImage(newSrc) {
            this.imageSrc = newSrc
            this.setChangingMode(false)
        }
    }
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
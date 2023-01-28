<template>
    <div class="profile-picture">
        <div class="profile-picture__image">
            <img :src="imageSrc" alt="Картинка профиля">
        </div>
        <!-- <input type="file" @input="process" > -->
        <div class="profile-picture__controls">
            <template v-if="!isChangingMode">
                <AppButton @click="setChangingMode(true)">Изменить</AppButton>
            </template>
            <template v-else>
                <AppButton @click="setChangingMode(false)">Сохранить</AppButton>
                <AppButton
                    has-icon
                    @click="deleteImage"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.39999 5.3998H21.6M8.39999 1.7998H15.6M9.59999 17.3998V10.1998M14.4 17.3998V10.1998M16.2 22.1998H7.79999C6.47451 22.1998 5.39999 21.1253 5.39999 19.7998L4.85208 6.64976C4.82367 5.96801 5.36869 5.3998 6.05103 5.3998H17.949C18.6313 5.3998 19.1763 5.96801 19.1479 6.64976L18.6 19.7998C18.6 21.1253 17.5255 22.1998 16.2 22.1998Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </AppButton>
                <AppButton
                    has-icon
                    @click="setChangingMode(false)"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.95386 4.80019L2.39999 9.41569M2.39999 9.41569L6.95386 14.0312M2.39999 9.41569L17.6 9.41569C19.8091 9.41569 21.6 11.2065 21.6 13.4157L21.6 15.2002C21.6 17.4093 19.8091 19.2002 17.6 19.2002L12 19.2002" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </AppButton>

            </template>
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'

export default {
    name: 'ProfilePicture',
    components: {
        AppButton
    },

    data() {
        return {
            isChangingMode: false,
            imageSrc: 'https://a.gatari.pw/3628',
            previousImageSrc: ''
        }
    },

    methods: {
        setChangingMode(isChanging) {
            this.isChangingMode = isChanging
        },

        deleteImage() {
            console.log('delete')
        },

        process(event) {
            const file = event.target.files[0]
            const newSrc= URL.createObjectURL(file)
            this.imageSrc = newSrc
        }
    }
}
</script>

<style lang="sass">
.profile-picture
    flex-direction: column
    align-items: center
    display: flex
    width: 100%
    max-width: 313px

    &__image
        overflow: hidden
        margin-bottom: 24px
        border-radius: 16px
        width: 100%
        height: 313px
        max-height: 313px

        img
            width: 100%
            height: 100%
            object-fit: cover

    &__controls
        gap: 10px
        display: flex
</style>
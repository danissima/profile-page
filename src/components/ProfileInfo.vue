<template>
    <section class="profile-info">
        <h2>Персональная информация</h2>
        <div class="profile-info__content">
            <template v-if="!isChangingMode">
                <div class="profile-info__column">
                    <ProfileInfoItem title="ФИО" :content="info.fullName" />
                    <ProfileInfoItem title="E-mail" :content="info.email" />
                    <ProfileInfoItem title="Телефон" :content="info.phone" />
                </div>
                <div class="profile-info__column">
                    <ProfileInfoItem title="Дата рождения" :content="info.birthday" />
                    <ProfileInfoItem title="Город" :content="info.city" />
                    <ProfileInfoItem title="Владение языками" :content="languagesString" />
                </div>
            </template>
            <ProfileInfoForm
                v-else
                :values="info"
                @on-submit="updateInfo"
            />
        </div>
        <div v-if="!isChangingMode" class="profile-info__controls">
            <AppButton
                class="profile-info__change"
                @click="setChangingMode(true)"
            >
                Изменить
            </AppButton>
        </div>
    </section> 
</template>

<script>
import ProfileInfoItem from '@/components/ProfileInfoItem.vue'
import AppButton from '@/components/AppButton.vue'
import ProfileInfoForm from '@/components/ProfileInfoForm.vue'

export default {
    name: 'ProfileInfo',
    components: {
        ProfileInfoItem,
        AppButton,
        ProfileInfoForm,
    },

    data() {
        return {
            info: {
                fullName: 'Николас Кейдж',
                email: 'nicolas-cage@mail.ru',
                phone: '+7 (111) 111 11-11',
                birthday: '12.12.2012',
                city: 'Калифорния',
                languages: ['русский', 'английский'],
            },
            isChangingMode: false,
        }
    },

    methods: {
        setChangingMode(isChanging) {
            this.isChangingMode = isChanging
        },

        updateInfo(newInfo) {
            this.info = newInfo
            this.setChangingMode(false)
        }
    },

    computed: {
        languagesString() {
            return this.info.languages.join(', ')
        },
    }
}
</script>

<style lang="sass">
.profile-info
    flex-direction: column
    display: flex

    &__content
        gap: 20px
        display: flex
        margin-top: 48px

        @include break($lg)
            flex-direction: column
    
    &__column
        flex-direction: column
        gap: 20px
        display: flex
        width: 100%
    
    &__controls
        margin-top: 48px

    &__change
        @include break($md)
            width: 100%
</style>
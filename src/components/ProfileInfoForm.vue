<template>
    <form
        v-if="formData"
        class="profile-info-form"
        @submit.prevent="handleSubmit"
    >
        <div class="profile-info-form__content">
            <div class="profile-info-form__column">
                <AppInput
                    v-model="formData.fullName"
                    placeholder="ФИО"
                />
                <AppInput
                    v-model="formData.email"
                    placeholder="E-mail"
                />
                <AppInput
                    v-model="formData.phone"
                    type="tel"
                    placeholder="Телефон"
                />
            </div>
            <div class="profile-info-form__column">
                <AppInput
                    v-model="formData.birthday"
                    placeholder="Дата рождения"
                />
                <AppInput
                    v-model="formData.city"
                    placeholder="Город"
                />
            </div>
        </div>
        <div class="profile-info-form__controls">
            <AppButton type="submit">Сохранить</AppButton>
        </div>
    </form>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

export default {
    name: 'ProfileInfoForm',
    components: {
        AppInput,
        AppButton,
    },

    props: {
        values: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            formData: null,
        }
    },

    methods: {
        handleSubmit() {
            this.$emit('on-submit', this.formData)
        }
    },

    created() {
        this.formData = JSON.parse(JSON.stringify(this.values))
    },
}
</script>

<style lang="sass">
.profile-info-form
    width: 100%

    &__content
        gap: 32px
        display: flex

    &__column
        flex-direction: column
        gap: 32px
        display: flex
        width: 100%
    
    &__controls
        justify-content: flex-end
        display: flex
        margin-top: 32px
</style>
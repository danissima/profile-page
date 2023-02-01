<template>
    <Form
        v-if="formData"
        class="profile-info-form"
        @submit="handleSubmit"
    >
        <div class="profile-info-form__content">
            <div class="profile-info-form__column">
                <AppInput
                    v-model="formData.fullName"
                    name="fullName"
                    placeholder="ФИО"
                    :validationRules="[validateRequired, validateLength]"
                />
                <AppInput
                    v-model="formData.email"
                    name="email"
                    placeholder="E-mail"
                    :validationRules="[validateRequired, validateEmail, validateLength]"
                />
                <AppInputPhone
                    v-model="formData.phone"
                    :validationRules="validatePhone"
                />
            </div>
            <div class="profile-info-form__column">
                <AppDatepicker
                    v-model="formData.birthday"
                    name="birthday"
                    placeholder="Дата рождения"
                    :validationRules="validateBirthday"
                />
                <AppInput
                    v-model="formData.city"
                    name="city"
                    placeholder="Город"
                    :validationRules="validateLength"
                />
                <AppSelect
                    v-model="formData.languages"
                    :items="availableLanguages"
                    placeholder="Владение языками"
                    is-multiple
                />
            </div>
        </div>
        <div class="profile-info-form__controls">
            <AppButton type="submit">Сохранить</AppButton>
        </div>
    </Form>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppInputPhone from '@/components/AppInputPhone.vue';
import AppDatepicker from '@/components/AppDatepicker.vue';
import { Form, configure } from 'vee-validate';
import formValidation from '@/mixins/formValidation.js'

configure({
    validateOnBlur: false,
    validateOnChange: false,
})

export default {
    name: 'ProfileInfoForm',
    mixins: [formValidation],

    components: {
        AppInput,
        AppButton,
        AppSelect,
        Form,
        AppInputPhone,
        AppDatepicker,
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
            availableLanguages: ['русский', 'английский', 'японский', 'жесты', 'JavaScript'],
        }
    },

    methods: {
        handleSubmit() {
            this.$emit('on-submit', this.formData)
        },
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
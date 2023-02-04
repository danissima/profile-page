<template>
    <Form
        v-if="formData"
        class="profile-info-form"
        ref="form"
        :initial-values="formData"
        @submit="handleSubmit"
        @invalid-submit="handleInvalidSubmit"
    >
        <div class="profile-info-form__content">
            <div class="profile-info-form__column">
                <AppInput
                    v-model="formData.fullName"
                    name="fullName"
                    placeholder="ФИО"
                    validationRules="required|max-length"
                />
                <AppInput
                    v-model="formData.email"
                    name="email"
                    placeholder="E-mail"
                    validationRules="required|max-length|email"
                />
                <AppInputPhone
                    v-model="formData.phone"
                    validationRules="phone"
                />
            </div>
            <div class="profile-info-form__column">
                <AppDatepicker
                    v-model="formData.birthday"
                    name="birthday"
                    placeholder="Дата рождения"
                    validationRules="birthday"
                />
                <AppInput
                    v-model="formData.city"
                    name="city"
                    placeholder="Город"
                    validationRules="max-length"
                />
                <AppSelect
                    v-model="formData.languages"
                    :items="availableLanguages"
                    placeholder="Владение языками"
                />
            </div>
        </div>
        <div class="profile-info-form__controls">
            <AppButton class="profile-info-form__submit" type="submit">Сохранить</AppButton>
            <AppButton has-icon @click="returnToView">
                <AppIcon name="arrow-flip-left" />
            </AppButton>
        </div>
    </Form>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppInputPhone from '@/components/AppInputPhone.vue';
import AppDatepicker from '@/components/AppDatepicker.vue';
import AppIcon from '@/components/AppIcon.vue';
import { Form } from 'vee-validate';
import form from '@/mixins/form'

export default {
    name: 'ProfileInfoForm',
    mixins: [form],
    components: {
        AppInput,
        AppButton,
        AppSelect,
        Form,
        AppInputPhone,
        AppDatepicker,
        AppIcon,
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
            availableLanguages: ['русский', 'английский', 'японский', 'китайский', 'немецкий', 'французский', 'жесты', 'JavaScript', 'Python', 'TypeScript'],
        }
    },

    methods: {
        handleSubmit() {
            this.didFormSubmissionFailed = false
            this.$emit('on-submit', this.formData)
        },

        returnToView() {
            this.$emit('return')
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

        @include break($lg)
            flex-direction: column

    &__column
        flex-direction: column
        gap: 32px
        display: flex
        width: calc(50% - 16px)

        @include break($lg)
            width: 100%
    
    &__controls
        gap: 8px
        display: flex
        margin-top: 48px

    &__submit
        @include break($md)
            width: 100%
</style>
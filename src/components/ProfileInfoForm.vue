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
            this.didFormSubmissionFailed = false
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
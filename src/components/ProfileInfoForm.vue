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

<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate';

import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppInputPhone from '@/components/AppInputPhone.vue';
import AppDatepicker from '@/components/AppDatepicker.vue';
import AppIcon from '@/components/AppIcon.vue';

import { useForm } from '@/hooks/form'

const props = defineProps({
    values: {
        type: Object,
        required: true,
    },
})

const emits = defineEmits(['on-submit', 'return'])

const formData = ref(null)
const availableLanguages = ['русский', 'английский', 'японский', 'китайский', 'немецкий', 'французский', 'жесты', 'JavaScript', 'Python', 'TypeScript']
const form = ref(null)
const { didFormSubmissionFailed, handleInvalidSubmit } = useForm(form, formData)

onMounted(() => {
    formData.value = JSON.parse(JSON.stringify(props.values))
})

function handleSubmit() {
    didFormSubmissionFailed.value = false
    emits('on-submit', formData.value)
}

function returnToView() {
    emits('return')
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
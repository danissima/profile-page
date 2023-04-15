<template>
    <section class="profile-password">
        <h3>Изменить пароль</h3>
        <Form
            class="profile-password__form"
            ref="form"
            :initial-values="formData"
            @submit="handleSubmit"
            @invalid-submit="handleInvalidSubmit"
        >
            <div class="profile-password__content">
                <AppInput
                    v-model="formData.currentPassword"
                    name="currentPassword"            
                    type="password"
                    placeholder="Текущий пароль"
                    autocomplete="off"
                    validation-rules="required|not-same:newPassword"
                />
                <AppInput
                    v-model="formData.newPassword"
                    name="newPassword"            
                    type="password"
                    placeholder="Новый пароль"
                    autocomplete="off"
                    validation-rules="required|not-same:currentPassword|min-length"
                />
                <AppInput
                    v-model="formData.confirmPassword"
                    name="confirmPassword"            
                    type="password"
                    placeholder="Подтверждение пароля"
                    autocomplete="off"
                    validation-rules="required|confirm:newPassword"
                />
            </div>
            <AppButton
                class="profile-password__submit"
                type="submit"
            >
                Сохранить
            </AppButton>
            <Transition name="fade">
                <span
                    v-if="isSuccessMessageVisible"
                    class="profile-password__success"
                >
                    Пароль изменен!
                </span>
            </Transition>
        </Form>
    </section> 
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'

import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

import { useForm } from '@/hooks/form'

const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
}

const form = ref(null)
const formData = ref(JSON.parse(JSON.stringify(initialValues)))
const isSuccessMessageVisible = ref(false)
const { didFormSubmissionFailed, handleInvalidSubmit } = useForm(form, formData)

function handleSubmit(values, { resetForm }) {
    isSuccessMessageVisible.value = true
    didFormSubmissionFailed.value = false
    resetForm()
    resetFormData()

    setTimeout(() => {
        isSuccessMessageVisible.value = false
    }, 3000)
}

function resetFormData() {
    formData.value = JSON.parse(JSON.stringify(initialValues))
}
</script>

<style lang="sass">
.profile-password
    &__content
        flex-direction: column
        gap: 32px
        display: flex
        margin: 40px 0
        max-width: 280px

        @include break($md)
            max-width: none
    
    &__submit
        @include break($md)
            width: 100%
    
    &__success
        display: block
        margin-top: 8px
        color: $success

</style>
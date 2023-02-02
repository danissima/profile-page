<template>
    <section class="profile-password">
        <h3>Изменить пароль</h3>
        <hr>
        <Form
            class="profile-password__form"
            @submit="handleSubmit"
        >
            <div class="profile-password__content">
                <AppInput
                    v-model="formData.currentPassword"
                    name="currentPassword"            
                    type="password"
                    placeholder="Текущий пароль"
                    autocomplete="off"
                    validation-rules="required"
                />
                <AppInput
                    v-model="formData.newPassword"
                    name="newPassword"            
                    type="password"
                    placeholder="Новый пароль"
                    autocomplete="off"
                    validation-rules="required"
                />
                <AppInput
                    v-model="formData.confirmPassword"
                    name="confirmPassword"            
                    type="password"
                    placeholder="Подтверждение пароля"
                    autocomplete="off"
                    validation-rules="required|confirm:newPassword"
                />
                <!-- <Field name="abc" v-model="formData.currentPassword" type="password" rules="required"/>
                <ErrorMessage name="abc" /> -->
            </div>
            <span
                v-if="isSuccessMessageVisible"
                class="profile-password__success"
            >
                Пароль изменен!
            </span>
            <AppButton
                type="submit"
            >
                Сохранить
            </AppButton>
        </Form>
    </section> 
</template>

<script>
import { Form, Field, ErrorMessage, setErrors } from 'vee-validate'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

export default {
    name: 'ProfilePassword',
    components: {
        Form,
        AppInput,
        AppButton,
        Field,
        ErrorMessage
    },

    data() {
        return {
            formData: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            isSuccessMessageVisible: false,
        }
    },

    methods: {
        handleSubmit(values, { resetForm }) {
            this.isSuccessMessageVisible = true
            resetForm({
                values: {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            })

            setTimeout(() => {
                this.isSuccessMessageVisible = false
            }, 3000)
        }
    }
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
</style>
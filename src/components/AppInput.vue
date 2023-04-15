<template>
    <div class="app-input">
        <div class="app-input__container">
            <Field
                v-slot="{field, meta}"
                :name="name"
                :rules="validationRules"
            >
                <input
                    v-mask="mask"
                    v-bind="field"
                    :value="modelValue"
                    :class="getInputClasses({meta})"
                    :type="type"
                    placeholder=" "
                    :autocomplete="autocomplete"
                    @input="updateValue($event.target.value)"
                >
            </Field>
            <span class="app-input__placeholder">{{ placeholder }}</span>
        </div>
        <ErrorMessage class="app-input__error" :name="name" />
    </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
    modelValue: {
        default: '',
        type: String,
    },

    type: {
        default: 'text',
        type: String,
    },

    name: {
        required: true,
        type: String,
    },

    placeholder: {
        default: '',
        type: String,
    },

    validationRules: {
        default: [],
        type: [Array, Function, String],
    },
    
    mask: {
        default: '',
        type: String,
    },

    autocomplete: {
        type: String,
        default: 'on',
    }
})

const emits = defineEmits(['update:modelValue'])

function updateValue(newValue) {
    emits('update:modelValue', newValue)
}

function getInputClasses(values) {
    const { meta } = values
    return {
        'app-input__input': true,
        'app-input__input_error': meta.validated && !meta.valid,
    }
}
</script>

<style lang="sass">
.app-input
    width: 100%

    &__container
        position: relative

    &__input
        transition: box-shadow $transition-default, background-color $transition-default
        border: none
        border-radius: 4px
        width: 100%
        padding: 12px 16px
        font-family: $font-primary
        font-size: 16px
        line-height: 16px

        &:hover
            background-color: $primary-hover

        &:focus
            box-shadow: $form-field-shadow

        &_error
            background-color: lighten($error, 40%)

            &:focus
                box-shadow: $form-field-shadow-error

    // when input has a value
    &__input:not(:placeholder-shown) ~ &__placeholder,
    &__input:focus ~ &__placeholder
        top: -20px
        transform: scale(.8) 
        color: white

    &__placeholder
        position: absolute
        top: 50%
        left: 16px
        transform: translateY(-50%)
        transform-origin: 0 0
        pointer-events: none
        transition: transform $transition-default, top $transition-default, color $transition-default
        color: grey

    &__error
        color: $error
        font-size: 14px
        line-height: 20px
        margin-left: 4px

</style>
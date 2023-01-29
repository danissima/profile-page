<template>
    <div class="app-input">
        <div class="app-input__container">
            <Field
                class="app-input__input"
                :value="modelValue"
                :type="type"
                :name="name"
                :rules="validationRules"
                placeholder=" "
                @input="updateValue($event.target.value)"
            />
            <span class="app-input__placeholder">{{ placeholder }}</span>
        </div>
        <ErrorMessage class="app-input__error" :name="name" />
    </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate'

export default {
    name: "AppInput",
    emits: ['update:modelValue'],
    configure: {
        validateOnBlur: false,
    },

    components: {
        Field,
        ErrorMessage,
    },

    props: {
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
            type: [Array, Function],
        },
    },

    methods: {
        updateValue(newValue) {
            this.$emit('update:modelValue', newValue)
        },
    }
};
</script>

<style lang="sass">
.app-input
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
            box-shadow: $form-field-shadow;
        
    // when input has a value
    &__input:not(:placeholder-shown) ~ &__placeholder
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
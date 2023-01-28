<template>
    <div class="app-input">
        <input
            class="app-input__input"
            :type="type"
            :value="modelValue"
            placeholder=" "
            @input="updateValue($event.target.value)"
        >
        <span class="app-input__placeholder">{{ placeholder }}</span>
        <span v-if="errorText" class="app-input__error">{{ errorText }}</span>
    </div>
</template>

<script>
export default {
    name: "AppInput",
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            default: '',
            type: String,
        },

        type: {
            default: 'text',
            type: String,
        },

        placeholder: {
            default: '',
            type: String,
        },

        errorText: {
            default: '',
            type: String,
        }
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
    position: relative

    &__input
        transition: box-shadow $transition-default
        border: none
        border-radius: 4px
        padding: 12px 16px
        font-family: $font-primary
        font-size: 16px

        &:focus
            box-shadow: 0px 0px 0px 2px lightgreen;
        
    // when input has a value
    &__input:not(:placeholder-shown) ~ &__placeholder
        top: -18px
        transform: scale(.8) 
        color: white

    &__placeholder
        position: absolute
        top: 50%
        left: 16px
        transform: translateY(-50%)
        transform-origin: 0 0
        transition: transform $transition-default, top $transition-default, color $transition-default
        color: grey

</style>
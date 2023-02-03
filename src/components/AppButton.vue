<template>
    <button
        :class="classes"
        :type="type"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },

        hasIcon: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        classes() {
            return {
                'app-button': true,
                'app-button_icon': this.hasIcon,
            }
        }
    }
}
</script>

<style lang="sass">
.app-button
    transition: background-color $transition-default, color $transition-default
    border-radius: 4px
    border: none
    padding: 14px 42px
    background-color: #fff
    font-size: 20px

    @include hover
        background-color: $primary
        color: #fff
    
    &:active
        background-color: darken($primary, 20%)
        color: #fff

    &_icon
        justify-content: center
        align-items: center
        display: flex
        padding: 14px

        svg
            width: 24px
            height: 24px
</style>
<template>
    <div
        v-click-outside="() => setIsDropdownOpened(false)"
        :class="classes"
    >
        <button
            class="app-input-phone-select__title"
            type="button"
            @click="toggleDropdown"
        >
            {{ modelValue.code }}
        </button>
        <span class="app-input-phone-select__placeholder">Код</span>
        <div v-if="isDropdownOpened" class="app-input-phone-select__dropdown">
            <button
                v-for="(item, index) in items"
                class="app-input-phone-select__item"
                type="button"
                :key="item.label + index"
                @click="setItemSelected(index)"
            >
                {{ item.label }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppInputPhoneSelect',
    emits: ['update:modelValue'],
    props: {
        placeholder: {
            type: String,
            default: '',
        },

        items: {
            type: Array,
            default: () => [],
        },

        modelValue: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            isDropdownOpened: false,
        }
    },

    computed: {
        classes() {
            return {
                'app-input-phone-select': true,
                'app-input-phone-select_active': this.isDropdownOpened,
            }
        },
    },

    methods: {
        updateValue(newValue) {
            this.$emit('update:modelValue', newValue)
        },

        toggleDropdown() {
            this.isDropdownOpened = !this.isDropdownOpened
        },

        setIsDropdownOpened(isOpened) {
            this.isDropdownOpened = isOpened
        },

        setItemSelected(index) {
            this.updateValue(this.items[index])
            this.setIsDropdownOpened(false)
        }
    },
}
</script>

<style lang="sass">
.app-input-phone-select
    position: relative

    &__title
        position: relative
        z-index: 1
        transition: box-shadow $transition-default, background-color $transition-default
        border: 1px solid $secondary
        border-radius: 4px
        width: 100%
        padding: 11px 15px
        background-color: #fff
        font-size: 16px
        text-align: left

        &:hover
            background-color: $primary-hover
    
    &_active &__title
        box-shadow: $form-field-shadow
    
    &__placeholder
        position: absolute
        top: -20px
        left: 16px
        transform: scale(.8)
        transform-origin: 0 0
        pointer-events: none

    &__dropdown
        position: absolute
        top: calc(100% + 4px)
        left: 0
        flex-direction: column
        display: flex
        overflow: hidden
        border-radius: 4px
    
    &__item
        padding: 12px 16px
        text-align: left
        white-space: nowrap
</style>
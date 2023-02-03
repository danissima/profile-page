<template>
    <div
        v-click-outside="() => setIsDropdownOpened(false)"
        :class="classes"
    >
        <button
            class="phone-code-select__title"
            type="button"
            @click="toggleDropdown"
        >
            <span>{{ modelValue.code }}</span>
            <div class="phone-code-select__icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8 9.5999L12 14.3999L7.19999 9.5999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </button>
        <span class="phone-code-select__placeholder">Код</span>
        <Transition name="slide-down">
            <div v-if="isDropdownOpened" class="phone-code-select__dropdown">
                <button
                    v-for="(item, index) in items"
                    :class="getItemClasses(item)"
                    type="button"
                    :key="item.label + index"
                    @click="setItemSelected(index)"
                >
                    {{ item.label }}
                </button>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    name: 'PhoneCodeSelect',
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
                'phone-code-select': true,
                'phone-code-select_active': this.isDropdownOpened,
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
        },

        getItemClasses(item) {
            return {
                'phone-code-select__item': true,
                'phone-code-select__item_selected': item.code === this.modelValue.code
            }
        }
    },
}
</script>

<style lang="sass">
.phone-code-select
    position: relative

    &__title
        position: relative
        z-index: 1
        display: flex
        transition: box-shadow $transition-default, background-color $transition-default
        border: 1px solid $secondary
        border-radius: 4px
        width: 100%
        padding: 11px 38px 11px 15px
        background-color: #fff
        font-size: 16px
        text-align: left

        &:hover
            background-color: $primary-hover
    
    &_active &__title
        box-shadow: $form-field-shadow
    
    &__icon
        position: absolute
        right: 10px
        top: 50%
        z-index: 1
        transform: translateY(-50%)
        pointer-events: none
        transition: transform $transition-default
        width: 24px
        height: 24px
        color: $secondary
    
    &_active &__icon
        transform: translateY(-50%) rotate(180deg)

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
        z-index: 1
        flex-direction: column
        gap: 2px
        display: flex
        overflow: auto
        border-radius: 4px
        box-shadow: $dropdown-shadow
        max-height: 240px
        padding: 2px
        background-color: #fff
    
    &__item
        transition: background-color $transition-default, color $transition-default
        border-radius: 4px
        padding: 12px 16px
        background-color: #fff
        text-align: left
        white-space: nowrap

        &:hover
            background-color: $primary-hover

        &:active
            background-color: darken($primary-hover, 10%)

        &_selected,
        &_selected:hover,
        &_selected:active
            background-color: $primary
            color: #fff
</style>
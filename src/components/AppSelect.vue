<template>
    <div
        v-click-outside="() => setIsDropdownOpened(false)"
        :class="classes"
    >
        <button
            class="app-select__title"
            type="button"
            @click="toggleDropdown"
        >
            {{ placeholder }}
            <span class="app-select__count">{{ selectedItems.length }}</span>
        </button>
        <div v-if="isDropdownOpened" class="app-select__dropdown">
            <button
                v-for="(item, index) in formattedItems"
                :class="getItemClasses(item)"
                type="button"
                :key="item + index"
                @click="setItemSelected(index)"
            >
                {{ item.title }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppSelect',
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
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            isDropdownOpened: false,
            formattedItems: [],
        }
    },

    computed: {
        selectedItems() {
            return this.formattedItems.filter((item) => item.selected).map((item) => item.title)
        },

        classes() {
            return {
                'app-select': true,
                'app-select_active': this.isDropdownOpened,
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

        getItemClasses(item) {
            return {
                'app-select__item': true,
                'app-select__item_selected': item.selected,
            }
        },

        setItemSelected(index) {
            this.formattedItems[index].selected = true
            this.updateValue(this.selectedItems)
        },

        setIsDropdownOpened(isOpened) {
            this.isDropdownOpened = isOpened
        }
    },

    created() {
        this.items.forEach((item) => {
            this.formattedItems.push({
               title: item,
               selected: this.modelValue.includes(item)
            })
        })
    },
}
</script>

<style lang="sass">
.app-select
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

    &__dropdown
        position: absolute
        top: 100%
        left: 0
        flex-direction: column
        display: flex
        overflow: hidden
        border-radius: 4px
        width: 100%
    
    &__item
        text-align: left
        padding: 12px 16px
</style>
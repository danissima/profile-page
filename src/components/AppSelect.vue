<template>
    <div
        v-click-outside="() => setIsDropdownOpened(false)"
        :class="classes"
    >
        <div class="app-select__content">
            <button
                class="app-select__title"
                type="button"
                @click="toggleDropdown"
            >
                <span>{{ selectedItemsString }}</span>
            </button>
            <span class="app-select__placeholder">{{ placeholder }}</span>
            <AppIcon class="app-select__icon" name="chevron-down" />
        </div>
        <Transition name="slide-down">
            <div v-if="isDropdownOpened" class="app-select__dropdown">
                <button
                    v-for="(item, index) in formattedItems"
                    :class="getItemClasses(item)"
                    type="button"
                    :key="item + index"
                    @click="toggleItemSelected(index)"
                >
                    <span>{{ item.title }}</span>
                    <div v-if="item.selected" class="app-select__remove">
                        <AppIcon name="cross" />
                    </div>
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
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
})

const emits = defineEmits(['update:modelValue'])

const isDropdownOpened = ref(false)
const formattedItems = reactive([])

const classes = computed(() => {
    return {
        'app-select': true,
        'app-select_active': isDropdownOpened.value,
        'app-select_filled': selectedItems.value.length > 0
    }
})

const selectedItems = computed(() => {
    return formattedItems.filter((item) => item.selected).map((item) => item.title)
})

const selectedItemsString = computed(() => {
    return selectedItems.value.join(', ')
})

onMounted(() => {
    props.items.forEach((item) => {
        formattedItems.push({
            title: item,
            selected: props.modelValue.includes(item)
        })
    })
})

function updateValue(newValue) {
    emits('update:modelValue', newValue)
}

function setIsDropdownOpened(isOpened) {
    isDropdownOpened.value = isOpened
}

function toggleDropdown() {
    setIsDropdownOpened(!isDropdownOpened.value)
}

function getItemClasses(item) {
    return {
        'app-select__item': true,
        'app-select__item_selected': item.selected,
    }
}

function toggleItemSelected(index) {
    const clickedItem = formattedItems[index]
    clickedItem.selected = !clickedItem.selected
    updateValue(selectedItems.value)
}
</script>

<style lang="sass">
.app-select
    position: relative

    &__content
        position: relative

    &__title
        position: relative
        z-index: 1
        overflow: hidden
        transition: box-shadow $transition-default, background-color $transition-default
        border: 1px solid $secondary
        border-radius: 4px
        width: 100%
        min-height: 43px
        padding: 11px 44px 11px 15px
        background-color: #fff
        font-size: 16px
        text-align: left

        &:hover
            background-color: $primary-hover

        span
            display: -webkit-box
            -webkit-line-clamp: 1
            -webkit-box-orient: vertical
            overflow: hidden
    
    &_active &__title
        box-shadow: $form-field-shadow

    &__placeholder
        position: absolute
        top: 50%
        left: 16px
        z-index: 1
        transform: translateY(-50%)
        transform-origin: 0 0
        pointer-events: none
        transition: transform $transition-default, top $transition-default, color $transition-default
        color: grey

    &_active &__placeholder,
    &_filled &__placeholder
        top: -20px;
        transform: scale(0.8);
        color: #fff

    &__icon
        position: absolute
        right: 16px
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

    &__dropdown
        position: absolute
        top: calc(100% + 4px)
        left: 0
        flex-direction: column
        gap: 2px
        display: flex
        overflow: auto
        box-shadow: $dropdown-shadow
        border-radius: 4px
        width: 100%
        max-height: 240px
        padding: 2px
        background-color: #fff
    
    &__item
        justify-content: space-between
        align-items: center
        display: flex
        transition: background-color $transition-default, color $transition-default
        border-radius: 4px
        padding: 8px 16px
        background-color: #fff
        text-align: left
        line-height: 24px

        @include hover
            background-color: $primary-hover

        &:active
            background-color: darken($primary-hover, 10%)

        &_selected,
        &_selected:hover,
        &_selected:active
            background-color: $primary
            color: #fff

    &__remove
        pointer-events: none
        width: 24px
        height: 24px
        color: #fff
</style>
<template>
    <div
        v-click-outside="() => setCalendarOpened(false)"
        class="app-datepicker"
    >
        <AppInput
            v-model="localValue"
            :name="name"
            :placeholder="placeholder"
            mask="99.99.9999"
            :validation-rules="validationRules"
            @click="toggleCalendar"
        />
        <Transition name="slide-down">
            <Calendar
                v-if="isCalendarOpened"
                class="app-datepicker__calendar"
                :current-date="localValue"
                @date-change="localValue = $event"
            />
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

import AppInput from '@/components/AppInput.vue'
import Calendar from '@/components/Calendar.vue'

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
})

const emits = defineEmits(['update:modelValue'])

const localValue = ref('')
const isCalendarOpened = ref(false)

watch(() => props.modelValue, (newModelValue) => {
    localValue.value = newModelValue
})

watch(localValue, (newLocalValue) => {
    if (newLocalValue) {
        setCalendarOpened(false)
    } else {
        setCalendarOpened(true)
    }

    emits('update:modelValue', newLocalValue)
})

onMounted(() => {
    localValue.value = props.modelValue
})

function setCalendarOpened(isOpened) {
    isCalendarOpened.value = isOpened
}

function toggleCalendar() {
    setCalendarOpened(!isCalendarOpened.value)
}
</script>

<style lang="sass">
.app-datepicker
    position: relative

    &__calendar
        position: absolute
        top: calc(100% + 4px)
        left: 0
        z-index: 2
        box-shadow: $dropdown-shadow

</style>
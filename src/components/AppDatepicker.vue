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

<script>
import AppInput from '@/components/AppInput.vue'
import Calendar from '@/components/Calendar.vue'

export default {
    name: 'AppDatepicker',
    emits: ['update:modelValue'],
    components: {
        AppInput,
        Calendar,
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
            type: [Array, Function, String],
        },
    },

    data() {
        return {
            localValue: '',
            isCalendarOpened: false,
        }
    },

    methods: {
        setCalendarOpened(isOpened) {
            this.isCalendarOpened = isOpened
        },

        toggleCalendar() {
            this.isCalendarOpened = !this.isCalendarOpened
        }
    },

    watch: {
        localValue(newValue) {
            this.$emit('update:modelValue', newValue)
        },

        modelValue(newValue) {
            this.localValue = newValue
        }
    },

    created() {
        this.localValue = this.modelValue
    },
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
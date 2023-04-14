<template>
    <div v-if="areDatesValid" class="calendar">
        <header class="calendar__header">
            <button class="calendar__button" type="button" @click="setCurrentYear(currentYear - 1)">&#60;</button>
            <h4 class="calendar__title">{{ currentYear }}</h4>
            <button class="calendar__button" type="button" @click="setCurrentYear(currentYear + 1)">&#62;</button>
        </header>
        <header class="calendar__header">
            <button class="calendar__button" type="button" @click="setCurrentMonth(currentMonth - 1)">&#60;</button>
            <h4 class="calendar__title">{{ currentMonthName }}</h4>
            <button class="calendar__button" type="button" @click="setCurrentMonth(currentMonth + 1)">&#62;</button>
        </header>
        <div class="calendar__container">
            <span
                v-for="day in daysOfWeekNames"
                :key="day"
                class="calendar__day calendar__day_name"
            >
                {{ day }}
            </span>
            <TransitionGroup name="list">
                <template
                    v-for="(day, index) in currentCalendar"
                    :key="`${day || index}${currentMonth}${currentYear}`"
                >
                    <button
                        v-if="day"
                        :class="getDayClasses(day)"
                        type="button"
                        @click="setCurrentDate(currentYear, currentMonth, day)"
                    >
                        {{ day }}
                    </button> 
                    <span v-else class="calendar__day"></span>
                </template>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref, watch, computed } from 'vue'

const helpers = inject('helpers')

const props = defineProps({
    currentDate: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['date-change'])

const localCurrentDate = ref('')
const currentYear = ref(2023)
const currentMonth = ref(0)
const currentDay = ref(1)
const currentCalendar = ref([])
const daysOfWeekNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const monthsNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const currentMonthName = computed(() => {
    return monthsNames[currentMonth.value]
})

const areDatesValid = computed(() => {
    return currentMonth.value < 12 && currentDay.value > 0
})

watch(() => props.currentDate, (newCurrentDate) => {
    localCurrentDate.value = newCurrentDate
})

watch(localCurrentDate, (newLocalCurrentDate) => {
    emits('date-change', newLocalCurrentDate)
})

onMounted(() => {
    let dateArray = []

    if (!props.currentDate || props.currentDate.includes('_')) {
        dateArray = helpers.getDayMonthYear(helpers.formatDate(new Date()))
    } else {
        localCurrentDate.value = props.currentDate
        dateArray = helpers.getDayMonthYear(props.currentDate)
    }

    currentDay.value = dateArray[0]
    currentMonth.value = dateArray[1] - 1
    currentYear.value = dateArray[2]

    generateCalendar()
})

function generateCalendar() {
    currentCalendar.value = []
    const date = new Date(currentYear.value, currentMonth.value, currentDay.value)
    const weekDay = (new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay() + 6) % 7 // setting 0 as monday

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate()

    let week = 0

    while (week < weekDay) {
        currentCalendar.value.push(null)
        week++
    }

    for (let i = 1; i <= lastDay; i++) {
        currentCalendar.value.push(i)
    }
}

function setCurrentDate(year, month, day) {
    localCurrentDate.value = helpers.getMaskedDate(day, month + 1, year)
}

function setCurrentYear(newYear) {
    currentYear.value = newYear
    generateCalendar()
}

function setCurrentMonth(newMonth) {
    if (newMonth > 11) {
        currentYear.value++
        currentMonth.value = 0
    } else if (newMonth < 0) {
        currentYear.value--
        currentMonth.value = 11
    } else {
        currentMonth.value = newMonth
    }
    generateCalendar()
}

function getDayClasses(day) {
    const dateString = helpers.getMaskedDate(day, currentMonth.value + 1, currentYear.value)
    return {
        'calendar__day': true,
        'calendar__day_current': dateString === localCurrentDate.value
    } 
}

</script>

<style lang="sass">
.calendar
    overflow: hidden
    border-radius: 4px
    padding: 4px
    background-color: #fff
    color: $dark

    &__header
        justify-content: space-between
        display: flex

        & + &
            margin-top: 4px

    &__button
        transition: background-color $transition-default, color $transition-default
        border-radius: 4px
        width: 32px
        height: 32px
        background-color: darken($primary-hover, 10%)

        @include hover
            background-color: $primary
            color: #fff

        &:active
            background-color: darken($primary, 20%)
            color: #fff

    &__title
        margin: 4px 0

    &__container
        grid-template-columns: repeat(7, auto)
        gap: 2px
        display: grid
        margin-top: 8px

    &__day
        transition: background-color $transition-default, color $transition-default
        border-radius: 4px
        width: 40px
        height: 40px
        background-color: #fff
        text-align: center

        &:not(span)
            @include hover
                background-color: $primary-hover

        &:not(span):active
            background-color: darken($primary-hover, 10%)

        &:nth-child(7n - 1),
        &:nth-child(7n),
            color: $error

        &_current,
        &_current:not(span):hover,
        &_current:nth-child(7n - 1),
        &_current:nth-child(7n)
            color: #fff
            background-color: $primary

        &_name
            line-height: 36px
        
        @include break($md)
            width: 34px
            height: 34px

</style>
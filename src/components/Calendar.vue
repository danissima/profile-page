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
            <template
                v-for="day in currentCalendar"
                :key="day"
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'Calendar',
    props: {
        currentDate: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            localCurrentDate: '',
            currentYear: 2023,
            currentMonth: 0,
            currentDay: 1,
            currentCalendar: [],
            daysOfWeekNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
            monthsNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        }
    },

    methods: {
        generateCalendar() {
            this.currentCalendar = []
            const date = new Date(this.currentYear, this.currentMonth, this.currentDay)
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
                this.currentCalendar.push(null)
                week++
            }

            for (let i = 1; i <= lastDay; i++) {
                this.currentCalendar.push(i)
            }
        },

        setCurrentDate(year, month, day) {
            this.localCurrentDate = this.$helpers.getMaskedDate(day, month + 1, year)
        },

        setCurrentYear(newYear) {
            this.currentYear = newYear
            this.generateCalendar()
        },

        setCurrentMonth(newMonth) {
            if (newMonth > 11) {
                this.currentYear++
                this.currentMonth = 0
            } else if (newMonth < 0) {
                this.currentYear--
                this.currentMonth = 11
            } else {
                this.currentMonth = newMonth
            }
            this.generateCalendar()
        },

        getDayClasses(day) {
            const dateString = this.$helpers.getMaskedDate(day, this.currentMonth + 1, this.currentYear)
            return {
                'calendar__day': true,
                'calendar__day_current': dateString === this.localCurrentDate
            } 
        }
    },

    computed: {
        currentMonthName() {
            return this.monthsNames[this.currentMonth]
        },
        
        areDatesValid() {
            return this.currentMonth < 12
        }
    },

    watch: {
        currentDate(newDate) {
            this.localCurrentDate = newDate
        },

        localCurrentDate(newDate) {
            this.$emit('date-change', newDate)
        }
    },

    created() {
        let dateArray = []

        if (!this.currentDate || this.currentDate.includes('_')) {
            dateArray = this.$helpers.getDayMonthYear(this.$helpers.formatDate(new Date()))
        } else {
            this.localCurrentDate = this.currentDate
            dateArray = this.$helpers.getDayMonthYear(this.currentDate)
        }

        this.currentDay = dateArray[0]
        this.currentMonth = dateArray[1] - 1
        this.currentYear = dateArray[2]

        this.generateCalendar()
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
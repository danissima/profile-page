import { defineRule } from "vee-validate"

defineRule('formatted-date', formattedDate)
defineRule('birthday',  birthday)

function formattedDate(value) {
    if (!value) return true
    const ERROR_MESSAGE = 'Некорректная дата'

    const regex = /^\d{2}\.\d{2}\.\d{4}$/
    if (!regex.test(value)) {
        return ERROR_MESSAGE
    }

    const [day, month, year] = value.split('.').map((number) => +number)
    if (month <= 0 || month > 12) {
        return ERROR_MESSAGE
    }

    const monthsLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthsLengths[1] = 29
    }

    if (day <= 0 || day > monthsLengths[month - 1]) {
        return ERROR_MESSAGE
    }

    return true
}

function birthday(value) {
    const MAX_AGE = 100
    const dateValidation = formattedDate(value)
    if (typeof dateValidation === 'string') {
        return dateValidation
    }

    const [day, month, year] = value.split('.').map((number) => +number)
    const selectedDate = new Date(year, month - 1, day)
    const currentDate = new Date()
    if (selectedDate.getTime() > currentDate.getTime()) {
        return 'Вы ещё не родились'
    }

    if (year < currentDate.getFullYear() - MAX_AGE) {
        return 'Вам много лет'
    }

    return true
}

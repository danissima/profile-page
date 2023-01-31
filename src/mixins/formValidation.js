export default {
    methods: {
        validateRequired(value) {
            if (!value.trim()) {
                return 'Обязательное поле'
            }

            return true
        },

        validateEmail(value) {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!regex.test(value)) {
                return 'Некорректный e-mail'
            }

            return true
        },

        validateDate(value) {
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
        },

        validateBirthday(value) {
            const dateValidation = this.validateDate(value)
            if (typeof dateValidation === 'string') {
                return dateValidation
            }

            const [day, month, year] = value.split('.').map((number) => +number)
            const currentYear = new Date().getFullYear()
            if (year > currentYear) {
                return 'Вы ещё не родились'
            }

            if (year < currentYear - 100) {
                return 'Вам много лет'
            }

            return true
        },

        validateLength(value) {
            const MAX_LENGTH = 50
            if (value.length > MAX_LENGTH) {
                return 'Слишком длинное значение'
            }

            return true
        },

        validatePhone(value) {
            if (value.includes('_')) {
                return 'Некорректный номер'
            }

            return true
        },
    },
}
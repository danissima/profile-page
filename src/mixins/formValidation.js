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
            const regex = /^\d{2}\.\d{2}\.\d{4}$/
            if (!regex.test(value)) {
                return 'Некорректная дата'
            }

            return true
        },

        validateLength(value) {
            const MAX_LENGTH = 50
            if (value.length > MAX_LENGTH) {
                return 'Слишком длинное значение'
            }

            return true
        }
    },
}
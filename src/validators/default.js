import { defineRule } from "vee-validate"

defineRule('required', required)
defineRule('email', email)
defineRule('max-length', maxLength)
defineRule('phone', phone)

function required(value) {
    if (!value.trim()) {
        return 'Обязательное поле'
    }

    return true
}

function email(value) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value)) {
        return 'Некорректный e-mail'
    }

    return true
}

function maxLength(value) {
    const MAX_LENGTH = 50
    if (value.length > MAX_LENGTH) {
        return 'Слишком длинное значение'
    }

    return true
}

function phone(value) {
    if (value.includes('_')) {
        return 'Некорректный номер'
    }

    return true
}
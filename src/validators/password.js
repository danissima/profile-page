import { defineRule } from "vee-validate"

defineRule('confirm', confirm)
defineRule('not-same', notSame)
defineRule('min-length', minLength)

function confirm(value, [target], ctx) {
    if (value !== ctx.form[target]) {
        return 'Пароли не совпадают'
    }

    return true
}

function notSame(value, [target], ctx) {
    if (value === ctx.form[target]) {
        return 'Текущий и новый пароли совпадают'
    }

    return true
}

function minLength(value) {
    const MIN_LENGTH = 5
    if (value.length < MIN_LENGTH) {
        return 'Длина должна быть более 5 символов'
    }

    return true
}
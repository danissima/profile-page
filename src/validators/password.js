import { defineRule } from "vee-validate"

defineRule('confirm', confirm)
defineRule('not-same', notSame)

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
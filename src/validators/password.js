import { defineRule } from "vee-validate"

defineRule('confirm', confirm)

function confirm(value, [target], ctx) {
    if (value !== ctx.form[target]) {
        return 'Пароли не совпадают'
    }

    return true
}

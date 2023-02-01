import dates from "./dates"
import strings from "./strings"

export default {
    install(app) {
        app.config.globalProperties.$helpers = {
            ...dates,
            ...strings,
        }
    }
}
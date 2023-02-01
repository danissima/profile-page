import strings from "./strings"

export default {
    /* get date in dd.MM.yyyy format from Date-object */
    formatDate(date) {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return this.getMaskedDate(day, month, year)
    },

    /* get [day, month, year] array */
    getDayMonthYear(dateString) {
        return dateString.split('.').map((value) => +value)
    },

    getMaskedDate(day, month, year) {
        const maskedDay = strings.addZero(day)
        const maskedMonth = strings.addZero(month)
        return `${maskedDay}.${maskedMonth}.${year}`
    }

}
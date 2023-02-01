export default {
    /* add zero at the start of a number */
    addZero(number) {
        if (+number < 10) {
            return `0${number}`
        }
        return `${number}`
    }
}
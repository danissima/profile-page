const SPECIAL_CHARACTER = '9'

export default {
    mounted(element, binding) {
        if (!binding.value) return
        const maskValue = binding.value
        let maskPlaceholder = maskValue.replaceAll(SPECIAL_CHARACTER, '_')

        element.addEventListener('focus', () => {
            formatInputValue(element, maskValue, maskPlaceholder)
        })

        element.addEventListener('blur', () => {
            if (element.value === maskPlaceholder) {
                element.value = ''
                element.dispatchEvent(new Event('input'))
            }
        })
    },

    updated(element, binding) {
        if (!binding.value) return
        const maskValue = binding.value
        let maskPlaceholder = maskValue.replaceAll(SPECIAL_CHARACTER, '_')
        if (!element.value || element.value === maskPlaceholder) return

        formatInputValue(element, maskValue, maskPlaceholder)
    },
}

function formatValueByMask(value, pattern, mask) {
    const strippedValue = value.replace(/[^0-9]/g, "")
    const chars = strippedValue.split('')
    let count = 0
    const maskRegExp = new RegExp(SPECIAL_CHARACTER)

    let formatted = ''
    for (let i = 0; i < pattern.length; i++) {
        const character = pattern[i]
        if (chars[count]) {
            if (maskRegExp.test(character)) {
                formatted += chars[count]
                count++
            } else {
                formatted += character
            }
        } else if (mask) {
            if (mask.split('')[i]) {
                formatted += mask.split('')[i]
            }
        }
    }
    return formatted
}

function formatInputValue(element, pattern, mask) {
    const value = formatValueByMask(element.value, pattern)
    const newCaretPosition = value.length
    element.value = formatValueByMask(element.value, pattern, mask)
    element.dispatchEvent(new Event('input'))
    
    if (element.createTextRange) {
        const range = element.createTextRange()
        range.move('character', newCaretPosition)
        range.select()
    } else if (element.selectionStart) {
        element.focus()
        element.setSelectionRange(newCaretPosition, newCaretPosition)
    }
}

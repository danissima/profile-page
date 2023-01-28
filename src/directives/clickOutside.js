let globalElement = null
let globalBinding = null

export default {
    mounted(element, binding) {
        globalElement = element
        globalBinding = binding
        document.addEventListener('click', handleClick)
    },

    unmounted() {
        globalElement = null
        globalBinding = null
        document.removeEventListener('click', handleClick)
    }
}

function handleClick(event) {
    let clickedElement = event.target

    while(clickedElement) {
        if (globalElement == clickedElement) return
        clickedElement = clickedElement.parentNode
    }

    globalBinding.value()
}
const clickOutsideElements = []

export default {
    mounted(element, binding) {
        const clickHandler = (event) => {
            handleClick(event, element, binding)
        }

        clickOutsideElements.push({
            element,
            binding,
            clickHandler,
        })

        document.addEventListener('click',  clickHandler)
    },

    unmounted(element) {
        const currentElement = clickOutsideElements.find((elem) => elem.element == element)
        if (currentElement) {
            const currentElementClickHandler = currentElement.clickHandler
            document.removeEventListener('click', currentElementClickHandler)
        }
    }
}

function handleClick(event, element, binding) {
    let clickedElement = event.target

    while(clickedElement) {
        if (element == clickedElement) return
        clickedElement = clickedElement.parentNode
    }

    binding.value()
}
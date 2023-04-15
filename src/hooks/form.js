import { ref, watch } from "vue"

export function useForm(form, formData) {
    const didFormSubmissionFailed = ref(false)

    watch(formData, () => {
        if (didFormSubmissionFailed.value && form.value.validate) {
            form.value.validate()
        }
    }, {
        deep: true
    })

    function handleInvalidSubmit() {
        didFormSubmissionFailed.value = true
    }

    return {
        didFormSubmissionFailed,
        handleInvalidSubmit,
    }
}
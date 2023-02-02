export default {
    data() {
        return {
            didFormSubmissionFailed: false,
        }
    },

    watch: {
        formData: {
            handler() {
                if (this.didFormSubmissionFailed && this.$refs.form?.validate) {
                    this.$refs.form.validate()
                }
            },
            deep: true,
        }
    },

    methods: {
        handleInvalidSubmit() {
            this.didFormSubmissionFailed = true
        },
    },
}
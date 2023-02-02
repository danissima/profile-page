import { configure } from "vee-validate"
import "./default"
import "./password"
import "./date"

configure({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false,
})



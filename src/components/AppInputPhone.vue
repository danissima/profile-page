<template>
    <div
        v-if="selectedPhoneCode"
        class="app-input-phone">
        <PhoneCodeSelect
            v-model="selectedPhoneCode"
            :items="phoneCodes"
        />
        <AppInput
            v-model="phoneValue"
            type="tel"
            name="phone"
            placeholder="Телефон"
            :mask="selectedPhoneCode.mask"
            :validationRules="validationRules"
        />
    </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import PhoneCodeSelect from '@/components/PhoneCodeSelect.vue'

export default {
    name: 'AppInputPhone',
    emits: ['update:modelValue'],

    components: {
        AppInput,
        PhoneCodeSelect,
    },

    props: {
        modelValue: {
            default: '',
            type: String,
        },

        validationRules: {
            default: [],
            type: [Function, Array],
        }
    },

    data() {
        return {
            phoneValue: '',
            selectedPhoneCode: null,
            phoneCodes: [
                {
                    code: '+7',
                    label: '+7 Россия',
                    mask: '(999) 999 99-99',
                },
                {
                    code: '+375',
                    label: '+375 Беларусь',
                    mask: '99 99 999-99-99',
                },
                {
                    code: '+1',
                    label: '+1 США',
                    mask: '(999) 999-9999',
                },
                {
                    code: '+81',
                    label: '+81 Япония',
                    mask: '(999)-999-9999',
                },
            ]
        }
    },

    watch: {
        phoneValue(newValue) {
            if (newValue) {
                const fullPhone = `${this.selectedPhoneCode.code} ${newValue}`
                this.$emit('update:modelValue', fullPhone)
            } else {
                this.$emit('update:modelValue', '')
            }
        }
    },

    created() {
        if (this.modelValue) {
            const [initialPhoneCode, ...initialPhoneValue] = this.modelValue.split(' ')
            this.selectedPhoneCode = this.phoneCodes.find((phoneCode) => phoneCode.code === initialPhoneCode)
            this.phoneValue = initialPhoneValue.join(' ')
        } else {
            /* set first phone code as a default */
            this.selectedPhoneCode = this.phoneCodes[0]
        }
    }
}
</script>

<style lang="sass">
.app-input-phone
    gap: 4px
    display: flex
</style>
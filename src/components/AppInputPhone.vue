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

<script setup>
import { onMounted, ref, watch } from 'vue'

import AppInput from '@/components/AppInput.vue'
import PhoneCodeSelect from '@/components/PhoneCodeSelect.vue'

const props = defineProps({
    modelValue: {
        default: '',
        type: String,
    },

    validationRules: {
        default: [],
        type: [Function, Array, String],
    }
})

const emits = defineEmits(['update:modelValue'])

const phoneValue = ref('')
const selectedPhoneCode = ref(null)
const phoneCodes = [
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

watch(() => props.modelValue, (newModelValue) => {
    if (newModelValue) {
        const [initialPhoneCode, ...initialPhoneValue] = newModelValue.split(' ')
        phoneValue.value = initialPhoneValue.join(' ')
    } else {
       phoneValue.value = ''
    }
})

watch(selectedPhoneCode, (newPhoneCode, prevPhoneCode) => {
    if (prevPhoneCode !== null) {
        phoneValue.value = ''
    }
})

watch(phoneValue, (newPhoneValue) => {
    if (newPhoneValue) {
        const fullPhone = `${selectedPhoneCode.value.code} ${newPhoneValue}`
        emits('update:modelValue', fullPhone)
    } else {
        emits('update:modelValue', '')
    }
})

onMounted(() => {
    if (props.modelValue) {
        const [initialPhoneCode, ...initialPhoneValue] = props.modelValue.split(' ')
        selectedPhoneCode.value = phoneCodes.find((phoneCode) => phoneCode.code === initialPhoneCode)
        phoneValue.value = initialPhoneValue.join(' ')
    } else {
        /* set first phone code as a default */
        selectedPhoneCode.value = phoneCodes[0]
    }
})
</script>

<style lang="sass">
.app-input-phone
    gap: 4px
    display: flex
</style>
<template>
    <div class="app">
        <AppInput
            v-model="inputValue"
            placeholder="Инпут"
        />
    </div>
</template>

<script>
import AppInput from "@/components/AppInput.vue";

export default {
    name: "App",
    components: {
        AppInput,
    },

    data() {
        return {
            inputValue: '',
        }
    },
};
</script>

<style lang="sass">
.app
    justify-content: center
    align-items: center
    display: flex
    height: 100vh
    background-color: #272727
</style>
<template>
    <div class="container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Container',
}
</script>

<style lang="sass">
.container
    width: 100%
    max-width: 1440px
    margin: 0 auto
    padding: 0 64px

    @include break($md)
        padding: 0 20px

</style>
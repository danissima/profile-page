<template>
    <div class="profile-info-item">
        <span class="profile-info-item__title">{{ title }}</span>
        <span class="profile-info-item__content">{{ content }}</span>
    </div> 
</template>

<script>
export default {
    name: 'ProfileInfoItem',
    props: {
        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },
    }
}
</script>

<style lang="sass">
.profile-info-item
    flex-direction: column
    display: flex

    &__title
        margin-bottom: 2px
        font-size: 14px
        line-height: 14px
        color: $secondary
</style>
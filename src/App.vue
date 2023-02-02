<template>
    <div class="app">
        <Container>
            <div class="app__content">
                <ProfilePicture class="app__avatar" />
                <div class="app__info">
                    <ProfileInfo />
                    <ProfilePassword />
                </div>
            </div>
        </Container>
    </div>
</template>

<script>
import Container from '@/components/Container.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import ProfileInfo from '@/components/ProfileInfo.vue';
import ProfilePassword from '@/components/ProfilePassword.vue';

export default {
    name: "App",
    components: {
        Container,
        ProfilePicture,
        ProfileInfo,
        ProfilePassword,
    },
}
</script>

<style lang="sass">
html, body, #app
    height: 100%

.app
    flex-direction: column
    display: flex
    min-height: 100%
    height: auto
    padding: 120px 0
    background-color: $dark
    color: white

    &__content
        display: flex
        gap: 20px

    &__avatar
        flex: 1

    &__info
        flex: 4

        & > section + section
            margin-top: 60px

</style>
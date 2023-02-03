<template>
    <main class="main">
        <Container>
            <div class="main__content">
                <ProfilePicture class="main__avatar" />
                <div class="main__info">
                    <ProfileInfo class="main__section" />
                    <ProfilePassword class="main__section" />
                </div>
            </div>
        </Container>
    </main>
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

.main
    flex-direction: column
    display: flex
    min-height: 100%
    height: auto
    padding: 120px 0
    background-color: $dark
    color: white

    @include break($lg)
        padding: 64px 0

    @include break($md)
        padding: 32px 0

    &__content
        gap: 40px
        display: flex

        @include break($md)
            flex-direction: column
            align-items: center

    &__avatar
        flex: 1

    &__info
        flex: 3

    &__section
        border-radius: 16px
        padding: 36px
        background-color: #2b2b3b


        & + &
            margin-top: 40px

</style>
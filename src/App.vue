<template>
    <header class="header">
        <h1>Привет!</h1>
    </header>
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
    <footer class="footer"><i>Сделано с любоvue</i></footer>
    <SvgSprite />
</template>

<script>
import Container from '@/components/Container.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import ProfileInfo from '@/components/ProfileInfo.vue';
import ProfilePassword from '@/components/ProfilePassword.vue';
import SvgSprite from '@/components/SvgSprite.vue';

export default {
    name: "App",
    components: {
        Container,
        ProfilePicture,
        ProfileInfo,
        ProfilePassword,
        SvgSprite,
    },
}
</script>

<style lang="sass">
html, body, #app
    height: 100%

#app
    flex-direction: column
    display: flex
    min-height: 100%
    height: auto
    background-color: $dark
    color: white

.header
    padding: 40px 0
    background-image: linear-gradient(180deg, $blue-gradient)

.footer
    padding: 28px 0
    background-image: linear-gradient(0deg, $blue-gradient)

.header,
.footer
    text-align: center

.main
    padding: 40px 0

    @include break($lg)
        padding: 32px 0

    @include break($md)
        padding: 24px 0

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
        width: 100%

    &__section
        border-radius: 16px
        padding: 36px
        background-color: #2b2b3b

        @include break($md)
            padding: 24px

        & + &
            margin-top: 40px

</style>
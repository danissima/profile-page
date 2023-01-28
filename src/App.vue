<template>
    <div class="app">
        <Container>
            <div class="app__content">
                <ProfilePicture class="app__block" />
                <ProfileInfo class="app__block_primary" />
                <ProfilePassword class="app__block" />
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
};
</script>

<style lang="sass">
html, body, #app
    height: 100%

#app
    background-color: $dark
    color: white

.app
    padding: 120px 0

    &__content
        display: flex
        gap: 20px

    &__block
        flex: 1

        &_primary
            flex: 2
</style>
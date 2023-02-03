module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/profile-page/' : '/',
    css: {
         loaderOptions: {
            sass: {
                prependData: `@import "@/assets/sass/mixins.sass"; @import "@/assets/sass/variables.sass"`
            }
        }
    }
};
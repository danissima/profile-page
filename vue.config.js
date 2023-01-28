module.exports = {
    css: {
         loaderOptions: {
            sass: {
                prependData: `@import "@/assets/sass/mixins.sass"; @import "@/assets/sass/variables.sass"`
            }
        }
    }
};
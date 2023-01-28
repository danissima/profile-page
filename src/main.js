import { createApp } from 'vue'
import App from './App.vue'
import './assets/sass/index.sass'
import clickOutside from './directives/clickOutside' 

createApp(App)
    .directive('click-outside', clickOutside)
    .mount('#app')

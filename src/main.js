import { createApp } from 'vue'
import App from './App.vue'
import './assets/sass/index.sass'
import clickOutside from './directives/clickOutside' 
import mask from './directives/mask' 
// import plugins from './plugins'
import "./validators/index"

createApp(App)
    .directive('click-outside', clickOutside)
    .directive('mask', mask)
    .mount('#app')

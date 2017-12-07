import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
// import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
// Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
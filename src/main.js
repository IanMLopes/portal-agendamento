/* eslint-disable */

//IMPORTS-------------------------------------------
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from "bootstrap-vue";
import VMask from 'v-mask';
import VueSimpleAlert from "vue-simple-alert";

// Importar arquivos CSS Bootstrap e BootstrapVue
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";
import Chartist from "chartist";
import axios from "axios";
import VueAxios from "vue-axios";
import { urlProject } from "./globalVaribles";
import VueSession from "vue-session";
import swal from "sweetalert2";
import "./registerServiceWorker";
import './service/firebase'
import Chat from 'vue-beautiful-chat'


// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});


// código para remover  warning de Navegação duplicada
const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalPush.call(this, location, onResolve, onReject);
	}
	return originalPush.call(this, location).catch(err => err);
}

//-------------------------------------------------------------------

Vue.prototype.$Chartist = Chartist;


//DISPONIBIIZAR EM TODO SISTEMA
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VueAxios, axios);
Vue.use(VueSession);
Vue.use(VueSimpleAlert);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin);
Vue.use(VMask)
Vue.use(Chat)
export const  bus = new Vue();

axios.defaults.baseURL = urlProject;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  axios,
  swal,
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});

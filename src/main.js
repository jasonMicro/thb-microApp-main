import './utils/public-path.js'; //必须最先引入
import Vue from 'vue';
import App from './App.vue';
import Viser from 'viser-vue';
import store from './store';
import { initRouter } from './router';
import Antd, { Modal } from 'ant-design-vue';

import './theme/index.less';
import 'animate.css/source/animate.css';
import Plugins from '@/plugins';
import './components/Element-ui'; //Element-ui 公共组件
import { initI18n } from '@/utils/i18n';
import bootstrap from '@/bootstrap';
import 'moment/locale/zh-cn';
import contentmenu from 'v-contextmenu';
import 'v-contextmenu/dist/index.css';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
/**注册公共组件 自定义组件*/
import PublicComponents from './components';
// 视频播放 vue-video-player
import hls from 'videojs-contrib-hls';
import VueVideoPlayer from 'vue-video-player';
// require videojs style
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import { MessageBox } from 'element-ui';
Vue.use(Antd);
Vue.use(Viser);
Vue.use(Plugins);
Vue.use(contentmenu);
Vue.use(PublicComponents);
Vue.use(hls);
Vue.use(VueVideoPlayer);
Vue.prototype.$locale = zhCN;
Vue.config.productionTip = false;
Vue.prototype.$confirm = MessageBox.confirm; //Element-Ui中的confirm
Vue.prototype.$confirmAnt = Modal.confirm; // Ant-design-vue中的confirm

const router = initRouter(store.state.setting.asyncRoutes);
const i18n = initI18n('CN', 'US');
bootstrap({ router, store, i18n, message: Vue.prototype.$message });

import './plugins/micro-service';

//高德地图
import VueAMap from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';
if (!window.__MICRO_APP_ENVIRONMENT__) {
  Vue.use(VueAMap);
  VueAMap.initAMapApiLoader({
    key: '460961e118934468bfdb072bcef75ae7', //公司企业账号【应用：thb-manage】13326665268
    plugin: [
      'AMap.Autocomplete',
      'AMap.PlaceSearch',
      'AMap.PolyEditor',
      'AMap.PolylineEditor',
      'AMap.Scale',
      'AMap.OverView',
      'AMap.ToolBar',
      'AMap.MapType',
      'AMap.CircleEditor',
      'AMap.Geocoder'
    ],
    // 默认高德 sdk 版本为 1.4.4
    v: '2.0'
  });
}

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');

// 监听卸载操作
window.addEventListener('unmount', function () {
  app.$destroy();
});

import Vue from 'vue';

if (window.__MICRO_APP_ENVIRONMENT__) {
  const globalData = window.microApp.getGlobalData(); //主应用全局发送 获取全局数据
  const microData = window.microApp.getData(); // 返回基座下发的data数据
  Vue.prototype.$isMocro = microData.signal; //子应用开关
  Vue.prototype.$globalData = globalData;
} else {
  Vue.prototype.$isMocro = false;
}

// entry 微应用
import microApp from '@micro-zoe/micro-app';

//发送 全局数据 给子应用
microApp.setGlobalData({ name: 'micro-app' });
microApp.start({
  tagName: 'micro-app-chart',
  shadowDOM: false
});

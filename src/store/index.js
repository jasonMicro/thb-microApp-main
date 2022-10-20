import Vue from 'vue';
import Vuex from 'vuex';

let modulesFiles = require.context('./modules', true, /\.js$/); //获取modules文件下的所有js文件
let modules = modulesFiles.keys().reduce((module, modulePath) => {
  const modulesName = modulePath.replace(/^\.\/(.+)\.js$/, '$1'); //截取文件名
  const value = modulesFiles(modulePath); //获取文件数据
  module[modulesName] = value.default; //把数据赋值给module
  return module;
}, {});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: modules
});

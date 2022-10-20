/**
 * @module Components 组件注册工具类
 * @author Jason
 * @description 组件注册 统一封装
 * */
export default class Components {
  constructor(components) {
    this.components = components;
  }

  install() {
    const components = this.components;
    const install = (Vue = {}) => {
      if (install.installed) return;
      Object.keys(components).forEach((component) => {
        Vue.component(components[component].name, components[component]);
      });

      install.installed = true;
    };

    install.installed = false;

    if (typeof window !== 'undefined' && window.Vue) {
      install(window.Vue);
      install.installed = true;
    }

    const Comp = {
      ...components,
      install
    };
    return Comp;
  }
}

# thb-microApp-main
THB微前端 主应用

## 如何接入子应用
1、在当前项目pages->micro-page 目录下 创建一个 与管理平台创建的应用时的名字同样的目录，
再创建承载子应用的页面index.vue，如本项目中的 pc-childApp

pc-childApp 一定要和管理平台中创建的应用名相同

2、配置子应用入口ip 环境变量 VUE_APP_CHILD_APP 以实际子应用 启动端口一直，如是生产环境，则改为域名或有效目录即可
VUE_APP_CHILD_APP = http://localhost:3304

3、注意：
在 pc-childApp 目录下的index.vue 中的 childUrl配置如下，process.env.VUE_APP_CHILD_APP 一定要对应环境变量的子应用入口变量
```
this.child_url =
      process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_CHILD_APP
        : `${window.location.protocol}//${window.location.host}${process.env.VUE_APP_CHILD_APP}`;
 ```
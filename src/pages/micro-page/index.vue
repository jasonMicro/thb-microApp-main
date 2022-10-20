<template>
  <div v-if="isShow">
    <!--
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/micro-page`
     -->
    <!--    //-->
    <micro-app-chart
      :name="appName"
      :url="child_url"
      :data="microAppData"
    ></micro-app-chart>
  </div>
</template>

<script>
import { removeDomScope, unmountAllApps } from '@micro-zoe/micro-app';
import Request from '@/services/request';
import {
  xlsxExport,
  phoneDesense,
  IdCardDesense,
  nameDesense
} from '@/utils/util';
export default {
  name: 'MicroPage',
  data() {
    return {
      appName: 'epidemicManageChart',
      isShow: false,
      child_url:
        process.env.NODE_ENV === 'development'
          ? process.env.VUE_APP_CHILD_APP
          : `${window.location.protocol}//${window.location.host}${process.env.VUE_APP_CHILD_APP}`,
      microAppData: {
        pushState: (path) => {
          removeDomScope();
          this.$router.push(path);
        },
        Request,
        xlsxExport,
        phoneDesense,
        IdCardDesense,
        nameDesense
      }
    };
  },
  created() {
    const path_ary = this.$route.path.split('/');
    this.appName = path_ary[path_ary.length - 1];
  },
  mounted() {
    const path_ary = this.$route.path.split('/');
    this.appName = path_ary[path_ary.length - 1];
    unmountAllApps().then(() => {
      console.log('子应用系统卸载成功');
      this.isShow = true;
    });
  }
};
</script>

<style scoped></style>

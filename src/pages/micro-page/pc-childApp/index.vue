<script>
import MicroPage from '@/pages/micro-page';

export default {
  extends: MicroPage,
  name: 'PcChildApp',
  data() {
    return {};
  },
  created() {
    this.child_url =
      process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_CHILD_APP
        : `${window.location.protocol}//${window.location.host}${process.env.VUE_APP_CHILD_APP}`;
    const path_ary = this.$route.path.split('/');
    this.appName = path_ary[path_ary.length - 1];
    this.microAppData.signal = true;
  }
};
</script>

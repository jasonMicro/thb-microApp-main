<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        size="small"
        shape="circle"
        :src="`${imageOss}${userInfo.avatar}`"
      />
      <span class="name">{{ user.username }}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item @click="personal">
        <a-icon type="user" />
        <span>个人中心{{ userInfo.avatar }}</span>
      </a-menu-item>
      <!-- <a-menu-item @click="setting">
        <a-icon type="setting" />
        <span>子应用系统</span>
      </a-menu-item> -->
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex';
import { logout } from '@/services/account';
import { mapState } from 'vuex';

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters('account', ['user']),
    ...mapState({
      userInfo: (state) => state.personalCenter.userInfo
    })
  },
  data() {
    return {
      imageOss: 'https://thb-h5.oss-cn-shenzhen.aliyuncs.com/'
    };
  },

  methods: {
    personal() {
      this.$router.push('/pc-system/personal');
    },
    logout() {
      logout();
      const url =
        sessionStorage.getItem('loginType') === 'admin'
          ? '/admin/login'
          : sessionStorage.getItem('loginType') === 'transport'
          ? '/transport/login'
          : '/login';
      this.$router.push(url);
    },
    setting() {
      this.$router.push('/chart');
    }
  }
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;

  .avatar,
  .name {
    align-self: center;
  }

  .avatar {
    margin-right: 8px;
  }

  .name {
    font-weight: 500;
  }
}

.avatar-menu {
  width: 150px;
}
</style>

<template>
  <div class="login-wrap">
    <div>
      <div class="left-cn-text">Hi，您好！</div>
      <div class="left-cn-text">欢迎进入MICRO综合管理平台</div>
      <div class="left-en-text">WELCOME TO OUR SYSTEM!</div>
    </div>
    <div class="flout-box">
      <img class="logo" src="../../../src/assets/img/logo-login.png" />
      <div class="title-wrap">
        <div class="title">MICRO综合管理平台</div>
      </div>
      <div>
        <div class="login">
          <a-form @submit="onSubmit" :form="form" :wrapper-col="{ span: 22 }">
            <a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />

            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="请输入登录账户名"
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true
                      }
                    ]
                  }
                ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入登录密码"
                autocomplete="autocomplete"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true
                      }
                    ]
                  }
                ]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <div class="login-btn">
              <a-button
                class="submit-btn"
                :loading="logging"
                size="large"
                htmlType="submit"
                type="primary"
                >登录
              </a-button>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfo, login } from '@/services/account';
import { getMenuResource } from '@/services/menu';
import { loadRoutes, menuConfig } from '@/utils/routerUtil';
import { mapMutations } from 'vuex';
import { setAuthorization } from '@/utils/request';
export default {
  name: 'Login',
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      loginType: 'login'
    };
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.account.isLogin
    })
  },
  watch: {
    isLogin(e) {
      if (e.state === 1) {
        this.logging = false;
        this.afterLogin(e.data);
      } else {
        this.logging = false;
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        if (!err) {
          //登录前清空token
          setAuthorization({
            token: ''
          });
          this.logging = true;
          const username = this.form.getFieldValue('name');
          const password = this.form.getFieldValue('password');
          const tenantcode =
            this.loginType === 'admin'
              ? 'ADMIN'
              : this.form.getFieldValue('tenantcode');
          localStorage.setItem('tenantcode', tenantcode);
          sessionStorage.setItem('loginType', this.loginType);
          this.$store
            .dispatch('account/login', {
              account: username,
              password: password,
              tenantCode: 'ZH-FSJDB'
            })
            .catch((e) => {
              this.logging = false;
              this.$message.error('服务异常，请稍后再试');
            });
        }
      });
    },
    setStorageFn(e) {
      Object.keys(e).forEach((key) => {
        localStorage.setItem(key, e[key]);
      });
    },
    afterLogin(res) {
      this.logging = false;
      const loginRes = res;
      const { token, areaCode } = loginRes;
      this.setStorageFn({ areaCode });
      this.getUser();
      const permissions = [{ id: 'queryForm', operation: ['add', 'edit'] }];
      const roles = [
        {
          id: 'admin',
          operation: ['add', 'edit', 'delete']
        }
      ];
      this.setPermissions(permissions);
      this.setRoles(roles);

      // 获取路由配置 getRoutesConfig
      getMenuResource().then((result) => {
        // 去除H5菜单
        let menuList = [];
        result.data.data.forEach((item) => {
          if (item.clientCode === 'pc-manage') {
            menuList.push(item);
          }
        });
        const routesConfig = menuConfig(menuList);
        this.$store.commit('account/setRoutesConfig', menuList);

        loadRoutes(routesConfig);
        this.$router.push('/' + menuList[0].clientCode);
        this.$message.success('登录成功', 3);
      });
    },
    getUser() {
      getUserInfo().then((userRes) => {
        const res = userRes.data;
        if (res.code === 200) {
          this.setUser(res.data);
        } else {
          this.$message.error(res.msg, 3);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
//.common-layout {
.login-wrap {
  width: 100%;
  min-height: 100vh;
  background: url('../../assets/img/login-bg.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .left-cn-text {
    font-size: 59px;
    font-family: Kozuka Gothic Pr6N;
    font-weight: normal;
    color: #ffffff;
    line-height: 94px;
  }

  .left-en-text {
    font-size: 28px;
    font-family: Trebuchet MS;
    font-weight: 400;
    color: #ffffff;
    line-height: 87px;
  }

  .flout-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 538px;
    height: 720px;
    background: #ffffff;
    box-shadow: -21px 17px 30px 5px rgba(94, 174, 234, 0.25);
    border-radius: 40px;
    overflow: hidden;
    margin-left: 67px;

    .logo {
      display: flex;
      justify-content: center;
      margin: 48px 0 60px 0;
    }

    .title-wrap {
      display: flex;
      flex-direction: column;

      .desc {
        font-size: 26px;
        color: #000000;
      }

      .title {
        font-size: 26px;
        color: #000000;
        line-height: normal;
        position: relative;
        overflow: visible;
        text-align: center;

        &::after {
          content: '';
          width: 45px;
          height: 1px;
          background: url('../../assets/img/left-line.png') no-repeat center
            center;
          background-size: contain;
          position: absolute;
          left: -55px;
          top: 50%;
        }

        &::before {
          content: '';
          width: 45px;
          height: 1px;
          background: url('../../assets/img/left-line.png') no-repeat center
            center;
          background-size: contain;
          position: absolute;
          right: -55px;
          top: 50%;
          transform: rotate(-180deg);
        }
      }
    }

    ::v-deep .el-form {
      .el-form-item {
        border-bottom: 1px solid #e6e6e6;

        .el-form-item__content {
          margin: 0px !important;

          .el-input {
            .el-input__inner {
              background-color: transparent !important;
              border: 0px solid transparent !important;
              box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0) !important;
            }

            .el-input__suffix {
              background-color: transparent;
            }
          }
        }
      }
    }
  }
}

.top {
  text-align: center;

  .header {
    height: 44px;
    line-height: 44px;

    a {
      text-decoration: none;
    }

    .logo {
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
    }

    .title {
      font-size: 33px;
      color: @title-color;
      font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }

  .desc {
    font-size: 14px;
    color: @text-color-second;
    margin-top: 12px;
    margin-bottom: 40px;
  }
}

.login {
  width: 368px;
  margin: 80px auto 0 auto;
  padding-left: 15px;
  @media screen and (max-width: 576px) {
    width: 95%;
  }
  @media screen and (max-width: 320px) {
    .captcha-button {
      font-size: 14px;
    }
  }

  /deep/ .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 40px;
  }

  /deep/ .ant-input {
    border: unset;
    border-bottom: 1px solid #e6e6e6;
    border-radius: 0;
  }

  /deep/ .ant-form-explain {
    margin-left: 40px;
  }

  .icon {
    font-size: 24px;
    color: @text-color-second;
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: @primary-color;
    }
  }
}

.login-btn {
  /deep/ .ant-form-item {
    display: flex;
    justify-content: center;
  }

  .submit-btn {
    width: 371px;
    height: 91px;
    background: url('../../assets/img/login-btn.png') no-repeat center center;
    background-size: cover;
    border: unset;
    box-shadow: unset;
    margin: 40px 0 0 -15px;
  }
}

//}
</style>

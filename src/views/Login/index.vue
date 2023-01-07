<template>
  <div class="login-page">
    <NavBar
      title="登陆"
      rightText="注册"
      @onClickLeft="onClickLeft"
      @onClickRight="onClickRight"
    />

    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form @submit="Login">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        v-model="formData.mobile"
        :rules="mobileRules"
      ></van-field>
      <van-field
        :rules="pwdRules"
        placeholder="请输入密码"
        type="password"
        v-model="formData.password"
      ></van-field>
      <div class="cp-cell">
        <van-checkbox v-model="formData.agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { reactive } from "vue-demi";
import { pwdRules, mobileRules } from "@/utils/loginRuls";
import { showToast, Toast } from "vant";
import { LoginByPwd } from "@/services/login";
import { useUserStore } from "@/stores";
let userInfo = useUserStore();
let onClickLeft = () => {
  // history 是默认自带来的
  if (history.state?.back) {
    router.back();
  } else {
    router.push("/user");
  }
};

let onClickRight = () => {
  router.push("/register");
};

let formData = reactive({
  password: "",
  mobile: "",
  agree: true,
});
let Login = async () => {
  let { agree } = formData;
  if (!agree) {
    showToast("请勾选用户协议");
    return;
  }
  // 如果请求失败,请求拦截器会返回一个拒绝的Promise()
  let { data } = await LoginByPwd({
    password: formData.password,
    mobile: formData.mobile,
  });
  userInfo.setUserData(data);
  showToast("登录成功");
  router.push("/");
};
</script>

<style scoped lang="scss">
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
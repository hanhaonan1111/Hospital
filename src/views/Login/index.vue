<template>
  <div class="login-page">
    <NavBar
      title="登陆"
      rightText="注册"
      @onClickLeft="onClickLeft"
      @onClickRight="onClickRight"
    />

    <div class="login-head">
      <h3>{{ current ? "密码" : "短信验证码" }}登录</h3>
      <a href="javascript:;">
        <span @click="changeCur()"
          >{{ !current ? "密码" : "短信验证码" }}登录</span
        >
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form @submit="Login" autocomplete="off">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        v-model="formData.mobile"
        :rules="mobileRules"
        ref="mobile"
      ></van-field>
      <!-- 密码输入框 -->
      <van-field
        v-model="formData.password"
        :rules="pwdRules"
        placeholder="请输入密码"
        :type="openEye ? 'password' : 'text'"
        v-if="current"
      >
        <template #button>
          <van-icon name="eye-o" v-if="!openEye" @click="changeOpenEye" />
          <van-icon name="closed-eye" v-else @click="changeOpenEye" />
        </template>
      </van-field>
      <!-- 短信验证码输入框 -->

      <van-field
        v-model="formData.code"
        placeholder="短信验证码"
        v-else
        :rules="codeRules"
      >
        <template #button>
          <span
            class="btn-send"
            :class="timeCount > 0 ? 'active' : ''"
            @click="Start()"
            >{{
              timeCount > 0 ? timeCount + "秒后重新发送" : "发送验证码"
            }}</span
          >
        </template>
      </van-field>

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
import { reactive, ref, watch } from "vue-demi";
import { pwdRules, mobileRules, codeRules } from "@/utils/loginRuls";
import { showSuccessToast, showToast, Toast } from "vant";
import { LoginByCode, LoginByPwd } from "@/services/login";
import { useUserStore } from "@/stores";
import type { User } from "@/types/user";
import { useTimerInterval } from "@/utils/useTimeOut";
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
  code: "",
});
let current = ref(true);
let Login = async () => {
  let { agree } = formData;
  if (!agree) {
    showToast("请勾选用户协议");
    return;
  }

  let { data } = current.value
    ? await LoginByPwd({
        password: formData.password,
        mobile: formData.mobile,
      })
    : await LoginByCode({
        code: formData.code,
        mobile: formData.mobile,
      });

  userInfo.setUserData(data);
  showSuccessToast("登录成功");
  router.push("/");
};

let changeCur = () => {
  current.value = !current.value;
  if (current.value) {
    // 切换成密码
    formData.code = "";
  } else {
    // 切换成验证码
    formData.password = "";
  }
};
let openEye = ref(true);
let changeOpenEye = () => {
  openEye.value = !openEye.value;
};

let { start, timeCount } = useTimerInterval();
let mobile = ref();
async function Start() {
  if (mobile.value) {
    let validate = await mobile.value.validate();
    if (!validate) {
      start(60);
    }
  }
}
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
:deep() {
  i {
    transform: scale(1.5);
  }
  .van-icon-success {
    transform: unset;
  }
}
</style>
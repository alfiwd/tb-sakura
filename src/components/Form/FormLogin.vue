<template>
  <div class="form">
    <a-form :model="formState" layout="vertical" name="normal_login" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Username" class="form-username" name="username" :rules="[{ required: true, message: 'Masukkan username terlebih dahulu!' }]">
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Masukkan password terlebih dahulu!' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button type="default" html-type="submit" class="login-form-button btn-login" :loading="loading"> Log in </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

import api from "../../services/api";
import toast from "../../components/toast";

export default {
  data() {
    return {
      formState: {
        username: "",
        password: "",
        remember: true,
      },
      loading: false,
    };
  },

  components: {
    UserOutlined,
    LockOutlined,
  },

  methods: {
    async onFinish(values) {
      this.loading = true;
      const username = values.username;
      const password = values.password;
      const data = {
        username,
        password,
      };
      try {
        const response = await api.post("api/auth/signin", data);
        if (response.status == 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$router.push({ name: "Dashboard", params: { name: response.data.username, visible: true } });
          this.loading = false;
        }
      } catch (error) {
        console.log({ error });
        if (error.message == "Network Error") {
          this.toast("error", "Periksa kembali jaringan anda");
          this.loading = false;
        } else if (error.response.status === 401) {
          this.toast("error", "Username atau password salah!");
          this.loading = false;
        }
      }
    },
    onFinishFailed(errorInfo) {},
    toast,
  },
};
</script>

<style>
.btn-login {
  background-color: #001529 !important;
  border: none;
  color: #fff !important;
  width: 100%;
  height: 40px !important;
  border-radius: 10px !important;
  margin-top: 15px;
}
</style>

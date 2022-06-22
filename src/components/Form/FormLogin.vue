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
        <a-button type="default" html-type="submit" class="login-form-button btn-login"> Log in </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      formState: {
        username: "",
        password: "",
        remember: true,
      },
    };
  },

  components: {
    UserOutlined,
    LockOutlined,
  },

  methods: {
    onFinish(values) {
      if (values.username == "user01" && values.password == "123456") {
        localStorage.setItem("login", "true");
        this.$router.push({ name: "Dashboard", params: { name: values.username, visible: true } });
      } else {
        const toast = useToast();
        toast.error("Username atau password salah!", {
          position: "top-center",
          timeout: 1500,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
      }
    },
    onFinishFailed(errorInfo) {
      // console.log("Failed:", errorInfo);
    },
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

<template>
  <div class="form-user">
    <a-row>
      <a-col :xs="24" :md="16" :lg="12">
        <a-form :model="formState" layout="vertical" name="normal_login" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Masukkan username terlebih dahulu!' }]">
            <a-input v-model:value="formState.username" :disabled="disableUsername" />
          </a-form-item>

          <a-form-item label="Nama User" name="nama" :rules="[{ required: true, message: 'Masukkan nama user terlebih dahulu!' }]">
            <a-input v-model:value="formState.nama" />
          </a-form-item>

          <a-form-item label="Nomor Handphone" name="phone" :rules="[{ required: true, message: 'Masukkan nomor handphone terlebih dahulu!' }]">
            <a-input v-model:value="formState.phone" />
          </a-form-item>

          <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Masukkan email terlebih dahulu!', type: 'email' }]">
            <a-input v-model:value="formState.email" :disabled="disableEmail" />
          </a-form-item>

          <a-form-item v-if="data === undefined" label="Password" name="password" :rules="[{ required: true, message: 'Masukkan password terlebih dahulu!' }]">
            <a-input-password v-model:value="formState.password"> </a-input-password>
          </a-form-item>

          <a-form-item v-if="data === undefined" label="Konfirmasi Password" name="konfirmasi_password" :rules="[{ required: true, message: 'Masukkan password terlebih dahulu!' }]">
            <a-input-password v-model:value="formState.konfirmasi_password"> </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button v-if="data == undefined" :disabled="disabledButton()" :loading="loading" type="default" html-type="submit" class="login-form-button"> Tambah User </a-button>
            <a-button v-else :disabled="disabledButton()" :loading="loading" type="default" html-type="submit" class="login-form-button"> Ubah User </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { UploadOutlined } from "@ant-design/icons-vue";

import api from "../../services/api";
import toast from "../toast";

export default {
  data() {
    return {
      formState: {
        id: "",
        username: "",
        nama: "",
        phone: "",
        email: "",
        pasword: "",
        konfirmasi_password: "",
      },
      loading: false,
      disableUsername: false,
      disableEmail: false,
    };
  },

  methods: {
    async onFinish(values) {
      this.loading = true;
      if (this.data == undefined) {
        const data = {
          nama: values.nama,
          username: values.username,
          email: values.email,
          password: values.password,
          role: ["user"],
          phone: values.phone,
        };
        if (values.password === values.konfirmasi_password) {
          if (values.password.length >= 6) {
            try {
              const response = await api.get("api/user");
              const matchUsername = response.data.content.find((item) => {
                return item.username === values.username;
              });
              const matchEmail = response.data.content.find((item) => {
                return item.email === values.email;
              });
              if (matchUsername === undefined && matchEmail === undefined) {
                try {
                  const response = await api.post("api/auth/signup", data);
                  if (response.status === 200) {
                    this.loading = false;
                    this.toast("success", "Berhasil menambahkan user");
                    this.$router.push("/menu-user");
                  } else {
                    this.loading = false;
                    this.toast("error", `Server error\nGagal menambahkan data user`);
                  }
                } catch (error) {
                  this.loading = false;
                  this.toast("error", `Server error\nGagal menambahkan data user`);
                }
              } else {
                this.loading = false;
                this.toast("error", `Username atau email sudah digunakan\nGunakan yang lain`);
              }
            } catch (error) {
              this.loading = false;
              this.toast("error", `Server error\nGagal menambahkan data user`);
            }
          } else {
            this.loading = false;
            this.toast("error", "Password harus lebih dari 5 karakter");
          }
        } else {
          this.loading = false;
          this.toast("error", "Password yang dimasukkan tidak cocok");
        }
      } else {
        const data = {
          nama: values.nama,
          phone: values.phone,
        };
        try {
          const response = await api.put(`api/user/${this.formState.id}`, data);
          if (response.status === 200) {
            this.loading = false;
            this.toast("success", "Berhasil mengubah data user");
            this.$router.push("/menu-user");
          }
        } catch (error) {
          this.loading = false;
          this.toast("error", `Server error\nGagal mengubah data user`);
        }
      }
    },
    onFinishFailed(errorInfo) {},
    disabledButton() {
      const username = this.formState.username != "";
      const nama = this.formState.nama != "";
      const phone = this.formState.phone != "";
      const email = this.formState.email != "";
      const password = this.formState.password != "";

      if (this.data === undefined) {
        const konfirmasi_password = this.formState.konfirmasi_password != "";
        if (username && nama && phone && email && password && konfirmasi_password) {
          return false;
        } else {
          return true;
        }
      } else {
        if (username && nama && phone && email && password) {
          return false;
        } else {
          return true;
        }
      }
    },
    async setData(id) {
      try {
        const response = await api.get(`api/user/${id}`);
        if (response.status === 200) {
          this.formState.id = id;
          this.formState.username = response.data.username;
          this.formState.nama = response.data.nama;
          this.formState.phone = response.data.phone;
          this.formState.email = response.data.email;
          // this.formState.password = response.data.password;
          this.disableUsername = true;
          this.disableEmail = true;
        }
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data user`);
      }
    },
    toast,
  },

  components: {
    UploadOutlined,
  },

  props: ["data"],

  mounted() {
    setTimeout(() => {
      if (this.data != undefined) {
        this.setData(this.data.id);
      }
    }, 0);
  },
};
</script>

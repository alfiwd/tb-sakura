<template>
  <div class="form-user">
    <a-row>
      <a-col :xs="24" :md="16" :lg="12">
        <a-form :model="formState" layout="vertical" name="normal_login" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item label="Nama User" name="nama_user" :rules="[{ required: true, message: 'Masukkan nama user terlebih dahulu!' }]">
            <a-input v-model:value="formState.nama_user" />
          </a-form-item>

          <a-form-item label="Nomor Handphone" name="nomor_handphone" :rules="[{ required: true, message: 'Masukkan nomor handphone terlebih dahulu!' }]">
            <a-input v-model:value="formState.nomor_handphone" />
          </a-form-item>

          <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Masukkan email terlebih dahulu!', type: 'email' }]">
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item>
            <a-button v-if="data == undefined" :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Tambah User </a-button>
            <a-button v-else :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Ubah User </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      formState: {
        nama_user: "",
        nomor_handphone: "",
        email: "",
      },
    };
  },

  methods: {
    onFinish(values) {
      console.log({ values });
      const toast = useToast();
      if (this.data == undefined) {
        toast.success("Berhasil menambahkan data user", {
          position: "top-center",
          timeout: 1500,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
      } else {
        toast.success("Berhasil mengubah data user", {
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
      this.$router.push("/menu-user");
    },
    onFinishFailed(errorInfo) {
      console.log({ errorInfo });
    },
    disabledButton() {
      const nama_user = this.formState.nama_user != "";
      const nomor_handphone = this.formState.nomor_handphone != "";
      const email = this.formState.email != "";
      if (nama_user && nomor_handphone && email) {
        return false;
      } else {
        return true;
      }
    },
    setData() {
      this.formState.nama_user = this.data?.namaUser;
      this.formState.nomor_handphone = this.data?.nomorHandphone;
      this.formState.email = this.data?.email;
    },
  },

  components: {
    UploadOutlined,
  },

  props: ["data"],

  mounted() {
    setTimeout(() => {
      if (this.data != undefined) {
        this.setData();
      }
    }, 0);
  },
};
</script>

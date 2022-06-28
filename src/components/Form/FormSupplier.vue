<template>
  <div class="form-supplier">
    <a-row>
      <a-col :xs="24" :md="16" :lg="12">
        <a-form layout="vertical" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item label="Nama Supplier" name="nama" :rules="[{ required: true, message: 'Masukkan nama supplier terlebih dahulu!' }]">
            <a-input v-model:value="formState.nama" />
          </a-form-item>

          <a-form-item label="Alamat" name="alamat" :rules="[{ required: true, message: 'Masukkan alamat terlebih dahulu!' }]">
            <a-textarea v-model:value="formState.alamat" />
          </a-form-item>

          <a-form-item label="Nomor Handphone" name="noHp" :rules="[{ required: true, message: 'Masukkan nomor handphone terlebih dahulu!' }]">
            <a-input v-model:value="formState.noHp" />
          </a-form-item>

          <a-form-item label="Nomor Telephone" name="noTelepon" :rules="[{ required: true, message: 'Masukkan nomor Telephone terlebih dahulu!' }]">
            <a-input v-model:value="formState.noTelepon" />
          </a-form-item>

          <a-form-item label="Deskripsi" name="deskripsi" :rules="[{ required: true, message: 'Masukkan deskripsi terlebih dahulu!' }]">
            <a-input v-model:value="formState.deskripsi" />
          </a-form-item>

          <a-form-item>
            <a-button v-if="data == undefined" :disabled="disabledButton()" :loading="loading" type="default" html-type="submit" class="login-form-button"> Tambah Supplier </a-button>
            <a-button v-else :disabled="disabledButton()" :loading="loading" type="default" html-type="submit" class="login-form-button"> Ubah Supplier </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { UploadOutlined } from "@ant-design/icons-vue";

import api from "../../services/api";
import toast from "../../components/toast";

export default {
  data() {
    return {
      formState: {
        nama: "",
        alamat: "",
        noHp: "",
        noTelepon: "",
        deskripsi: "",
      },
      loading: false,
    };
  },

  methods: {
    async onFinish(values) {
      this.loading = true;
      const data = {
        nama: values.nama,
        noTelepon: values.noTelepon,
        noHp: values.noHp,
        alamat: values.alamat,
        deskripsi: values.deskripsi,
      };
      if (this.data == undefined) {
        try {
          const response = await api.post("api/supplier", data);
          if (response.status == 200) {
            this.loading = false;
            this.toast("success", "Berhasil menambahkan supplier");
            this.$router.push("/menu-supplier");
          } else {
            this.loading = false;
            this.toast("error", `Server error\nGagal menambahkan supplier`);
          }
        } catch (error) {
          this.toast("error", `Server error\nGagal menambahkan supplier`);
        }
      } else {
        try {
          const response = await api.put(`api/supplier/${this.data?.id}`, data);
          if (response.status == 200) {
            this.loading = false;
            this.toast("success", "Berhasil mengubah data supplier");
            this.$router.push("/menu-supplier");
          } else {
            this.loading = false;
            this.toast("error", "Server error");
            this.toast("error", `Server error\nGagal mengubah data supplier`);
          }
        } catch (error) {
          this.loading = false;
          this.toast("error", "Server error");
          this.toast("error", `Server error\nGagal mengubah data supplier`);
        }
      }
    },
    onFinishFailed(errorInfo) {},
    disabledButton() {
      const nama = this.formState.nama != "";
      const deskripsi = this.formState.deskripsi != "";
      const alamat = this.formState.alamat != "";
      const noHp = this.formState.noHp != "";
      const noTelepon = this.formState.noTelepon != "";
      if (nama && deskripsi && alamat && noHp && noTelepon) {
        return false;
      } else {
        return true;
      }
    },
    async setData() {
      try {
        const response = await api.get(`api/supplier/${this.data?.id}`);
        this.formState.nama = response?.data?.nama;
        this.formState.deskripsi = response?.data?.deskripsi;
        this.formState.alamat = response?.data?.alamat;
        this.formState.noHp = response?.data?.noHp;
        this.formState.noTelepon = response?.data?.noTelepon;
      } catch (error) {
        this.toast("error", `Server error\nGagal mendapatkan data supplier`);
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
        this.setData();
      }
    }, 0);
  },
};
</script>

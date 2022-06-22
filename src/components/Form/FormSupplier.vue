<template>
  <div class="form-supplier">
    <a-row>
      <a-col :xs="24" :md="16" :lg="12">
        <a-form layout="vertical" :model="formState" name="normal_login" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item label="Nama Supplier" name="nama_supplier" :rules="[{ required: true, message: 'Masukkan nama supplier terlebih dahulu!' }]">
            <a-input v-model:value="formState.nama_supplier" />
          </a-form-item>

          <a-form-item label="Daerah" name="daerah" :rules="[{ required: true, message: 'Masukkan daerah terlebih dahulu!' }]">
            <a-input v-model:value="formState.daerah" />
          </a-form-item>

          <a-form-item label="Alamat" name="alamat" :rules="[{ required: true, message: 'Masukkan alamat terlebih dahulu!' }]">
            <a-textarea v-model:value="formState.alamat" />
          </a-form-item>

          <a-form-item label="Nomor Handphone" name="nomor_handphone" :rules="[{ required: true, message: 'Masukkan nomor handphone terlebih dahulu!' }]">
            <a-input v-model:value="formState.nomor_handphone" />
          </a-form-item>

          <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Masukkan email terlebih dahulu!', type: 'email' }]">
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item>
            <a-button v-if="data == undefined" :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Tambah Supplier </a-button>
            <a-button v-else :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Ubah Supplier </a-button>
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
        nama_supplier: "",
        daerah: "",
        alamat: "",
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
        toast.success("Berhasil menambahkan data supplier", {
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
        toast.success("Berhasil mengubah data supplier", {
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
      this.$router.push("/menu-supplier");
    },
    onFinishFailed(errorInfo) {
      console.log({ errorInfo });
    },
    disabledButton() {
      const nama_supplier = this.formState.nama_supplier != "";
      const daerah = this.formState.daerah != "";
      const alamat = this.formState.alamat != "";
      const nomor_handphone = this.formState.nomor_handphone != "";
      const email = this.formState.email != "";
      if (nama_supplier && daerah && alamat && nomor_handphone && email) {
        return false;
      } else {
        return true;
      }
    },
    setData() {
      this.formState.nama_supplier = this.data?.namaSupplier;
      this.formState.daerah = this.data?.daerah;
      this.formState.alamat = this.data?.alamat;
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

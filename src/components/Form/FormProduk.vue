<template>
  <div class="form-produk">
    <a-row>
      <a-col :xs="24" :md="16" :lg="12">
        <a-form layout="vertical" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item label="Nama Produk" name="nama_produk" :rules="[{ required: true, message: 'Masukkan nama produk terlebih dahulu!' }]">
            <a-input v-model:value="formState.nama_produk" />
          </a-form-item>
          <a-form-item name="kategori" label="Kategori" :rules="[{ required: true, message: 'Pilih kategori terlebih dahulu!' }]">
            <a-input v-model:value="formState.kategori" />
          </a-form-item>
          <a-form-item label="Foto Produk" :rules="[{ required: true, message: 'Masukkan foto produk terlebih dahulu!' }]">
            <a-upload v-model:file-list="formState.foto_produk" accept=".png, .jpg, .jpeg" :before-upload="beforeUpload" list-type="picture-card" @preview="handlePreview">
              <div v-if="formState.foto_produk.length == 0">
                <upload-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item label="Modal Modal (Rupiah)" name="harga_modal" :rules="[{ required: true, message: 'Masukkan harga modal terlebih dahulu!' }]">
            <a-input-number v-model:value="formState.harga_modal" :min="1" style="width: 100%" />
          </a-form-item>
          <a-form-item label="Harga Jual (Rupiah)" name="harga_jual" :rules="[{ required: true, message: 'Masukkan harga jual terlebih dahulu!' }]">
            <a-input-number v-model:value="formState.harga_jual" :min="1" style="width: 100%" />
          </a-form-item>
          <a-form-item name="supplier" label="Supplier" :rules="[{ required: true, message: 'Pilih supplier terlebih dahulu!' }]">
            <a-select v-model:value="formState.supplier" placeholder="Pilih supplier">
              <a-select-option v-for="item in suppliers" :key="item.id" :value="item.id">{{ item.nama }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Stok Barang (PCS)" name="stok" :rules="[{ required: true, message: 'Masukkan stok barang terlebih dahulu!' }]">
            <a-input-number v-model:value="formState.stok" :min="1" style="width: 100%" />
          </a-form-item>
          <a-form-item>
            <a-button v-if="data == undefined" :disabled="disabledButton()" type="default" :loading="loadingSubmit" html-type="submit" class="login-form-button"> Tambah Produk </a-button>
            <a-button v-else :disabled="disabledButton()" type="default" :loading="loadingSubmit" html-type="submit" class="login-form-button"> Ubah Produk </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import moment from "moment";

import api from "../../services/api";
import toast from "../../components/toast";

export default {
  data() {
    return {
      formState: {
        id: null,
        nama_produk: "",
        harga_jual: null,
        supplier: null,
        kategori: "",
        stok: null,
        harga_modal: null,
        foto_produk: [],
        tglMasuk: null,
      },
      previewVisible: false,
      previewTitle: "",
      previewImage: "",
      imageProps: "",
      suppliers: [],
      loadingSubmit: false,
    };
  },

  methods: {
    async onFinish(values) {
      this.loadingSubmit = true;
      const formData = new FormData();
      const config = {
        "Content-Type": "multipart/form-data",
      };
      if (this.data == undefined) {
        formData.set("nama", values.nama_produk);
        formData.set("stok", values.stok);
        formData.set("kategori", values.kategori);
        formData.set("hargaModal", values.harga_modal);
        formData.set("hargaJual", values.harga_jual);
        formData.set("supplier", values.supplier);
        formData.set("image", this.formState.foto_produk[0].originFileObj);
        formData.set("tglMasuk", moment().format("yyyy-MM-DD"));
        const typeFile = this.formState.foto_produk[0].type;
        if (typeFile === "image/png" || typeFile === "image/jpeg" || typeFile === "image/jpg") {
          try {
            const response = await api.post("api/product", formData, config);
            if (response.status === 200) {
              this.loadingSubmit = false;
              this.toast("success", "Berhasil menambahkan produk");
            }
          } catch (error) {
            this.loadingSubmit = false;
            this.toast("error", `Server error\nGagal menambahkan produk`);
          }
        } else {
          this.loadingSubmit = false;
          this.toast("error", "Mohon masukkan foto produk bertipe file gambar");
        }
      } else {
        if (this.formState.foto_produk[0].originFileObj) {
          formData.set("nama", values.nama_produk);
          formData.set("stok", values.stok);
          formData.set("kategori", values.kategori);
          formData.set("hargaModal", values.harga_modal);
          formData.set("hargaJual", values.harga_jual);
          formData.set("supplier", values.supplier);
          formData.set("image", this.formState.foto_produk[0].originFileObj);
          formData.set("tglMasuk", this.formState.tglMasuk);
          try {
            const response = await api.put(`api/product/${this.formState.id}`, formData, config);
            if (response.status === 200) {
              this.toast("success", "Berhasil mengubah produk");
              this.$router.push("/menu-produk");
            } else {
              this.toast("error", `Server error\nGagal mengubah data product`);
            }
            this.loadingSubmit = false;
          } catch (error) {
            this.loadingSubmit = false;
            this.toast("error", `Server error\nGagal mengubah data product`);
          }
        } else if (this.formState.foto_produk[0].originFileObj === undefined) {
          formData.set("nama", values.nama_produk);
          formData.set("stok", values.stok);
          formData.set("kategori", values.kategori);
          formData.set("hargaModal", values.harga_modal);
          formData.set("hargaJual", values.harga_jual);
          formData.set("supplier", values.supplier);
          formData.set("tglMasuk", this.formState.tglMasuk);
          try {
            const response = await api.put(`api/product/${this.formState.id}`, formData, config);
            if (response.status === 200) {
              this.toast("success", "Berhasil mengubah produk");
              this.$router.push("/menu-produk");
            } else {
              this.toast("error", `Server error\nGagal mengubah data product`);
            }
            this.loadingSubmit = false;
          } catch (error) {
            this.loadingSubmit = false;
            this.toast("error", `Server error\nGagal mengubah data product`);
          }
        }
      }
    },
    onFinishFailed(errorInfo) {},
    disabledButton() {
      const nama_produk = this.formState.nama_produk != "";
      const kategori = this.formState.kategori != "";
      const harga_modal = this.formState.harga_modal != null;
      const harga_jual = this.formState.harga_jual != null;
      const supplier = this.formState.supplier != null;
      const stok = this.formState.stok != null;
      const foto_produk = this.formState.foto_produk.length > 0;
      if (nama_produk && kategori && harga_modal && harga_jual && supplier && stok && foto_produk) {
        return false;
      } else {
        return true;
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async handlePreview(file) {
      const foto = async () => {
        if (file.originFileObj) {
          return await this.getBase64(file.originFileObj);
        } else {
          return file.url;
        }
      };
      this.previewVisible = true;
      this.previewTitle = this.formState.foto_produk[0].name;
      this.previewImage = await foto();
    },
    handleCancel() {
      this.previewVisible = false;
      this.previewTitle = "";
      this.previewImage = "";
    },
    setData(data) {
      console.log({ data });
      this.formState.id = data?.id;
      this.formState.nama_produk = data?.nama;
      this.formState.harga_jual = data?.hargaJual;
      this.formState.supplier = data?.supplier?.id;
      this.formState.stok = data?.stok;
      this.formState.kategori = data?.kategori;
      this.formState.harga_modal = data?.hargaModal;
      this.formState.foto_produk.push({
        url: `data:image/png;base64,${data?.photo}`,
      });
      this.formState.tglMasuk = data?.tglMasuk;
    },
    async setSupplier() {
      try {
        const response = await api.get("api/supplier");
        this.suppliers = response.data.content;
      } catch (error) {
        console.log({ error });
        this.toast("error", `Server error\nGagal mendapatkan data supplier`);
      }
    },
    beforeUpload() {
      return false;
    },
    toast,
    moment,
  },

  components: {
    UploadOutlined,
  },

  props: ["data"],

  mounted() {
    setTimeout(async () => {
      if (this.data != undefined) {
        try {
          const response = await api.get(`api/product/${this.data.id}`);
          this.setData(response.data);
        } catch (error) {
          this.toast("error", `Server error\nGagal mendapatkan data produk`);
        }
      }
    }, 0);
    this.setSupplier();
  },
};
</script>

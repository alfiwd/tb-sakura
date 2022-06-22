<template>
  <div class="form-produk">
    <a-row>
      <a-col :xs="24" :md="16" :lg="12">
        <a-form layout="vertical" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
          <!-- <a-row :gutter="[20, 0]">
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item label="Nama Produk" name="nama_produk" :rules="[{ required: true, message: 'Masukkan nama produk terlebih dahulu!' }]">
                <a-input v-model:value="formState.nama_produk" />
              </a-form-item>
            </a-col>
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item name="supplier" label="Supplier" :rules="[{ required: true, message: 'Pilih supplier terlebih dahulu!' }]">
                <a-select v-model:value="formState.supplier" placeholder="Pilih supplier">
                  <a-select-option value="toko berkah">Toko Berkah</a-select-option>
                  <a-select-option value="toko jaya">Toko Jaya</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[20, 0]">
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item name="kategori" label="Kategori" :rules="[{ required: true, message: 'Pilih kategori terlebih dahulu!' }]">
                <a-select v-model:value="formState.kategori" placeholder="Pilih kategori ">
                  <a-select-option value="cat">Cat</a-select-option>
                  <a-select-option value="keramik">Keramik</a-select-option>
                  <a-select-option value="kawat">Kawat</a-select-option>
                  <a-select-option value="atap">Atap</a-select-option>
                  <a-select-option value="gergaji">Gergaji</a-select-option>
                  <a-select-option value="pintu">Pintu</a-select-option>
                  <a-select-option value="selang">Selang</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item label="Stok Barang (PCS)" name="stok" :rules="[{ required: true, message: 'Masukkan stok barang terlebih dahulu!' }]">
                <a-input-number v-model:value="formState.stok" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[20, 0]">
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item label="Harga Jual (Rupiah)" name="harga" :rules="[{ required: true, message: 'Masukkan harga terlebih dahulu!' }]">
                <a-input-number v-model:value="formState.harga" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item label="Modal Modal (Rupiah)" name="harga_modal" :rules="[{ required: true, message: 'Masukkan harga modal terlebih dahulu!' }]">
                <a-input-number v-model:value="formState.harga_modal" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[20, 0]">
            <a-col :xs="12" :md="12" :lg="12">
              <a-form-item label="Foto Produk" :rules="[{ required: true, message: 'Masukkan foto produk terlebih dahulu!' }]">
                <a-upload v-model:file-list="formState.foto_produk" :before-upload="beforeUpload" list-type="picture-card" @preview="handlePreview">
                  <div v-if="formState.foto_produk.length == 0">
                    <upload-outlined />
                    <div style="margin-top: 8px">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :xs="24" :md="24" :lg="24">
              <a-form-item>
                <a-button v-if="data == undefined" :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Tambah Produk </a-button>
                <a-button v-else :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Ubah Produk </a-button>
              </a-form-item>
            </a-col>
          </a-row> -->
          <a-form-item label="Nama Produk" name="nama_produk" :rules="[{ required: true, message: 'Masukkan nama produk terlebih dahulu!' }]">
            <a-input v-model:value="formState.nama_produk" />
          </a-form-item>

          <a-form-item name="kategori" label="Kategori" :rules="[{ required: true, message: 'Pilih kategori terlebih dahulu!' }]">
            <a-select v-model:value="formState.kategori" placeholder="Pilih kategori ">
              <a-select-option value="cat">Cat</a-select-option>
              <a-select-option value="keramik">Keramik</a-select-option>
              <a-select-option value="kawat">Kawat</a-select-option>
              <a-select-option value="atap">Atap</a-select-option>
              <a-select-option value="gergaji">Gergaji</a-select-option>
              <a-select-option value="pintu">Pintu</a-select-option>
              <a-select-option value="selang">Selang</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Foto Produk" :rules="[{ required: true, message: 'Masukkan foto produk terlebih dahulu!' }]">
            <a-upload v-model:file-list="formState.foto_produk" :before-upload="beforeUpload" list-type="picture-card" @preview="handlePreview">
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
              <a-select-option value="toko berkah">Toko Berkah</a-select-option>
              <a-select-option value="toko jaya">Toko Jaya</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Stok Barang (PCS)" name="stok" :rules="[{ required: true, message: 'Masukkan stok barang terlebih dahulu!' }]">
            <a-input-number v-model:value="formState.stok" :min="1" style="width: 100%" />
          </a-form-item>

          <a-form-item>
            <a-button v-if="data == undefined" :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Tambah Produk </a-button>
            <a-button v-else :disabled="disabledButton()" type="default" html-type="submit" class="login-form-button"> Ubah Produk </a-button>
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
        nama_produk: "",
        harga_jual: null,
        supplier: null,
        kategori: null,
        stok: null,
        harga_modal: null,
        foto_produk: [],
      },
      previewVisible: false,
      previewTitle: "",
      previewImage: "",
      imageProps: "",
    };
  },

  methods: {
    onFinish(values) {
      console.log({ values });
      const toast = useToast();
      if (this.data == undefined) {
        toast.success("Berhasil menambahkan produk", {
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
        toast.success("Berhasil mengubah produk", {
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
      this.$router.push("/menu-produk");
    },
    onFinishFailed(errorInfo) {},
    disabledButton() {
      const nama_produk = this.formState.nama_produk != "";
      const harga_modal = this.formState.harga_modal != null;
      const harga_jual = this.formState.harga_jual != null;
      const supplier = this.formState.supplier != null;
      const stok = this.formState.stok != null;
      const foto_produk = this.formState.foto_produk.length > 0;
      if (nama_produk && harga_modal && harga_jual && supplier && stok && foto_produk) {
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
    setData() {
      this.formState.nama_produk = this.data?.namaProduk;
      this.formState.harga_jual = this.data?.hargaJual;
      this.formState.supplier = this.data?.supplier;
      this.formState.stok = this.data?.stok;
      this.formState.kategori = this.data?.kategori;
      this.formState.harga_modal = this.data?.hargaModal;
      this.formState.foto_produk.push(this.data?.foto);
    },
    beforeUpload() {
      return false;
    },
  },

  components: {
    UploadOutlined,
  },

  props: ["data"],

  mounted() {
    setTimeout(() => {
      console.log(this.data);
      if (this.data != undefined) {
        this.setData();
      }
    }, 0);
  },
};
</script>

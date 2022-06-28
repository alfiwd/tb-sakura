<template>
  <div class="keranjang">
    <a-row :gutter="[0, 30]">
      <a-col :xs="24" :md="24" style="">
        <a-row>
          <a-col :xs="1" :md="2" style=""><h1>No</h1></a-col>
          <a-col :xs="8" :md="8" style=""><h1>Detail Produk</h1></a-col>
          <a-col :xs="6" :md="6" style="text-align: center"><h1>Jumlah</h1></a-col>
          <a-col :xs="5" :md="5" style="text-align: center"><h1>Total Harga</h1></a-col>
          <a-col :xs="4" :md="3" style="text-align: center"><span></span></a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :md="24">
        <a-row v-for="(item, index) in dataCarts" :key="item.id" align="middle" style="margin-bottom: 20px">
          <a-col :xs="1" :md="2" style=""
            ><span>{{ index + 1 }}</span></a-col
          >
          <a-col :xs="8" :md="8" style="">
            <a-row align="middle">
              <a-col class="foto-produk">
                <img :src="`data:image/png;base64,${item?.photo}`" alt="produk" />
              </a-col>
              <a-col class="deskripsi-produk">
                <h1>{{ item?.nama }}</h1>
                <p>
                  <strong>{{ rupiah(`${item?.hargaJual}`, "Rp. ") }}</strong>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="6" :md="6" class="jumlah" style="">
            <div>
              <plus-circle-outlined @click="actionJumlah('tambah', index)" />
              <a-input-number id="inputNumber" v-model:value="item.quantity" :min="1" :controls="false" style="margin: 0px 10px" />
              <minus-circle-outlined @click="actionJumlah('kurang', index)" />
            </div>
          </a-col>
          <a-col :xs="5" :md="5" class="total-harga" style="">
            <h1>
              <strong>{{ rupiah(`${item?.hargaJual * item?.quantity}`, "Rp. ") }}</strong>
            </h1>
          </a-col>
          <a-col :xs="4" :md="3" class="hapus-item" style="text-align: end">
            <delete-outlined @click="hapusItem(index)" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :md="24">
        <a-row align="middle">
          <a-col :xs="18" :md="18"> </a-col>
          <a-col :xs="6" :md="6">
            <a-form :model="formState" layout="vertical">
              <a-form-item label="Notes" name="notes">
                <a-input v-model:value="formState.notes"> </a-input>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :xs="12" :md="12" style=""> </a-col>
          <a-col :xs="12" :md="12" style="text-align: end">
            <div class="total-belanja">
              <h1>
                Total Belanja : <strong>{{ rupiah(`${totalBelanja}`, "Rp. ") }}</strong>
              </h1>
            </div>
            <div @click="checkout" class="checkout">
              <a-button :loading="loading" type="primary">
                <template #icon><shopping-cart-outlined /></template>
                Checkout
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PlusCircleOutlined, MinusCircleOutlined, DeleteOutlined, ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";

import toast from "../components/toast";
import Table from "../components/Table.vue";
import api from "../services/api";
import rupiah from "../helper/rupiah";

export default {
  data() {
    return {
      quantity: 1,
      dataCarts: [],
      loading: false,
      totalPembelian: null,
      formState: {
        notes: "",
      },
      products: [],
    };
  },

  components: {
    Table,
    PlusCircleOutlined,
    MinusCircleOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    ShoppingCartOutlined,
  },

  methods: {
    actionJumlah(tipe, index) {
      if (tipe == "tambah") {
        this.dataCarts[index].quantity = this.dataCarts[index].quantity + 1;
        this.products[index].quantity = this.products[index].quantity + 1;
        localStorage.setItem("orderProduct", JSON.stringify(this.dataCarts));
      } else if (tipe == "kurang") {
        if (this.dataCarts[index].quantity > 1 || this.products[index].quantity) {
          this.dataCarts[index].quantity = this.dataCarts[index].quantity - 1;
          this.products[index].quantity = this.products[index].quantity - 1;
          localStorage.setItem("orderProduct", JSON.stringify(this.dataCarts));
        }
      }
    },
    hapusItem(index) {
      this.dataCarts.splice(index, 1);
      if (this.dataCarts.length === 0) {
        localStorage.removeItem("orderProduct");
      } else {
        localStorage.setItem("orderProduct", JSON.stringify(this.dataCarts));
      }
      this.toast("success", "Berhasil menghapus item");
    },
    async checkout() {
      this.loading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        totalPembelian: this.totalPembelian,
        user: {
          id: user.id,
        },
        products: this.products,
        notes: this.formState.notes,
      };
      const keyObj = ["createdAt", "createdBy", "deletedAt", "hargaJual", "hargaModal", "kategori", "nama", "photo", "stok", "supplier", "tglMasuk", "updatedAt", "updatedBy"];
      for (let i = 0; i < this.products.length; i++) {
        for (let j = 0; j < keyObj.length; j++) {
          delete this.products[i][keyObj[j]];
        }
      }
      try {
        const response = await api.post("api/order", data);
        if (response.status === 200) {
          this.loading = false;
          this.toast("success", "Berhasil save order");
          localStorage.removeItem("orderProduct");
          window.location.reload();
        }
      } catch (error) {
        this.toast("error", `Server error\nGagal checkout barang`);
        this.loading = false;
      }
    },
    rupiah,
    toast,
  },

  computed: {
    totalBelanja() {
      return this.dataCarts.reduce((prev, current) => {
        this.totalPembelian = prev + current.quantity * current.hargaJual;
        return prev + current.quantity * current.hargaJual;
      }, 0);
    },
  },

  async mounted() {
    if (localStorage.getItem("orderProduct") != null) {
      this.dataCarts = JSON.parse(localStorage.getItem("orderProduct"));
      this.products = JSON.parse(localStorage.getItem("orderProduct"));
    }
  },
};
</script>

<style>
.keranjang .jumlah,
.keranjang .total-harga,
.keranjang .hapus-item {
  text-align: center;
}

.keranjang .anticon {
  font-size: 20px;
  cursor: pointer;
}

.keranjang .hapus-item {
  color: red;
}

.keranjang .foto-produk img {
  width: 100px;
  margin-right: 20px;
}

.keranjang .lanjutkan-pembelian {
  cursor: pointer;
}

.keranjang .lanjutkan-pembelian .anticon {
  margin-right: 10px;
}

.keranjang .total-belanja {
  margin-bottom: 30px;
}

/* ===================== Responsive Breakpoints ===================== */
@media (max-width: 992px) {
  .keranjang .foto-produk img {
    width: 50px;
  }

  .keranjang .total-harga {
    align-items: center;
  }

  .keranjang .jumlah .ant-input-number {
    width: 50px;
    height: 25px;
  }

  .keranjang .jumlah input {
    height: 25px;
  }

  .keranjang .anticon {
    font-size: 15px;
  }
}
</style>

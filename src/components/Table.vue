<template>
  <a-table :columns="columns" :row-key="(record) => record.key" :data-source="data" :loading="loading" @change="change" :pagination="{ showSizeChanger: true, responsive: true }">
    <template v-slot:bodyCell="{ column, record, index }">
      <template v-if="column.key === 'foto'">
        <img v-if="record.photo !== null" :src="`data:image/png;base64,${record.photo}`" alt="photo product" width="100" />
      </template>
      <template v-if="column.key === 'no'">
        {{ index + 1 }}
      </template>
      <template v-if="column.key === 'supplier'">
        {{ record?.supplier?.nama }}
      </template>
      <template v-if="column.key === 'hargaJual'"> {{ rupiah(`${record.hargaJual}`, "Rp. ") }} </template>
      <template v-if="column.key === 'hargaModal'"> {{ rupiah(`${record.hargaModal}`, "Rp. ") }} </template>
      <template v-if="column.key == 'aksi'">
        <div class="aksi">
          <div class="hapus">
            <a-popconfirm v-if="data.length" :title="titleDelete()" @confirm="onDelete(record.id)">
              <delete-outlined />
              <span class="text">Hapus</span>
            </a-popconfirm>
          </div>
          <div v-on:click="ubahData(record, name)" class="ubah">
            <edit-outlined />
            <span v-if="name == 'product'" class="text">Ubah</span>
            <span v-else-if="name == 'supplier'" class="text">Ubah</span>
            <span v-else-if="name == 'user'" class="text">Ubah</span>
          </div>
        </div>
      </template>
      <template v-if="column.key == 'hapus'">
        <div class="aksi">
          <div class="hapus">
            <delete-outlined />
          </div>
        </div>
      </template>
      <template v-if="column.key == 'keranjangDeskripsi'">
        <div class="deskripsi-keranjang">
          <div class="foto-produk">
            <img :src="record.keranjangDeskripsi.fotoProduk" alt="foto produk" width="100" />
          </div>
          <div class="detail-produk">
            <h1>
              <strong>{{ record.keranjangDeskripsi.namaProduk }}</strong>
            </h1>
            <p>{{ record.keranjangDeskripsi.harga }}</p>
          </div>
        </div>
      </template>
      <template v-if="column.key == 'lihat'">
        <div v-on:click="lihatData(record.id)" class="lihat">
          <eye-outlined />
          <span>Lihat Data</span>
        </div>
      </template>
      <template v-if="column.key === 'stok'">
        <div v-if="record?.stok < 1">
          <p style="color: red">Stok habis</p>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script>
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined, EyeOutlined } from "@ant-design/icons-vue";

import toast from "../components/toast";
import rupiah from "../helper/rupiah";

export default {
  data() {
    return {
      jumlah: 1,
    };
  },

  components: {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    EyeOutlined,
  },

  props: ["data", "columns", "name", "loading"],

  methods: {
    change(a, b, c, d) {
      console.log({ a });
      console.log({ b });
      console.log({ c });
      console.log({ d });
    },
    ubahData(record, name) {
      const data = JSON.stringify(record);
      if (name == "product") {
        this.$router.push({ name: "Ubah Produk", params: { data } });
      } else if (name == "supplier") {
        this.$router.push({ name: "Ubah Supplier", params: { data } });
      } else if (name == "user") {
        this.$router.push({ name: "Ubah User", params: { data } });
      }
    },
    titleDelete() {
      if (this.name == "product") {
        return "Apakah yakin ingin menghapus data produk ini?";
      } else if (this.name == "supplier") {
        return "Apakah yakin ingin menghapus data supplier ini?";
      } else if (this.name == "user") {
        return "Apakah yakin ingin menghapus data user ini?";
      }
    },
    lihatData(record) {
      const data = JSON.stringify(record);
      this.$router.push({ name: "Detail Riwayat Pembelian", params: { data } });
    },
    onDelete(id) {
      this.$emit("deleteItem", id);
    },
    nomor(index, length) {},
    toast,
    rupiah,
  },

  emits: ["deleteItem"],
};
</script>

<style>
.aksi {
  display: flex;
  flex-direction: column;
}

.aksi .anticon,
.lihat .anticon {
  margin-right: 5px;
}

.hapus {
  margin-bottom: 10px;
}

.hapus span {
  color: red;
  cursor: pointer;
}

.ubah span {
  color: orange;
  cursor: pointer;
}

.lihat span {
  color: #1890ff;
  cursor: pointer;
}

.jumlah .ant-input-number-group-addon {
  cursor: pointer;
}

.jumlah .ant-input-number-input-wrap {
  width: 75px;
  height: 40px;
}

.jumlah .ant-input-number-input-wrap input {
  height: 100%;
}

.deskripsi-keranjang {
  display: flex;
}

.deskripsi-keranjang .detail-produk {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}

/* ===================== Responsive Breakpoints ===================== */
@media (max-width: 1200px) {
  .aksi .text {
    display: none;
  }
  .aksi .anticon {
    font-size: 20px;
  }
}
</style>

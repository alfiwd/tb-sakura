<template>
  <div class="kelola-supplier">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <FormSupplier v-if="$route.name == 'Ubah Supplier'" v-model:data="data" />
        <FormSupplier v-else-if="$route.name == 'Tambah Supplier'" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FormSupplier from "../../components/Form/FormSupplier.vue";

export default {
  data() {
    return {
      data: null,
    };
  },

  components: {
    FormSupplier,
  },

  mounted() {
    if (this.$route.name == "Ubah Supplier" && this.$route.params.data == undefined) {
      this.$router.push("/menu-supplier");
    }

    if (this.$route.params.data) {
      const data = JSON.parse(this.$route.params.data);
      this.data = data;
    }
  },
};
</script>

<style>
.kelola-supplier {
  background-color: #fff;
  padding: 20px 20px 0px 20px;
  height: 100%;
}
</style>

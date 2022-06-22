<template>
  <div>
    <a-modal v-model:visible="visible" :title="null" :footer="null" :closable="false">
      <h2>Hello {{ name }}</h2>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ["visible", "name"],
};
</script>

<style>
.ant-modal-body h2 {
  text-align: center;
}
</style>

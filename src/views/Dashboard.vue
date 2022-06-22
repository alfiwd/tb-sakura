<template>
  <div class="dashboard" style="height: 80vh">
    <a-row style="height: 100%" justify="center" align="middle">
      <a-col>
        <div class="container">
          <img src="../../public/images/dashboard.svg" alt="dashboard" />
          <h1>Dashboard tes...</h1>
        </div>
      </a-col>
    </a-row>
    <!-- <div class="container">
      <img src="../../public/images/dashboard.svg" alt="dashboard" />
      <h1>Dashboard ...</h1>
    </div> -->
  </div>
</template>

<script>
// import Layout from "../components/Layout/index.vue";

export default {
  data() {
    return {
      coba: "alfian",
    };
  },
};
</script>

<style>
.dashboard {
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* height: 100%; */
}

.container {
  /* text-align: center; */
}

.dashboard .container img {
  /* width: 80%; */
  /* margin-bottom: 50px; */
}

.dashboard .container h1 {
  font-size: 2em;
  text-align: center;
}

.dashboard .container {
  /* border: 1px solid red; */
  /* text-align: center; */
}

.dashboard .container img {
  width: 100%;
  max-width: 600px;
  margin-bottom: 50px;
}

/* ======================= Responsive Breakpoints ======================= */
@media (max-width: 600px) {
  .dashboard .container h1 {
    font-size: 1em;
  }
}
</style>

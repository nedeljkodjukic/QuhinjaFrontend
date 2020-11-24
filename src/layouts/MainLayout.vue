<template >
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        style=" height:20px;display:flex; flex-direction:row; flex grow:1; align-content:center  "
        class="bg-amber-6"
        ><div class="buttonDetails" @click="handleClick()">
          <h6 class="text-brown-9 q-mr-sm">Quhinja</h6>
        </div>

        <q-tabs class="text-brown-9">
          <q-route-tab active name="Menu" label="Menu" to="/menu" />
          <q-route-tab name="Jela" label="Jela" to="/dishes" />
          <q-route-tab name="Zaposleni" label="Zaposleni" to="/employees" />
        </q-tabs>
        <q-btn class="fixed-top-right on-left q-mt-sm" dense>
          <q-icon name="login" color="brown-9"> </q-icon>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style scoped>
.buttonDetails:hover {
  cursor: pointer;
  color: blue;
}
</style>

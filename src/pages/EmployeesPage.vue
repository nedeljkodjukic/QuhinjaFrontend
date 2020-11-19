<template>
  <q-page class="bg-grey-4">
    <div class="q-pa-md q-gutter-md">
      <q-list  style="width: 100%">
        <q-item class="q-mb-sm bg-grey-4">
          <q-item-section avatar>
           <q-avatar style=" width:100px"> </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span class="text-bold">Ime i prezime</span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold"> Datum rodjenja</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold">Datum zaposlenja</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold"> Omiljeno jelo</q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="border-radius:15px 15px 15px 15px" class="bg-blue-2 q-mb-md" v-for="employee in employees" :key="employee.id" v-ripple>
          <q-item-section  avatar>
            <q-avatar style="height:100px; width:100px">
              <img :src="employee.profilePictureUrl" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span 
                >{{ employee.name }} {{ employee.surname }}</span
              >
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label> {{ employee.dateOfBirth | ParseDate }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              employee.dateOfEmployment | ParseDate
            }}</q-item-label>
          </q-item-section>

          <q-item-section >
            <q-img style="border-radius:20px" height="100px" width="100px" :src="employee.favouriteDish.picture"></q-img>
            <q-item-label>{{ employee.favouriteDish.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
import moment from "moment";

import { baseUrl } from "../services/apiConfig";
export default {
  data() {
    return {
      employees: null,
    };
  },
  filters: {
    ParseDate(date) {
      return (date = moment(date).format("LL")); // put format as you want
    },
  },
  methods: {
    getData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "User" })
        .then((res) => (this.employees = res));
    },
  },
  created() {
    this.getData();
  },
};
</script>

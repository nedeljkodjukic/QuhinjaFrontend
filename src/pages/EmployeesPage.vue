<template>
  <q-page class="bg-grey-4">
    <div class="q-pa-md q-gutter-md">
      <q-list style="width: 100%">
        <q-item class="q-mb-sm text-brown-5">
          <q-item-section avatar>
            <q-avatar style="width: 100px"> </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span class="text-bold">Ime i prezime</span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold"> Datum rođenja</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold">Datum zaposlenja</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold"> Omiljeno jelo</q-item-label>
          </q-item-section>
          <q-item-section v-if="admin">
            <q-item-label class="text-bold"> Izostanci</q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="border-radius: 15px 15px 15px 15px" class="bg-red-2 q-mb-md" v-for="employee in employees" :key="employee.id" v-ripple>
          <q-item-section avatar>
            <q-avatar style="height: 100px; width: 100px">
              <img :src="employee.profilePictureUrl" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span>{{ employee.name }} {{ employee.surname }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label> {{ employee.dateOfBirth | ParseDate }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ employee.dateOfEmployment | ParseDate }}</q-item-label>
          </q-item-section>

          <q-item-section v-if="employee.favouriteDish != null">
            <q-img style="border-radius: 20px" height="100px" width="100px" :src="employee.favouriteDish.picture"></q-img>
            <q-item-label>{{ employee.favouriteDish.name }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="admin">
            <div class="q-pa-md">
              <q-btn icon="event" round color="red-1">
                <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
                  <q-date :events="eventsFn" :event-color="'red'" color="red-2" text-color="red-1" v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" @click="cancel" class="bg-red-1" color="white" flat v-close-popup />
                      <q-btn label="OK" class="bg-red-1" color="white" flat @click="save" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="col-6"></div>
    </div>
  </q-page>
</template>
<script>
import moment from "moment";
import { date } from "quasar";

import { baseUrl } from "../services/apiConfig";
export default {
  data() {
    return {
      employees: null,
      admin: false,
      proxyDate: "",
      events: [],
    };
  },
  filters: {
    ParseDate(date) {
      return (date = moment(date).format("LL")); // put format as you want
    },
  },
  methods: {
    eventsFn(date) {
      if (!this.events.includes(this.proxyDate)) {
        this.events.push(this.proxyDate);
        console.log(this.events);
      } else {
        // for (var i = 0; i < this.events.length; i++) {
        //   if (this.events[i] === this.proxyDate) {
        //     this.events.splice(i, 1);
        //     i--;
        //   }
        // }
      }
      if (this.events.includes(date)) {
        return true;
      }
      return false;
    },
    updateProxy() {},
    save() {},
    cancel() {
      this.proxyDate = "";
      this.events = [];
    },
    getUsersData() {
      this.$store.dispatch("apiRequest/getApiRequest", { url: "user/0" }).then((res) => {
        this.userData = res;
        this.check();
      });
    },
    getData() {
      this.$store.dispatch("apiRequest/getApiRequest", { url: "User" }).then((res) => (this.employees = res));
    },
    check() {
      this.userData.roles.forEach((el) => {
        if (el == "admin") return (this.admin = true);
      });
    },
  },
  created() {
    this.getData();
    this.getUsersData();
    let timeStamp = Date.now();
    let formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
    //this.proxyDate = formattedString;
  },
};
</script>

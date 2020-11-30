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
        <q-item
          style="border-radius: 15px 15px 15px 15px"
          class="bg-red-2 q-mb-md"
          v-for="employee in employees"
          :key="employee.id"
          v-ripple
        >
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
            <q-item-label>{{
              employee.dateOfEmployment | ParseDate
            }}</q-item-label>
          </q-item-section>

          <q-item-section v-if="employee.favouriteDish != null">
            <q-img
              style="border-radius: 20px"
              height="100px"
              width="100px"
              :src="employee.favouriteDish.picture"
            ></q-img>
            <q-item-label>{{ employee.favouriteDish.name }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="admin">
            <div class="q-pa-md">
              <q-btn icon="event" round color="red-1">
                <q-popup-proxy
                  @before-show="updateProxy"
                  transition-show="rotate"
                  transition-hide="rotate"
                >
                  <q-date
                    :options="optionsFn"
                    :events="employee.missedDatesFromBase"
                    :event-color="'red'"
                    color="red-2"
                    text-color="red-1"
                    v-model="proxyDate"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancel"
                        @click="cancel"
                        class="bg-red-1"
                        color="white"
                        flat
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        class="bg-red-1"
                        color="white"
                        flat
                        @click="save(employee)"
                        v-close-popup
                      />
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
      eventsForBase: [],
      menuItemsFromBase: []
    };
  },
  filters: {
    ParseDate(date) {
      return (date = moment(date).format("LL")); // put format as you want
    }
  },
  methods: {
    optionsFn(date) {
      if (this.events.includes(date)) return true;
      else {
        return false;
      }
    },
    eventsFn(date) {
      if (!this.eventsForBase.includes(this.proxyDate)) {
        this.eventsForBase.push(this.proxyDate);
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
    save(employee) {
      var menuItemId = 0;
      this.menuItemsFromBase.forEach(el => {
        if (el.dateOfDish == this.proxyDate) menuItemId = el.id;
      });
      const data = {
        userId: parseInt(employee.id),
        menuItemId: menuItemId
      };
      this.$store
        .dispatch("apiRequest/postApiRequest", {
          url: "MenuItem/addMissedDate",
          data: data
        })
        .then(res => {
          this.getData();
        });
    },
    cancel() {
      this.proxyDate = "";
    },
    getUsersData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "user/0" })
        .then(res => {
          this.userData = res;

          this.check();
        });
    },
    getData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "User" })
        .then(res => {
          this.employees = res;
          this.employees.forEach(el => {
            el.missedDatesFromBase = [];
            el.missedDates.forEach(menu => {
              let timeStamp = menu.menuItem.dateOfDish;
              let formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");

              el.missedDatesFromBase.push(formattedString);
            });
          });
        });
    },
    check() {
      this.userData.roles.forEach(el => {
        if (el == "admin") return (this.admin = true);
      });
    },
    getMenuItems() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "MenuItem" })
        .then(res => {
          this.menuItemsFromBase = res;

          this.menuItemsFromBase.forEach(el => {
            let timeStamp = el.dateOfDish;
            let formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
            this.events.push(formattedString);
            el.dateOfDish = formattedString;
          });
        });
    }
  },
  created() {
    this.getData();
    this.getUsersData();
    this.getMenuItems();
  }
};
</script>

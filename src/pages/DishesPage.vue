<template>
  <q-page class="bg-grey-4">
    <div style="margin:30px; margin-top:0;">

    <div  class="row q-gutter-x-md">
      <q-btn  label="Sort" icon-right="sort" class="text-teal-9" flat>
        <q-menu
          fit
          auto-close
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 150px">
            <q-item
              v-for="option in sortingOptions"
              :key="option.value"
              clickable
              @click="sortDishes(option)"
            >
              <q-item-section>{{ option }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-input v-model="search" filled type="search" placeholder="Pretraži...">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        color="teal-9"
        to="/addDish"
        label=" + Dodaj novo jelo"
        class="buttonForDish"
      />
    </div>

    <div class="cards">
      <q-card
        :ratio="16 / 9"
        style="border-radius: 15px 15px 15px 15px; width: 275px"
        v-for="(dish, index) in dishesForView.slice(
          (currentPage - 1) * dishesPerPage,
          currentPage * dishesPerPage
        )"
        :key="index"
        class="my-card bg-teal-3"
      >
        <q-img height="200px" :src="dish.picture" />

        <q-card-section style="" class="teal-2">
          <div class="row no-wrap items-center">
            <div class="text-bold col text-h6 ellipsis">
              {{ dish.name }}
            </div>
            <div v-if="dish.averageRating > 0" class="text-h6">
              {{ dish.averageRating }}/5
            </div>
            <div v-else class="text-grey-9">nije ocenjeno</div>
          </div>
          <div class="text-bold text-subtitle1 text-teal-9">
            {{ dish.dishType }}
          </div>
        </q-card-section>

        <q-card-section
          style="border-radius: 0px 0px 15px 15px"
          class="bg-teal-3 q-pt-none"
        >
          <div class="text-caption text-teal-8">
            {{ dish.description }}
          </div>
          <div
            class="text-teal-9 buttonDetails"
            style="
              text-transform: lowercase;
              position: absolute;
              right: 10px;
              bottom: 1px;
            "
            @click="handleClick(dish.id)"
            flat
            color="teal-9"
          >
            more ->
          </div>
        </q-card-section>
      </q-card>
    </div>
        </div>

    <div class="divForPaging q-pa-lg flex flex-center">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          color="teal-9"
          v-model="currentPage"
          :max="numOfPages"
          :max-pages="6"
          :boundary-numbers="true"
        >
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>
<script>
import { baseUrl } from "../services/apiConfig";
export default {
  data() {
    return {
      dishes: [],
      sortingOptions: [],
      sortingOption: "",
      dishesForView: [],
      search: "",
      dishesPerPage: 8,
      currentPage: 1,
    };
  },
  computed: {
    numOfDishes() {
      return this.dishesForView.length;
    },
    numOfPages() {
      if (this.numOfDishes % this.dishesPerPage == 0)
        return this.numOfDishes / this.dishesPerPage;
      else {
        return this.numOfDishes / this.dishesPerPage + 1;
      }
    },
  },
  watch: {
    search: function () {
      if (this.search == "") {
        this.dishesForView = this.dishes;
      } else {
        this.dishesForView = this.dishesForView.filter((dish) => {
          return dish.name.toLowerCase().startsWith(this.search.toLowerCase());
        });
      }
    },
  },

  methods: {
    handleClick(id) {
      this.$router.push("dish/" + id);
    },
    sortDishes(option) {
      this.dishesForView = [];
      this.dishes.forEach((element) => {
        if (element.dishType == option) this.dishesForView.push(element);
      });
    },
    getData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "Dish" })
        .then((res) => ((this.dishes = res), (this.dishesForView = res)));
    },
    getDishTypes() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: `/dish/dishTypes` })
        .then((res) => {
          this.sortingOptions = res;
        });
    },
  },
  created() {
    this.getData();
    this.getDishTypes();
  },
};
</script>
<style scoped>
.divForPaging {
  display: flex;
  flex-direction: row;
 
}
.cards {
  
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position:relative;
}

.my-card {
  margin: 15px;

  transition: 0.2s ease-in-out 0s;
  width: 275px;
}

.buttonForDish {
  position: absolute;
  right:100px;
  top:20px;
   transition: 0.2s ease-in-out 0s;
}
.buttonForDish:hover {
  cursor: pointer;
  transform: scale(1.1);
  background: #fff;
  color: #000;
}
.buttonDetails {
  transition: 0.2s ease-in-out 0s;
}
.buttonDetails:hover {
  cursor: pointer;
  color: blue;
}
.cards{
  
 font-family: "Open Sans";

}
</style>

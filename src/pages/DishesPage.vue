<template>
  <q-page class="bg-grey-4">
    <div class="row q-gutter-x-md">
      <q-btn label="Sort" icon-right="sort" class="text-blue-9" flat>
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
      <q-input
        class="fixed-top-right search-bar"
        v-model="search"
        filled
        type="search"
        placeholder="pretrazi"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="cards">
      <q-card
        v-for="(dish, index) in dishesForView.slice(
          (currentPage - 1) * dishesPerPage,
          currentPage * dishesPerPage
        )"
        :key="index"
        class="my-card bg-amber-6"
      >
        <q-img height="350px" :src="dish.picture" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ dish.name }}
            </div>
          </div>

          <q-rating
            class="text-brown-7"
            v-model="dish.averageRating"
            :max="5"
            icon-half="star_half"
            size="32px"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 text-blue-9">
            {{ dish.dishType }}
          </div>
          <div class="text-caption text-grey-9">
            {{ dish.description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-icon flat round name="double_arrow" />
          <q-btn  @click="handleClick(dish.id)" flat color="blue-9"> Detalji </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="divForPaging q-pa-lg flex flex-center">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
        color="blue-9"
          v-model="currentPage"
          :max="numOfPages"
          :direction-links="true"
        >
        </q-pagination>
      </div>
      <q-btn
        unelevated
        color="blue-9"
        to="/addDish"
        label=" + Dodaj novo jelo"
        class="q-mr-sm fixed-bottom-right buttonForDish"
      />
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
      dishesPerPage: 3,
      currentPage: 1,
    };
  },
  computed: {
    numOfDishes() {
      return this.dishesForView.length;
    },
    numOfPages() {
      if (
        
        this.numOfDishes % this.dishesPerPage == 0
      )
        return this.numOfDishes / this.dishesPerPage;
      else {
        return this.numOfDishes / this.dishesPerPage + 1;
      }
    },
  },
  watch: {
  search: function()
          {
      if (this.search == "") {
          this.dishesForView=this.dishes;
  } else {
        this.dishesForView = this.dishesForView.filter((dish) => {
          return dish.name.toLowerCase().startsWith(this.search.toLowerCase());
        });
        console.log(this.dishesForView);
      }
    },
  },

  methods: {
    handleClick(id){
        this.$router.push('dish/'+id)

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
        .then(
          (res) => (
            (this.dishes = res),
            (this.dishesForView = res),
            console.log(this.dishesForView)
          )
        );
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
  position: relative;
}
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.my-card {
  flex-grow: 1;
  
  width: 350px;
}
.search-bar {
  margin-top: 50px;
  height: 36px;
}
.buttonForDish {
  right: 0;
  margin-bottom: 90px;
  position: absolute;
}
</style>

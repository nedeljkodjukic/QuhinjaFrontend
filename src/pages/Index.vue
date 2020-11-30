<template>
  <q-page class="column items-center q-gutter-y-none bg-grey-4">
    <div class="menu"></div>
    <div class="text-h5 text-brown-9">
      Najbolje ocenjena jela
      <q-separator color="brown-9" size="4px" />
    </div>
    <q-carousel
      v-model="selectedDishIndex"
      swipeable
      infinite
      animated
      padding
      arrows
      class="bg-transparent"
      control-color="red-1"
    >
      <q-carousel-slide
        class="q-pa-sm"
        v-for="(dish, index) in dishes"
        :key="index"
        :name="index"
      >
        <div class="row q-gutter-x-md justify-center items-center">
          <div
            class="column items-center"
            v-for="adjacentIndex in adjacentIndexes(index)"
            :key="adjacentIndex"
          >
            <q-card style="width: 200px; height: 290px" class="my-card">
              <q-img height="140px" :src="dishes[adjacentIndex].picture" />

              <q-card-section>
                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis text-bold">
                    {{ dishes[adjacentIndex].name }}
                  </div>

                  <div class="text-brown-9 text-h6 text-bold">
                    {{ dishes[adjacentIndex].averageRating | ParseFloat }}
                  </div>
                </div>
                <div style="" class="text-brown-9 text-subtitle1 text-bold">
                  {{ dishes[adjacentIndex].dishType }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-caption text-brown-8">
                  {{ dishes[adjacentIndex].description }}
                </div>
              </q-card-section>

              <q-card-actions style="position: relative" class="teal-3">
                <div
                  style="   text-bold;
position:absolute; right:0;"
                  class="buttonDetails"
                  @click="handleClick(dishes[adjacentIndex].id)"
                  flat
                >
                  Detalji >>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      stars: 3,
      dishes: [],
      selectedDishIndex: 0
    };
  },
  computed: {},
  filters: {
    ParseFloat(number) {
      let newValue = parseFloat(number).toFixed(2);
      return newValue;
    }
  },

  methods: {
    handleClick(id) {
      this.$router.push("dish/" + id);
    },
    getData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "/dish/getSortedDishes" })
        .then(res => (this.dishes = res));
    },
    adjacentIndexes(index) {
      const length = this.dishes.length;
      const array = [];
      if (this.numOfShowedItems === 5) {
        array.push((index - 2 + length) % length);
      }
      array.push((index - 1 + length) % length);
      array.push(index);
      array.push((index + 1) % length);
      if (this.numOfShowedItems === 5) {
        array.push((index + 2) % length);
      }
      return array.reverse();
    }
  },
  created() {
    this.getData();
  },

  computed: {
    numOfShowedItems() {
      if (this.$q.screen.gt.sm) return 5;
      else return 3;
    }
  }
};
</script>
<style scoped>
* {
  font-family: "Open Sans";
}
.my-card {
  background-color: #baa671;
  color: #f1eae8;
}

.buttonDetails {
  margin-left: 0;
  transition: 0.2s ease-in-out 0s;
}
.buttonDetails:hover {
  cursor: pointer;
}
</style>

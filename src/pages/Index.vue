<template>
  <q-page class="column items-center q-gutter-y-none bg-grey-4">
    <q-parallax
      :speed="1"
      src="../../public/test.jpg"
      style="border-color: #233D53; border-style: solid; border-width: 5px 0px"
    >
    </q-parallax>
    <div class="text-h5 text-brown-9 q-py-md">
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
      transition-prev="fade"
      transition-next="fade"
      control-color="brown-9"
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
            <q-card class="my-card bg-amber-6">
              <q-img src="../../public/punjenapaprika.jpg" />

              <q-card-section>
                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{ dishes[adjacentIndex].name }}
                  </div>
                </div>

                <q-rating
                  class="text-brown-7"
                  v-model="stars"
                  :max="5"
                  size="32px"
                />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-subtitle1 text-blue-9">
                  {{ dishes[adjacentIndex].dishType }}
                </div>
                <div class="text-caption text-grey-9">
                  {{ dishes[adjacentIndex].description }}
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-icon flat round name="double_arrow" />
                <q-btn flat color="blue-9"> Detalji </q-btn>
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
      selectedDishIndex: 0,
    };
  },
  computed: {},

  methods: {
    getData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "Dish" })
        .then((res) => (this.dishes = res));
    },
    adjacentIndexes(index) {
      const length = 6;
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
    },
  },
  created() {
    this.getData();
  },
  computed: {
    numOfShowedItems() {
      if (this.$q.screen.gt.sm) return 5;
      else return 3;
    },
  },
};
</script>
<style scoped>
</style>

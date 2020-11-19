<template>
  <q-page class="bg-grey-4">
    <div class="mainDiv">
      <div class="q-mt-xl leftDiv" style="width: 50%">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px 15px 0px 0px;
          "
        >
          <q-card
            :ratio="16 / 9"
            style="border-radius: 15px 15px 0px 0px; width: 275px"
            class="my-card bg-grey-4"
          >
            <q-img
              style="
                border-style: none;

                border-radius: 15px 15px 0px 0px;
              "
              height="200px"
              :src="this.dish.picture"
            />

            <q-card-section style="border-style: none" class="bg-amber-6">
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{ this.dish.name }}
                </div>
              </div>

              <q-rating
                readonly
                class="text-brown-7"
                v-model="dish.averageRating"
                :max="5"
                icon-half="star_half"
                size="32px"
              />
            </q-card-section>

            <q-card-section class="bg-amber-6 q-pt-none">
              <div class="text-bold text-subtitle1 text-blue-9">
                {{ this.dish.dishType }}
              </div>
              <div class="text-caption text-grey-9">
                {{ this.dish.description }}
              </div>
            </q-card-section>

            <q-separator />
          </q-card>
        </div>
      </div>
      <q-separator cl v-if="$q.screen.gt.sm" vertical />

      <div class="q-mt-xl rightDiv" style="width: 50%">
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <q-list>
            <!--
        Rendering a <label> tag (notice tag="label")
        so QCheckboxes will respond to clicks on QItems to
        change Toggle state.
      -->

            <q-item
              v-for="recipe in this.dish.recipes"
              :key="recipe.id"
              tag="label"
              v-ripple
            >
              <q-item-section avatar>
                <q-checkbox v-model="color" val="teal" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ recipe.name }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-img height="50px" :src="recipe.picture"></q-img>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>
 <script>
import { baseUrl } from "../services/apiConfig";
export default {
  data() {
    return {
      dish: null,
      color: "",
    };
  },
  methods: {
    getDish() {
      this.$store
        .dispatch("apiRequest/getApiRequest", {
          url: `Dish/${this.$route.params.id}`,
        })
        .then((res) => ((this.dish = res), console.log(this.dish)));
    },
  },
  created() {
    this.getDish();
  },
};
</script>
<style lang="stylus" scoped>
.mainDiv {
  display: flex;
  flex-direction: row;
}
</style>

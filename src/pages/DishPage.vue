<template>
  <q-page class="bg-grey-4">
    <div class="mainDiv">
      <div
        class="q-mt-xl leftDiv"
        style="
          border-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50%;
        "
      >
        <div style="border-style: none; border-radius: 15px 15px 15px 15px">
          <q-card
            :ratio="16 / 9"
            style="
              border-style: none;
              border-radius: 15px 15px 15px 15px;
              width: 275px;
            "
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

            <q-card-section
              style="border-style: none; border-radius: 0px 0px 15px 15px"
              class="bg-amber-6 q-pt-none"
            >
              <div
                style="border-style: none"
                class="text-bold text-subtitle1 text-blue-9"
              >
                {{ this.dish.dishType }}
              </div>
              <div style="border-style: none" class="text-caption text-grey-9">
                {{ this.dish.description }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-mt-md">
          <p style="font-size: 23px">Ocenite jelo</p>
        </div>

        <div class="q-mt-md">
          <q-rating
            v-model="model"
            max="5"
            size="4em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            no-dimming
          />
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
              clickable
              @click="handleShowRecipe(recipe)"
              class="bg-brown-5 q-mb-md itemForRecipe"
              style="
                width: 300px;
                height: 100px;
                border-radius: 15px 15px 15px 15px;
              "
              v-for="recipe in this.dish.recipes"
              :key="recipe.id"
              tag="label"
              v-ripple
            >
              <q-item-section>
                <q-item-label class="text-grey-4">{{
                  recipe.name
                }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-img height="100px" :src="recipe.picture"></q-img>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              @click="handleAddRecipe"
              class="bg-grey-5 q-mb-md itemForRecipe"
              style="
                width: 300px;
                height: 100px;
                border-radius: 15px 15px 15px 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              "
            >
              <q-icon class="text-grey-4" size="70px" name="add"></q-icon>
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
      model: 4,
    };
  },
  methods: {
    handleShowRecipe(recipe) {},
    handleAddRecipe() {
      console.log("s");
      this.$router.push("/addRecipe/" + this.dish.id);
    },
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

.itemForRecipe {
  transition: 0.2s ease-in-out 0s;
}

.itemForRecipe:hover {
  cursor: pointer;
  color: white;
  transform: scale(1.1);
  border-style: solid;
  border-width: 4px;
  border-color: grey;
}
</style>

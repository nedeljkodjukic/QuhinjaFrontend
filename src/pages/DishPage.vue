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
                class="text-bold text-subtitle1 text-teal-9"
              >
                {{ this.dish.dishType }}
              </div>
              <div style="border-style: none" class="text-caption text-teal-8">
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
            color="brown"
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
          v-if="showRecipeList"
          style="display: flex; align-items: center; justify-content: center"
        >
          <q-list>
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
        <div v-if="showDetailsForRecipe" v-model="recipeToShow">
          <div class="mainForRecipe">
            <div style="font-size:20px"><p class="text-brown-9">{{recipeToShow.name}}</p></div>
            <div class="topDiv">
              <q-img class="q-mr-md" style="  border-radius: 0px 15px 15px 0px;" :src="recipeToShow.picture">
              </q-img>
              <q-list
                  bordered
                  class=" q-mr-sm bg-grey-5 rounded-borders"
                  style="max-width: 600px;
                  border-radius:15px 15px 15px 15px"
                >
                  <q-item-label style="width: 345px; color: black" header
                    >Sastojci:</q-item-label
                  >

                  <q-item
                    style="width: 345px"
                    v-for="ing in recipeToShow.ingridients"
                    :key="ing.ingridient.name"
                  >
                    <q-item-section top class="gt-sm">
                      <q-item-label class="q-mt-sm"
                        >{{ ing.ingridient.name }} :
                        {{ ing.quantity }} :
                        {{ ing.unit }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  </q-list>
            </div>
            <div class="middleDiv q-mt-sm">
                <p >Vreme pripreme: {{recipeToShow.preparationTime}}</p>
                <p>Link:{{recipeToShow.preview}}</p>
            </div>
            <div class=q-mt-sm>
 <q-input readonly  
      v-model="recipeToShow.wayOfPreparing"
      filled
      type="textarea"
    />
            </div>

          
          </div>
          <q-btn
            color="teal-9"
            icon="keyboard_backspace"
            label="Vidi ostale recepte"
            @click="
              showRecipeList = true;
              showDetailsForRecipe = false;
            "
          />
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
      showDetailsForRecipe: false,
      showRecipeList: true,
      recipeToShow: null,
    };
  },
  methods: {
    handleShowRecipe(recipe) {
      this.showDetailsForRecipe = true;
      this.showRecipeList = false;
      this.recipeToShow = recipe;
    },
    handleAddRecipe() {
      this.$router.push("/addRecipe/" + this.dish.id);
    },
    getDish() {
      this.$store
        .dispatch("apiRequest/getApiRequest", {
          url: `Dish/${this.$route.params.id}`,
        })
        .then((res) => (this.dish = res))
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
.mainForRecipe{
  display:flex;
  flex-direction :column;
}
.topDiv{
  display:flex;
  flex-direction :row;
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

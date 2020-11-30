<template>
  <q-page>
    <main class="flexbox">
      <div class="flex column">
        <h5 class="text-brown">Dani u nedelji</h5>
        <div class="row" v-for="(index, day) in days" :key="day">
          <div
            class="day q-mr-xl"
            :id="`board-${index}`"
            @dragover.prevent
            @drop.prevent="drop"
            bg-color="brown"
          ></div>
          <button@click="deleteChild(`${index}`)">
            Ukloni jelo
          </button@click=>
        </div>
      </div>
      <q-separator vertical />
      <div id="board-10" class="board" @dragover.prevent @drop.prevent="drop">
        <div textcolor="black" class="text-bold">
          <h5>Lista jela</h5>
        </div>

       <div class="q-ma-md">
       <q-scroll-area style="height: 250px; max-width: 500px;">

        <Card
          v-for="(dish, index) in dishes"
          :key="dish.id"
          :id="`card-${index}`"
          draggable="true"
          style="border-radius: 5px 5px 5px 5px"
        >
          <div>
            <q-img
              width="50px"
              style="border-radius: 5px 5px 5px 5px"
              height="50px"
              :src="dish.picture"
            ></q-img>
          </div>
          <p>{{ dish.name }}</p>
        </Card>
       </q-scroll-area>
      </div>
      <div class="notice">
        <h5>Podsetnik</h5>
        <div>
          Rodjendani:
          Datum zaposlenja:
        </div>
      </div>
      </div>
    </main>
  </q-page>
</template>
<script>
import Card from "./../components/Card.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
      days: ["Pon", "Uto", "Sre", "Cet", "Pet"],
      dishes: [],
      dishesForView: [],
      status1: [],
      status2: []
    };
  },
  created() {
    this.getDishes();
  },
  methods: {
    deleteChild(id) {
      var div = document.getElementById("board-" + id);
      const child = div.children;
      const c = child[0];
      div.removeChild(child[0]);
      c.classList.add("card");
      var b = document.getElementById("board-10");
      b.appendChild(c);
    },

    drop: e => {
      const card_id = e.dataTransfer.getData("card_id");
      const card = document.getElementById(card_id);
      e.target.appendChild(card);
    },
    getDishes() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "Dish" })
        .then(
          res => (
            (this.dishes = res),
            console.log(this.dishes),
            (this.dishesForView = res)
          )
        );
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.day {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100px;
  background-color: grey;
  padding: 15px;
}
.flexbox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  padding: 15px;
}
.flexbox .board {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  padding: 15px;
}
.flexbox .board .card {
  background-color: #baa671;
  cursor: pointer;
  margin-bottom: 15px;
  height: 50px;
  width: 250px;
}
</style>

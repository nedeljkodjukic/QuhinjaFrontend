<template>
  <q-page>
    <main class="flexbox">
      <div class="flex column">
        <div v-for="(index, day) in days" :key="day">
          <div
            class="day q-mr-xl"
            :id="`board-${index}`"
            @dragover.prevent
            @drop.prevent="drop"
          ></div>
          <button @click="deleteChild(`${index}`)">Delete</button>
        </div>
      </div>
      <div id="board-10" class="board" @dragover.prevent @drop.prevent="drop">
        <Card
          v-for="(dish, index) in dishes"
          :key="dish.id"
          :id="`card-${index}`"
          draggable="true"
        >
          <p>{{ dish.name }}</p>
          <q-img width="50px" height="50px" :src="dish.picture"></q-img>
        </Card>
      </div>
    </main>
  </q-page>
</template>
<script>
import Card from "./../components/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      days: ["Pon", "Ut", "Sre", "Cet", "Pet"],
      dishes: [],
      dishesForView: [],
      status1: [],
      status2: [],
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

    drop: (e) => {
      const card_id = e.dataTransfer.getData("card_id");
      const card = document.getElementById(card_id);
      e.target.appendChild(card);
    },
    getDishes() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "Dish" })
        .then(
          (res) => (
            (this.dishes = res),
            console.log(this.dishes),
            (this.dishesForView = res)
          )
        );
    },
  },
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
  background-color: blue;
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
  background-color: aliceblue;
  cursor: pointer;
  margin-bottom: 15px;
  height: 50px;
}
</style>
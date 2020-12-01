<template>
  <q-page>
    <main v-if="admin" class="flexbox">
      <div class="flex column">
        <h5 class="text-red-1">Dani u nedelji</h5>
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
        <div class="text-red-1">
          <h5>Lista jela</h5>
        </div>

       <div class="q-ma-md">
       <q-scroll-area style="height: 250px; max-width: 500px;">

        <Card
          v-for="(dish, index) in dishes"
          :key="dish.id"
          :id="`card-${index}`"
          draggable="true"
          style="border-radius: 5px 5px 5px 5px;
            display: flex;
  
  align-content: center;
  flex-direction: row;"
        >
        
            <q-img
              width="50px"
              style="border-radius: 5px 5px 5px 5px"
              height="50px"
              :src="dish.picture"
            ></q-img>
          
          <p>{{ dish.name }}</p>
        </Card>
       </q-scroll-area>
      </div>
      <div  class="notice text-red-1">
        <h5>Podsetnik</h5>
        <div>
          Rodjendani:
          Datum zaposlenja:
        </div>
      </div>
      </div>
    </main>
    <main v-else>
    Korisnik
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
      status2: [],
       admin: false,

    };
  },
  created() {
    this.getDishes();
        this.getUsersData();

  },
  methods: {
    deleteChild(id) {
      var div = document.getElementById("board-" + id);
      const child = div.children;
      const c = child[0];
      div.removeChild(child[0]);
    
    },

    drop: e => {
      const card_id = e.dataTransfer.getData("card_id");
      const card = document.getElementById(card_id);
      const newCard = card.cloneNode(true);
      e.target.appendChild(newCard);
    },
       getUsersData() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "user/0" })
        .then(res => {
          this.userData = res;

          this.check();
        });
    },   check() {
      this.userData.roles.forEach(el => {
        if (el == "admin") return (this.admin = true);
      });
    },
    getDishes() {
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "Dish" })
        .then(
          res => (
            (this.dishes = res.filter(dish=>dish.selectedRecipe!=null )),
            
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
  flex-direction: row;
  margin: 10px;
  width:260px;
  max-width:500px;
  height:50px;
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

<template>
  <q-page>
    <main v-if="admin" class="flexbox">
      <div class="flex column">
        <h5 class="text-red-1">Dani u nedelji</h5>
        <div class="row"  v-for="(day, index) in days.slice((currentPage - 1) * daysPerPage, currentPage * daysPerPage)" :key="index">
       <div class="text-red-1">
        {{day.day | ParseDate}}
</div>          <div 
            class="day q-mr-xl"
            :id="`${day.day}`"
            @dragover.prevent
            @drop.prevent="drop"
            bg-color="brown"
            
          >
          <div v-if="day.menuItem !=null">
          {{day.menuItem.recipe.dish.name}} 
            <q-img
              width="50px"
              style="border-radius: 5px 5px 5px 5px"
              height="50px"
              :src="day.menuItem.recipe.picture"
            ></q-img>
          </div>
          
          </div>
          <button v-if="day.menuItem" @click="deleteChild(`${day.day}`)">
            Ukloni jelo
          </button@click=>
        </div>
         <div class="q-pa-lg flex flex-center">
        <q-pagination color="red-5" v-model="currentPage" :max="2" :max-pages="2" :boundary-numbers="true"> </q-pagination>
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
          :id="`${dish.selectedRecipeId}`"
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
import moment from "moment";
import { date } from "quasar";
import Card from "./../components/Card.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
days: [],
      dishes: [],
      dishesForView: [],
      status1: [],
      status2: [],
       admin: false,
        daysPerPage: 5,
      currentPage: 1,

    };
  },
  created() {
    this.getDishes();
        this.getUsersData();
        this.getDays();

  },
   computed: {
   
   
    },
     filters: {
    ParseDate(date) {
      return (date = moment(date).format("LL")); // put format as you want
    },},
 
  methods:{
     getDays(){
      this.$store
        .dispatch("apiRequest/getApiRequest", { url: "MenuItem/twoWeeks" })
        .then(res => {
        this.days=res;

        });
    },
    
    deleteChild(date) {

      const data ={
        dateOfDish: date
      }
   this.$store
        .dispatch("apiRequest/postApiRequest", {
          url: "MenuItem/deleteByDate",
          data:data,

          
        })
        .then((res) => {
          this.getDays();
        });
     

    
    },

    drop(e) {
      const card_id = e.dataTransfer.getData("card_id");
      console.log(e.target.id);
      
      const card = document.getElementById(card_id);
      const newCard = card.cloneNode(true);
      
      
      var recipeId=card_id;
      var date=e.target.id;
      const data={
        recipeId : parseInt(recipeId),
        dateOfDish : date
      };
       this.$store
        .dispatch("apiRequest/postApiRequest", {
          url: "MenuItem/addMenuItem",
          data:data,

          
        })
        .then((res) => {
          this.getDays();
        });


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

<template>
  <q-page>
{{this.dish.name}}
  </q-page>
 </template>
 <script>
import { baseUrl } from "../services/apiConfig";
export default {
data(){
    return{
        dish:null
    }
},
methods:{
  getDish() {
      this.$store
        .dispatch("apiRequest/getApiRequest", {
          url: `Dish/${this.$route.params.id}`,
        })
        .then(
          (res) => (
            (this.dish = res)
          )
        );
    },
},
created(){
    this.getDish()
}
}
</script>

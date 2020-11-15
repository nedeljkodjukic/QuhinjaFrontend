<template>
    <q-page class="bg-grey-4">
        <div class="flex">
  <div class="fixed-top q-mt-sm ">  <h5>Naziv jela: {{this.dish.name}}</h5>
</div>
        </div>
      
    </q-page>
</template>
<script>
export default {
  
    data(){
        return{
dish:null        }
    },
    methods:{
        getDish(){
             this.$store
        .dispatch("apiRequest/getApiRequest", { url: `Dish/${this.$route.params.id}` })
        .then(
          (res) => (
            this.dish = res,
            console.log(this.dish)
            
          
        ));
        }
    },
    created() {
    this.getDish();
    }

}
</script>
<template>
  <q-page class="pozadina flex flex-center">

    <div v-for="t in dishes" :key="t.id">
      {{`${t.name}:`}}
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data(){
    return {
      dishes:[]
    }
  },
  computed:{
  
  },

methods:{
getData(){
 this.$store.dispatch('apiRequest/getApiRequest', { url: 'Dish' })
      .then(res => (this.dishes = res))
  
}
},
 created () {
   this.getData();
  }
  }
</script>
<style scoped>
.pozadina{
  background-image: url('../../public/test.jpg');
  background-position: center; /* Center the image */
background-size: cover;
}
</style>

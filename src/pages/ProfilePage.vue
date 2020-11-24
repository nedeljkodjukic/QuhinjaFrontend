<template>
  <q-page class="q-px-md column col-xs-12 col-sm-10 col-md-10 col-lg-8 offset-sm-1 offset-md-1 offset-lg-2">
    <div class="column items-center full-width q-mt-lg">
      <q-form class="full-width text-center column q-gutter-y-sm" style="max-width: 350px" @submit="handleSubmit">
        <div class="text-h5 text-red-2 q-mt-md q-mb-sm">Profil</div>
        <div class="full-width row justify-between">
          <q-avatar square size="100px">
            <img :src="userData.profilePictureUrl != null ? userData.profilePictureUrl : 'statics/no-image-user.png'" />
          </q-avatar>
          <q-uploader ref="uploaderRef" color="red-1" :multiple="false" flat style="max-width: 230px; max-height: 125px" :factory="factoryUpload" hide-upload-btn no-thumbnails batch />
        </div>
        <q-input v-model="userData.name" label="Ime" dense outlined :rules="[requiredField, firstNameMaxLengthValidation]" />
        <q-input v-model="userData.surname" label="Prezime" dense outlined :rules="[requiredField, lastNameMaxLengthValidation]" />
        <q-select v-model="town" label="Grad" outlined dense :options="townOptions" :rules="[requiredField]" use-input hide-selected fill-input input-debounce="0" @filter="filterTowns" />
        <q-input v-model="userData.phoneNumber" label="Mobilni telefon" dense outlined :rules="[requiredField, phoneField, mobilePhoneMaxLengthValidation]" />
        <q-btn color="red-1" type="submit" label="Ažuriraj" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { formRulesMixin } from "src/helper/formRulesMixin";
import { baseUrl } from "src/services/apiConfig";

export default {
  name: "ProfilePage",
  mixins: [formRulesMixin],
  data() {
    return {
      userData: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("apiRequest/getApiRequest", { url: "user/0" }).then((res) => {
        (this.userData = res)(console.log(res));
      });
    },
    filterTowns(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.townOptions = this.towns.filter((town) => town.name.toLowerCase().indexOf(needle) > -1).map((town) => ({ label: town.name, value: town.id }));
      });
    },
    factoryUpload(file) {
      return new Promise((resolve, reject) => {
        const token = this.$store.state.auth.auth.accessToken;
        resolve({
          url: `${baseUrl}user/uploadPicture`,
          method: "POST",
          headers: [{ name: "Authorization", value: `Bearer ${token}` }],
        });
      });
    },
    handleSubmit() {
      this.$store
        .dispatch("apiRequest/putApiRequest", {
          url: "user/update-user",
          data: {
            ...this.userData,
            townId: this.town.value,
          },
          successMessage: "Uspesno ste azurirali podatke",
        })
        .then((res) => {
          this.$refs.uploaderRef.upload();
        })
        .finally(() => this.getData());
    },
  },
};
</script>

<style scoped></style>

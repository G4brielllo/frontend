<template>
  <v-app>
    <v-container>
      <v-card class="elevation-4">
        <v-toolbar color="black" dark>
          <v-toolbar-title>Dodaj klienta</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="client.name" label="Nazwa" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="client.email" label="Email" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="client.description" label="Opis" rows="3" required></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input v-model="image" label="Logo" accept="image/*" required @change="createBase64Image"></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select v-model="client.country" :items="countries" label="Kraj" required></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray" @click="addClient" :disabled="!valid">Zapisz</v-btn>
          <v-btn @click="cancelClientAdding">Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: true,
      client: {
        name: '',
        description: '',
        logo: null,
        country: '',
        email: '',
      },
      countries: ['Poland', 'Germany', 'France', 'Italy', 'Spain'],
      image: null,
      base64: null
    };
  },
  watch: {
    image: function (newVal) {
      if(newVal) {
        this.createBase64Image(newVal);
      } else {
        this.base64 = null;
      }
    }
  },
  methods: {
    createBase64Image(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
        this.client.logo = this.base64;
      }
      reader.readAsDataURL(file);
    },

    async addClient() {
      try {
        const formData = new FormData();
        formData.append('name', this.client.name);
        formData.append('description', this.client.description);
        formData.append('logo', this.base64); 
        formData.append('country', this.client.country);
        formData.append('email', this.client.email);

        const response = await axios.post('http://127.0.0.1:8000/api/clients', formData);

        if (response.status === 201) {
          this.$router.push('/');
        } else {
          console.error('Error adding client:', response.data);
        }
      } catch (error) {
        console.error('Error adding client:', error);
      }
    },

    cancelClientAdding() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <v-app>
    <v-container>
      <v-card class="elevation-4">
        <v-toolbar color="black" dark>
          <v-toolbar-title>{{ client.id ? 'Edytuj klienta' : 'Dodaj klienta' }}</v-toolbar-title>
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
                  <v-file-input v-model="image" label="Logo" accept="image/*" @change="createBase64Image"></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select v-model="client.country" :items="countries" label="Kraj" required></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray" @click="saveClient" :disabled="!valid">{{ client.id ? 'Zapisz zmiany' : 'Dodaj klienta' }}</v-btn>
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
        id: null,
        name: '',
        description: '',
        logo: null,
        country: '',
        email: '',
      },
      countries: ['Poland', 'Germany', 'France', 'Italy', 'Spain'],
      image: null,
      base64: null,
    };
  },
  created() {
    if (this.$route.query.id) {
      const clientId = this.$route.query.id;
      this.fetchClientDetails(clientId);
    }
  },
  methods: {
    async fetchClientDetails(clientId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/clients/${clientId}`);
        const clientData = response.data;

        
        this.client.id = clientData.id;
        this.client.name = clientData.name;
        this.client.email = clientData.email;
        this.client.description = clientData.description;
        this.client.country = clientData.country;
        this.client.logo = clientData.logo; 

      
        if (this.isImageUrl(clientData.logo)) {
          await this.fetchImageUrl(clientData.logo);
        }
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    },

    async fetchImageUrl(url) {
      try {
        const response = await axios.get(url, { responseType: 'blob' });
        const reader = new FileReader();
        reader.onload = (event) => {
          this.base64 = event.target.result;
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    },

    async saveClient() {
      try {
        const formData = new FormData();
        formData.append('name', this.client.name);
        formData.append('description', this.client.description);
        formData.append('country', this.client.country);
        formData.append('email', this.client.email);

        if (this.image) {
          formData.append('logo', this.base64);
        }

        let response;
        if (this.client.id) {
          response = await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, formData);
        } else {
          response = await axios.post('http://127.0.0.1:8000/api/clients', formData);
        }

        if (response.status === 201 || response.status === 200) {
          this.$router.push('/');
        } else {
          console.error('Error saving client:', response.data);
        }
      } catch (error) {
        console.error('Error saving client:', error);
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access. Please check your credentials.');
        }
      }
    },

    cancelClientAdding() {
      this.$router.push('/');
    },

    createBase64Image(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
        this.client.logo = this.base64;
      };
      reader.readAsDataURL(file);
    },

    isImageUrl(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    },

    async updateClient() {
      try {
        const formData = new FormData();
        formData.append('name', this.client.name);
        formData.append('description', this.client.description);
        formData.append('country', this.client.country);
        formData.append('email', this.client.email);

        if (this.image) {
          formData.append('logo', this.base64);
        }

        const response = await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, formData);

        if (response.status === 200) {
          this.$router.push('/');
        } else {
          console.error('Error updating client:', response.data);
        }
      } catch (error) {
        console.error('Error updating client:', error);
      }
    },
  },
};
</script>

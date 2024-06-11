<template>
    <v-container>
      <v-card class="elevation-4">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Klient</v-toolbar-title>
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
                  <v-file-input v-model="client.logo" label="Logo" accept="image/*" required></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select v-model="client.country" :items="countries" label="Kraj" required></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" @click="save" :disabled="!valid">Zapisz</v-btn>
          <v-btn @click="cancelClientAdding">Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        client: {
          name: '',
          description: '',
          logo: null,
          country: '',
          email: '',
        },
        countries: ['Poland', 'Germany', 'France', 'Italy', 'Spain'],
      };
    },
    methods: {

      cancelClientAdding(){
      this.$router.push('/cancelClientAdding');
      },
      addProject(){
        this.$router.push('/addClient');
      },
      save() {
        if (this.$refs.form.validate()) {
          console.log('Zapisz:', this.client);
        }
      },
      cancelEdit() {
        this.$refs.form.reset();
        console.log('Anuluj');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  
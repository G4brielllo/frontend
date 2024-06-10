<template>
  <v-container>
    <v-card class="elevation-4">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Dodaj estymację</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="estimation.name" label="Nazwa" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="estimation.description" label="Opis" rows="3"></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="estimation.project"
                    :items="projects"
                    label="Projekt"
                    item-text="name"
                    item-value="id"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="datePicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="estimation.date"
                        label="Data"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="estimation.date" @input="datePicker = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="estimation.type" label="Rodzaj wyceny">
                    <v-radio value="godzinowa" label="Godzinowa"></v-radio>
                    <v-radio value="fixed" label="Fixed Price"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="estimation.price" label="Wycena" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" @click="validateForm">Dodaj</v-btn>
          <v-btn color="black" @click="cancelAdd">Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        estimation: {
          name: '',
          description: '',
          project: null,
          date: new Date().toISOString().substr(0, 10),
          type: 'godzinowa',
          price: ''
        },
        projects: [
          { id: 1, name: 'Projekt 1' },
          { id: 2, name: 'Projekt 2' },
          { id: 3, name: 'Projekt 3' }
        ],
        datePicker: false,
        valid: true
      };
    },
    methods: {
      validateForm() {
        if (this.$refs.form.validate()) {
          console.log('Dodano estymację:', this.estimation);
        }
      },
      cancelAdd() {
        console.log('Anulowano dodawanie estymacji');
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
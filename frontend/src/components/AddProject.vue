<template>
    <v-container>
      <v-card class="elevation-4">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Dodaj Projekt</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="project.name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="project.description" label="Description" rows="3"></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="project.client"
                    :items="clients"
                    item-text="name"
                    item-value="id"
                    label="Client"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" @click="addProject">Dodaj</v-btn>
          <v-btn color="black" @click="cancelProjectAdding">Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        project: {
          name: '',
          description: '',
          client: null,
        },
        clients: [
          { id: 1, name: 'Client 1' },
          { id: 2, name: 'Client 2' },
          { id: 3, name: 'Client 3' },
        ],
        valid: true,
      };
    },
    methods: {

      cancelProjectAdding(){
      this.$router.push('/cancelProjectAdding');
      },
      addProject(){
        this.$router.push('/addClient');
      },

      addProject1() {
        if (this.$refs.form.validate()) {
          console.log('Added project:', this.project);
          this.clearForm();
        }
      },
      cancelAdd1() {
        console.log('Cancelled adding project');
        this.clearForm();
      },
      clearForm() {
        this.project.name = '';
        this.project.description = '';
        this.project.client = null;
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  
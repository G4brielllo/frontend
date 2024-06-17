<template>
  <v-app>
    <v-container>
      <v-card class="elevation-4">
        <v-toolbar color="black" dark>
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
          <v-btn color="gray" @click="addProject">Dodaj</v-btn>
          <v-btn color="gray" @click="cancelProjectAdding">Anuluj</v-btn>
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
      project: {
        name: '',
        description: '',
        client: null,
      },
      clients: [],
      valid: true,
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
    async addProject() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/projects', {
            name: this.project.name,
            description: this.project.description,
            client_id: this.project.client,
          });

          if (response.status === 201) {
            console.log('Project added successfully:', response.data);
            this.clearForm();
            this.$router.push('/');
          } else {
            console.error('Error adding project:', response.data);
          }
        } catch (error) {
          console.error('Error adding project:', error);
        }
      }
    },
    cancelProjectAdding() {
      this.clearForm();
      this.$router.push('/');
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

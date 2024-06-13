<template>
  <v-container>
    <v-card class="compact-card">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Lista Projektów</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Wyszukaj" single-line hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete v-model="selectedClient" :items="clients" item-text="name" item-value="id" label="Wybierz klienta" clearable hide-details></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="datePicker" :close-on-content-click="false" transition="scale-transition" offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field v-model="selectedDate" label="Wybierz datę" prepend-icon="mdi-calendar" readonly v-on="on" clearable hide-details></v-text-field>
              </template>
              <v-date-picker v-model="selectedDate" @input="datePicker = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-card-text>
        <v-data-table :headers="headers" :items="projects" :search="search" :item-key="'id'">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="editProject(item)" text>Edytuj</v-btn>
            <v-btn color="error" @click="deleteProject(item)" text>Usuń</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-btn class="operation-buttons" @click="addProject"> Dodaj</v-btn>
      <v-btn class="operation-buttons" @click="returnToHomePage"> Wróć</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'ListProjects',
  data() {
    return {
      search: '',
      selectedClient: null,
      selectedDate: null,
      datePicker: false,
      headers: [
        { text: 'L.p.', align: 'start', value: 'id' },
        { text: 'Nazwa', value: 'name' },
        { text: 'Klient', value: 'client_name' }, 
        { text: 'Szacunkowa wartość', value: 'estimation', sortable: false },
        { text: 'Data dodania', value: 'created_at' }, 
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      clients: [],
      projects: [],
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/projects');
    console.log('Projects:', response.data);
    
    this.projects = response.data.map(project => ({
      id: project.id,
      name: project.name,
      client_name: project.client ? project.client.name : 'Brak klienta',
      estimation: project.estimation,
      created_at: project.created_at,
    }));
    
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
},

    async deleteProject(item) {
      try {
        await axios.delete(`/projects/${item.id}`);
        this.fetchProjects(); 
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    },
    returnToHomePage() {
      this.$router.push('/returnToHomePage');
    },
    addProject() {
      this.$router.push('/addProject');
    },
    editProject(project) {
      console.log('Edytuj projekt:', project);
    },
    deleteProject1(project) {
      console.log('Usuń projekt:', project);
    },
  },
};
</script>

<style scoped>
</style>

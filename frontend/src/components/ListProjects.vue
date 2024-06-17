<template>
  <v-app>
    <v-container>
      <v-card class="compact-card">
        <v-toolbar color="black" dark>
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
          <v-data-table :headers="headers" :items="filteredProjects" :search="search" :item-key="'id'">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="gray" @click="editProject(item)" text>Edytuj</v-btn>
              <v-btn color="gray" @click="deleteProject(item)" text>Usuń</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-btn class="operation-buttons" @click="addProject">Dodaj</v-btn>
        <v-btn class="operation-buttons" @click="returnToHomePage">Wróć</v-btn>
      </v-card>
    </v-container>
  </v-app>
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
        { text: 'Data dodania', value: 'formatted_created_at' }, // Zmieniono na formatted_created_at
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      clients: [],
      projects: [],
    };
  },
  computed: {
    filteredProjects() {
      let filtered = this.projects;

      // Filtruj po wyszukiwanej wartości
      if (this.search) {
        const lowerCaseSearch = this.search.toLowerCase();
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(lowerCaseSearch)
        );
      }

      // Filtruj po wybranym kliencie
      if (this.selectedClient) {
        filtered = filtered.filter(item => item.client_id === this.selectedClient);
      }

      // Filtruj po wybranej dacie
      if (this.selectedDate) {
        const selectedDate = new Date(this.selectedDate);
        filtered = filtered.filter(item => {
          const projectDate = new Date(item.created_at);
          return projectDate.toDateString() === selectedDate.toDateString();
        });
      }

      return filtered;
    },
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects');
        this.projects = response.data.map(project => ({
          id: project.id,
          name: project.name,
          client_id: project.client_id,
          client_name: project.client ? project.client.name : 'Brak klienta',
          estimation: project.estimation,
          formatted_created_at: this.formatDate(project.created_at),
        }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },

    async fetchClients() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },

    async deleteProject(item) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/projects/${item.id}`);
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

    formatDate(date) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(date).toLocaleDateString('pl-PL', options);
    },
  },

  created() {
    this.fetchProjects();
    this.fetchClients();
  },
};
</script>

<style scoped>
</style>

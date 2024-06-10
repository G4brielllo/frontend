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

export default {
  data() {
    return {
      search: '',
      selectedClient: null,
      selectedDate: null,
      datePicker: false,
      headers: [
        { text: 'L.p.', align: 'start', value: 'id' },
        { text: 'Nazwa', value: 'name' },
        { text: 'Klient', value: 'client' },
        { text: 'Szacunkowa wartość', value: 'estimation', sortable: false },
        { text: 'Data dodania', value: 'dateAdded' },
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      clients: [
        { id: 1, name: 'Klient 1' },
        { id: 2, name: 'Klient 2' },
        { id: 3, name: 'Klient 3' },
      ],
      projects: [
        { id: 1, name: 'Projekt 1', client: 'Klient 1', estimation: 2500, dateAdded: '2024-06-01' },
        { id: 2, name: 'Projekt 2', client: 'Klient 2', estimation: 3500, dateAdded: '2024-06-02' },
        { id: 3, name: 'Projekt 3', client: 'Klient 3', estimation: 4500, dateAdded: '2024-06-03' },
      ],
    };
  },
  methods: {
    returnToHomePage(){
      this.$router.push('/returnToHomePage');
    },
    addProject(){
      this.$router.push('/addProject');
    },
    editProject(project) {
      console.log('Edytuj projekt:', project);
    },
    deleteProject(project) {
      console.log('Usuń projekt:', project);
    },
  },
};
</script>

<style scoped>
</style>

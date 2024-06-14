<template>
  <v-container>
    <v-card class="compact-card">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Lista Wycen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Wyszukaj" single-line hide-details class="compact-search-field"></v-text-field>
      </v-toolbar>
      <v-card-text>
        <v-data-table :headers="headers" :items="estimations" :search="search" class="compact-data-table">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="editItem(item)" text>Edytuj</v-btn>
            <v-btn color="error" @click="deleteItem(item)" text>Usuń</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-btn class="operation-buttons" @click="addEstimation">Dodaj</v-btn>
      <v-btn class="operation-buttons" @click="returnToHomePage">Wróć</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'L.p.', align: 'start', sortable: false, value: 'id' },
        { text: 'Nazwa', value: 'name' },
        { text: 'Projekt', value: 'project.name' }, 
        { text: 'Klient', value: 'project.client.name' },
        { text: 'Wycena', value: 'type' },
        { text: 'Data dodania', value: 'created_at' },
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      estimations: [],
    };
  },
  mounted() {
    this.fetchEstimations();
  },
  methods: {
    async fetchEstimations() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/estimations');
        this.estimations = response.data;
      } catch (error) {
        console.error('Error fetching estimations:', error);
      }
    },
    returnToHomePage() {
      this.$router.push('/returnToHomePage');
    },
    addEstimation() {
      this.$router.push('/addEstimation');
    },
    editItem(item) {
      console.log('Edytuj:', item);
    },
    deleteItem(item) {
      console.log('Usuń:', item);
      // Możesz dodać logikę usuwania elementu
    },
  },
};
</script>

<style scoped>
@import '~@mdi/font/css/materialdesignicons.css';

.compact-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 20px;
}

.compact-search-field {
  width: 300px;
}

.compact-data-table {
  margin-top: 20px;
}

.operation-buttons {
  margin-top: 10px;
}
</style>

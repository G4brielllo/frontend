<template>
  <v-container>
    <v-card class="compact-card">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Lista Wycen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Wyszukaj" single-line hide-details class="compact-search-field"></v-text-field>
      </v-toolbar>
      <v-card-text>
        <v-data-table :headers="headers" :items="elements" :search="search" class="compact-data-table">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="editItem(item)" text>Edytuj</v-btn>
            <v-btn color="error" @click="deleteItem(item)" text>Usuń</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-btn class="operation-buttons" @click="addEstimation"> Dodaj</v-btn>
      <v-btn class="operation-buttons" @click="returnToHomePage"> Wróć</v-btn>

    </v-card>
    
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'L.p.', align: 'start', sortable: false, value: 'name' },
        { text: 'Nazwa', value: 'calories' },
        { text: 'Projekt', value: 'fat' },
        { text: 'Klient', value: 'carbs' },
        { text: 'Wycena', value: 'protein' },
        { text: 'Data dodania', value: 'iron' },
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      elements: [
        { name: '1', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: 1 },
        { name: '2', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, iron: 1 },
      ],
    };
  },
  methods: {
    returnToHomePage(){
      this.$router.push('/returnToHomePage');
    },
    addEstimation(){
      this.$router.push('/addEstimation');
    },
    // editItem(item) {
    //   console.log('Edytuj:', item);
    // },
    // deleteItem(item) {
    //   const index = this.elements.indexOf(item);
    //   if (index !== -1) {
    //     this.elements.splice(index, 1);
    //   }
    // },
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
.operation-buttons{
  justify-self: left,
  margin-right = 10px;
}
</style>

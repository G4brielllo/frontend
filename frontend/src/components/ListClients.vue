<template>
  <v-container>
    <v-card class="compact-card">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Lista klientów</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Wyszukaj" single-line hide-details class="compact-search-field"></v-text-field>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-menu v-model="menu" :close-on-content-click="false" :return-value.sync="menuDate" transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="menuDate" label="Wybierz datę" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" class="compact-date-field"></v-text-field>
                </template>
                <v-date-picker v-model="menuDate" no-title @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-data-table :headers="headers" :items="clients" :search="search" class="compact-data-table">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="editItem(item)" text class="compact-btn">Edytuj</v-btn>
            <v-btn color="error" @click="deleteItem(item)" text class="compact-btn">Usuń</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-btn class="operation-buttons" @click="addClient"> Dodaj</v-btn>
      <v-btn class="operation-buttons" @click="returnToHomePage"> Wróć</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ListClients',
  data() {
    return {
      search: '',
      menu: false,
      menuDate: '',
      headers: [
        { text: 'L.p.', align: 'start', sortable: false, value: 'lp' },
        { text: 'Nazwa', value: 'name' },
        { text: 'Logotyp', value: 'logo' },
        { text: 'Kraj', value: 'country' },
        { text: 'Data dodania', value: 'dateAdded' },
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      clients: [
        { lp: 1, name: 'Client 1', logo: 'logo1.png', country: 'Poland', dateAdded: '2024-06-01', actions: 'edit/delete' },
        { lp: 2, name: 'Client 2', logo: 'logo2.png', country: 'Germany', dateAdded: '2024-05-30', actions: 'edit/delete' },

      ],
    };
  },
  methods: {
    returnToHomePage(){
      this.$router.push('/returnToHomePage');
    },
    addClient(){
      this.$router.push('/addClient');
    },
    editItem(item) {
      console.log('Edytuj:', item);
    },
    deleteItem(item) {
      const index = this.clients.indexOf(item);
      if (index !== -1) {
        this.clients.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
@import '~@mdi/font/css/materialdesignicons.css';

.compact-card {
  background-color: #fdfdfd;
  border-radius: 16px; 
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); 
  padding: 20px;
  margin: 20px;
}

.compact-search-field {
  width: 250px;
  margin-left: 20px;
}

.compact-date-field {
  width: 250px;
  margin-left: 20px;
}

.compact-data-table {
  margin-top: 20px;
}

.compact-btn {
  margin: 0 5px;
  font-weight: bold;
  text-transform: uppercase;
}

.v-data-table-header {
  background-color: #f9f9f9;
  font-weight: bold;
}

.v-data-table__wrapper {
  border-radius: 8px;
  overflow: hidden;
}
.operation-buttons{
  justify-self: left,
  margin-right = 10px;
}
</style>

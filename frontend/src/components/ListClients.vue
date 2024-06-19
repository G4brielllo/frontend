<template>
  <v-app>
    <v-container>
      <v-card class="compact-card">
        <v-toolbar color="black" dark>
          <v-toolbar-title>Lista klientów</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Wyszukaj" single-line hide-details class="compact-search-field"></v-text-field>
          <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="menuDate" label="Wybierz datę" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable hide-details class="compact-date-field"></v-text-field>
            </template>
            <v-date-picker v-model="menuDate" no-title @input="menu = false"></v-date-picker>
          </v-menu>
        </v-toolbar>
        <v-card-text>
          <v-data-table :headers="headers" :items="filteredClients" :search="search" class="compact-data-table">
            <template v-slot:[`item.logo`]="{ item }">
              <v-img :src="item.logo" height="100" width="100" contain class="rounded-image"></v-img>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="gray" @click="editItem(item)" text class="compact-btn">Edytuj</v-btn>
              <v-btn color="gray" @click="deleteItem(item)" text class="compact-btn">Usuń</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-btn class="operation-buttons" @click="addClient">Dodaj</v-btn>
        <v-btn class="operation-buttons" @click="returnToHomePage">Wróć</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'ListClients',
  data() {
    return {
      search: '',
      menu: false,
      menuDate: null,
      headers: [
        { text: 'L.p.', value: 'id' },
        { text: 'Nazwa', value: 'name' },
        { text: 'Logotyp', value: 'logo' },
        { text: 'Kraj', value: 'country' },
        { text: 'Data dodania', value: 'formatted_created_at' },
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
      clients: [],
    };
  },
  computed: {
    filteredClients() {
      let filtered = this.clients;
      if (this.search) {
        const lowerCaseSearch = this.search.toLowerCase();
        filtered = filtered.filter(client => client.name.toLowerCase().includes(lowerCaseSearch));
      }
      if (this.menuDate) {
        const selectedDate = new Date(this.menuDate);
        filtered = filtered.filter(client => {
          const clientDate = new Date(client.created_at);
          return this.compareDates(clientDate, selectedDate);
        });
      }
      return filtered;
    },
  },
  methods: {
    async fetchClients() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clients');
        this.clients = response.data.map(client => ({
          id: client.id,
          name: client.name,
          logo: client.logo,
          country: client.country,
          formatted_created_at: this.formatDate(client.created_at),
          created_at: client.created_at, 
        }));
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },

    formatDate(date) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(date).toLocaleDateString('pl-PL', options);
    },

    async deleteItem(item) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/clients/${item.id}`);
        this.fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    },

    returnToHomePage() {
      this.$router.push('/'); 
    },

    addClient() {
      this.$router.push('/addClient'); 
    },

    editItem(item) {
      this.$router.push({ path: '/addClient', query: { 
          id: item.id, 
        } });
    },

    compareDates(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    },
  },

  created() {
    this.fetchClients();
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

.operation-buttons {
  justify-self: left;
  margin-right: 10px;
}

.rounded-image {
  border-radius: 50%;
}
</style>

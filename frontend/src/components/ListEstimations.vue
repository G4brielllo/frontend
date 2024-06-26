<template>
  <v-container>
    <v-card class="compact-card">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Lista Wycen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Wyszukaj"
          single-line
          hide-details
          class="compact-search-field"
        ></v-text-field>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="estimations"
          :search="search"
          class="compact-data-table"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="editItem(item)" text>Edytuj</v-btn>
            <v-btn color="error" @click="deleteItem(item)" text>Usuń</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-row class="operation-buttons">
        <v-col cols="auto">
          <v-menu open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="gray" v-bind="attrs" v-on="on">Opcje</v-btn>
            </template>
            <v-list>
              <v-list-item @click="goToAddEstimation">
                <v-list-item-title>Dodaj Wycene</v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToAddClient">
                <v-list-item-title>Dodaj Klienta</v-list-item-title>
              </v-list-item>
              <v-list-item @click="goToAddProject">
                <v-list-item-title>Dodaj Projekt</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="returnToHomePage">Wróć</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "L.p.", align: "start", sortable: false, value: "id" },
        { text: "Nazwa", value: "name" },
        { text: "Projekt", value: "project.name" },
        { text: "Klient", value: "client.name" },
        { text: "Wycena", value: "type" },
        { text: "Kwota", value: "amount" },
        { text: "Data wykonania", value: "date" },
        { text: "Akcje", value: "actions", sortable: false },
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
        const response = await axios.get("http://127.0.0.1:8000/api/estimations");
        this.estimations = response.data.map((estimation) => ({
          id: estimation.id,
          name: estimation.name,
          type: estimation.type,
          amount: estimation.amount,
          date: this.formatDate(estimation.date),
          project: estimation.project,
          client: estimation.project.client,
        }));
      } catch (error) {
        console.error("Error fetching estimations:", error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/estimations/${item.id}`);
        this.estimations = this.estimations.filter(
          (estimation) => estimation.id !== item.id
        );
      } catch (error) {
        console.error("Error deleting estimation:", error);
      }
    },
    returnToHomePage() {
      this.$router.push("/");
    },
    goToAddEstimation() {
      this.$router.push("/addEstimation");
    },
    goToAddClient() {
      this.$router.push("/addClient");
    },
    goToAddProject() {
      this.$router.push("/addProject");
    },
    editItem(item) {
      this.$router.push({ path: "/addEstimation", query: { id: item.id } });
    },
    formatDate(date) {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(date).toLocaleDateString("pl-PL", options);
    },
  },
};
</script>

<style scoped>
@import "~@mdi/font/css/materialdesignicons.css";

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
  display: flex;
  justify-content: center;
}
</style>

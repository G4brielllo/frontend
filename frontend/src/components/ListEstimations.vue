<template>
  <v-app>
    <v-col cols="auto">
      <NavigationDrawer />
    </v-col>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="compact-card">
        <v-toolbar color="black" dark>
          <v-toolbar-title>Lista Wycen</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-row align="center">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Wyszukaj"
                single-line
                hide-details
                class="compact-search-field"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="estimations"
            :search="search"
            class="compact-data-table"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="gray" @click="editItem(item)" text>Edytuj</v-btn>
              <v-btn color="gray" @click="deleteItem(item)" text>Usuń</v-btn>
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
                  <v-list-item-title>Dodaj Wycenę</v-list-item-title>
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
  </v-app>
</template>

<script>
import axios from "@/axios";
import woman from "@/assets/woman.png";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
export default {
  name: "ListEstimation",
  components: {
    NavigationDrawer,
  },
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
      woman: woman,
      isHovered: false,
    };
  },
  mounted() {
    this.fetchEstimations();
  },
  methods: {
    goToHomePage() {
      this.$router.push("/returnToHomePage");
    },
    goToListClients() {
      this.$router.push("/listClients");
    },
    goToListProjects() {
      this.$router.push("/listProjects");
    },

    goToLogin() {
      this.$router.push("/login");
    },
    toggleHover(value) {
      this.isHovered = value;
    },
    async fetchEstimations() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/estimations"
        );
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
  width: 80%;
  max-width: 1200px;
}

.compact-search-field {
  width: 300px;
}

.compact-data-table {
  margin-top: 20px;
}

.fill-height {
  height: 100vh;
}

.operation-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.image-woman {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-woman-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: all 0.3s ease;
  overflow: hidden;
}
.user-info {
  padding: 8px;
  text-align: center;
}

.v-navigation-drawer:hover .image-woman {
  width: 100px;
  height: 100px;
}
</style>

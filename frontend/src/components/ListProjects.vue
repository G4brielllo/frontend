<template>
  <v-app>
    <v-navigation-drawer
            app
            expand-on-hover
            rail
            permanent
            @mouseover="toggleHover(true)"
            @mouseleave="toggleHover(false)"
          >
            <v-row align="center" justify="center">
              <v-col cols="auto" class="text-center position-relative">
                <v-img
                  :src="woman"
                  :class="{
                    'image-woman': !isHovered,
                    'image-woman-large': isHovered,
                  }"
                ></v-img>
              </v-col>
            </v-row>
            <div v-if="isHovered" class="user-info">
              <v-list dense nav>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-1"
                      >User</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >sandra_a88@gmail.com</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item @click="returnToHomePage">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home Page</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToListClients()">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Clients</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToListProjects()">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-folder</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Projects</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToListEstimations()">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-note</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Estimations</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToPage('starred')">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Starred</v-list-item-title>
              </v-list-item>

              <v-list-item @click="goToLogin()">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Zaloguj/Zarejestruj się</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
    <v-container>
      <v-card class="compact-card">
        <v-toolbar color="black" dark>
          <v-toolbar-title>Lista Projektów</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Wyszukaj"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                v-model="selectedClient"
                :items="clients"
                item-text="name"
                item-value="id"
                label="Wybierz klienta"
                clearable
                hide-details
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="selectedDate"
                    label="Wybierz datę"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    clearable
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @input="datePicker = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="filteredProjects"
            :search="search"
            :item-key="'id'"
          >
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
import axios from "@/axios";

export default {
  name: "ListProjects",
  data() {
    return {
      search: "",
      selectedClient: null,
      selectedDate: null,
      datePicker: false,
      headers: [
        { text: "L.p.", align: "start", value: "id" },
        { text: "Klient", value: "client_name" },
        { text: "Nazwa Projektu", value: "name" },
        {
          text: "Szacunkowa Wartość",
          value: "total_estimation",
          sortable: false,
        },
        { text: "Data dodania", value: "formatted_created_at" },
        { text: "Akcje", value: "actions", sortable: false },
      ],
      clients: [],
      projects: [],
      estimations: [],
    };
  },
  computed: {
    filteredProjects() {
      let filtered = this.projects;

      if (this.search) {
        const lowerCaseSearch = this.search.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerCaseSearch) ||
            item.client_name.toLowerCase().includes(lowerCaseSearch)
        );
      }

      if (this.selectedClient) {
        filtered = filtered.filter(
          (item) => item.client_id === this.selectedClient
        );
      }

      if (this.selectedDate) {
        const selectedDate = new Date(this.selectedDate);
        filtered = filtered.filter((item) => {
          const projectDate = new Date(item.created_at);
          return projectDate.toDateString() === selectedDate.toDateString();
        });
      }

      return filtered;
    },
  },
  methods: {
    goToHomePage(){
      this.$root.push('/returnToHomePage');
    },
    
    goToListClients() {
      this.$router.push('/listClients');
    },


    goToListEstimations() {
      this.$router.push('/listEstimations');
    },

    goToLogin() {
      this.$router.push('/login');
    },
    async fetchProjects() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/projects");
        this.projects = response.data.map((project) => ({
          id: project.id,
          name: project.name,
          client_id: project.client_id,
          client_name: project.client ? project.client.name : "Brak klienta",
          total_estimation: this.calculateTotalEstimation(project.id),
          formatted_created_at: this.formatDate(project.created_at),
          created_at: project.created_at,
        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },

    async fetchEstimations() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/estimations"
        );
        this.estimations = response.data;
        this.updateProjectEstimations();
      } catch (error) {
        console.error("Error fetching estimations:", error);
      }
    },

    updateProjectEstimations() {
      this.projects = this.projects.map((project) => ({
        ...project,
        total_estimation: this.calculateTotalEstimation(project.id),
      }));
    },

    calculateTotalEstimation(projectId) {
      const projectEstimations = this.estimations.filter(
        (estimation) => estimation.project_id === projectId
      );
      return projectEstimations.reduce(
        (sum, estimation) => sum + (parseFloat(estimation.amount) || 0),
        0
      );
    },

    formatDate(date) {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return new Date(date).toLocaleDateString("pl-PL", options);
    },

    async fetchClients() {
      try {
        const clientsWithProjects = this.projects.map(project => ({
          id: project.client_id,
          name: project.client_name,
        }));

  
        const uniqueClients = clientsWithProjects.filter((client, index, self) =>
          index === self.findIndex((c) => c.id === client.id)
        );

        this.clients = uniqueClients;
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    },

    async deleteProject(item) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/projects/${item.id}`);
        this.fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    },

    returnToHomePage() {
      this.$router.push("/returnToHomePage");
    },

    addProject() {
      this.$router.push("/addProject");
    },

    editProject(project) {
      this.$router.push({ path: "/addProject", query: { id: project.id } });
    },

    deleteProject1(project) {
      console.log("Usuń projekt:", project);
    },
  },

  async created() {
    await this.fetchProjects();
    await this.fetchEstimations();
    await this.fetchClients();
  },
};
</script>

<style scoped>
.compact-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 20px;
}


</style>

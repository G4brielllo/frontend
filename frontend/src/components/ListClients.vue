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
              <v-list-item-title class="subtitle-1">User</v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
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
        <v-list-item>
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
        <v-list-item @click="goToLogin()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Zaloguj/Zarejestruj się</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="compact-card">
        <v-toolbar color="black" dark>
          <v-toolbar-title>Lista klientów</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Wyszukaj"
            single-line
            hide-details
            class="compact-search-field"
          ></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="menuDate"
                label="Wybierz datę"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
                hide-details
                class="compact-date-field"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="menuDate"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="filteredClients"
            :search="search"
            class="compact-data-table"
          >
            <template v-slot:[`item.logo`]="{ item }">
              <v-img
                :src="item.logo"
                height="100"
                width="100"
                contain
                class="rounded-image"
              ></v-img>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                color="gray"
                @click="editItem(item)"
                text
                class="compact-btn"
                >Edytuj</v-btn
              >
              <v-btn
                color="gray"
                @click="deleteItem(item)"
                text
                class="compact-btn"
                >Usuń</v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="gray" @click="addClient" class="mx-2">Dodaj</v-btn>
          <v-btn color="gray" @click="returnToHomePage" class="mx-2"
            >Wróć</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "@/axios";
import woman from "@/assets/woman.png";

export default {
  name: "ListClients",
  data() {
    return {
      search: "",
      menu: false,
      menuDate: null,
      woman: woman,
      headers: [
        { text: "L.p.", value: "id" },
        { text: "Nazwa", value: "name" },
        { text: "Logotyp", value: "logo" },
        { text: "Kraj", value: "country" },
        { text: "Data dodania", value: "formatted_created_at" },
        { text: "Akcje", value: "actions", sortable: false },
      ],
      clients: [],
      isHovered: false,
    };
  },
  computed: {
    filteredClients() {
      let filtered = this.clients;
      if (this.search) {
        const lowerCaseSearch = this.search.toLowerCase();
        filtered = filtered.filter((client) =>
          client.name.toLowerCase().includes(lowerCaseSearch)
        );
      }
      if (this.menuDate) {
        const selectedDate = new Date(this.menuDate);
        filtered = filtered.filter((client) => {
          const clientDate = new Date(client.created_at);
          return this.compareDates(clientDate, selectedDate);
        });
      }
      return filtered;
    },
  },
  methods: {
    goToHomePage() {
      this.$root.push("/returnToHomePage");
    },
    goToListProjects() {
      this.$router.push("/listProjects");
    },
    goToListEstimations() {
      this.$router.push("/listEstimations");
    },
    goToLogin() {
      this.$router.push("/login");
    },
    toggleHover(value) {
      this.isHovered = value;
    },
    async fetchClients() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/clients");
        this.clients = response.data.map((client) => ({
          id: client.id,
          name: client.name,
          logo: client.logo,
          country: client.country,
          formatted_created_at: this.formatDate(client.created_at),
          created_at: client.created_at,
        }));
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    },
    formatDate(date) {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return new Date(date).toLocaleDateString("pl-PL", options);
    },
    async deleteItem(item) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/clients/${item.id}`);
        this.fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },
    returnToHomePage() {
      this.$router.push("/");
    },
    addClient() {
      this.$router.push("/addClient");
    },
    editItem(item) {
      this.$router.push({
        path: "/addClient",
        query: {
          id: item.id,
        },
      });
    },
    compareDates(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
  },
  created() {
    this.fetchClients();
  },
};
</script>

<style scoped>
@import "~@mdi/font/css/materialdesignicons.css";

.fill-height {
  height: 100vh;
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.compact-card {
  background-color: #fdfdfd;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 80%; 
  max-width: 1200px; 
  margin: auto; 
  margin-top: 20px; 
}

.compact-search-field,
.compact-date-field {
  max-width: 200px;
}

.rounded-image {
  border-radius: 8px;
}

.compact-btn {
  min-width: 64px;
}

.user-info {
  padding: 8px;
  text-align: center;
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
.v-navigation-drawer:hover .image-woman {
  width: 100px;
  height: 100px;
}
</style>

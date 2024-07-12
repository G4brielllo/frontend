<template>
    <v-app>
      <v-col cols="auto">
        <NavigationDrawer />
      </v-col>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="compact-card">
          <v-toolbar color="black" dark>
            <v-toolbar-title>Lista użytkowników</v-toolbar-title>
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
              :items="filteredUsers"
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
                  @click="editUser(item.id)"
                  text
                  class="compact-btn"
                  >Edytuj</v-btn
                >
                <v-btn
                  color="gray"
                  @click="deleteUser(item.id)"
                  text
                  class="compact-btn"
                  >Usuń</v-btn
                >
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="gray" @click="addUser" class="mx-2">Dodaj</v-btn>
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
  import NavigationDrawer from "@/components/NavigationDrawer.vue";
  
  export default {
    name: "ListUsers",
    components: {
      NavigationDrawer,
    },
    data() {
      return {
        search: "",
        menu: false,
        menuDate: null,
        headers: [
          { text: "L.p.", value: "id" },
          { text: "Nazwa", value: "name" },
          { text: "Logotyp", value: "logo" },
          { text: "Akcje", value: "actions", sortable: false },
        ],
        users: [],
      };
    },
    computed: {
      filteredUsers() {
        let filtered = this.users;
        if (this.search) {
          const lowerCaseSearch = this.search.toLowerCase();
          filtered = filtered.filter((user) =>
            user.name.toLowerCase().includes(lowerCaseSearch)
          );
        }
        return filtered;
      },
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/users");
          this.users = response.data.map((user) => ({
            id: user.id,
            name: user.name,
            logo: user.logo,
          }));
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
          this.fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
      editUser(userId) {
        this.$router.push(`/edit/${userId}`);
      },
      addUser() {
        this.$router.push("/addUser");
      },
      returnToHomePage() {
        this.$router.push("/");
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  
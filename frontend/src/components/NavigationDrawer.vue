<template>
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
        <v-list-item :disabled="isCurrentRoute('/')" @click="goToHomePage()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home Page</v-list-item-title>
        </v-list-item>
  
        <v-list-item :disabled="isCurrentRoute('/listClients')" @click="goToListClients()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Clients</v-list-item-title>
        </v-list-item>
  
        <v-list-item :disabled="isCurrentRoute('/listProjects')" @click="goToListProjects()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item>
  
        <v-list-item :disabled="isCurrentRoute('/listEstimations')" @click="goToListEstimations()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-note</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Estimations</v-list-item-title>
        </v-list-item>
  
        <v-list-item v-if="isLoggedIn()" @click="logout()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Wyloguj</v-list-item-title>
        </v-list-item>
        <v-list-item v-else @click="goToLogin()">
          <v-list-item-icon>
            <v-icon size="x-large">mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Zaloguj/Zarejestruj się</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  import woman from "@/assets/woman.png";
  import axios from "@/axios";
  
  export default {
    name: "NavigationDrawer",
    data() {
      return {
        woman: woman,
        isHovered: false,
      };
    },
    methods: {
      goToHomePage() {
        this.$router.push("/");
      },
      goToListClients() {
        this.$router.push("/listClients");
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
      async logout() {
        try {
          const token = localStorage.getItem("jwt_token");
  
          if (!token) {
            console.error("No token found. User is not logged in.");
            return;
          }
  
          const response = await axios.post(
            "http://127.0.0.1:8000/api/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.status === 200) {
            console.log("Logout successful:", response.data);
            localStorage.removeItem("jwt_token");
            this.$router.push("/login");
          } else {
            console.error("Logout failed:", response.data);
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
      isLoggedIn() {
        const token = localStorage.getItem("jwt_token");
        return !!token;
      },
      isCurrentRoute(route) {
        return this.$route.path === route;
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  .position-relative {
    position: relative;
  }
  
  .user-info {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 5px 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: none;
  }
  </style>
  
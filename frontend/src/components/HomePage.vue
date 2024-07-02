<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="auto">
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
              <v-list-item>
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

              <v-list-item @click="goToLogin()">
                <v-list-item-icon>
                  <v-icon size="x-large">mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Zaloguj/Zarejestruj się</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8" lg="6">
                <v-card class="mx-auto" max-width="800" elevation="10" rounded>
                  <v-card-title
                    class="headline"
                    style="font-size: 24px; color: #333"
                  >
                    Home Page
                  </v-card-title>

                  <v-card-actions class="flex-container">
                    <v-col cols="12" sm="4" class="flex-column-center">
                      <v-btn
                        class="flex-item"
                        color="black"
                        dark
                        @click="goToListClients"
                      >
                        Zarządzaj Klientami
                      </v-btn>
                      <v-img :src="user" class="image-item"></v-img>
                    </v-col>
                    <v-col cols="12" sm="4" class="flex-column-center">
                      <v-btn
                        class="flex-item"
                        color="black"
                        dark
                        @click="goToListProjects"
                      >
                        Zarządzaj Projektami
                      </v-btn>
                      <v-img :src="project" class="image-item"></v-img>
                    </v-col>
                    <v-col cols="12" sm="4" class="flex-column-center">
                      <v-btn
                        class="flex-item"
                        color="black"
                        dark
                        @click="goToListEstimations"
                      >
                        Zarządzaj Estymacjami
                      </v-btn>
                      <v-img :src="estimation" class="image-item"></v-img>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import user from "@/assets/user.png";
import project from "@/assets/project.png";
import estimation from "@/assets/budgeting.png";
import woman from "@/assets/woman.png";

export default {
  name: "HomePageComponent",
  data() {
    return {
      user: user,
      project: project,
      estimation: estimation,
      woman: woman,
      isHovered: false,
    };
  },
  methods: {
    
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
    goToRegister() {
      this.$router.push("/register");
    },
    toggleHover(value) {
      this.isHovered = value;
    },
  },
};
</script>

<style>
.headline {
  justify-content: center;
}

.v-card {
  margin: 20px;
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
}

.flex-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-item {
  margin: 10px;
}

.image-item {
  max-width: 100px;
  margin-top: 10px;
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

.subtitle-1 {
  font-size: 14px;
  font-weight: bold;
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

.v-navigation-drawer:hover .image-woman {
  width: 100px;
  height: 100px;
}
</style>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="1200" elevation="10" rounded>
          <v-card-title class="headline" style="font-size: 24px; color: #333;">Witaj</v-card-title>
          <v-card-text style="font-size: 18px; color: #666;">
            Wybierz akcję, którą chcesz wykonać:
          </v-card-text>
          <v-card-actions class="flex-container">
            <v-col cols="12" sm="4" class="flex-column-center">
              <v-btn class="flex-item" color="primary" dark @click="goToListClients">Zarządzaj Klientami</v-btn>
              <v-img :src='user' class="image-item"></v-img>
            </v-col>
            <v-col cols="12" sm="4" class="flex-column-center">
              <v-btn class="flex-item" color="primary" dark @click="goToListProjects">Zarządzaj Projektami</v-btn>
              <v-img :src='project' class="image-item"></v-img>
            </v-col>
            <v-col cols="12" sm="4" class="flex-column-center">
              <v-btn class="flex-item" color="primary" dark @click="goToListEstimations">Zarządzaj Estymacjami</v-btn>
              <v-img :src='estimation' class="image-item"></v-img>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import user from '@/assets/user.png';
import project from '@/assets/project.png';
import estimation from '@/assets/budgeting.png';

export default {
  name: 'HomePageComponent',
  data() {
    return {
      user: user,
      project: project,
      estimation: estimation
    };
  },
  methods: {
    goToPage(page) {
      this.$router.push({ name: page }); 
    },
    goToListClients(){
      this.$router.push('/listClients');
    },
    goToListProjects(){
      this.$router.push('/listProjects');
    },
    goToListEstimations(){
      this.$router.push('/listEstimations');
    },
  }
}
</script>

<style>
.v-card {
  margin-top: 5%;
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
}
.flex-container {
  display: flex;
  justify-content: space-around; 
  flex-wrap: wrap;
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
</style>

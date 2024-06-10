<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="1500" elevation="10" rounded>
          <v-card-title class="headline" style="font-size: 24px; color: #333;">Witaj</v-card-title>
          <v-card-text style="font-size: 18px; color: #666;">
            Wybierz akcję, którą chcesz wykonać:
          </v-card-text>
          <v-card-actions class="flex-container">
            <v-btn class="flex-item" color="primary" dark @click="goToListClients">Zarządzaj Klientami</v-btn>
            <v-btn class="flex-item" color="primary" dark @click="goToListProjects">Zarządzaj Projektami</v-btn>
            <v-btn class="flex-item" color="primary" dark @click="goToListEstimations">Zarządzaj Estymacjami</v-btn>
          </v-card-actions>
          <v-row>
              <v-col cols="12" sm="4" md="3">
              <v-img :src='user'></v-img>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-img :src='project'></v-img>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-img :src='estimation'></v-img>
            </v-col>
          </v-row>
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
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
}
.flex-container {
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
}
.flex-item {
  flex: auto; 
  margin: 10px; 
}
</style>

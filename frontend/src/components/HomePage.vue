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
            <v-btn class="flex-item" color="primary" dark @click="goToPage('clients')">Zarządzaj Klientami</v-btn>
            <v-btn class="flex-item" color="primary" dark @click="goToPage('projects')">Zarządzaj Projektami</v-btn>
            <v-btn class="flex-item" color="primary" dark @click="goToPage('estimations')">Zarządzaj Estymacjami</v-btn>
          </v-card-actions>
          <v-row justify="center">
            <v-col cols="12" sm="4" md="3">
              <v-img src="/assets/user.png" aspect-ratio="1"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomePageComponent',
  methods: {
    goToPage(page) {
      this.$router.push({ name: page });
    }
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

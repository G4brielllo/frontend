<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HomePage msg="Welcome to Your Vue.js App"/>
    <ListEstimations />
    <AddEstimation/>
    <ListProjects/>
    <AddProject/>
    <ListClients />
    <AddClient/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import ListEstimations from './components/ListEstimations.vue'
import AddEstimation from './components/AddEstimation.vue'
import ListProjects from './components/ListProjects.vue'
import AddProject from './components/AddProject.vue'
import ListClients from "./components/ListClients.vue"
import AddClient from "./components/AddClient.vue";

export default {
  name: "App",
  components: {
    HomePage,
    ListEstimations,
    AddEstimation,
    ListProjects,
    AddProject,
    ListClients,
    AddClient
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

import Vue from 'vue';
import VueRouter from 'vue-router';
import ListClients from "@/components/ListClients.vue";
import ListProjects from '@/components/ListProjects.vue';
import HomePage from '@/components/HomePage.vue'; 
import Router from 'vue-router';
import ListEstimations from '@/components/ListEstimations.vue';
import AddEstimation from '@/components/AddEstimation.vue';
import AddClient from '@/components/AddClient.vue';
import AddProject from '@/components/AddProject.vue';
import AuthLogin from '@/components/AuthLogin.vue';
import AuthRegister from '@/components/AuthRegister.vue';




Vue.use(VueRouter);


export default new Router({
    mode: 'history',
    routes: [

     {
        path: '/',
        name: 'Home',
        component: HomePage,
      },
      { path: '/listClients', component: ListClients },
      { path: '/listProjects', component: ListProjects },
      { path: '/listEstimations', component: ListEstimations },
      { path: '/returnToHomePage', component: HomePage },
      { path: '/addEstimation', component: AddEstimation },
      { path: '/addClient', component: AddClient },
      { path: '/addProject', component: AddProject },
      { path: '/cancelAdd', component: ListProjects },
      { path: '/cancelEstimationAdding', component: ListEstimations },
      { path: '/cancelProjectAdding', component: ListProjects },
      { path: '/cancelClientAdding', component: ListClients },
      { path: '/login', component: AuthLogin },
      { path: '/register', component: AuthRegister },


      
    ]
  });

// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import CryptoJS from 'crypto-js';

Vue.use(Vuex);

const encryptionKey = "V3ryS3cur3K3y#2024!";

export default new Vuex.Store({
  state: {
    userRole: null,
    isAdmin: false,
    userId: null,
  },
  mutations: {
    SET_USER_ROLE(state, role) {
      state.userRole = role;
      state.isAdmin = role === "admin";
    },
    SET_USER_ID(state, id) {
      state.userId = id;
    },
  },
  actions: {
    async fetchUserData({ commit }) {
      try {
        const encryptedData = localStorage.getItem(encryptionKey);
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const user_information = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const token = localStorage.getItem("jwt_token");

        if (user_information) {
          const userDataObject = JSON.parse(user_information);
          commit('SET_USER_ROLE', userDataObject.role);
        } else {
          console.error("User information not found in localStorage.");
        }

        if (!token) {
          console.error("No token found. User is not logged in.");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const loggedInUserData = response.data;
          commit('SET_USER_ID', loggedInUserData.id);
        } else {
          console.error("Failed to fetch user data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
  getters: {
    userRole: state => state.userRole,
    isAdmin: state => state.isAdmin,
    userId: state => state.userId,
    isLoggedIn: () => {
      const token = localStorage.getItem("jwt_token");
      return !!token;
    }
  }
});

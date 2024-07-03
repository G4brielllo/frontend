<template>
  <v-app>
    <v-container>
      <v-alert v-if="showErrorAlert" type="error" dismissible>
        Błąd podczas logowania. Sprawdź poprawność danych
      </v-alert>

      <v-card class="login-card">
        <v-toolbar color="black" dark>
          <v-toolbar-title>{{ "Logowanie" }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="client.email"
              label="Email"
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="client.password"
              label="Hasło"
              dense
              required
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="login-actions">
          <v-btn color="gray" @click="login">Zaloguj</v-btn>
          <v-btn color="gray" @click="cancelLogin">Anuluj</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="gray" @click="register">Zarejestruj się</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      client: {
        email: "",
        password: "",
      },
      valid: true,
      showErrorAlert: false,
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const formData = new FormData();
          formData.append("email", this.client.email);
          formData.append("password", this.client.password);

          const response = await axios.post(
            "http://127.0.0.1:8000/api/login",
            formData
          );

          if (response.status === 200) {
            console.log("Login successful:", response.data);
            localStorage.setItem("jwt_token", response.data.token);
            console.log("Token saved:", localStorage.getItem("jwt_token"));
            this.clearForm();
            this.showErrorAlert = false; 
            this.$router.push("/");
          } else {
            console.error("Login failed:", response.data);
            this.showErrorAlert = true; 
          }
        } catch (error) {
          console.error("Login error:", error);
          this.showErrorAlert = true; 
        }
      }
    },

    cancelLogin() {
      this.clearForm();
      this.$router.push("/");
    },
    register() {
      this.$router.push("/register");
    },
    clearForm() {
      this.client.email = "";
      this.client.password = "";
    },
  },
};
</script>

<style scoped>
.login-card {
  max-width: 400px;
  border-radius: 12px;
  margin: auto;
  padding: 16px;
}

.login-actions {
  display: flex;
  justify-content: left;
  padding: 8px;
}

.v-btn {
  min-width: 80px;
  padding: 4px 8px;
}

.v-toolbar-title {
  font-size: 20px;
}

.v-alert{
  max-width: fit-content;
  margin: auto;
  text-align: center;
}
</style>

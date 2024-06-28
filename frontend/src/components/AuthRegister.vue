<template>
    <v-app>
      <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="compact-card">
          <v-toolbar color="black" dark>
            <v-toolbar-title>{{ "Rejestracja" }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" class="compact-form">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="client.email"
                      label="Email"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="client.name"
                      label="Nazwa"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="client.password"
                      label="Hasło"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="client.logo"
                      label="Logo"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="compact-actions">
            <v-btn color="gray" @click="saveUser">Zapisz</v-btn>
            <v-btn color="gray" @click="cancelUserAdding">Anuluj</v-btn>
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
          id: null,
          name: '',
          email: '',
          password: '',
          logo: ''
        },
        valid: true,
        image: null,
        base64: null,
      };
    },
    methods: {
      async saveUser() {
        if (this.$refs.form.validate()) {
          try {
            const formData = new FormData();
            formData.append('name', this.client.name);
            formData.append('email', this.client.email);
            formData.append('password', this.client.password);
            formData.append('logo', this.client.logo);
  
            if (this.image) {
              formData.append('logo', this.base64);
            }
  
            const response = await axios.post('http://127.0.0.1:8000/api/users', formData);
  
            if (response.status === 200 || response.status === 201) {
              console.log('User saved successfully:', response.data);
              this.clearForm();
              this.$router.push('/');
            } else {
              console.error('Error saving user:', response.data);
            }
          } catch (error) {
            console.error('Error saving user:', error);
          }
        }
      },
      cancelUserAdding() {
        this.clearForm();
        this.$router.push('/');
      },
      clearForm() {
        this.client.id = null;
        this.client.name = '';
        this.client.email = '';
        this.client.password = '';
        this.client.logo = '';
        this.base64 = null;
        this.image = null;
      },
      createBase64Image(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.base64 = event.target.result;
          this.client.logo = this.base64;
        };
        reader.readAsDataURL(file);
      },
      isImageUrl(url) {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
      }
    }
  };
  </script>
  
  <style>
  .fill-height {
    height: 100vh;
  }
  
  .compact-card {
    width: 60%;
    border-radius: 12px;
    padding: 16px;
    margin: auto;
  }
  
  .compact-form {
    padding: 0;
  }
  
  .compact-actions {
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }
  
  .v-card-title {
    font-size: 18px;
    padding: 8px 0;
  }
  
  .v-text-field,
  .v-select,
  .v-textarea,
  .v-radio-group {
    margin-bottom: 4px;
  }
  
  .v-text-field,
  .v-select,
  .v-textarea,
  .v-radio-group {
    min-height: 40px;
  }
  
  .v-btn {
    min-width: 80px;
    padding: 4px 8px;
  }
  
  .v-toolbar-title {
    font-size: 20px;
  }
  </style>
  
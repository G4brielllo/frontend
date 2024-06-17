<template>
  <v-app>
    <v-container>
      <v-card class="elevation-4 compact-card">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Dodaj wycenę</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" class="compact-form">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="estimation.name" label="Nazwa" dense required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="estimation.description" label="Opis" rows="2" dense></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="estimation.project_id"
                    :items="projects"
                    label="Projekt"
                    item-text="name"
                    item-value="id"
                    dense
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="estimation.date"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="estimation.type" label="Rodzaj wyceny" dense>
                    <v-radio value="hourly" label="Godzinowa"></v-radio>
                    <v-radio value="fixed" label="Fixed Price"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="estimation.amount" label="Wycena" dense required></v-text-field> <!-- Poprawiono v-model -->
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="compact-actions">
          <v-btn color="gray" @click="validateForm" small>Dodaj</v-btn>
          <v-btn color="gray" @click="cancelEstimationAdding" small>Anuluj</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      estimation: {
        name: '',
        description: '',
        project_id: null,
        date: new Date().toISOString().substr(0, 10),
        type: 'godzinowa',
        amount: ''
      },
      projects: [],
      valid: true
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects');
        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    async cancelEstimationAdding() {
      this.$router.push('/cancelEstimationAdding');
    },
    async validateForm() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/estimations', this.estimation);
          console.log('Dodano estymację:', response.data);
          this.$router.push('/');
        } catch (error) {
          console.error('Error adding estimation:', error);
          
        }
      }
    }
  }
};
</script>

<style scoped>
.compact-card {
  max-height: 90%;
  max-width: 80%;
  margin: auto;
  padding: 16px;
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

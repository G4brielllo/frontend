<template>
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
                  v-model="estimation.project"
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
                  <v-radio value="godzinowa" label="Godzinowa"></v-radio>
                  <v-radio value="fixed" label="Fixed Price"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="estimation.price" label="Wycena" dense required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="compact-actions">
        <v-btn color="black" @click="validateForm" small>Dodaj</v-btn>
        <v-btn color="black" @click="cancelEstimationAdding" small>Anuluj</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      estimation: {
        name: '',
        description: '',
        project: null,
        date: new Date().toISOString().substr(0, 10),
        type: 'godzinowa',
        price: ''
      },
      projects: [
        { id: 1, name: 'Projekt 1' },
        { id: 2, name: 'Projekt 2' },
        { id: 3, name: 'Projekt 3' }
      ],
      valid: true
    };
  },
  methods: {
    cancelEstimationAdding() {
      this.$router.push('/cancelEstimationAdding');
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        console.log('Dodano estymację:', this.estimation);
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

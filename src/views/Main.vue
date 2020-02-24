<template>
  <b-container>
    <h1>
      Career Manager
    </h1>
    <b-form
      @submit.prevent="createSemester"
      v-if="!Object.keys(semesters).length"
    >
      <b-form-row class="justify-content-center m-2">
        <b-col sm="4">
          Primer año de tu carrera:
          <b-input v-model="lastSemester.year" class="text-center"></b-input>
        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-center m-2">
        <b-col sm="4">
          ¿Semestre par o impar?
          <select v-model="lastSemester.parity">
            <option value="0">Par</option>
            <option value="1">Impar</option>
          </select>
        </b-col>
      </b-form-row>
      <b-button variant="primary" type="submit">
        Empezar a planear!
      </b-button>
    </b-form>
    <div
      class="year rounded"
      v-for="year in Object.keys(semesters)"
      :key="year"
    >
      <h2>{{ year }}</h2>
      <b-row class="semesters">
        <Semester
          v-for="(semester, index) in semesters[year]"
          :key="semester.id"
          :semester="semester"
          :deletable="compareWithLastSemester(semester)"
          @deleteSemester="deleteSemester(year, index)"
        ></Semester>
      </b-row>
    </div>
    <b-col class="mb-1">
      <b-button
        v-if="Object.keys(semesters).length"
        variant="primary"
        @click="() => { incrementSemester(); createSemester() }"
      >
        Añadir semestre
      </b-button>
    </b-col>
    <b-col>
      <b-button
        variant="secondary"
        @click="signOut"
      >
        Cerrar sesión
      </b-button>
    </b-col>
    <NewUserCourse></NewUserCourse>
    <DeleteModal></DeleteModal>
  </b-container>
</template>

<script>
import authService from '../auth';
import semestersService from '../services/semestersService';

import Semester from '../components/Semester.vue';
import NewUserCourse from '../components/modals/NewUserCourse.vue';
import DeleteModal from '../components/modals/DeleteModal.vue';

export default {
  data() {
    return {
      semesters: {},
      lastSemester: {
        year: 0,
        parity: 0,
        credits: 0,
        total_credits: 0,
      },
    };
  },
  methods: {
    signOut() {
      authService.signOut().then(() => {
        this.$router.push('/login');
      });
    },
    createSemester() {
      semestersService.create(this.lastSemester).then((response) => {
        if (
          !Object.keys(this.semesters)
            .includes(String(response.data.semester.year))
        ) {
          this.$set(this.semesters, response.data.semester.year, []);
        }
        this.semesters[response.data.semester.year]
          .push(response.data.semester);
      });
    },
    deleteSemester(year, index) {
      this.semesters[year].splice(index, 1);
      if (!this.semesters[year].length) {
        delete this.semesters[year];
      }
      if (!Object.keys(this.semesters).length) {
        this.lastSemester.year = 0;
        this.lastSemester.parity = 0;
      } else {
        this.decrementSemester();
      }
    },
    incrementSemester() {
      if (!this.lastSemester.parity) {
        this.lastSemester.parity = 1;
      } else {
        this.lastSemester.year += 1;
        this.lastSemester.parity = 0;
      }
    },
    decrementSemester() {
      if (!this.lastSemester.parity) {
        this.lastSemester.year -= 1;
        this.lastSemester.parity = 1;
      } else {
        this.lastSemester.parity = 0;
      }
    },
    compareWithLastSemester(semester) {
      return (
        semester.year === this.lastSemester.year
          && semester.parity === this.lastSemester.parity
      );
    },
  },
  created() {
    semestersService.index().then((response) => {
      this.semesters = semestersService.groupByYear(response.data.semesters);
      const lastYear = Object.keys(this.semesters).sort((a, b) => b - a)[0];
      if (this.semesters[lastYear]) {
        this.lastSemester = { ...this.semesters[lastYear][1] }
          || { ...this.semesters[lastYear][0] };
      }
    });
  },
  components: {
    Semester,
    NewUserCourse,
    DeleteModal,
  },
  watch: {
    lastSemester: {
      deep: true,
      handler(val) {
        Object.keys(this.lastSemester).forEach((key) => {
          this.lastSemester[key] = Number(val[key]);
        });
      },
    },
  },
};
</script>

<style scoped>
.year {
  border: 1px solid black;
  margin: 20px 0;
  padding: 10px;
}

.semesters {
  justify-content: space-around;
}
</style>

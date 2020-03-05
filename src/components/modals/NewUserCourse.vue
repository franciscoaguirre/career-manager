<template>
  <b-modal id="newCourse-modal" hide-footer title="Crear curso">
    <b-form @cancel="cancelAction">
      <b-form-group
        id="input-group-1"
        label="Materia:"
        label-for="input-1"
        description="Selecciona la materia"
      >
        <b-form-select
          id="input-1"
          v-model="userCourse.course_id"
          :options="courses.map(x => ({ value: x.id, text: x.name }))"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Status:"
        label-for="input-2"
        description="Selecciona el estado"
      >
        <b-form-select
          id="input-2"
          v-model="userCourse.status"
          :options="statuses.map(x => ({ value: statuses.indexOf(x), text: x }))"
          required
        ></b-form-select>
      </b-form-group>
      <b-button type="button" class="mr-1" variant="primary" @click="createUserCourse()">
        Crear
      </b-button>
      <b-button type="cancel" variant="secondary">Cancel</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import EventBus from '@/eventBus';
import userCourseService from '@/services/userCourseService';
import courseService from '../../services/courseService';

export default {
  data() {
    return {
      userCourse: {
        semester_id: Number,
        status: Number,
        course_id: Number,
      },
      courses: [],
      statuses: [
        'planning', 'in_progress', 'exam',
        'passed', 'failed', 'retaking',
      ],
    };
  },
  created() {
    courseService.index().then((response) => {
      this.courses = response.data.courses;
    });

    EventBus.$on('create-userCourse-requested', (semesterId) => {
      this.userCourse.semester_id = semesterId;
      this.$bvModal.show('newCourse-modal');
    });
  },
  methods: {
    createUserCourse() {
      userCourseService.create(this.userCourse).then(() => {
        EventBus.$emit('create-userCourse-done', 'created');
        this.$bvModal.hide('newCourse-modal');
      });
    },

    cancelAction() {
      EventBus.$emit('create-userCourse-done', 'canceled');
      this.$bvModal.hide('newCourse-modal');
    },
  },
};
</script>

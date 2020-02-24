<template>
  <b-col sm="5" class="semester rounded">
    <h3>{{ semester.year }} {{ showParity(semester.parity) }}</h3>
    <div class="credits">
      {{ semester.credits }}/{{ semester.total_credits }}
    </div>
    <div class="courses">
      <UserCourse
        v-for="userCourse in userCourses"
        :key="userCourse.id"
        :userCourse="userCourse"
        @deleted="getUserCourses"
      ></UserCourse>
      <NewUserCourse :semesterId="semester.id" @created="getUserCourses"></NewUserCourse>
    </div>
    <div class="delete" v-if="deletable" @click="deleteSemester">
      <i class="material-icons">
        delete
      </i>
    </div>
  </b-col>
</template>

<script>
import semestersService from '@/services/semestersService';
import userCourseService from '@/services/userCourseService';

import UserCourse from './UserCourse.vue';
import NewUserCourse from './NewUserCourse.vue';

export default {
  props: {
    semester: Object,
    deletable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userCourses: [],
    };
  },
  created() {
    this.getUserCourses();
  },
  methods: {
    getUserCourses() {
      userCourseService.index(this.semester.id).then((response) => {
        this.userCourses = response.data.user_courses;
      });
    },
    deleteSemester() {
      semestersService.delete(this.semester.id);
      this.$emit('deleteSemester');
    },
    showParity(parity) {
      return parity ? 'Impar' : 'Par';
    },
  },
  components: {
    NewUserCourse,
    UserCourse,
  },
};
</script>

<style scoped>
.semester {
  border: 1px solid black;
}

.credits {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 0;
}

.delete {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

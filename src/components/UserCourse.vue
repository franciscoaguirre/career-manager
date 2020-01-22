<template>
  <li class="list-group-item border-0 rounded shadow-sm mb-2" :class="userCourse.status">
    <b-row class="m-0">
      <b-col class="text-left m-0">
        <p class="font-weight-bold m-0">
          {{ userCourse.course.name }}
        </p>
        <p class="font-weight-light m-0">
          {{ userCourse.course.institute.name }}
        </p>
      </b-col>
      <b-col cols="6" class="m-0 text-truncate">
        <p class="font-weight-bold m-0">
          credits: {{ userCourse.course.credits }}
        </p>
        <p class="font-weight-light m-0">
          status: {{ userCourse.status.replace(/_/g, ' ') }}
        </p>
      </b-col>
      <b-col class="m-0 position-relative">
        <button type="button" class="btn btn-danger vertical-center"
        @click="toggleDelete">X</button>
      </b-col>
    </b-row>
  </li>
</template>

<script>
import EventBus from '@/eventBus';

export default {
  name: 'UserCourse',
  props: {
    userCourse: Object,
  },
  methods: {
    toggleDelete() {
      const deleteCall = {
        id: this.userCourse.id,
        type: 'UserCourse',
      };
      EventBus.$emit('delete-requested', deleteCall);
      EventBus.$on('delete-done', (deleteChannel) => {
        this.$emit(deleteChannel, this.userCourse.id);
        EventBus.$off('delete-done');
      });
    },
  },
};
</script>

<style scoped>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.planning {
  background-color: #b8daff;
  color: #004085;
}

.retaking {
  background-color: #fdfdfe;
  color: #818182;
}

.exam {
  background-color: #ffeeba;
  color: #856404;
}

.passed {
  background-color: #c3e6cb;
  color: #155724;
}

.failed {
  background-color: #f5c6cb;
  color: #721c24;
}
</style>

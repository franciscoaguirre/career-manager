<template>
  <div :class="'bordered-box'" @click="displayNew">
    +
  </div>
</template>

<script>
import EventBus from '@/eventBus';

export default {
  props: {
    semesterId: Number,
  },
  methods: {
    displayNew() {
      EventBus.$emit('create-userCourse-requested', this.semesterId);
      EventBus.$on('create-userCourse-done', (action) => {
        this.$parent.$emit(action);
        EventBus.$off('create-userCourse-done');
      });
    },
  },
};
</script>

<style>
.bordered-box {
  border: 3px dotted black;
  text-align: center;
}
</style>

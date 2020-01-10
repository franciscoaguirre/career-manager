<template>
  <b-container>
    <h1>
      Career Manager
    </h1>
    <b-button
      variant="primary"
      @click="signOut()"
    >
      Sign Out
    </b-button>
  </b-container>
</template>

<script>
import authService from '../auth';

export default {
  methods: {
    signOut() {
      authService.signOut();
      this.$router.push('/login');
    },
  },
};
</script>

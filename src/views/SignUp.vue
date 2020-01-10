<template>
  <b-col sm="4" offset-sm="4">
    <b-form>
      <h2>Sign Up</h2>
      <b-form-group>
        <b-form-input
          type="text"
          placeholder="Email"
          v-model="credentials.email"
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="password"
          placeholder="Contraseña"
          v-model="credentials.password"
        />
      </b-form-group>
      <b-button
        variant="primary"
        @click="submit()"
      >
        Sign Up
      </b-button>
    </b-form>
    <b-button
      class="m-1"
      variant="secondary"
      @click="goToLogin()"
    >
      Log In
    </b-button>
  </b-col>
</template>

<script>
import authService from '../auth';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submit() {
      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
      };
      authService.signup(credentials).then(() => {
        this.goToLogin();
      });
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<template>
  <b-col sm="4" offset-sm="4">
    <b-form>
      <h2>Registrarse</h2>
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
        @click="submit"
      >
        Registrarse
      </b-button>
    </b-form>
    <b-button
      class="m-1"
      variant="secondary"
      @click="goToLogin"
    >
      Iniciar sesión
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
        authService.login(credentials).then(() => {
          this.goToMain();
        });
      });
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToMain() {
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <b-col class="side-menu" sm="3">
    <div class="profile">
      <i class="material-icons">
        face
      </i>
    </div>
    <b-row align-h="center">
      <b-col sm="6" class="nav">
        <router-link to="/">Home</router-link>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
</script>

<style lang="scss" scoped>
.side-menu {
  border-right: 1px solid black;
  height: 100%;
};

.nav {
  padding: 0;

  & > * {
    margin: auto;
  }
};

.profile {
  padding-top: 20px;
};
</style>

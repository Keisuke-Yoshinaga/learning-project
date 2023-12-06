<template>
  <v-app-bar id="header" color="primary">

    <v-app-bar-nav-icon @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

    <v-app-bar-title>
      技術学習
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer id="nav" v-model="drawer">
    <v-list nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="TOP" value="top" :to="'/'">
      </v-list-item>
      <v-list-item prepend-icon="mdi-format-list-checks" title="TODO" value="todo" :to="'/todo'">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  data: () => ({
    drawer: false,
  }),
}
</script>

<style>
@media screen and (max-width: 520px) {
  #header {
    display: none !important;
  }

  #nav {
    height: 100% !important;
    top: 0px !important;
  }
}
</style>

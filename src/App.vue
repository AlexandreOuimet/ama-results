<template>
  <v-app>
    <v-main>
      <v-container fluid class="mt-8">
        <nav-drawer></nav-drawer>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DrawerVue from "@/layouts/Drawer.vue";

export default {
  components: { NavDrawer: DrawerVue },
};
</script>
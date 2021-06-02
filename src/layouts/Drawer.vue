<template>
  <v-navigation-drawer app dark mini-variant permanent>
    <v-list>
      <v-list-item link @click.stop="goto('Standings')">
        <v-list-item-icon>
          <v-icon>mdi-poll</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item link @click.stop="goto('Dashboard')">
        <v-list-item-icon>
          <v-icon>mdi-flag-checkered</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    goto(view) {
      this.$router.push({ name: view });
    },
  },
};
</script>

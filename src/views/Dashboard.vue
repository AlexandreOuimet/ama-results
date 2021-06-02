<template>
  <v-container>
    <live-timing></live-timing>
  </v-container>
</template>

<script>
import LiveTiming from "../layouts/LiveTiming.vue";

export default {
  name: "Home",

  components: { LiveTiming },

  data() {
    return {};
  },
};
</script>


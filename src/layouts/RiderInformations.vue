<template>
  <custom-card color="primary" :noHeader="true">
    <template #content>
      <v-row class="text-center red">
        <v-col class="ma-0 pa-0">
          <rider-avatar></rider-avatar>
          <div class="text-h4 font-weight-light">{{ name }}</div>
        </v-col>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
import CustomCard from "../components/CustomCard.vue";
import RiderAvatar from "../components/RiderAvatar.vue";

export default {
  components: { CustomCard, RiderAvatar },

  props: {
    rider: Object,
  },

  computed: {
    name() {
      return this.rider == null ? "" : this.rider.name;
    },
  },

  data() {
    return {};
  },
};
</script>

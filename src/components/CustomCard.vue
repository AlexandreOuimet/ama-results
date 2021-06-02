<template>
  <v-card class="mb-12">
    <v-card-title v-if="!noHeader" class="align-start">
      <v-sheet
        :color="color"
        :width="fullHeader ? '100%' : undefined"
        class="overflow-hidden mt-n9 transition-swing v-card--material__sheet"
        elevation="6"
        max-width="100%"
        rounded
      >
        <div class="px-8 py-6 black--text">
          <div v-if="title != undefined" class="text-h4 font-weight-light">
            {{ title }}
          </div>
          <div v-if="subtitle != undefined" class="text-caption">
            {{ subtitle }}
          </div>
        </div>
      </v-sheet>
    </v-card-title>

    <v-card-text>
      <slot name="content" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    color: String,
    fullHeader: Boolean,
    noHeader: Boolean,
    title: String,
    subtitle: String,
    align: String,
  },
};
</script>

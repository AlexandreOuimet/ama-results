<template>
  <custom-card color="primary" :title="raceName" :subtitle="sessionName">
    <template #content>
      <v-data-table
        :items="racingLogs"
        :headers="headers"
        disable-sort
        @click:row="onRowClicked"
        class="hoverable"
      >
        <template v-slot:[`item.position`]="{ item }">
          <v-row class="align-center">
            <v-col>
              <v-img
                :src="require('../assets/' + getVehicleLogo(item.vehicle))"
                height="30"
                width="30"
                contain
              ></v-img>
            </v-col>
            <v-col>{{ item.position }}</v-col>
          </v-row>
        </template>
      </v-data-table>
    </template>
  </custom-card>
</template>

<script>
import CustomCard from "../components/CustomCard.vue";

export default {
  components: { CustomCard },

  props: {
    racingLogs: Array,
    raceInformations: Object,
  },

  data() {
    return {
      headers: [
        {
          text: "",
          value: "position",
          width: 125,
          align: "center",
        },
        {
          text: "Name",
          value: "name",
          width: 125,
        },
        {
          text: "Number",
          value: "number",
          align: "center",
        },
        {
          text: "Lap",
          value: "nbLaps",
          align: "center",
        },
        {
          text: "Last Lap",
          value: "lastLap",
          align: "center",
        },
        {
          text: "Best Lap",
          value: "bestLap",
          align: "center",
        },
        {
          text: "Diff",
          value: "diff",
          align: "center",
        },
        {
          text: "Gap",
          value: "gap",
          align: "center",
        },
        {
          text: "Status",
          value: "status",
          align: "center",
        },
      ],
    };
  },

  computed: {
    raceName() {
      return this.raceInformations == undefined
        ? ""
        : this.raceInformations.raceName;
    },
    sessionName() {
      return this.raceInformations == undefined
        ? ""
        : this.raceInformations.sessionName;
    },
    track() {
      return this.raceInformations == undefined
        ? ""
        : this.raceInformations.track;
    },
  },

  methods: {
    onRowClicked(value) {
      this.$emit("onRowClicked", value);
    },

    getVehicleLogo(vehicle) {
      switch (vehicle) {
        case "HON CRF450R WE":
          return "honda.svg";
        case "YAM YZ 450F":
          return "yamaha.svg";
        case "HQV FC450 RE":
          return "husqvarna.svg";
        case "GAS MC450F":
          return "gasgas.png";
        case "KTM 450 SX-F FE":
        case "KTM 450 SX-F":
          return "ktm.svg";
        case "KAW KX450":
          return "kawasaki.svg";
        default:
          return "no-logo.svg";
      }
    },
  },
};
</script>

<style scoped>
.hoverable {
  cursor: pointer;
}
</style>

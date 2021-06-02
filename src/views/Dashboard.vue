<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-col>
        <live-timing
          @onRowClicked="onRowClicked"
          :racingLogs="racingLogs"
          :race-informations="raceInformations"
        ></live-timing>
      </v-col>

      <!--
      <v-col v-if="selectedRider != null">
        <rider-informations :rider="selectedRider"></rider-informations>
      </v-col>
      -->
    </v-row>
  </v-container>
</template>

<script>
import LiveTiming from "../layouts/LiveTiming.vue";
// import RiderInformations from "../layouts/RiderInformations.vue";

import axios from "axios";
import cheerio from "cheerio";

export default {
  name: "Dashboard",

  components: {
    LiveTiming,
    // RiderInformations
  },

  created() {
    // Fetch once
    this.fetchLiveTimings();

    // Than fetch with intervall
    this.interval = setInterval(() => {
      this.fetchLiveTimings();
      console.log("fetching...");
    }, 3000);

    this.fetchPointsStanding();
  },

  destroyed() {
    console.log("clearing intervall");
    clearInterval(this.interval);
  },

  data() {
    return {
      selectedRider: null,
      racingLogs: [],
      raceInformations: {},
      interval: null,
    };
  },

  methods: {
    onRowClicked(value) {
      this.selectedRider = value;
    },

    fetchLiveTimings() {
      const url = "http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml";

      axios.get(url).then((response) => {
        const xml = response.data;
        const $ = cheerio.load(xml);

        // Get race information
        const header = $("a")[0];
        const raceName = header.attribs["e"];
        const sessionName = header.attribs["s"];
        const track = header.attribs["t"];

        this.raceInformations = {
          raceName: raceName,
          sessionName: sessionName,
          track: track,
        };

        // Get rider informations
        const elements = $("b");

        for (var element of elements) {
          const rider = {
            position: element.attribs["a"],
            name: element.attribs["f"],
            number: element.attribs["n"],
            vehicle: element.attribs["v"],
            location: element.attribs["t"],
            class: element.attribs["c"],
            nbLaps: element.attribs["l"],
            lastLap: element.attribs["ll"],
            bestLap: element.attribs["bl"],
            diff: element.attribs["d"],
            gap: element.attribs["g"],
            status: element.attribs["s"],
          };
          this.racingLogs.push(rider);
        }
      });
    },

    fetchPointsStanding() {},
  },
};
</script>

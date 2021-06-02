<template>
  <custom-card color="primary" :title="raceName" :subtitle="sessionName">
    <template #content>
      <v-data-table :items="racingLogs" :headers="headers" disable-sort>
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
import axios from "axios";
import cheerio from "cheerio";

import CustomCard from "../components/CustomCard.vue";

export default {
  components: { CustomCard },

  data() {
    return {
      racingLogs: [],
      raceName: "",
      sessionName: "",
      track: "",
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

  created() {
    var url = "http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml";

    axios.get(url).then((response) => {
      const xml = response.data;
      const $ = cheerio.load(xml);

      // Get race information
      const header = $("a")[0];
      this.raceName = header.attribs["e"];
      this.sessionName = header.attribs["s"];
      this.track = header.attribs["t"];

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

  methods: {
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

<style lang="css">
.divider {
  width: 20px;
}
</style>
<template>
  <v-container> </v-container>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";

export default {
  name: "Home",
  components: {},
  methods: {
    fetch() {
      var url = "http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml";

      console.log("URL", url);

      axios.get(url).then((response) => {
        const xml = response.data;
        const $ = cheerio.load(xml);

        const elements = $("b");
        var raceResults = [];

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
          raceResults.push(rider);
        }
        console.log(raceResults);
      });
    },
  },
};
</script>


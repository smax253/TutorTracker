<template>
  <div id="app">
    <CourseSelector
        v-bind:availableCourses="this.availableCourses"
        @courseCode="queryCourseCode"
        v-if="!hasPickedCourse"
    />
    <header v-if="hasPickedCourse">Tutor Tracker</header>
    <div class="container">
        <div class="left">
          <TutorList
              v-if="hasPickedCourse && hasReceivedResponse"
              :nearbyTutors="foundNearbyTutors"
          />
        </div>
        <div class="right">
          <GoogleMap
              v-if="hasPickedCourse"
          />
        </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap"
import CourseSelector from "./components/CourseSelector"
import TutorList from "./components/TutorList"

const ENDPOINT = 'https://tutortracker.appspot.com/api/tutor';

export default {
  name: 'app',
  components: {
    GoogleMap,
    CourseSelector,
    TutorList
  },
  data () {
    return {
      availableCourses: [
        "PH201",
        "TH201",
        "CHM101",
        "SN101",
        "ACC203",
        "BIO101",
        "CS115"
      ],
      currLat: "40.7261",
      currLon: "-74.2313",
      hasPickedCourse: false,
      hasReceivedResponse: false,
      foundNearbyTutors: []
    }
  },
  methods: {
    // setCurrentCoordinates(currCoordinates) {
    //   console.log(currCoordinates);
    //   this.currLat = currCoordinates.lat;
    //   this.currLon = currCoordinates.lon;
    // },
    queryCourseCode(selectedCourseCode) {
      this.hasPickedCourse = true;
      console.log(`Lat: ${this.currLat}\nLon: ${this.currLon}`);
      fetch(`${ENDPOINT}/search?query=${selectedCourseCode}&lat=${this.currLat}&lon=${this.currLon}`)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          json.forEach(tutor => {
            this.foundNearbyTutors.push({
              img: "../${tutor.img}",
              name: tutor.name,
              location: tutor.location,
              duration: tutor.distance.text
            })
          });
          console.log(foundNearbyTutors);
          this.hasReceivedResponse = true;
        });
    }
  }
}
</script>

<style lang="scss">
#app {
  margin-top: 0px;
  height: 100%;
  font-family: 'Montserrat';
}

header {
    display: block;
    padding: 20px;
    background-color: #2b2b2b;
    color: white;
    font-weight: 700;
    font-size: 1.5em;
}

.container {
    display: flex;
    flex-direction: row;
}

.left {
    background-color: #fff;
    max-width: 350px;
}

.right {
    flex: 1;
}

</style>

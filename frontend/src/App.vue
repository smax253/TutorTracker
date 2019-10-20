<template>
  <div id="app">
    <header>Tutor Tracker</header>
    <div class="container">
        <div class="left">
            <CourseSelector @courseCode="queryCourseCode" />
            <TutorList :nearbyTutors="responseNearbyTutors" />
        </div>
        <div class="right">
            <GoogleMap @currCoordinates="setCurrentCoordinates" />
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
      // for querying nearest tutors
      currLat: "",
      currLon: "",

      responseNearbyTutors: [
        {
          img: "",
          name: "Alvin Tam",
          location: "Room 224 Library",
          duration: "5"
        }
      ]
    }
  },
  methods: {
    setCurrentCoordinates(currCoordinates) {
      console.log(currCoordinates);
      this.currLat = currCoordinates.lat;
      this.currLon = currCoordinates.lon;
    },
    queryCourseCode(selectedCourseCode) {
      console.log(`Lat: ${this.currLat}\nLon: ${this.currLon}`);
      fetch(`${ENDPOINT}/search?query=${selectedCourseCode}&lat=${this.currLat}&lon=${this.currLon}`)
        .then(response => response.json())
        .then(json => console.log(json));
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

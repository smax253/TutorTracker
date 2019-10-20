<template>
  <div id="app">
    <CourseSelector
                  v-bind:availableCourses="this.availableCourses"
                  @courseCode="queryCourseCode"
                  v-if="!hasPickedCourse"
      />            
    <header
                  v-if="hasPickedCourse"

    >Tutor Tracker</header>
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
              @currCoordinates="setCurrentCoordinates"
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
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

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
          "CS115",
          "CS114",
          "MAT305",
          "MUS110",
          "GER223"
      ],
      currLat: "",
      currLon: "",
      hasPickedCourse: false,
      hasReceivedResponse: false,
      foundearbyTutors: [
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
      // console.log(currCoordinates);
      this.currLat = currCoordinates.lat;
      this.currLon = currCoordinates.lon;
    },
    queryCourseCode(selectedCourseCode) {
      this.hasPickedCourse = true;
      sleep(5000).then(() => {
        console.log(`Lat: ${this.currLat}\nLon: ${this.currLon}`);
        fetch(`${ENDPOINT}/search?query=${selectedCourseCode}&lat=${this.currLat}&lon=${this.currLon}`)
          .then(response => response.json())
          .then(json => {
            console.log(json);
            this.hasReceivedResponse = true;
          });
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

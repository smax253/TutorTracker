<template>
  <div id="app">
    <GoogleMap @currCoordinates="setCurrentCoordinates" />
    <br>
    <CourseSelector @courseCode="queryCourseCode" />
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap"
import CourseSelector from "./components/CourseSelector"

const ENDPOINT = 'https://tutortracker.appspot.com/api/tutor';

export default {
  name: 'app',
  components: {
    GoogleMap,
    CourseSelector
  },
  data () {
    return {
      // Course Selector fields
      selectedCourseCode: "",
      currLat: "",
      currLon: ""

      // placeholder
    }
  },
  methods: {
    setCurrentCoordinates(currCoordinates) {
      console.log(currCoordinates);
      this.currLat = currCoordinates.lat;
      this.currLon = currCoordinates.lon;
    },
    queryCourseCode(selectedCourseCode) {
      fetch(`${ENDPOINT}/search?query=${selectedCourseCode}&lat=${this.currLat}&lon=${this.currLon}`)
        .then(response => response.json())
        .then(json => console.log(json));
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

 <template>
  <div class="landing">
    <center>
    <h1>TutorTracker</h1>
    <input
      class="prompt"
      type="text"
      placeholder="What course would you like help with?"
      v-model="selectedCourseCode"
      @input="onChange"
    />
    <ul
      v-show="this.isOpen"
      class="autocomplete-results"
    >
      <li
        v-for="(result, i) in this.results"
        :key="i"
        class="autocomplete-result"
      >
        <button v-on:click="submit($event)" :value="result">{{ result }}</button>
      </li>
    </ul>
  </center>
  </div>
</template>

<script>
export default {
  name: "CourseSelector",
  props: {
    availableCourses: Array
  },
  data() {
    return {
      selectedCourseCode: "",
      results: [],
      isOpen: false
    }
  },
  methods: {
    submit(event) {
      // very hacky hehe
      if (event.target.value !== "Available Courses") {
        this.$emit("courseCode", event.target.value);
      }
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    filterResults() {
      if (this.selectedCourseCode === "") {
        this.results = [];
      } else {
        this.results = this.availableCourses.filter(course => {
          return course.toUpperCase().indexOf(this.selectedCourseCode.toUpperCase()) > -1;
        });
        this.results.unshift("Available Courses");
      }
    },
  }
}
</script>

<style>
.landing h1 {
  font-size: 3em;
}

input {
  width: 60%;
}

.autocomplete-header {
  background: #c6c6c6;
  padding: 10px 15px;
  border: none;
  border-radius: 1em 1em;
  font-size: 1.5em;
  text-align: center;
}

.autocomplete-result, .autocomplete-header {
  width: 51%;
  border: none;
  padding: none;
  margin: 1em;
  list-style: none;
}

.autocomplete-result button {
  background: #c6c6c6;
  padding: 10px 15px;
  border: none;
  border-radius: 1em 1em;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
}

input {
  background: #e6e6e6;
  padding: 10px 15px;
  border: none;
  border-radius: 1em 1em;
  font-size: 1.5em;
  text-align: center;
}

.autocomplete-results {
  align-items: center;
}
</style>

 <template>
  <div class="cSelect">
    <center>
    <h1>literally uber for tutors</h1>
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
        <button @click="submit">{{ result }}</button>
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
    submit() {
      this.$emit("courseCode", this.selectedCourseCode);
      this.selectedCourseCode = ""
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

.autocomplete-result {
  width: 51%;
  border: none;
  padding: none;
  margin: 1em;
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

 <template>
  <div class="cSelect">
    <center>
    <p class="prompt">What course would you like help with?</p>
    <select
      v-on:change="submit"
      v-model="selectedCourseCode"
      >
      <option disabled value="">select a course</option>        
      <option v-for="e in availableCourses" v-bind:value="e">{{ e }}</option>
    </select>
    </center>
  </div>
</template>

<script>
export default {
  name: "CourseSelector",
  data() {
    return {
      selectedCourseCode: '',
      availableCourses: [
        "CS115",
        "ENGL213"
      ]
    }
  },
  methods: {
    submit() {
      this.$emit("courseCode", this.selectedCourseCode);
      this.selectedCourseCode = "null"
    }
  }
}
</script>

<style>
.cSelect {
  padding: 15px;
}

select {
  display: block;
  padding: 2px;
  margin: 5px;
  font-size: 15px;
  font-family: 'Montserrat';
}

.prompt {
  display: block;
  font-size: 20px;
}

option {
  font-family: 'Montserrat';
}

</style>

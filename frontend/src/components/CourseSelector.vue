 <template>
  <select
      v-on:change="submit"
      v-model="selectedCourseCode"
  >
    <option :value="null" disabled>What courses would you like help with?</option>
    <option v-for="e in availableCourses" v-bind:value="e">{{ e }}</option>
  </select>
</template>

<script>
export default {
  name: "CourseSelector",
  data() {
    return {
      selectedCourseCode: "null",
      availableCourses: [
        "CS115"
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
/* option {
  background-color: #333;
  color: #fff;
  padding: 10px 15px;
  border: none;
  width: 40%;
} */
</style>

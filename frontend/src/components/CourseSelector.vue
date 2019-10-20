 <template>
  <div class="landing">
    <h1> literally uber for tutors and students </h1>
    <select
        v-on:change="submit"
        v-model="selectedCourseCode"
    >
      <option :value="null" disabled>What courses would you like help with?</option>
      <option v-for="e in availableCourses" v-bind:value="e">{{ e }}</option>
    </select>
  </div>
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
.landing h1 {
  font-size: 3em;
}

/* Remove drop-down arrow */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}

select, option {
  background: #e6e6e6;
  padding: 10px 15px;
  border: none;
  border-radius: 1em 1em;
  width: 50%;
  font-size: 2em;
  text-align: center;
}
</style>

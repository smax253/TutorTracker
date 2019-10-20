/**
 * Responsible for hailing a tutor.
 */
<template>
  <button @click="pressed">{{ this.courseName }}</button>
</template>

<script>
export default {
  name: "TutorButton",
  data() {
    return {
      // "field"
      tutorCount: 1,
      courseName: "CHEM1101"
    }
  },
  methods: {
    pressed() {
      //fetch('https://jsonplaceholder.typicode.com/todos/1')
      fetch('https://tutortracker.appspot.com/api/tutor')
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.$emit("courseName", this.courseName);
          this.tutorCount--;
          if (this.tutorCount == 0) {
            this.courseName = "No more tutors!";
          }
        });
    }
  }
}
</script>

<style>
button {
  background-color: #333;
  color: #fff;
  padding: 10px 15px;
  border: none;
}
</style>

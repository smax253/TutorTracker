<template>
  <ul
      v-model="mousedOver"
  >
    <li v-for="e in nearbyTutors" v-bind:value="e">
      <div class="tutor">
        <h3>{{ e.name }}</h3>
        <h4>{{ e.location }}</h4>
        <h4>{{ e.duration }}</h4>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TutorList",
  props: [
    "nearbyTutors"
  ],
  created() {
    console.log(this.nearbyTutors);
  },
  data() {
    return {
      mousedOver: "null"
    }
  }
}
</script>

<style scoped>
.tutor {
  background-image: url('../assets/logo.png');
  background-position: center top;
  background-size: cover;
}

.tutor h3 {
  position: absolute;
  top: 10px;
  left: 20px;
}

.tutor h4 {
  position: absolute;
  bottom: 15px;
  right: 10px;
}
</style>

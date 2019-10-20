<template>
  <ul
      v-model="mousedOver"
  >
    <li v-for="e in nearbyTutors" v-bind:value="e">
      <div class="tutor">
        <div>
          <img src='../assets/tutor-photo.jpg'>
        </div>
        <div class="info">
          <h3>{{ e.name }}</h3>
          <p>{{ e.location }}</p>
          <p>{{ e.duration }} away</p>
        </div>
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
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgrey;
}

.tutor img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.tutor div {
  display: inline-block;
  vertical-align: middle;
}

.tutor .info {
  padding-left: 10px;
  padding-right: 10px;
}

</style>

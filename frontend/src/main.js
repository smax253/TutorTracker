import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"

const secrets = require("./secrets.json")

Vue.use(VueGoogleMaps, {
  load: {
    key: secrets.key,
    libraries: "places"
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    var clientHeight = document.getElementById("q-app").clientHeight;
    console.log(clientHeight);
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
:root {
  --globa-height: 0;
}
.body--light {
  background: #f9f9f9;
}
</style>

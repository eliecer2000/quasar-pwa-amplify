<template>
  <q-layout view="lHh Lpr lFf" v-if="!user">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "OutLoginLayout",
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(
    //   "dfsasdf fdg sdfg ---------------------------------------------",
    //   this.user
    // );
  }
};
</script>

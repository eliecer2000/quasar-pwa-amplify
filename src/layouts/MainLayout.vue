<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/app/" label="Page One" />
        <q-route-tab to="/app/page2" label="Page Two" />
        <q-route-tab to="/app/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer
      side="left"
      behavior="mobile"
      elevated
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-header elevated>
        <q-toolbar> </q-toolbar>
      </q-header>
      <q-list>
        <q-item-label header class="text-grey-8">
          Panel Left
        </q-item-label>
      </q-list>
      <q-footer elevated style="text-align: center;">
        <q-btn
          size="10px"
          color="secondary"
          glossy
          class="q-ma-md self-center text-center"
          label="Cerrar Sesión"
          icon="exit_to_app"
          @click="signOut()"
        />
      </q-footer>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  name: "MainLayout",
  components: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false
    };
  },
  methods: {
    async signOut() {
      const self = this;
      await self.$Auth
        .signOut()
        .then(data => {
          console.log(data);
          self.$store.commit("setUser", null);
        })
        .catch(err => console.log(err));
      self.$router.push({ path: "/" });
    }
  },
  beforeCreate() {
    const self = this;
    this.$Auth
      .currentAuthenticatedUser()
      .then(user => {
        self.$store.commit("setUser", user);
      })
      .catch(() => {
        self.$store.commit("setUser", null);
      });
  }
};
</script>

<template>
  <q-page>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="reply"
          aria-label="Reply"
          v-go-back="'/'"
        />

        <q-toolbar-title>
          Ingresa tus datos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div
      class="col self-center offset-1 q-mx-auto q-mt-lg"
      style="overflow: auto;min-width: 90%; max-width: 90%;margin-top: 60px; position: relative;"
    >
      <q-input
        filled
        dense
        ref="input"
        clearable
        v-model="form.username"
        label="Telefono"
        mask="####-####"
        unmasked-value
        hint="Ej.: 6622-4488"
        :rules="[
          val => !!val || 'Campo requerido..',
          val => val.substring(0, 1) === '6' || 'Este no es un numero valido',
          val => val.length === 8 || 'Numero Telefonico Incorrecto..'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="account_circle" />
        </template>
      </q-input>
    </div>

    <div
      class="col self-center offset-1 q-mx-auto  q-mt-sm"
      style="overflow: auto;min-width: 90%; max-width: 90%;"
    >
      <q-input
        filled
        ref="input"
        dense
        clearable
        label="Contraseña"
        v-model="form.password"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => !!val || 'Campo requerido..',
          val => val.length > 6 || 'Su contraseña debe ser mas larga.'
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>

        <template v-slot:prepend>
          <q-icon name="https" />
        </template>
      </q-input>
    </div>

    <div
      class="col self-center offset-1 q-mx-auto  q-mt-sm"
      style="overflow: auto;min-width: 90%; max-width: 90%;"
    >
      <q-input
        filled
        ref="input"
        dense
        clearable
        label="Confirmación Contraseña"
        v-model="form.password2"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => !!val || 'Campo requerido..',
          val => val.length > 6 || 'Su contraseña debe ser mas larga.'
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>

        <template v-slot:prepend>
          <q-icon name="https" />
        </template>
      </q-input>
    </div>

    <div
      class="col self-center offset-1 q-mx-auto  q-mt-xs"
      style="overflow: auto;min-width: 90%; max-width: 90%; text-align:center;"
    >
      <q-btn
        color="primary"
        size="14px"
        glossy
        label="Registrarse"
        @click="signUp"
      />
    </div>
  </q-page>
</template>
<script>
import { QSpinnerGears } from "quasar";
export default {
  name: "PageLogin",
  data() {
    return {
      isPwd: true,
      form: {
        username: "",
        password: "",
        password2: ""
      }
    };
  },
  mounted() {
    /* This is for Codepen (using UMD) to work */

    console.log(" init del login ", this.$store.getters.user);
  },
  methods: {
    signUp() {
      const self = this;
      if (!self.form.username) {
        this.$q.dialog({
          title: "Error",
          message: "No hay datos en el usuario",
          ok: {
            push: true,
            color: "negative"
          },
          persistent: true
        });
        return;
      }
      if (!self.form.password) {
        this.$q.dialog({
          title: "Error",
          message: "No hay datos en la contraseña",
          ok: {
            push: true,
            color: "negative"
          },
          persistent: true
        });
        return;
      }
      if (self.form.password.trim() !== self.form.password2.trim()) {
        self.$q.dialog({
          title: "Error",
          message: "Contraseñas diferentes..",
          ok: {
            push: true,
            color: "negative"
          },
          persistent: true
        });
        return;
      }
      self.$q.loading.show({
        QSpinnerGears,
        spinnerColor: "white",
        messageColor: "white",
        backgroundColor: "primary",
        message: "Conectando"
      });
      const { username, password } = self.form;
      self.$Auth
        .signUp({
          username: `+507${username}`,
          password,
          attributes: { phone_number: `+507${username}` }
        })
        .then(result => {
          self.$q.loading.hide();
          return self.$q
            .dialog({
              message: "Usuario registrado con EXITO!",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            })
            .onOk(() => {
              self.$router.push("/");
            });
        })
        .catch(e => {
          console.log(e);
          self.$q.loading.hide();
          self.$store.commit("setUser", null);
          if (e.code === "UsernameExistsException") {
            return self.$q
              .dialog({
                title: "Error",
                message: "El usuario ya existe..",
                ok: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              })
              .onOk(() => {
                self.$router.push("/");
              });
          } else {
            return self.$q.dialog({
              title: "Error",
              message: "Error desconocido..",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
          }
        });
    }
  }
};
</script>

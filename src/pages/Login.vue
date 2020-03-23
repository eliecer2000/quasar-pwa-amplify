<template>
  <q-page class="">
    <div
      class="full-width full-height   column wrap justify-center content-center text-center"
    >
      <div
        class="col self-center offset-1 q-gutter-xs q-col-gutter-xs text-center"
        style="overflow: auto;min-width: 90%; max-width: 90%;"
      >
        <div class="titulo-40">Login Page</div>
      </div>
      <div
        class="col self-center offset-1 q-gutter-xs q-col-gutter-xs text-center"
        style="overflow: auto;min-width: 90%; max-width: 90%;"
      >
        <img alt="Quasar logo" :src="'statics/login.png'" width="50%" />
      </div>

      <div
        class="col self-center offset-1 q-gutter-xs q-col-gutter-xs"
        style="overflow: auto;min-width: 90%; max-width: 90%;"
      >
        <q-input
          filled
          dense
          ref="input"
          clearable
          v-model="username"
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
        class="col self-center offset-1 q-gutter-xs q-col-gutter-xs"
        style="overflow: auto;min-width: 90%; max-width: 90%;"
      >
        <q-input
          filled
          ref="input"
          dense
          clearable
          label="Contraseña"
          v-model="password"
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
        class="col self-center offset-1 q-gutter-xs q-col-gutter-xs"
        style="overflow: auto;min-width: 90%; max-width: 90%;"
      >
        <q-btn
          color="primary"
          size="14px"
          glossy
          label="Entrar"
          @click="signIn"
        />
      </div>
    </div>

    <div
      class="full-width column wrap justify-center content-center text-center pies"
    >
      <div
        class="col self-center"
        style="min-width: 90%; max-width: 90%;margin: 5px;height: 48px;"
      >
        <q-btn
          size="14px"
          color="secondary"
          glossy
          label="Regístrate"
          class="full-width"
          @click="inregistro"
        />
      </div>
      <div
        class="col self-center"
        style="min-width: 90%; max-width: 90%;margin: 5px;height: 48px;"
      >
        <q-btn
          size="14px"
          color="secondary"
          glossy
          class="full-width"
          label="Recuperar Contraseña"
          @click="inpassword"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "PageLogin",
  data() {
    return {
      isPwd: true,
      username: "",
      password: "",
      passUsername: ""
    };
  },
  mounted() {},
  methods: {
    signIn() {
      const self = this;
      if (!self.username) {
        self.$q.dialog({
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
      if (!self.password) {
        self.$q.dialog({
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
      self.$q.loading.show({
        spinnerColor: "white",
        messageColor: "white",
        backgroundColor: "primary",
        message: "Conectando"
      });
      self.$Auth
        .signIn({
          username: `+507${self.username.replace("-", "").trim()}`,
          password: self.password
        })
        .then(user => {
          self.$q.loading.hide();
          self.$store.commit("setUser", user);
          this.$router.push("/app");
        })
        .catch(err => {
          const self = this;
          console.log(err);
          self.$q.loading.hide();
          self.$store.commit("setUser", null);
          if (err.code === "NotAuthorizedException") {
            if (err.message === "User is disabled.") {
              return self.$q.dialog({
                title: "Error",
                message: "Usuario Bloqueado",
                ok: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              });
            } else {
              return self.$q.dialog({
                title: "Error",
                message: "Usuario / Contraseña Invalidos",
                ok: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              });
            }
          }
          if (err.code === "UserNotConfirmedException") {
            self.$store.commit(
              "usuario_a_verificar",
              `+507${self.username.replace("-", "").trim()}`
            );
            this.$router.push("/verify");
            // ir a la pagina de verificacion
          }
          if (err.code === "UserNotFoundException") {
            return self.$q.dialog({
              title: "Error",
              message: "Usuario NO existe",
              ok: {
                push: true,
                color: "negative"
              },
              persistent: true
            });
          }
        });
    },
    login() {
      this.$store.commit("setUser", true);
      this.$router.push("/app/");
    },
    inregistro() {
      this.$router.push("/register/");
    },
    inpassword() {
      const self = this;

      self.$q
        .dialog({
          title: "Recuperar Contraseña",
          message: "Debe colocar un número de teléfono válido",
          prompt: {
            model: self.passUsername,
            label: "Usuario",
            isValid: val => {
              if (val && val.substring(0, 1) === "6" && val.length === 8)
                return true;
              return false;
            }, // << here is the magic
            type: "text" // optional
          },
          ok: {
            push: true,
            color: "negative"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data_user => {
          self.$q
            .dialog({
              title: "Recuperar Contraseña",
              message: "Seleccione una de las dos opciones.",
              options: {
                type: "radio",
                model: "",
                items: [
                  {
                    label: "Solicitar contraseña",
                    value: "opt1",
                    color: "secondary"
                  },
                  {
                    label: "Verificar Codigo de recuperación",
                    value: "opt2",
                    color: "secondary"
                  }
                ]
              },
              cancel: true,
              persistent: true
            })
            .onOk(data => {
              switch (data) {
                case "opt1":
                  self.$Auth
                    .forgotPassword(`+507${data_user}`)
                    .then(data => {
                      self.$q.dialog({
                        title: "Correcto!",
                        message: `Metodo: ${data.CodeDeliveryDetails.DeliveryMedium} Destino : ${data.CodeDeliveryDetails.Destination}`
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      if (err.code === "LimitExceededException") {
                        self.$q.dialog({
                          title: "Error",
                          message: `Se excedio el limite de solicitudes`
                        });
                      }
                    });
                  break;
                case "opt2":
                  self.$q
                    .dialog({
                      title: "Codigo de Verificación",
                      message: "Debe colocar un número de Verificación válido",
                      prompt: {
                        model: "",
                        label: "Codigo",
                        isValid: val => {
                          if (val && val.length === 6) return true;
                          return false;
                        }, // << here is the magic
                        type: "text" // optional
                      },
                      ok: {
                        push: true,
                        color: "negative"
                      },
                      cancel: true,
                      persistent: true
                    })
                    .onOk(code => {
                      console.log(code, "*--->");
                      self.$q
                        .dialog({
                          title: "Nueva contraseña",
                          // message: "Debe colocar un número de Verificación válido",
                          prompt: {
                            model: "",
                            label: "Contraseña",
                            isValid: val => {
                              if (val && val.length > 6) return true;
                              return false;
                            }, // << here is the magic
                            type: "text" // optional
                          },
                          ok: {
                            push: true,
                            color: "negative"
                          },
                          cancel: true,
                          persistent: true
                        })
                        .onOk(new_password => {
                          console.log(
                            "Datos ",
                            `+507${data_user}`,
                            code,
                            new_password
                          );

                          self.$Auth
                            .forgotPasswordSubmit(
                              `+507${data_user}`,
                              code,
                              new_password
                            )
                            .then(data => {
                              self.$q.dialog({
                                title: "Correcto!",
                                message: `Contraseña actualizada con exito`
                              });
                            })
                            .catch(err => console.log(err));
                        });
                    });
                  break;
              }
            });
        });
    }
  }
};
</script>
<style>
.pies {
  top: 100px;
  position: relative;
  height: 100px !important;
}
</style>

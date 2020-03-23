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
          Verificar Usuario
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div
      class="col self-center offset-1 q-mx-auto q-mt-xs"
      style="overflow: auto;min-width: 90%; max-width: 90%;text-align: center;"
    >
      <div class="titulo-20">{{ verificaUsuario }}</div>
    </div>
    <div
      class="col self-center offset-1 q-mx-auto q-mt-xs"
      style="overflow: auto;min-width: 80%; max-width: 80%;"
    >
      <q-input
        filled
        ref="codigovalida"
        clearable
        v-model="codigoSeguridad"
        label="Codigo de seguridad"
        mask="# # # # # #"
        unmasked-value
        item-aligned
        autofocus
        input-style="font-size:40px;font-weight: bold;text-align: center;"
        hint="Ej.: 1 2 3 4 5 6"
        :rules="[
          val => !!val || 'Campo requerido..',
          val => val.length === 6 || 'Formato Incorrecto'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="https" />
        </template>
      </q-input>
    </div>
    <div
      class="col self-center offset-1 q-gutter-xs q-col-gutter-xs q-mx-auto q-mt-lg"
      style="overflow: auto;min-width: 90%; max-width: 90%; text-align: center;"
    >
      <q-btn
        v-if="verificaUsuario"
        color="primary"
        size="14px"
        glossy
        label="Enviar"
        @click="verifyCode"
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
      codigoSeguridad: ""
    };
  },
  computed: {
    verificaUsuario() {
      return this.$store.getters.verificaUsuario;
    }
  },
  mounted() {
    if (!this.verificaUsuario) {
      this.$router.push("/");
    }
  },
  methods: {
    requestCode() {
      const self = this;
      self.$Auth
        .resendSignUp(self.verificaUsuario)
        .then(() => {
          return self.$q
            .dialog({
              title: "Aviso",
              message: "Nuevo codigo solicitado",
              ok: {
                push: true,
                color: "positive"
              },
              persistent: true
            })
            .onOk(() => {
              self.$store.commit("setUser", null);
              self.$store.commit("usuario_a_verificar", null);
              self.$router.push("/");
            });
        })
        .catch(e => {
          console.log(e);
          return self.$q.dialog({
            title: "Error",
            message: "Hubo un error en la solicitud del codigo",
            ok: {
              push: true,
              color: "positive"
            },
            persistent: true
          });
        });
    },
    verifyCode() {
      const self = this;
      if (!self.$refs.codigovalida.validate()) {
        return self.$q
          .dialog({
            title: "Error",
            message: "Datos Incorrectos..",
            ok: {
              push: true,
              color: "positive"
            },
            persistent: true
          })
          .onOk(() => {
            console.log("le dio click");
            self.$refs.codigovalida.resetValidation();
            self.codigoSeguridad = "";
            self.$refs.codigovalida.focus();
          });
      }
      self.$q.loading.show({
        QSpinnerGears,
        spinnerColor: "white",
        messageColor: "white",
        backgroundColor: "primary",
        message: "Conectando"
      });
      self.$Auth
        .confirmSignUp(self.verificaUsuario, self.codigoSeguridad, {
          forceAliasCreation: true
        })
        .then(data => {
          self.$q.loading.hide();
          self.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          self.$q.loading.hide();
          if (err.code === "CodeMismatchException") {
            return self.$q.dialog({
              title: "Error",
              message: "Codigo de Verificación Invalido"
            });
          }
          if (err.code === "ExpiredCodeException") {
            return self.$q
              .dialog({
                title: "Error",
                message: "Codigo vencido, Debe solicitar uno nuevo",
                ok: {
                  push: true,
                  color: "positive",
                  label: "Solicitar"
                },
                cancel: {
                  push: true,
                  color: "negative"
                },
                persistent: true
              })
              .onOk(() => {
                self.requestCode();
              })
              .onCancel(() => {
                console.log("le dio click a cancelar");
              });
          }
        });
    }
  }
};
</script>
<style>
.q-field__control {
  height: 100px;
  max-width: 100%;
}
</style>

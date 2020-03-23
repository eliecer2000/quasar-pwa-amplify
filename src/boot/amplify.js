import Auth from "@aws-amplify/auth";
import API, { graphqlOperation } from "@aws-amplify/api";

import AwsExports from "../aws-exports";
Auth.configure(AwsExports);

export default async ({ router, Vue }) => {
  Vue.prototype.$Auth = Auth;
  Vue.prototype.$API = API;
  Vue.prototype.$graphqlOperation = graphqlOperation;

  await router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      let user;
      Vue.prototype.$q.loading.show({
        spinnerColor: "white",
        messageColor: "white",
        backgroundColor: "primary",
        message: "Conectando"
      });
      Vue.prototype.$Auth
        .currentAuthenticatedUser({ bypassCache: true })
        .then(data => {
          Vue.prototype.$q.loading.hide();
          if (data && data.signInUserSession) {
            user = data;
          }
          next();
        })
        .catch(e => {
          next({
            path: "/"
          });
          Vue.prototype.$q.loading.hide();
        });
    }
    next();
  });
};

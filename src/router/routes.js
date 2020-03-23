import store from "./../store/index";

function limpiarData(to, from, next) {
  const user = store.state.user;
  if (!user) {
    next();
  } else {
    store.commit("setUser", false);
    next("/");
  }
}

const routes = [
  {
    path: "/",
    component: () => import("layouts/OutLoginLayout.vue"),
    beforeEnter: limpiarData,
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "register",
        component: () => import("pages/Register.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "verify",
        component: () => import("pages/Verify.vue"),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: "/app/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "password",
        component: () => import("pages/Password.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "page2",
        component: () => import("pages/page2.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "page3",
        component: () => import("pages/page3.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];
// Always leave this as last one
// if (process.env.MODE !== "ssr") {
//   routes.push({
//     path: "*",
//     component: () => import("pages/Error404.vue")
//   });
// }

export default routes;

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: ["amplify"],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.css"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // "roboto-font", // optional, you are not bound to it
      "material-icons" // optional, you are not bound to it
    ],
    vendor: {
      // disable: true,
      add: [],
      remove: []
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {
        brand: {
          primary: "#002642",
          secondary: "#840032",
          accent: "#e59500",

          dark: "#02040f",

          positive: "#098526",
          negative: "#b80419",
          info: "#1c889e",
          warning: "#d17a47"
        }
      },
      iconSet: "material-icons", // Quasar icon set
      lang: "es", // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: "auto",
      // autoImportComponentCase: "pascal",
      components: [],
      directives: ["GoBack", "ClosePopup"],
      plugins: ["Dialog", "Loading"]
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: "history", // available values: 'hash', 'history'

      // rtl: false, // https://quasar.dev/options/rtl-support
      showProgress: true,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      preloadChunks: true,
      extractCSS: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      uglifyOptions: {
        compress: {
          arrows: true,
          collapse_vars: true,
          comparisons: true,
          computed_props: true,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          inline: false,
          loops: true,
          negate_iife: false,
          properties: false,
          reduce_funcs: true,
          reduce_vars: true,
          switches: true,
          toplevel: false,
          typeofs: false,
          booleans: true,
          if_return: true,
          sequences: true,
          unused: true,
          conditionals: true,
          dead_code: true,
          evaluate: true
        }
      },

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg, { isServer, isClient }) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules|quasar)/,
          options: {
            formatter: require("eslint").CLIEngine.getFormatter("stylish")
          }
        });

        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(mjs|gql|graphql)$/,
          // loader: "eslint-loader",
          include: /(node_modules)/,
          type: "javascript/auto"
          // options: {
          //   formatter: require("eslint").CLIEngine.getFormatter("stylish")
          // }
        });
        // cfg.module.rules.push({
        //   // enforce: "pre",
        //   test: /\.(png|svg|jpg|gif)$/,
        //   loader: "file-loader"
        //   // include: /(node_modules)/,
        //   // type: "javascript/auto"
        //   // options: {
        //   //   formatter: require("eslint").CLIEngine.getFormatter("stylish")
        //   // }
        // });
        cfg.optimization.minimize = true;

        cfg.optimization.splitChunks.chunks = "all";
        cfg.optimization.splitChunks.minSize = 500000;
        cfg.optimization.splitChunks.maxSize = 800000;
        cfg.optimization.splitChunks.minChunks = 10;
        cfg.optimization.splitChunks.maxAsyncRequests = 5;
        cfg.optimization.splitChunks.maxInitialRequests = 10;
        cfg.optimization.splitChunks.automaticNameDelimiter = "-";
        cfg.optimization.splitChunks.automaticNameMaxLength = 30;
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true
        // debug: false
      }, // only for GenerateSW
      manifest: {
        name: "Quasar App",
        short_name: "Quasar App",
        description: "A Quasar Framework app",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          // {
          //   src: "statics/icons/icon-128x128.png",
          //   sizes: "128x128",
          //   type: "image/png"
          // },
          {
            src: "statics/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          // {
          //   src: "statics/icons/icon-256x256.png",
          //   sizes: "256x256",
          //   type: "image/png"
          // },
          // {
          //   src: "statics/icons/icon-384x384.png",
          //   sizes: "384x384",
          //   type: "image/png"
          // },
          {
            src: "statics/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: "org.cordova.quasar.app"
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "plantilla-onsenui-vue"
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  };
};

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-demo",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["ant-design-vue/dist/antd.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/antd"],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,
  ssr: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/i18n"],
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "vi",
        file: "vi.json",
      },
      {
        code: "jp",
        file: "jp.json",
      },
    ],
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
    },
    strategy: "no_prefix",
    vueI18n: {
      fallbackLocale: "vi",
    },
    defaultLocale: "vi",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

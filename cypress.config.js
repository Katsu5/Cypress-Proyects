const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("cypress-audit");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: true,
    baseUrl: "https://www.saucedemo.com/",

    setupNodeEvents(on, config) {

      // 🔧 Configuración necesaria para Lighthouse
      on("before:browser:launch", (browser = {}, launchOptions) => {
        return prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });

      return config;
    },
  },
});

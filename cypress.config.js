const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: "http://sdetchallenge.fetch.com/",
    },
   pageLoadTimeout: 20000,
   defaultCommandTimeout: 10000,
   retries: {
    runMode: 2,
    openMode: 2
   }
  },
});

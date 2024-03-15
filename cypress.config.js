module.exports = {
  defaultCommandTimeout: 40000,
  pageLoadTimeout: 20000,
  chromeWebSecurity: false,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  video: false,
  blockHosts: ['*.googletagmanager.com'],
  env: {
    FEATURE_FLAGS: '',
    TAGS: 'not(@ignore) and @nu',
    STAGS: 'not(@ignore)',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://frontend.staging.sduconnect.nl',
    //baseUrl: 'http://upgrade.frontend.staging.sduconnect.nl',
	specPattern: ['cypress/e2e/**/*.feature', 'cypress/e2e/*spec.js']
  },
  "htmlreportsFolder": "reports",
  "screenshotsFolder": "cypress/screenshots"
}

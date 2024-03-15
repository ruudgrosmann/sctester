const report = require("multiple-cucumber-html-reporter");
report.generate( {
	jsonDir: "cypress/cucumber-json",
	// ** Path of .json file **//
	reportPath: "./reports/cucumber-htmlreport.html",
    useCDN: true,
	metadata: {
		browser: { name: "Electron", version: "114", },
		device: "Local test machine",
		platform: { name: "linux", version: "bullseye", },
	},
});

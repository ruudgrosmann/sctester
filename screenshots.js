const report = require("multiple-cucumber-html-reporter");
const fs = require("fs-extra");
const path = require("path");

const data = require ('./cypress.config.js');

const cucumberJsonDir = path.resolve(process.cwd(), "cypress/cucumber-json");
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
const htmlReportDir = path.resolve(process.cwd(), data['htmlreportsFolder']);
const screenshotsDir = path.resolve(process.cwd(), data['screenshotsFolder']);

getCucumberReportMaps();
addScreenshots();
generateReport();

function getCucumberReportMaps() {
  filenames = fs.readdirSync(cucumberJsonDir);
  const files = fs.readdirSync(cucumberJsonDir).filter((file) => {
    return file.indexOf(".json") > -1;
  });
  files.forEach((file) => {
    const json = JSON.parse(fs.readFileSync(path.join(cucumberJsonDir, file)));
    if (!json[0]) {
      return;
    }
    const [feature] = json[0].uri.split("/").reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  });
}

function addScreenshots() {
  if (fs.existsSync(screenshotsDir)) {
    //only if screenshots exists
    const prependPathSegment = (pathSegment) => (location) =>
      path.join(pathSegment, location);

    const readdirPreserveRelativePath = (location) =>
      fs.readdirSync(location).map(prependPathSegment(location));

    const readdirRecursive = (location) =>
      readdirPreserveRelativePath(location).reduce(
        (result, currentValue) =>
          fs.statSync(currentValue).isDirectory()
            ? result.concat(readdirRecursive(currentValue))
            : result.concat(currentValue),
        []
      );

    const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(
      (file) => {
        return file.indexOf(".png") > -1;
      }
    );

    const featuresList = Array.from(
      new Set(screenshots.map((x) => x.match(/[\w-_.]+.feature/g)[0]))
    );

    featuresList.forEach((feature) => {
		//console.log (`ik zie ${feature}`);
      screenshots.forEach((screenshot) => {
		console.log (`screenshot ${screenshot}`);
        const regex = /(?<=--\ ).+?((?=\ (example\ #\d+))|(?=\ (failed))|(?=.\w{3}))/g;
        const [scenarioName] = screenshot.match(regex);

        var filename = screenshot.replace(/^.*[\\\/]/, "");

        const featureSelected = cucumberReportMap[feature][0];

        let myScenarios = [];

		/*
			hier gaat het mis wegens dubbel quotes in de filenaam:
filename tsc002 customer Cypress_LRD_RO, account autotest_account1 -- 2.3 overzicht (failed).png
fullfilename tsc002: customer "Cypress_LRD_RO", account "autotest_account1" -- 2.12.3 VAC's exporteren
filename tsc002 customer Cypress_LRD_RO, account autotest_account1 -- 2.3 overzicht (failed).png
*/
        cucumberReportMap[feature][0].elements.forEach((item) => {
          //let fullFileName = featureSelected.name + " -- " + item.name;
          let fullFileName = featureSelected.name.replace(/[:\"]/g, '') + " -- " + item.name;
          if (filename.includes(fullFileName)) {
			//console.log (`push scenario ${item}`);
            myScenarios.push(item);
          }
        });

        if (!myScenarios) {
          return;
        }
        let foundFailedStep = false;
        myScenarios.forEach((myScenario) => {
			//console.log (`scenario ${myScenario}`);
          if (foundFailedStep) {
            return;
          }
          let myStep;
          if (screenshot.includes("(failed)")) {
			//console.log (`failed`);
            myStep = myScenario.steps.find(
              (step) => step.result.status === "failed"
            );
          } else {
			//console.log (`passed`);
            myStep = myScenario.steps.find(
              (step) => step.result.status === "passed"
            );
          }
          if (!myStep) {
            return;
          }
		//console.log (`hier ${foundFailedStep}`);
          const data = fs.readFileSync(path.resolve(screenshot));
          if (data) {
            const base64Image = Buffer.from(data, "binary").toString("base64");
            if (!myStep.embeddings) {
              myStep.embeddings = [];
              myStep.embeddings.push({
                data: base64Image,
                mime_type: "image/png",
                name: myStep.name,
              });
              foundFailedStep = true;
            }
          }
		//console.log (`hier2 ${foundFailedStep}`);
        });
        //Write JSON with screenshot back to report file.
        fs.writeFileSync(
          path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
          JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
        );
      });
    });
  }
}

function generateReport() {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn("REPORT CANNOT BE CREATED!");
  } else {
    report.generate({
      jsonDir: cucumberJsonDir,
      reportPath: htmlReportDir,
      displayDuration: true,
      useCDN: true,
//      pageTitle: "Simulacion de Credito Online",
//     reportName: `Simulacion de Credito Online - ${new Date().toLocaleString()}`,
     metadata: {
//        app: {
//          name: "Simulacion de Credito Online",
//          version: "1",
//        },
		browser: { name: "Electron", version: "114", },
		device: "local test machine",
		platform: { name: "linux", version: "focal", },
      },
      customData: {
        title: "Run info",
        data: [
//          { label: "Project", value: "Simulacion de Credito" },
          { label: "Release", value: "1" },
          {
            label: "Execution Start Time",
            value: `${new Date().toLocaleString()}`,
          },
          {
            label: "Execution End Time",
            value: `${new Date().toLocaleString()}`,
          },
        ],
      },
    });
  }
}

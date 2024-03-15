/* zeer simpele server die op /htmlreport het htmlrapport
 * van de laatste run laat zien */

const fs = require("fs-extra");
const http = require("http");

const host = 'localhost';
const port = 7000;

const data = require ('./cypress.config.js');

const requestListener = function (req, res) {
	let html = '<HTML><body><h1>onbekend</h1></body></HTML>';


	switch(req.url) {
		case '/htmlreport':
			html = fs.readFileSync( data['htmlreportsFolder'] +  '/index.html');
			break;
		case '/test':
			html ='<HTML><p>Dit is een test</p></HTML>';
			break;
		case '/formulier':
			html = fs.readFileSync( `${__dirname}/formulier.html`);
			break;
		default:
			html = '<HTML><body><h1>niet bekend</h1></body></HTML>';
	};
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.end(html);
} 


console.log ('screenshots in ' + data['screenshotsFolder']);
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/document';

/* verplaatst van e2e.js naar hier, om de mogelijkheid te creeren om 
 * per featurebestand in te loggen met een andere gebruiker.
 */
before(() => {
    cy.clearLocalStorageSnapshot();
    cy.log('ga inloggen');
    cy.login();
    cy.saveLocalStorage();
    cy.log('klaar met inloggen');
});

When('my name is ruud', () => {
	console.error( 'ruud');
});

When('I manually mock the announcements', () => {
	// niet met een fixture, maar met handmatig veranderen van de body van de
	// response.
	cy.intercept('GET', '/announcement', (req) => {
        req.continue((res) => {
            //console.log (`res is ${JSON.stringify(res)}`);
            
            res.body.pop();
            while(res.body.length > 0) { res.body.pop(); }
            
            res.body = [
				{	"id": "40",
					"message": "<p>Dit is een <b>tijdelijk bericht</b></p>\n",
					"name": "testdata" }
			];
        })
	}).as ('anmock');
	cy.visit('/');
	cy.get('svg.p-progress-spinner-svg').should('not.exist');
	cy.wait('@anmock');
});

When('I mock the announcements', () => {
	cy.intercept('GET', '/announcement', (req) => {
		console.log(`request is ${JSON.stringify(req)}`);
		req.reply( {
			fixture: 'announcements'
		});
	}).as ('anmock');
	cy.visit('/');
	cy.get('svg.p-progress-spinner-svg').should('not.exist');
	cy.wait('@anmock');
});

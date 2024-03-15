import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/customParameterTypes';
import '../common/tsc';

/* verplaatst van e2e.js naar hier, om de mogelijkheid te creeren om 
 * per featurebestand in te loggen met een andere gebruiker.
 */

before (() => {
	cy.customer_login( "Cypress_LRD_RO", "autotest_account1");
});

Then ("I test nothing", () => {
	expect(true).to.be.true;
});

Then ("I should see {string} in linkchecker section {string}", (zoek, kop) => {
	// zoek naar de juiste kop en daarna in de tabel volgend op die kop-div
	cy.get(`div>strong:contains("${kop}")`).parent().next('tr').within( () => {
		cy.get('td').contains (zoek);
	});
});

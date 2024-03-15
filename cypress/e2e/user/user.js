import { Then, When } from 'cypress-cucumber-preprocessor/steps';
//import '../common/document';
import '../common/customParameterTypes';

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

When('I switch to account {string}', (account) => {
	cy.get(`account-picker .p-inputtext`).click().type (account)
			.then (() => {
				cy.get (".p-autocomplete-panel li").first().click();
				});
	cy.waitOnLoadingIcon();
});
When('I close the current account', () => {
	// klik op het kruisje in de account-picker
	cy.get(`account-picker .pi-times`).click( {force: true})
});



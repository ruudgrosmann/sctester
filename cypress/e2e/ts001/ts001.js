import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/customParameterTypes';
import '../common/tsc';

/* verplaatst van e2e.js naar hier, om de mogelijkheid te creeren om 
 * per featurebestand in te loggen met een andere gebruiker.
 */

before (() => {
	cy.customer_login( "Cypress_LRD_RO", "autotest_account2");
});


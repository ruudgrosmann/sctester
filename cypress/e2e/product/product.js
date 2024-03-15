import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/menu';
import '../common/document';
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

When('I click product collection {string}', (colnaam) => {
	cy.get(`div.p-datatable a:contains("${colnaam}")`).click()
	cy.waitOnLoadingIcon();
});

When('I click product {string}', (prodnaam) => {
	cy.get(`div.p-component product-name>a:contains("${prodnaam}")`).click()
	cy.waitOnLoadingIcon();
});

Then('it should have status {string}', (status) => {
	cy.get(`div.current-status span`).should ( 'have.text', status);
});

When('I select tab {string}', (tabnaam) => {
	cy.get(`div.p-tabview span.p-tabview-title:contains("${tabnaam}")`).click()
	cy.waitOnLoadingIcon();
});

Then ('I {optniet}see {relationtype} relation {string}',
												(occ, type, prodnaam) => {
	let testcriterium = (occ ? 'not.exist' : 'exist');
	cy.log (`type <${type}>`);
	let formnaam = (type === 'VAC' ? 'related-qas' : 'related-products');
	cy.log (`test ${testcriterium}`);
	cy.get(`product-form-${formnaam} tbody.p-datatable-tbody a:contains("${prodnaam}")`).as('hit').should(testcriterium);
});

Then (/^this VAC relation is (uni|bi)-directional/, (richting) => {
	let aantal = (richting === 'bi' ? 2 : 1);
	cy.get('@hit').parent().parent().find( 'i.pi').then (($hits) => {
			//cy.wrap ($hits).its ('length').should ('equal', aantal);
			cy.wrap ($hits).should('have.length', aantal)
		});
});

Then (/^this product relation is (uni|bi)-directional/, (richting) => {
	let aantal = (richting === 'bi' ? 2 : 1);
	cy.get('@hit').parent().parent().find( 'i.pi').then (($hits) => {
			//cy.wrap ($hits).its ('length').should ('equal', aantal);
			cy.wrap ($hits).should('have.length', aantal)
		});
});

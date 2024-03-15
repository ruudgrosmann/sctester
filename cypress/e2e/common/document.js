import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/customParameterTypes'


Then('I should see {string}', (str) => {
  cy.get('div.mainContent').contains(str);
});

When('I open the home page', () => {
    cy.visit('/');
    cy.get('div.mainContent');
});

Then ('Idisabled {optniet}see {relationtype} relation {string}',
												(occ, type, prodnaam) => {
	let testcriterium = (occ ? 'not.exist' : 'exist');
	let formnaam = (type === 'VAC' ? 'related-qas' : 'qa-related-products');
	cy.get(`qa-form-${formnaam} tbody.p-datatable-tbody a:contains("${prodnaam}")`).as('hit').should(testcriterium);
});

Then (/^this (?:VAC|product) relation is (uni|bi)-directional/, (richting) => {
	let aantal = (richting === 'bi' ? 2 : 1);
	cy.get('@hit').parent().parent().find( 'i.pi').then (($hits) => {
			//cy.wrap ($hits).its ('length').should ('equal', aantal);
			cy.wrap ($hits).should('have.length', aantal)
		});
});

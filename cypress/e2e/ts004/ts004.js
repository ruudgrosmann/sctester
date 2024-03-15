import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import IconProps from '../common/icons';
import '../common/customParameterTypes';
import '../common/tsc';

before (() => {
});

var ruud = {"init": 1};
Then ("this product has a {icontype} icon", (icontype) => {
	let [ikoon, kleur] = (new IconProps).fields(icontype);
	cy.log(` zoek naar ${ikoon}`);
	cy.get('@foundrow').find ('product-name i').should ('have.css',
			'color').and('equal', kleur);
});

Then ("this product has {optniet}version number {string}", (occ, versie) => {
	cy.get('@foundrow').find ('product-name a').should('have.attr', 'href')
		.and ((occ ? 'not.' : '') + 'contain', 'versions/' + versie);
});

When ("I create a publication ready product {string} in local collection {string}", (prodnm, colnm) => {
	cy.zorg_voor_produkt_in_collectie (colnm, prodnm, true, {
												toekomst: true,
												status: 'Publicatiegereed'});
});

When ("I change the kosten field of this product", () => {
	cy.get('@foundrow').find ('td').eq(2).find ('rich-text-input')
		.click().then(() => {
			cy.getIframeBody().find ('p')
				.click().type('{moveToStart}Cypress-test:');
/*
			.then (() =>
			{
			    cy.get( '.p-card-content button:contains("Opslaan")')
				.click();
			});
*/
		})
});

When ("I change the date field of this product to a future date", () => {
	cy.get('@foundrow').find ('p-calendar#published_from input')
		.click().type('{selectAll}{del}12-12-2044');
});

When ("I change the memo field to {string}", (nwetekst) => {
	cy.get('p-tabpanel[header="Memo"] textarea').click().type('{selectAll}{del}' + nwetekst);
});


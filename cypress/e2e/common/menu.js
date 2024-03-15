import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import IconProps from '../common/icons';
import '../common/customParameterTypes'

When('I open {string} of menu item {string}', (submenunaam, menunaam) => {
    cy.visit('/');
	cy.get(`li.p-submenu-header>span:contains("${menunaam}")`
		).click({ force: true}).then( ($mi) => {
			cy.wrap($mi).parent().find (`a.p-menuitem-link:contains("${submenunaam}")`).click({ force: true});
		});
});

When('I click menu item {string}', (menunaam) => {
	cy.get(`.p-menuitem-link>span:contains("${menunaam}")`).click();
});

Then('I should see menu item {string}', (menunaam) => {
	cy.get(`li.p-submenu-header>span`).should ('contain', menunaam);
});

Then('I should see collection {string} in {string}', (colnaam, header) => {
	cy.get(`p-card[header="${header}"] a:contains("${colnaam}")`)
		.parent().parent().as ('coltr')
});

Then('I should see sdu collection {string}', (colnaam) => {
	cy.get(`p-table a:contains("${colnaam}")`)
		.parents('tr').as ('coltr')
});

When('I click this collection', () => {
    cy.get('@coltr').find('a').first().click()
});

Then('I should see sdu product {string}', (prodnaam) => {
	// neem de ancestor met elementnaam tr, ofwel parent.parent.parent
	cy.get(`product-name a:contains("${prodnaam}")`)
		.parents('tr').as ('prodtr')
});

Then('this collection has status {string}', (statusstring) => {
	// neem vierde td en controleer inhoud.
    cy.get('@coltr').find(`td`).eq(3).should ('contain', statusstring)
});

Then('this collection has {optniet}a {icontype} icon', (occ, icontype) => {
	// Bij deze test, kijk ik of het ikoontje het goede karakter heeft EN
	// de kleur klopt.
	let [ikoon, kleur] = (new IconProps).fields(icontype);
    cy.log(` zoek naar ${ikoon}`);
	cy.get('@coltr').within(() => {
		cy.get('td:eq(0) i').should("have.length.gte", 0).then (($hits) => {
			cy.log ('aantal hits: ' + $hits.length)
			if (occ && ($hits.length == 0)) {
				cy.log ('geen hits OK');
				cy.wrap (true);
			}
			else {
				cy.log ('wel hits. testen....');
				cy.wrap($hits).before('content').should (
					(occ ? 'not contain' : 'contain'), ikoon);
				cy.wrap($hits).should('have.css',
							'color').and('equal', kleur);
	
			}
		});
	});
});

Then('this product has {optniet}a {icontype} icon', (occ, icontype) => {
	// Bij deze test, kijk ik of het ikoontje het goede karakter heeft EN
	// de kleur klopt.
	let [ikoon, kleur] = (new IconProps).fields(icontype);
	cy.get('@prodtr').within(() => {
		cy.get('i').should("have.length.gte", 0).then (($hits) => {
			cy.log ('aantal hits: ' + $hits.length)
			if (occ && ($hits.length == 0)) {
				cy.log ('geen hits OK');
				cy.wrap (true);
			}
			else {
				cy.log ('wel hits. testen....');
				cy.wrap($hits).before('content').should (
					(occ ? 'not.contain' : 'contain'), ikoon);
				cy.wrap($hits).should('have.css',
							'color').and('equal', kleur);
			}
		});
	});
});

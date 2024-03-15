import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/menu';
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

When('I click VAC collection {string}', (colnaam) => {
	cy.get(`div.p-datatable a:contains("${colnaam}")`).click()
	cy.waitOnLoadingIcon();
});

When('I click VAC {string}', (prodnaam) => {
	cy.get(`div.p-component qa-name>a:contains("${prodnaam}")`).click()
	cy.waitOnLoadingIcon();
});

When('I select tab {string}', (tabnaam) => {
	cy.get(`div.p-tabview span.p-tabview-title:contains("${tabnaam}")`).click()
	cy.waitOnLoadingIcon();
});

Then ('I {optniet}see {relationtype} relation {string}',
												(occ, type, prodnaam) => {
	let testcriterium = (occ ? 'not.exist' : 'exist');
	let formnaam = (type === 'VAC' ? 'related-qas' : 'qa-related-products');
	cy.get(`qa-form-${formnaam} tbody.p-datatable-tbody a:contains("${prodnaam}")`).as('hit').should(testcriterium);
});

// deze verschilt van die voor producten in de prefix van de form-naam
Then('I {optniet}see {int} {relationtype} relation(s)',
												(occ, aantal, type) => {
	let formnaam = (type === 'VAC' ? 'related-qas' : 'qa-related-products');
	//cy.log (`test ${formnaam}`);
	if (aantal == 0) {
		cy.get(`qa-form-${formnaam} tbody.p-datatable-tbody tr`).should ('contain', 'Geen gerelateerde');
	} else{
		// tel aantal trash buttons voor VAC's
		cy.get(`qa-form-${formnaam} tbody.p-datatable-tbody .pi-trash`)
			.should('have.length', parseInt(aantal));
	}
});

When ('I remove all {relationtype} relations', (type) => {
	let formnaam = (type === 'VAC' ? 'related-qas' : 'qa-related-products');
	let selector = `qa-form-${formnaam} tbody.p-datatable-tbody .pi-trash`;
	cy.get('body')
		.then(($body) => {
			cy.wrap ( $body.find(selector).length > 0)
		  })
		.then((found) => {
			if (found) {
				cy.get(selector).each (($button, index, $bts) => {
					cy.log (`remove button ${index}`);
					cy.wrap( $button).click().then (() =>
						{
							if (type === 'product') {
								cy.log ('product');
								cy.get( 'button.p-confirm-dialog-accept').click();

							}
						})
				})
			} else {
				cy.log ('no found');
				cy.wrap (false)
			}
		})
		.then ((f) => {
			cy.get (`button:contains("Sla ${type}-relaties op")`)
				.click()
		}).then (() => {
			cy.get('span.pi-spinner').should('not.exist');
		});
});

When (/^I add (uni|bi)-directional (VAC|product) relation "([^\"]*)"$/,
												(richting, type, naam) => {
	let formnaam = (type === 'VAC' ? 'related-qas' : 'qa-related-products');
	cy.wrap (richting)
		.then ( (r) => {
				// als de richting bi-directional is, staat de radiobutton
				// default al goed, anders eerst de unidirection-radiobutton
				// klikken.
				if (r === 'uni') {
					cy.log ('unidirectional');
					cy.get (`qa-form-${formnaam} label.p-radiobutton-label`)
						.last().click();
				} else
				{
					cy.log ('bidirectional');
				}
			})
	.then ( () => {
		cy.get (`qa-form-${formnaam} .p-inputtext`).last().type (naam)
			.then (() => {
				cy.get (".p-autocomplete-panel li").first().click();
				})
			.then (() => {
				cy.get (`button:contains("Sla VAC-relaties op")`).click();
			});
		});
});

Then (/^xthis (?:VAC|product) relation is (uni|bi)-directional/, (richting) => {
	let aantal = (richting === 'bi' ? 2 : 1);
	cy.get('@hit').parent().parent().find( 'i.pi').then (($hits) => {
			//cy.wrap ($hits).its ('length').should ('equal', aantal);
			cy.wrap ($hits).should('have.length', aantal)
		});
});

import '../../node_modules/cypress-wait-until';
import '../../node_modules/cypress-localstorage-commands';

//import { destroyCookie, setCookie } from '../../src/helpers/cookies';
//import staticSiteConfig from '../../src/helpers/staticSiteConfig';

var ruud = {"init": 1};

Cypress.Commands.add('getByTestIdEndsWith', (value, options) => {
  return cy.get(`[data-test-id$=${value}]`, options);
});

Cypress.Commands.add(
  // for loading iframes
  'iframe',
  { prevSubject: 'element' },
  ($iframe) => {
    return new Cypress.Promise(resolve => {
      $iframe.on('load', () => {
        resolve($iframe.contents().find('body'));
      });
    });
  });

Cypress.Commands.add('customer_login', (customername,
										accountname = undefined) => {
	cy.log('doe klant-login');
	const cookies = [];
	//const cookies = ['JSESSIONID'];
	cookies.forEach(element => cy.clearCookie(element));
	cy.visit('/nl/users/login');
	cy.get('.main').contains('Gebruikersnaam of');
	cy.get('input#username')
		.waitUntilDomAttached()
		.type(customername);
	cy.get('input#password')
		.waitUntilDomAttached()
		.type(Cypress.env( 'TESTUSER_PWD'));
	cy.get('button').contains('Log in').click().then (() => {
		if (accountname) {
			cy.get(`p-dropdown#account`).click().then (() => {
				cy.get( 'li.p-dropdown-item').contains (accountname).click();
				cy.get('button').contains('Doorgaan met').click();
			});
		}
	});
	cy.get('div.mainContent').waitUntilDomAttached();
	cy.saveLocalStorage();
	cy.log('klaar met klant-login')
});

Cypress.Commands.add('waitOnLoadingIcon', () => {
  cy.get('svg circle')
    .should('not.exist');
  cy.get('.pi-spinner')
    .should('not.exist');
});

/* aliases zijn binnen een scenario te lezen en gebruiken, maar ze overleven
	scenariogrenzen niet. Sla daarom expliciet dit soort aliases op in een
	json-file en lees ze voor gebruik weer in.

bijvoorbeeld
	scenario 1:  zet alias en sla op voor gebruik in ander scenario
		cy.storeState('is_admin', (account ? false : true));
		cy.wrap((account ? false : true)).as ('is_admin');

	scenario 2: herstel expliciet de aliaswaarde voor gebruik
		cy.readState('is_admin');
		cy.get('@is_admin').then( (b) => {
			cy.log(`admin is ${b}`) ....
*/
Cypress.Commands.add('readState', (str) => {
	let fixturefile = `cypress/data/states.json`;
	cy.exec( `[ -f '${fixturefile}' ] && echo "file exists"`,
				{failOnNonZeroExit: false} ).then( (res) => {
		if( res.stdout === 'file exists' ) {
			//cy.log ('is er');
		} else  {
			cy.log ('is er niet maak aan.');
			cy.writeFile(fixturefile, `{"nieuw": 1}`)
		}
		cy.readFile(fixturefile, (err, data) => {
			if (err) {
				return cy.error(err);
			};
		}).then ((data) => {
			cy.log (`herstel opgeslagen aliaswaarde voor ` + data[str]);
			cy.wrap(data[str]).as(str);
		});
	});
});
Cypress.Commands.add('storeState', (str, val) => {
	let fixturefile = `cypress/data/states.json`;
	cy.readFile(fixturefile, (err, data) => {
		if (err) {
			return cy.error(err);
		};
	}).then ((data) => {
		cy.log ('wrap ' + data[str]);
		data[str] = val
		cy.writeFile(fixturefile, data)
	});
});

Cypress.Commands.add('overwrite', (rec) => {
	let fixturefile = `cypress/data/states.json`;
	cy.writeFile(fixturefile, rec)
});

Cypress.Commands.add('waitUntilDomAttached', { prevSubject: 'optional' },
  (element, selector) => {
    cy.waitUntil(() =>
      Cypress.dom.isAttached(Cypress.$(selector || element.selector)),
    { timeout: 1000, interval: 10 },
    );

    return cy.get(selector || element.selector);
});

function unquote(str) {
    return str.replace(/(^")|("$)/g, '');
}

Cypress.Commands.add('mbefore', { prevSubject: 'element' },
    (el, property) => {
        const win = el[0].ownerDocument.defaultView;
        const before = win.getComputedStyle(el[0], 'before');
        return unquote(before.getPropertyValue(property));
    },
);

Cypress.Commands.add('getIframeBody', () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy.get('editor iframe')
	  .its('0.contentDocument.body').should('not.be.empty')
	  // wraps "body" DOM element to allow
	  // chaining more Cypress commands, like ".find(...)"
	  // https://on.cypress.io/wrap
	  .then(cy.wrap)
})

Cypress.Commands.add('registreer_collectie', (colnaam, lokaal) => {
	let locatie = (lokaal ? 'p-card[header="Mijn collecties"]'
							: '.p-datatable-tbody');
	let admin = (lokaal ? '' : '/admin') ;
	cy.visit(`/nl${admin}/products/collections`)
	cy.waitOnLoadingIcon();
	cy.get(`${locatie} a:contains('${colnaam}')`).first().click();
	// wacht op nieuwe pagina; zonder de should vuurt
	// url () voordat de pagina actief is
	cy.url().should ('contain', 'collections/');
	cy.url().then ((res) => {
		cy.log ('url van collectie is ' + res);
		let hits = res.match (/collections\/(\d+)/);
		ruud[`collection_${colnaam}`] = {"id":		hits[1]};
		cy.writeConfig();
	});
});

// zorg_voor_collectie (): zorg dat opgegeven lokale of sdu-collectie er
// is. Als hij er is, doe niets, maak anders aan.
// parameters: - naam van collectie
//             - boolean die aangeeft of het lokaal is of niet
/////////////////
Cypress.Commands.add('zorg_voor_collectie', (colnaam, lokaal) => {
    let fixturefile = `cypress/data/config.json`;
	let locatie = (lokaal ? 'p-card[header="Mijn collecties"]'
							: '.p-datatable-tbody');
	let admin = (lokaal ? '' : '/admin') ;
	let toevoegbuttontekst = (lokaal ? 'Nieuw product' : 'Voeg Sdu-collectie') ;
	cy.visit(`/nl${admin}/products/collections`)
	cy.get('div.mainContent').contains('Sdu-collecties')
	cy.get(`${locatie} a:contains('${colnaam}')`)
	.should("have.length.gte", 0).then (($hits) => {
		cy.log ('aantal hits: ' + $hits.length)
		cy.log ('collectie is er niet. OK');
		if ($hits.length == 0) {
			cy.log ('collectie is er niet. OK');
			cy.get('.filter-button-wrapper a:contains(toevoegbuttontekst)')
			.click().then (() => {
					cy.get('.p-card-content label[for="name"]')
					.parent().type(colnaam);
					// Let op! dit label heeft *bij sducollecties* geen
					// for-attribuut, dus gebruik hier de tekst
					cy.get('.p-card-content label:contains("Omschrijving")')
					.parent().type(`omschrijving van ${colnaam}`);
					cy.get('button:contains("Opslaan")').click();
					cy.waitOnLoadingIcon();
					cy.registreer_collectie (colnaam, lokaal);
			});
			cy.wrap (true);
		}
		else {
			cy.log ('collectie is er al....');
			cy.registreer_collectie (colnaam, lokaal);
			cy.wrap (false);
		}
	});
	cy.wrap (ruud);
});

// zorg_voor_produkt_in_collectie (): zorg dat opgegeven produkt er is in de
// opgegeven lokale of sdu-collectie er is. Als hij er is, doe niets (!!!),
// maak anders aan en gebruik dan de optiehash voor de velden. De hash wordt
// niet gebruikt als hij er al is!!!!
// parameters: - naam van collectie
//             - naam van produkt
//             - boolean die aangeeft of het lokaal is of niet
// opties: toekomst       - (default false): boolean die aangeeft of het
//                          produkt een ver toekomstige datum moet hebben
//         status         - (default undef): zet status als gegeven
//         updateMemo     - (default undef): zet tekst updatememo als gegeven
/////////////////
Cypress.Commands.add('zorg_voor_produkt_in_collectie',
										(colnaam, prnaam, lokaal,
											{	toekomst = false,
												status = undefined,
												updateMemo = undefined}) => {
    let fixturefile = `cypress/data/config.json`;
	let locatie = (lokaal ? 'p-card[header="Mijn collecties"]'
							: '.p-datatable-tbody');
	let admin = (lokaal ? '' : '/admin') ;
	cy.visit(`/nl${admin}/products/collections`)
	cy.waitOnLoadingIcon();
	cy.get(`${locatie} a:contains('${colnaam}')`).first().click();
	cy.waitOnLoadingIcon();
	cy.get(`.p-datatable-tbody product-name:contains('${prnaam}')`)
	.should("have.length.gte", 0).then (($hits) => {
		cy.log ('aantal hits: ' + $hits.length)
		if ($hits.length == 0) {
			cy.log ('geen hits OK');
				cy.get('button:contains("Nieuw product")')
				.click().then (() => {
					cy.get('.p-tabview-panels label:contains("Titel")')
					.parent().type(prnaam);
				}).then (() => {
					// EERST de status wijzigigen
					if (status) {
						cy.log ('wijzig status');
						cy.get( 'p-dropdown#status').click().then( ()=> {
							cy.get( 'p-dropdownitem').contains(status).click();
						});
					} else {
						cy.log ('wijzig status niet');
					}
				}).then (() => {
					// DAN evt. de publicatiedatum
					if (toekomst) {
						cy.log ('datum in toekomst');
						cy.get('.publication-period').find('input').first()
							.click().type('12-12-2030');
					} else {
						cy.log ('datum niet in toekomst');
					}
				}).then (() => {
					// evt. de updateMemo
					if (updateMemo) {
						cy.log ('updateMemo vullen');
						cy.get('textarea[formcontrolname="update_memo"]')
							.click().type('{selectAll}{del}' + updateMemo);
					} else {
						cy.log ('niet updateMemo vullen');
					}
				}).then (() => {
					cy.get('button:contains("Opslaan")').click()
					// wacht op nieuwe pagina; zonder de should vuurt
					// url () voordat de pagina actief is
					cy.url().should ('not.contain', 'create');
					cy.url().then ((res) => {
						cy.log ('url is ' + res);
						let hits = res.match (/products\/(\d+)\/versions\/(\d+)/);
						ruud[`product_${prnaam}`] = {"id":		hits[1],
												"versie":	hits[2]};
					});
				});
			cy.wrap (true);
		}
		else {
			cy.log ('document is er al....');
			cy.wrap (false);
		}
	});
	cy.wrap (ruud);
});
export default Cypress;

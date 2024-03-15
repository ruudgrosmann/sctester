import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../common/customParameterTypes';

When(/^I log in as customer "([^\"]*)"(?: with account "([^\"]*)")?$/,
														(cst, account) => {
	cy.customer_login( cst, account);
    cy.storeState('is_admin', (account ? false : true));
	cy.wrap((account ? false : true)).as ('is_admin');
});

When("I find the entry for product {string}", (titelnaam) => {
	cy.get( '.p-datatable-tbody product-name').contains (titelnaam)
		.parent().parent().parent().as ('foundrow');
});
Then("its publicatiedatum field is {optniet}disabled", (occ) => {
	cy.get('@foundrow').find ('td').eq (1).within ( () => {
		// disabled via disabled-attribuut
		cy.get('input').should(
				(occ ? 'not.be.disabled' : 'be.disabled'));
	});
});

Then("its kosten field is {optniet}disabled", (occ) => {
	cy.get('@foundrow').find ('td').eq (2).within ( () => {
		// disabled via class
		cy.get('div.fake-textarea').should(
			(occ ? 'not.have.class' : 'have.class'), 'disabled');
	});
});

Then("I see the product in bewerking {string}", (titelnaam) => {
	cy.get( 'product-dashboard-temporary-products ' +
			'.p-datatable-tbody tr td:first-of-type').contains (titelnaam)
		.parent().parent().as ('foundproduct');
});

Then("I see the product gereed voor publicatie {string}", (titelnaam) => {
	cy.get( 'product-dashboard-ready-for-publishing ' +
			'.p-datatable-tbody tr td:first-of-type').contains (titelnaam)
		.parent().parent().as ('foundproduct');
});

When('I get the first product in bewerking', () => {
	cy.get( 'product-dashboard-temporary-products tbody.p-datatable-tbody tr').first().as ( 'foundproduct');
});

Then( 'its name contains {string}', (deelstring) => {
	// product name in kolom 1
	cy.get('@foundproduct').find ('td').first().contains (deelstring);
});

Then ('it is of collection {string}', (colnaam) => {
	// collection name in  kolom 2
	cy.get('@foundproduct').find ('td').eq( 1).contains (colnaam);
});

Then ('the {string} button is {optniet}disabled', (bnaam, occ) => {
	cy.get( `p-button[label='${bnaam}'] button`).should(
                    (occ ? 'not.be.disabled' : 'be.disabled'));
});

Then ('the collectie dropdown contains {string}', (waarde) => {
	cy.get( '.mainContent').click();	// sluit evt. openstaande dropdown
	cy.get( 'p-dropdown#collection').click().then ( () => {
			cy.get ('p-dropdownitem').contains( waarde);
		});
});

When ('I select collectie {string}', (waarde) => {
	cy.get( '.mainContent').click();	// sluit evt. openstaande dropdown
	cy.get( 'p-dropdown#collection').click().then ( () => {
			cy.get ('p-dropdownitem').contains( waarde).click();
		});
});

When ('I select option {string}', (waarde) => {
	cy.get( `contact-export div div:contains("${waarde}")`)
		.find('p-checkbox').click();
});

When ('I export collectie {string}', (waarde) => {
	cy.get( '.mainContent').click();	// sluit evt. openstaande dropdown
	cy.get( 'p-dropdown#collection').click().then ( () => {
			cy.get ('p-dropdownitem').contains( waarde).click();
		}).then (() => {
			cy.get('button').contains( 'Exporteren').click();
			});
});

Then ('the message contains {string}', (msg) => {
	cy.get( '.p-toast-message div').contains (msg);
});

Then ('I find download file {string}', (naam) => {
	const date = new Date();
	let currentDay= String(date.getDate()).padStart(2, '0');
	let currentMonth = String(date.getMonth()+1).padStart(2,"0");
	let currentYear = date.getFullYear();
	// we will display the date as DD-MM-YYYY 
	let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
	let replnaam = naam.replace( 'DATE', currentDate);
	//cy.log (`zoek naar ${replnaam}`);
	let pad = `cypress/downloads/${replnaam}`;
	cy.readFile( pad);
	//cy.log (`verwijder ${pad}`);
	// verwijder downloadfile na succesvolle test
	cy.exec(`rm -f "${pad}"`);
});

Then ('I should see VAC in bewerking {string} from collection {string}',
											(vacnaam, vaccoll) => {
	cy.get( 'qa-dashboard-temporary-qas tbody.p-datatable-tbody tr a')
			.contains(vacnaam).parent().parent()
					.within( () => {
						cy.get('td').contains (vaccoll);
						});

});

Then ('the name of the first product contains {string}', (waarde) => {
	cy.get( '.p-datatable-tbody tr').first().then (() => {
			cy.get( 'product-name').contains (waarde);
		});
});

Then ('I should {optniet}see button {string}', (occ, naam) => {
	cy.get( `.actions-toolbar button:contains("${naam}")`).should (
					(occ ? 'not.' : '') + 'exist');
});

Then ('button {string} is {optniet}disabled', (naam, occ) => {
	cy.get( `.actions-toolbar button:contains("${naam}")`)
			.should( (occ ? 'not.be.disabled' : 'be.disabled'));
});
When ('I click button {string}', (naam) => {
	cy.get( `.mainContent button:contains("${naam}")`)
			.first().click().then ( () => {
					cy.get('.pi-spinner').should ('not.exist');
				});
});

When ("I change the status to {string}", (status) => {
	cy.get('.p-card-title').click();
	cy.get('p-dropdown#status').click().then (() =>
	{
		cy.get(`p-dropdownitem:contains("${status}")`).click();
	});
});

When ('I click product in bewerking {string}', (waarde) => {
	cy.get( 'product-dashboard-temporary-products tbody.p-datatable-tbody tr a').contains(waarde).click();
});

When ('I click link {string}', (waarde) => {
	// cy.get( 'tbody.p-datatable-tbody tr a').contains(waarde)
	//cy.get( 'div.content-main a').contains(waarde)
		//.click({force: true});
	cy.readState('is_admin');
    cy.get('@is_admin').then( (b) => {
        cy.log(`admin is ${b}`)
        let pad = ( b ? `div.content-main a` :
						'tbody.p-datatable-tbody tr a');
        cy.get(`${pad}:contains("${waarde}")`)
			.click({force: true});
	});
});

Then ('the URL should {optniet}contain {string}', (occ, waarde) => {
	cy.url().should((occ ? 'not.' : '') + 'contain', waarde);
});

When ('I click product {string}', (waarde) => {
	cy.get( '.p-datatable-tbody tr product-name').contains(waarde).click();
});

Then ('I should {optniet}see product {string}', (occ, waarde) => {
	cy.get( '.p-datatable-tbody tr product-name').contains(waarde).should (
		(occ ? 'not.exist' : 'exist'));
});

Then ('collection {string} has a warning icon', (naam) => {
	cy.get(`div.actions-block-item h3:contains("Collecties")`)
						.parent().within( () => {
							cy.get( `label:contains(${naam})`)
							.parent().find('i')
							  .should('have.attr', 'ptooltip')
						});
});

When ('I click the first product', () => {
	cy.get( '.p-datatable-tbody tr:first product-name').click();
});

Then ('the {string} field is {optniet}locked', (veldnaam, occ) => {
	cy.get( `div.form-row div.spacer:contains("${veldnaam}")`)
		.next().within( () => {
			cy.get ('div.fake-textarea')
				.should( (occ ? 'not.have.class' : 'have.class'), 'locked')
			});
});
When ("I reload the page", () => {
    cy.reload();
});
Then('I should see popup message {string}', (str) => {
  cy.get('div.p-toast-detail').contains(str);
});

When ("I create published product {string} in sdu collection {string} with updatememo {string}", (prodnm, colnm, memotekst) => {
	cy.zorg_voor_produkt_in_collectie (colnm, prodnm, false, {
												updateMemo: memotekst,
												status: 'Gepubliceerd'});
});

When ("I find section {string}", (snaam) => {
	cy.get('div.mainContent').contains('a');
	cy.waitOnLoadingIcon();
	cy.get (`.content-main strong`).contains(snaam)
		.parent().parent().parent().parent().as ('foundsection');
	cy.waitOnLoadingIcon();
});

Then ("this section {containsornot} {string}", (occ, pnaam) => {
	cy.get('@foundsection').then ( ($section) => {
		cy.waitOnLoadingIcon().then (() => {
		cy.wrap($section).find(`.p-datatable-tbody a`)
			.should("have.length.gte", 0).then (($hits) => {
				// OK als er helemaal geen entry's zijn en het criterium is
				// 'bevat niet'
				if (!occ && ($hits.length == 0)) {
					cy.log ('er zijn geen linkjes => OK');
					cy.wrap (true);
				} else
				{
					cy.wrap($hits).should(
						(occ ? 'contain' : 'not.contain'), pnaam);
				}
			})
		})
	});
});
When ('I click link {string} in this section', (pnaam) => {
	cy.get('@foundsection').then ( ($section) => {
		cy.wrap($section).find(`.p-datatable-tbody a:contains("${pnaam}")`)
			.click();
	});
});

import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import IconProps from '../common/icons';
import '../common/customParameterTypes';
import '../common/tsc';

before (() => {
});

When ("I create published product {string} in sdu collection {string} with updatememo {string}", (prodnm, colnm, memotekst) => {
	cy.zorg_voor_produkt_in_collectie (colnm, prodnm, false, {
												updateMemo: memotekst,
												status: 'Gepubliceerd'});
});

When ('I click the checkbox of collection {string}', (naam) => {
    cy.get(`div.actions-block-item h3:contains("Collecties")`)
                        .parent().within( () => {
                            cy.get( `label:contains(${naam})`)
                            .parent().click();
                        });
});

Then ('the product has status {string}', (status) => {
    cy.get('.current-status span').should ('contain', status);
});

Then ('the status selector {containsornot} {string}', (occ, status) => {
    cy.get('.p-card-title').click().then (() =>
	{
		cy.get('p-dropdown#status').click().then (() =>
		{   
			cy.get(`p-dropdownitem:contains("${status}")`).should (
					(occ ? 'exist' : 'not.exist'));
		});
	});
});

When ('I search for {string}', (zoekstring) => {
    cy.get('input#filter-by-name').click().type (zoekstring).next ().click();
});

When ('in this section I select {string} in filter {string}', (waarde,
					filternaam) => {
    cy.get('@foundsection').then ( ($section) => {
            cy.wrap($section)
				.find(`p-dropdown div span:contains("${filternaam}")`)
				.parent().click()
				.find (`li.p-dropdown-item span:contains("${waarde}")`)
				.click();
    });
});
When ('I find product {string} in this section', (pnaam) => {
    cy.get('@foundsection').then ( ($section) => {
            cy.wrap($section)
				.find(`tr td a:contains("${pnaam}")`)
				.parent().parent().as ('foundproduct');
    });
});

When ('I click the Weigeren button of this product', () => {
    cy.get('@foundproduct').then( ($prod) => {
		cy.wrap($prod).find ('p-button').click();
	});
});

Then ('this product contains text {string}', (tekst) => {
    cy.get('@foundproduct').then( ($prod) => {
		cy.wrap($prod).contains (tekst);
	});
});

When ('I find the {string} field of the product', (veldnaam) => {
	// Dit is heel knifterig: de html voor admins verschilt van die voor
	// gebruikers. In het ene geval staat de veldnaam in een div, in het
	// andere geval in een label.
	cy.readState('is_admin');
    cy.get('@is_admin').then( (b) => {
        cy.log(`admin is ${b}`)
		let pad = ( b ? `p-tabpanel label` :
						`p-tabpanel .form-row div div`);
		cy.get(`${pad}:contains("${veldnaam}")`)
			.parent().parent()		// nu de hele regeldiv
			.as('foundfield');
    });
});

function getTimestamp () {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  
  return `${pad(d.getFullYear(),4)}${pad(d.getMonth()+1)}${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

When ('I change the title to the timestamp with prefix {string}',
																(prefix) => {
	let str = getTimestamp();
	cy.get ("versioned-plain-text[label='Titel'] input")
		.click()
		.type('{selectAll}{del}' + prefix + '_' + str)
		.invoke('val') 
			.then(text => {
				cy.wrap(text).as ('newTitle');
				cy.storeState('newTitle', text);
			});
});

When ('I change the title to the version number with prefix {string}',
																(prefix) => {
	let str = getTimestamp();
	cy.url().then((utekst) => {
		let cgroups = utekst.match (/versions.(\d+)/);
		cy.get ("versioned-plain-text[label='Titel'] input")
			.click()
			.type('{selectAll}{del}' + prefix + '_' + cgroups[1])
			.invoke('val') 
				.then(text =>
				{
					cy.wrap(text).as ('newTitle');
					cy.storeState('newTitle', text);
				});
	});
});

When ('I go to the last result page', () => {
	cy.get ("span.pi-angle-double-right").click ({force: true});
});
When ('I set the number of filter results to max', () => {
	cy.get ("p-paginator .p-dropdown").click ().then (() =>
	{
		cy.get ("p-dropdownitem li span:contains('100')").click ();
	});
});

When ('I set the version name to {string}', (version) => {
	cy.wrap(version).as ('newTitle');
});

Then('I should {optniet}see a sdu product with the version name', (occ) => {
	// neem de ancestor met elementnaam tr, ofwel parent.parent.parent
	cy.readState('newTitle');
    cy.get('@newTitle').then( (b) => {
		cy.get(`product-name a:contains("${b}")`).should (
				(occ ? 'not.exist' : 'exist'));
	});
});

Then('I should {optniet}see link {string}', (occ, str) => {
    cy.get(`p-datatable-tbody a:contains("${str}")`).should (
				(occ ? 'not.exist' : 'exist'));
});

When ('I should see a product with the new title', () => {
	cy.readState('newTitle');
    cy.get('@newTitle').then( (b) => {
		cy.log ("tst is" + b);
		cy.get ("product-name").contains(b);
	});
});

function click_input() {
    return (cy.get(`@foundfield`).find ('input').click());
};

When ('I change this field to {string}', (waarde) => {
    click_input().type ('{selectAll}{del}' + waarde);
});

When ('I click on this field', () => {
    cy.get(`@foundfield`).find ('.fake-textarea').click();
});
Then ('this field contains {string}', (tekst) => {
    cy.get(`@foundfield`).find (`.fake-textarea:contains("${tekst}")`)
});
Then ('the input of this field starts with {string}', (tekst) => {
    cy.get(`@foundfield`).find (`input#content`)
		.invoke('val').then ((waarde) => {
			cy.log (`waarde is "${waarde}"`);
			expect(waarde).to.match (new RegExp (`^${waarde}`));
		});
});

When ('I click button {string} in the dialog', (tekst) => {
    cy.get(`p-confirmdialog button span:contains("${tekst}")`).click();
}); 

Then ('switch {string} of this field is {onoroff}', (snaam, aan) => {
    cy.get(`@foundfield`).find (`label:contains("${snaam}")`).parent()
		.find ('.p-inputswitch')
		.should ((aan ? 'have.class' : 'not.have.class'),
					'p-inputswitch-checked')
});

When ('I click on switch {string} of this field', (snaam) => {
    cy.get(`@foundfield`).find (`label:contains("${snaam}")`).parent()
		.find ('p-inputswitch').click();
});

When ('I change the updatememo to {string}', (memotekst) => {
	cy.get('textarea[formcontrolname="update_memo"]')
		.click().type('{selectAll}{del}' + memotekst);
});

Then ('this field has a changed icon', (veldnaam) => {
    cy.get(`@foundfield`).find ('.fake-textarea')
		.should ('have.class', 'changed');
});

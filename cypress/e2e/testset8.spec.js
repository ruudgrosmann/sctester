import {inspect} from "util";
var ruud = {"init": 1};
Cypress.Commands.add('writeConfig', (str) => {
    let fixturefile = `cypress/data/config.json`;
	cy.writeFile(fixturefile, JSON.stringify(ruud));
});

before(() => {
    cy.clearLocalStorageSnapshot();
    cy.log('ga inloggen');
	cy.customer_login( "autotestPVCW").then (() => {
		cy.get('div.mainContent').contains('Dashboard')
		});
    cy.saveLocalStorage();
    cy.log('klaar met inloggen');
});

describe('initialisatie', () => {
    it('zorg voor testcollecties voor sduconnect', () => {
		//return false;
		cy.zorg_voor_collectie( "P_collectie1", false);
    });
    it('maak testprodukten aan in P_collectie1 voor sduconnect', () => {
		// tags: niet
		let cnaam = 'P_collectie1';
		cy.waitOnLoadingIcon();
		cy.zorg_voor_produkt_in_collectie(cnaam, "ruudtest2", false, {
						'status': 'Gepubliceerd',
						'updateMemo': 'ruudmemo0'});
/*
		cy.zorg_voor_produkt_in_collectie(cnaam, "sdu_p8.1", false, {
						'status': 'Gepubliceerd',
						'updateMemo': 'test8.1'});
*/
    });
});

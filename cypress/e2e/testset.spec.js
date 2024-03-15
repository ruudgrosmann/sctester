import {inspect} from "util";
var ruud = {"init": 1};
Cypress.Commands.add('createOrRead', (str) => {
    let fixturefile = `cypress/data/config.json`;
    cy.exec( `[ -f '${fixturefile}' ] && echo "file exists"`, {failOnNonZeroExit: false} ).then( (res) => {
        if( res.stdout === 'file exists' ) {
            cy.log ('file is er');
        } else  {
            cy.log ('is er niet maak aan.');
            cy.writeFile(fixturefile, `{}`)
        }
        cy.readFile(fixturefile, (err, data) => {
            if (err) {
                return cy.error(err);
            };
        })
    });
});
Cypress.Commands.add('writeConfig', (str) => {
    let fixturefile = `cypress/data/config.json`;
	cy.writeFile(fixturefile, JSON.stringify(ruud));
});

before(() => {
    cy.clearLocalStorageSnapshot();
    cy.log('ga inloggen');
	cy.customer_login( "AutotestLocalAdmin", "autotest_account1");
    cy.saveLocalStorage();
	cy.createOrRead('juist').then( (res) => {
		ruud = res;
	});
    cy.log('klaar met inloggen');
});

describe('initialisatie', () => {
    it('maak lokale testcollecties aan voor sduconnect', () => {
		return false;
		cy.zorg_voor_collectie( "P_collectie1", true);
		cy.zorg_voor_collectie( 'ruudcollectie5', true)
		.then ((res) => {
			cy.log( inspect(res));
		});
    });
/*
*/
    it('maak lokale testprodukten aan in P_collectie1 voor sduconnect', () => {
		// tags: niet
		let cnaam = 'P_collectie1';
		cy.zorg_voor_produkt_in_collectie(cnaam, "ruudproduct3", true, {});
		cy.zorg_voor_produkt_in_collectie(cnaam, 'ruudproduct4', true, {})
		.then ((res) => {
			cy.log( inspect(res));
		});
    });
    it('dit is een test', () => {
		// tags: nu
		cy.log( 'doe het nu');
		});
});

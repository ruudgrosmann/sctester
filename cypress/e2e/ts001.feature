@tsc001
@nu
Feature: tsc001: customer "Cypress_LRD_RO", account "autotest_account2"

Background:
	Given I open the home page

Scenario: 1.2 homepagina laadt
	Then  I should see "Dashboard"

Scenario: 1.3 productoverzicht
	When  I open "Overzicht" of menu item "Producten"
	Then  I should see "This module is not enabled for your account"
	And   the URL should contain "module-not-enabled"

Scenario: 1.4 productcollectie
	When  I open "Collecties" of menu item "Producten"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.5 nieuw produkt
	When  I open "Nieuw product" of menu item "Producten"
	Then  I should see "This module is not enabled for your account"

Scenario: 1.6 produkt exporteren 
	When  I open "Exporteren" of menu item "Producten"
	Then  I should see "This module is not enabled for your account"

Scenario: 1.7 leges centraal
	When I open "Leges centraal" of menu item "Producten"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.9 VAC-overzicht
	When I open "Overzicht" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.10 VAC-collecties
	When I open "Collecties" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.11 nieuwe VAC
	When I open "Nieuwe VAC" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.12 VAC's exporteren
	When I open "Exporteren" of menu item "VAC's"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.17 contact-collecties
	When I open "Collecties" of menu item "Contacten"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.18 nieuw contact
	When I open "Nieuw contact" of menu item "Contacten"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.19 contacten exporteren
	When I open "Exporteren" of menu item "Contacten"
	Then  the URL should contain "module-not-enabled"

Scenario: 1.21 linkchecker
	When I click menu item "Linkchecker"
	Then  the URL should contain "module-not-enabled"
